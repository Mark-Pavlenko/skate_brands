const axios = require("axios");
const secretManager = require("../util/secret_manager");

const getAllNFTs = async (walletAddress, tokenAddresses) => {
  let subscanAPIKey = null;
  let count = 100, page = 0;

  if (process.env.USE_SECRET_MANAGER === "true") {
    const region = process.env.SECRET_MANAGER_REGION;
    const secretName = process.env.SECRET_MANAGER_SUBSCAN_API_KEY_SECRET_NAME;
    const subscanAPIKeyResponse = await secretManager.getSecretByKey(secretName, region);
    if (subscanAPIKeyResponse) {
      subscanAPIKey = JSON.parse(subscanAPIKeyResponse).subscan_api_key;
    }
  } else {
    subscanAPIKey = process.env.SUBSCAN_API_KEY;
  }

  if (!subscanAPIKey) {
    logger.error('Can not get subscan API KEY.');
    return {
      message: 'System error'
    }
  }

  //get all nfts
  const allNFTs = [];
  let dataCount = 0;
  while (page === 0 || dataCount >= count) {
    const response = await axios({
      method: 'post',
      url: process.env.SUBSCAN_END_POINT,
      headers: {
        "X-API-Key": subscanAPIKey
      },
      data: {
        address: walletAddress.toLowerCase(),
        row: count,
        page: page,
      },
      timeout: 120000,
      validateStatus: () => true,
    });


    try {
      dataCount = response.data.data.count;
      if (response.data.data.list.length == 0) {
        break;
      }
    } catch (e) {
      logger.error(e);
      logger.info(response);

      break;
    }

    allNFTs.push(...response.data.data.list);

    page++;
  }

  // Get all nft of userAddress whose address belongs to tokenAddress
  return allNFTs.filter(e => tokenAddresses.includes(e.contract));
}

module.exports = {
  getAllNFTs
};
