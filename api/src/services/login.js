const UserModel = require("../models/user");
const DonorModel = require("../models/donor");
const TokenModel = require("../models/token");
const UserNFTModel = require("../models/user_nft");
const Web3Util = require("../util/web3");
const SubscanUtil = require("../util/subscan");

const login = async function (userId, res) {

  const user = await UserModel.getUserByKey(userId);
  if (!user) {
    return res.status(404).json({ message: "No user account" });
  }
  const donorList = await DonorModel.getDonors(user.user_id);

  if (donorList.length == 0) {
    return res.status(400).json({
      message: "Invalid Donor"
    });
  }

  let sentTokenList = [];
  let allNFTs = [];

  if (donorList && donorList.length > 0) {
    //get all tokenAddress
    const tokens = await TokenModel.getAllTokens();
    const tokenAddresses = tokens.map(t => t.contract_address);

    // get all NFTs by subscan
    allNFTs = await SubscanUtil.getAllNFTs(user.wallets[0].wallet_address.toLowerCase(), tokenAddresses);

    // get before UserNFTs from UserNFT table
    const userNFTsBefore = await UserNFTModel.getUserNFTsByWalletAddress(user.wallets[0].wallet_address.toLowerCase());

    // remove UserNFT
    const userNFTRemoves = userNFTsBefore.filter(x => {
      let result = true;
      for (const nft of allNFTs) {
        if (nft.contract === x.token_address) {
          result = false;
          break;
        }
      }
      return result;
    });
    if (userNFTRemoves.length > 0) {
      await UserNFTModel.batchDelete(userNFTRemoves.map(u => ({
        user_id: u.user_id,
        token_address: u.token_address
      })));
    }

    // LOOP all NFTs
    // Update/Insert/Delete:
    let results = [];

    for (let nft of allNFTs) {
      const token = tokens.find(e => e.contract_address == nft.contract);
      const name = token.token_name;
      const symbol = token.symbol;
      const tokenURI = await Web3Util.getTokenURI(nft.contract, nft.token_id);
      const getContractAddress = results.find(e => e.contract == nft.contract);
      const imageUrl = await Web3Util.getImageUrl(tokenURI);

      const tokenDetail = {
        token_id: nft.token_id,
        name: name,
        symbol: symbol,
        token_uri: tokenURI ? tokenURI : "",
        image_url: imageUrl ? imageUrl : "",
        metadata: '{}',
        owner_of: nft.holder
      };

      if (!getContractAddress) {
        results.push({
          userId: user.user_id,
          wallet_address: nft.holder,
          contract: nft.contract,
          token_ids: [tokenDetail]
        })
      } else {
        getContractAddress.token_ids.push(tokenDetail)
      }
    }

    for (let result of results) {
      await UserNFTModel.upsertUserNFT({
        userId: result.userId,
        tokenAddress: result.contract,
        walletAddress: result.wallet_address,
        tokenIds: result.token_ids,
      });
    }
  }

  let checkAllFailed = true;

  for (const donor of donorList) {
    if (!donor.is_sent_token) {
      const token = await TokenModel.getToken(donor.token_name);

      // check sent token by subscan
      const checkSentToken = await allNFTs.find(e =>
        e.contract === token.contract_address &&
        e.holder === user.wallets[0].wallet_address.toLowerCase() &&
        e.token_id === donor.token_id
      );

      if (checkSentToken) {
        donor.is_sent_token = true;

        await DonorModel.update(donor);
        if (checkAllFailed) checkAllFailed = false;
        continue;
      }

      let timesTransfer = 0;
      let sendToken;

      do {
        if (token.contract_type === 'SBT') {
          sendToken = await Web3Util.mint(token.contract_address, user.wallets[0].wallet_address, donor.token_id, donor.token_uri);
        } else if (token.contract_type === 'NFT') {
          sendToken = await Web3Util.transfer(token.contract_address, user.wallets[0].wallet_address, donor.token_id);
        }

        timesTransfer++;
      } while (timesTransfer < 2 && sendToken.messageError)

      if (!sendToken.messageError) {

        donor.is_sent_token = true;
        const objectAddUserNFT = {
          userId: userId,
          tokenAddress: token.contract_address,
          tokenId: donor.token_id,
          symbol: token.symbol,
          tokenName: donor.token_name,
          walletAddress: user.wallets[0].wallet_address.toLowerCase()
        }
        await UserNFTModel.addUserNft(objectAddUserNFT);
        if (checkAllFailed) checkAllFailed = false;
      }

      sentTokenList.push(await DonorModel.update(donor));

    }
  }

  // get user nfts by wallet address
  const userNFTs = await UserNFTModel.getUserNFTsByWalletAddress(user.wallets[0].wallet_address.toLowerCase());
  if (userNFTs.length === 0　&& checkAllFailed) {
    return res.status(403).json({
      message: "NFT/SBT possession required"
    });
  }

  return sentTokenList;
};

module.exports = {
  login
};
