# API :Login

# Objective.
Processing the login to the system

The login process involves the following steps

1. retrieve the User ID from the UserWallet table using the PublicKey
2. check record exists in the User table using the User ID
3. retrieve unsent NFT/SBT records from the donor table
4. from the donor table, retrieve unsent NFT/SBT records
    1. if there is an unsent NFT/SBT, send NFT/SBT
    2. if the NFT/SBT is successfully sent, update the corresponding record in the donor table to `is_sent = true` 

# API Design

## API Definitions

| Item Name    | Description |
|--------------|-------------|
| API Endpoint | `/v1/login` |
| Method       | POST        |

## Request parameters

| Type   | Item Name  | Description                |
|--------|------------|----------------------------|
| Header | jwt        | ID Token get from Web3Auth |
| Header | public_key | Public Key of login user   |

# Processing Details
## Router

1. Check IdToken, if there is an error, throw 401 error

## Controller

### Check parameter
1. Get Public Key from Request User
2. Get UserWallet record by public key
   If UserWallet record is not found, throw 404 error.

### Call LoginService.login method
parameters:
- user_id : userWallet.user_id

### Create Response
```
{
  "message": {result of login}
}
```

## Service
### LoginService.login method

1. Get the user record from the user table using the UserID
    1. If there is no record, return a 404 `No user account` error
2. Get records from the donor table using the `user_id`
   1. If there is no record, return a 400 `Invalid Donor` error
3. Check records one by one, and if there is a record with `is_sent=false`, do the following processes
    1. Get Contract Address from Token table using `token_name`
    2. Check whether the acquired token has been sent, and if so, update the Donor table as sent
    3. If the token has not been sent, checks whether the token type is NFT or SBT
        1. NFT: The token transfer to the user
        2. SBT: Mint the token and give it to the user
    4. Even if NFT/SBT transmission fails, no error processing is performed because you can log in if user have NFT/SBT
    5. If the NFT/SBT is successfully sent, add a record of the sent NFT/SBTs to UserNFT table
4. Check NFT/SBT transmission results
   1. If all transmissions fail, return 403 `NFT/SBT possession required`
   2. If one or more transmissions succeed, returns 200 `success`

## Model
### DonorModel.getDonors method
1. Scan donor table by user_id
2. return scanned donor records

### DonorModel.updateDonor method
1. Update donor record
- code: donor.verification_code
- owner_user_id: user_id
- is_sent_token: true
- updated_at: System date
- updated_by: user_id

### TokenModel.getToken method
1. Call TokenModel.getToken method
   parameters:
    - token_name: parameter.tokenName
