const rpcUrl = process.env.SHIBUYA_RPC;
const abiContractSBT = require('../../contracts/SBT.sol/SBT.json').abi;
const abiContractNFT = require('../../contracts/NFT.sol/NFT.json').abi;
const Web3 = require('web3');
const web3 = new Web3(rpcUrl);
const axios = require('axios');
const NodeCache = require("node-cache");
// cache time: 1hour
const cache = new NodeCache({ stdTTL: 3600 });

const ethSignerKms = require('@rumblefishdev/eth-signer-kms');
const ethers = require('ethers');
const AWS = require('aws-sdk');
const kms = new AWS.KMS({
  region: process.env.AWS_KMS_REGION
});
const KMS_KEY_ID = process.env.KMS_KEY_ID;

const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
const kmsSigner = new ethSignerKms.KMSSigner(provider, KMS_KEY_ID, kms);

const transfer = async (tokenAddress, receiveAddress, tokenId) => {
  const nftContract = new web3.eth.Contract(abiContractNFT, tokenAddress);

  const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
  let adminWalletAddress = null;

  const useKMSAccount = "true" === process.env.USE_KMS_ACCOUNT;
  logger.info(`Use KMS account: ${useKMSAccount}`);
  if (useKMSAccount) {
    adminWalletAddress = await ethSignerKms.getEthAddressFromKMS({ kmsInstance: kms, keyId: KMS_KEY_ID })
  } else {
    adminWalletAddress =
      web3.eth.accounts.privateKeyToAccount(adminPrivateKey).address;
  }
  logger.info(`Admin wallet address: ${adminWalletAddress}`);

  // const gasLimit = await nftContract.methods
  //   .transferFrom(adminWalletAddress, receiveAddress, tokenId)
  //   .estimateGas({ from: adminWalletAddress });
  const gasPrice = await web3.eth.getGasPrice();
  const data = nftContract.methods
    .transferFrom(adminWalletAddress, receiveAddress, tokenId)
    .encodeABI();

  const tx = {
    data: data,
    from: adminWalletAddress,
    to: tokenAddress,
    gasLimit: Number(process.env.GAS_LIMIT || 400000),
    gasPrice: gasPrice,
  };

  let txhash;
  let messageError;

  if (useKMSAccount) {
    /**
     * TO-DO:
     * I am missing getRevertReason because I am not allowed to use km. I can't test and implement it.
     * please check the return of kmsSigner.sendTranaction(tx). It should be a txHash
    */

    txhash = await kmsSigner.sendTransaction(tx);
  } else {
    const signedTransferTx = await web3.eth.accounts
      .signTransaction(tx, adminPrivateKey)
      .catch((e) => {
        logger.error(e);
      });

    await web3.eth
      .sendSignedTransaction(signedTransferTx.rawTransaction)
      .on("transactionHash", function (hash) {
        txhash = hash;
      })
      .catch(async (e) => {
        messageError = await getRevertReason(e.receipt?.transactionHash, data);
        logger.error(e);
      });

  }
  logger.info(`transfer transaction hash: ${txhash}`);

  return {
    txhash,
    messageError
  }
}

const getTokenURI = async (tokenAddress, tokenId) => {
  try {
    const key = "tokenURI" + tokenAddress;
    if (cache.has(key)) {
      return cache.get(key) + tokenId + '.json';
    } else {
      const nftContract = new web3.eth.Contract(abiContractNFT, tokenAddress);
      const tokenURI = await nftContract.methods.tokenURI(tokenId).call();
      const lastIndex = tokenURI.lastIndexOf("/");
      const pathTokenURI = tokenURI.slice(0, lastIndex + 1);
      cache.set(key, pathTokenURI);
      return tokenURI;
    }
  } catch (e) {
    logger.error(e);
    return null;
  }
}


const fromWei = async (number, unit = 'ether') => {
  return web3.utils.fromWei(number, unit);
}

const getRevertReason = async (txHash, data) => {
  if (!txHash) return 'txHash is null';
  const tx = await web3.eth.getTransaction(txHash);

  let result = await web3.eth.call({
    to: tx.to,
    data: data
  }, tx.blockNumber)
    .catch(e => {
      return Promise.resolve(e.data)
    });

  result = result.startsWith('0x') ? result : `0x${result}`

  if (result && result.substr(138)) {
    const reason = web3.utils.toAscii(`0x${result.substr(138)}`);
    return reason.toString();

  } else {
    return 'Cannot get reason - No return value';
  }

}

const mint = async (contractAddress, userWallet, tokenId, tokenURI) => {
  const nftContract = new web3.eth.Contract(abiContractSBT, contractAddress);

  const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
  let adminWalletAddress = null;

  const useKMSAccount = "true" === process.env.USE_KMS_ACCOUNT;
  logger.info(`Use KMS account: ${useKMSAccount}`);
  if (useKMSAccount) {
    adminWalletAddress = await ethSignerKms.getEthAddressFromKMS({ kmsInstance: kms, keyId: KMS_KEY_ID })
  } else {
    adminWalletAddress =
      web3.eth.accounts.privateKeyToAccount(adminPrivateKey).address;
  }
  logger.info(`Admin wallet address: ${adminWalletAddress}`);

  const gasPrice = await web3.eth.getGasPrice();
  const data = nftContract.methods
    .mint(userWallet, tokenId, tokenURI)
    .encodeABI();

  const tx = {
    data: data,
    from: adminWalletAddress,
    to: contractAddress,
    gasLimit: Number(process.env.GAS_LIMIT || 400000),
    gasPrice: gasPrice,
  };

  let txhash;
  let messageError;

  if (useKMSAccount) {
    txhash = await kmsSigner.sendTransaction(tx);
  } else {
    const signedTransferTx = await web3.eth.accounts
      .signTransaction(tx, adminPrivateKey)
      .catch((e) => {
        logger.error(e);
      });

    await web3.eth
      .sendSignedTransaction(signedTransferTx.rawTransaction)
      .on("transactionHash", function (hash) {
        txhash = hash;
      })
      .catch(async (e) => {
        messageError = await getRevertReason(e.receipt?.transactionHash, data);
        logger.error(e);
      });

  }
  logger.info(`transfer transaction hash: ${txhash}`);

  return {
    txhash,
    messageError
  }
}

const getImageUrl = async (tokenUri) => {
  try {
    const res = await axios.get(tokenUri);
    if (res && res.data) {
      return res.data.image;
    }
  } catch (e) {
    logger.debug(e)
    return "";
  }
}

module.exports = {
  mint,
  transfer,
  fromWei,
  getTokenURI,
  getRevertReason,
  getImageUrl
};
