# RE:NFT API
## Prerequisites
- Git 2.xx.xx
- Node.js (latest LTS version) 16.xx.xx
- Yarn 1.22.xx
- [DynamoDB Local](https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/DynamoDBLocal.html) (for localhost develop)

# Setup
## Copy environment variable file

Copy the files that define environment variables for the target environment.

- Development environment : `.env.development`
- Staging environment : `.env.staging`
- Production environment : `.env.production`


```
copy (.env.development|.env.staging|.env.production) .env
```

## Install nodemon to automatically restart Node.js applications

```
yarn global add nodemon
```

## Start DynamoDB for localhost
See [../README.md](../README.md)

# Run API server

## Install node_modules files
```
yarn install 
```

## Start API Server
```
yarn start
```

## When specifying environment variable file at server startup (using dotenv-cli)

### Setup

```sh
yarn global add dotenv-cli
```

### Start API Server (When using `.env_sample`)

```sh
dotenv -e .env_sample yarn start
```

### Access
```
http://localhost:8888/
```

### Test
```
yarn test
```
