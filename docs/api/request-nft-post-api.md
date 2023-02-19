## Request NFT API 
Request NFT

- API Endpoint: `/v1/token/{token_address}/request`
- Method: Post

### Request parameters
- token_address: Token Address
- token_id_start: TokenId start
- token_id_end: TokenId end

### Processing Details
#### Router
1. Check IdToken, if there is an error, throw 401 error

#### Controller
##### Check parameter
1. Check parameters, if false, throw 400 error
   - token_address: required
   - token_id_start: required
   - token_id_end: required

##### Call TokenService.requestNft method
parameters:
- tokenAddress: req.params.token_address
- tokenIdStart: req.query.token_id_start 
- tokenIdEnd: req.query.token_id_end
- user: req.user


##### Create Response
```
{
  "message": "Success",
  "token_id": {returned token ID}
}
```

return json

#### Service
##### TokenService.requestNft method
1. Get UserWalletModel.getUserWalletByEmail to get UserWallet
   parameters:
   - email: parameter.user.email

2. Call TokenService.getTokenByTokenAddress method
  parameters:
   - tokenAddress: parameter.tokenAddress

3. Get available_token_ids of Token
Filter condition:
  - variation.token_id_start == parameter.tokenIdStart
  - variation.token_id_end == parameter.tokenIdEnd

4. If token.variation.available_token_ids is empty, return `SoldOut` message.


5. Call all NFTs of wallet
    - API endpoint: `https://shibuya.api.subscan.io/api/scan/evm/erc721/collectibles`  ※Get from ENV
    - API method: Post
    - API request body:
        - address: UserWallet.wallet_address
        - contract: parameter.tokenAddress
        - row: 20
        - page: 0
    - API header: `X-API-Key: ENV.SUBSCAN_API_KEY` ※If ENV.SUBSCAN_API_KEY is empty, don't set header

    ※API docs: https://support.subscan.io/#erc721-collectibles

6. Loop data.list
    - If contract === parameter.tokenAddress, return `Already have` message.

7. Transfer the first token ID of token.variation.available_token_ids to UserWallet.wallet_address
    - Call contact transfer method

8. Call TokenModel.updateAvailableTokenIds method
  parameters:
   - symbol: Token.symbol
   - chain: Token.chain
   - variation = changed variation.(Remove the first token ID of matched available_token_ids in step 7)
   - user_id: UserWallet.user_id

9. Call UserNFTModel.addUserNft method
   parameters:
   - userId: UserWallet.user_id
   - token_address: parameter.tokenAddress
   - symbol: Token.symbol
   - tokenId: token ID 

10. Return token ID

#### Model
##### TokenModel.getTokenByTokenAddress method
Scan condition:
- Token.token_address = parameter.token_address
  
##### TokenModel.updateAvailableTokenIds method
Update condition:
- symbol: parameter.symbol
- chain: parameter.chain

Update item:
- variation = parameter.variation
- updated_at = System date
- updated_by = parameter.userId

##### UserNFTModel.addUserNft method
1. Get UserNFT by user_id and token_address
2. If there is no UserNFT data, create UserNFT
- user_id = parameter.userId
- token_address = parameter.tokenAddress
- symbol = parameter.symbol
- token_ids = `[parameter.tokenId]`
- created_at = System date
- created_by = parameter.userId
- updated_at = System date
- updated_by = parameter.userId
- delete_flg = false

3. If there is UserNFT data, update UserNFT
- symbol = parameter.symbol
- token_ids =  new token_ids array(added tokenId)
- updated_at = System date
- updated_by = parameter.userId