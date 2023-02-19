# Social Good

## Config frontend .env
- cd frontend
- Copy .env_sample to .env file
- Change .env setting

## Config api .env
- cd api
- Copy .env_sample to .env file
- Change .env setting
    - `DYNAMODB_LOCAL_URL=http://dynamodb-local:8000`

## Start dynamodbLocal for API development
### Start dynamodb-local and dynamodb-admin
- start
```
docker-compose -f .\docker-compose-dynamolocal.yml up -d
```
- stop
```
docker-compose down
```

## Deploy localhost API for frontend development
### Build docker image for localhost API
- back to `social-good-web3` directory
- build docker image
```
docker-compose build
```

### Start Docker for localhost API
- start
```
docker-compose up -d
```
- stop
```
docker-compose down
```

### View dynamodb data
```
http://localhost:8001/
```

### Access frontend
```
http://localhost:8080/
```

## Deploy development
## Build for development
- back to `social-good-web3` directory
- build docker image
```
docker-compose -f ./docker-compose-prod.yml build
```


## Build staging
## Build for staging
- back to `social-good-web3` directory
- build docker image
```
docker-compose -f ./docker-compose-prod.yml build
```

## Build production
### Config
- API: api/.env
- Frontend: frontend/.env.production
- Batch: batch/.env
### Build for production
- back to `social-good-web3` directory
- build docker image
```
docker-compose -f ./docker-compose-prod.yml build
```
