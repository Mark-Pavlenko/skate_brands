## API RBAC
### Role
- Admin: Users who mange DAO
- Member: Users who have NFT
- LoginUser: Users logged in
- Guest: Users not logged in
  
### Resource
- DAO
- User
- Post
- Comment
- Vote
- Report
- Notification
- Ranking
- Token
- Wallet
- WhiteList
- Theme
- File

### Action
- read:any
- update:any
- create:any
- delete:any
- read:own
- update:own
- create:own
- delete:own

### Permission
- Admin: Can do all actions

- Member
  - DAO: read:any
  - User: read:any,update:own,delete:own
  - Post: read:any,update:own,create:own,delete:own
  - Comment: read:any,update:own,create:own,delete:own
  - Vote: read:any,update:own,create:own,delete:own
  - Report: create:own
  - Notification: read:own,update:own
  - Ranking: read:any
  - Token: read:any
  - Wallet: read:any
  - WhiteList: read:any
  - Theme: read:any
  - File: create:any,read:any
  
- LoginUser
  - User: create:own
    - Post /v1/user
  - File: read:any
  - WhiteList: read:any
  - Token: read:any
    - Post /v1/{token_address}/request
    - Get /v1/token/{token_address}/dao
  - Wallet: read:own
    - Get /v1/wallet/{wallet_address}/user_id
    - Get /v1/wallet/{wallet_address}/nft

- Guest: None.  ※Only can access login page

### Judge user role
Order of determination of roles.
Role identification is checked in following order, then  the appropriate role is returned when it is determined.
 Admin > Member > LoginUser > Guest
 
#### Admin
Judge if Dao.admin_role_id in User.user_role_ids

#### Member
1. Get email from req.user
2. Get user_id from UserWallet by email
3. Get dao_id from params or query or body
4. Get token_address of DAO by dao_id
5. Get token IDs from UserNFT: 
   - user_id = UserWallet.user_id
   - token_address in token_address list of DAO
6. If tokenIds is null, throw 403 error
  
#### LoginUser
Judge if getting user by email is not null

#### Guest
If all of the above do not match
### Set role to req.user
Set role name req.user.role

### Check permission
#### RBAC module
`accesscontrol`

https://github.com/onury/accesscontrol

#### Check permission
1. Define grants at once

2. Create a AccessControl using grants

3. Call AccessControl.can(req.user.role).{action}

4. If permission.granted is false, throw 403 error