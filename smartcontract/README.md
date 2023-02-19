# Smart contracts

## The following prerequisites are required to be installed on your system:
- hardhat: v2.10.2  ※if > 2.11, there is no rpcQuantityToBN function error
- NodeJS
- Yarn (optional)

Then run:

```sh
yarn install
```

Get more ASTAR for testing: [LINK](https://docs.astar.network/docs/quickstart/faucet)

ASTAR Testnet Explorer: [LINK](https://docs.blockscout.com/for-users/verifying-a-smart-contract)

## Deploy contracts
### Localhost
#### Set admin private key in .env.development
- `ADMIN_PRIVATE_KEY`: Private key


#### Start hardhat
```sh
yarn start:dev
```

##### FT first deploy
Set your FT info in  .env.development

- `FT_NAME`: Name of FT
- `FT_SYMBOL`: Symbol of FT
- `FT_INITIAL_SUPPLY`: Initial supply
- `FT_MAX_SUPPLY`: Max supply

Run script:
```sh
yarn migrate:local-ft
```

##### FT upgrade deploy
Set your FT info in  .env.development

- `FT_ADDRESS`: Address of FT  
  
Run script:
```sh
yarn migrate:local-ft-upgrade
```

##### NFT deploy
Set your NFT info in  .env.development
- `NFT_BASE_URI`: BaseURI of NFT  
- `NFT_NAME`: Name of NFT  
- `NFT_SYMBOL`: Symbol of NFT  

Run script:
```sh
yarn migrate:local-nft
```

##### Remint NFT
Set your NFT info in  .env.development

- `NFT_ADDRESS`: Address of NFT  
- `NFT_MINT_START`: Token id start mint  
- `NFT_MINT_END`: Token Id end mint

Run script:
```sh
yarn migrate:local-remint-nft
```

##### Transfer FT
```sh
yarn migrate:local-transfer --toaddress 0x... --amount 1
```

### Shibuya using KMS
Config env file
- development: `.env.development`
- staging: `.env.staging`
- production: `.env.production`

#### Set your KMS KEY ID
- `ADMIN_KMS_ID`: AWS KMS key ID

#### Get your KMS wallet address
- development: `yarn dev-kms-wallet-address`
- staging: `yarn stg-kms-wallet-address`
- production: `yarn prod-kms-wallet-address`

#### Send gas fee to your KMS wallet address
Use metamask etc

#### Deploy to shibuya
##### FT first deploy
Set your FT info in .env.development or .env.staging or .env.production

- `FT_NAME`: Name of FT
- `FT_SYMBOL`: Symbol of FT
- `FT_INITIAL_SUPPLY`: Initial supply
- `FT_MAX_SUPPLY`: Max supply

Run script:
- development: `yarn dev-kms-shibuya-ft`
- staging: `yarn stg-kms-shibuya-ft`
- production: `yarn prod-kms-shibuya-ft`

##### FT upgrade deploy
- development: `yarn dev-kms-shibuya-ft-upgrade`
- staging: `yarn stg-kms-shibuya-ft-upgrade`
- production: `yarn prod-kms-shibuya-ft-upgrade`

##### NFT deploy
Deploy and mint 100 token.

Set your NFT info in  .env.development or .env.staging or .env.production
- `NFT_BASE_URI`: BaseURI of NFT  
- `NFT_NAME`: Name of NFT  
- `NFT_SYMBOL`: Symbol of NFT  

Run script:
- development: `yarn dev-kms-shibuya-nft`
- staging: `yarn stg-kms-shibuya-nft`
- production: `yarn prod-kms-shibuya-nft`

##### Remint NFT
Set your NFT info in .env.development or .env.staging or .env.production

- `NFT_ADDRESS`: Address of NFT  
- `NFT_MINT_START`: Token id start mint  
- `NFT_MINT_END`: Token Id end mint

Run script:
- development: `yarn dev-kms-shibuya-remint-nft`
- staging: `yarn stg-kms-shibuya-remint-nft`
- production: `yarn prod-kms-shibuya-remint-nft`

##### Transfer FT 
Set your FT info in  .env.development or .env.staging or .env.production
- `FT_ADDRESS`: Address of FT

Run script:
- development: `yarn dev-kms-shibuya-transfer --toaddress 0x... --amount 1`
- staging: `yarn stg-kms-shibuya-transfer --toaddress 0x... --amount 1`
- production: `yarn prod-kms-shibuya-transfer --toaddress 0x... --amount 1`

## Test
```sh
yarn run start:dev
```

and

```sh
yarn run test
```