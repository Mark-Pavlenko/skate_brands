const Role = {
  Admin: 'Admin',
  Member: 'Member',
  LoginUser: 'LoginUser',
  Guest: 'Guest'
}

const Resource = {
  DAO: 'DAO',
  User: 'User',
  Post: 'Post',
  Comment: 'Comment',
  Vote: 'Vote',
  Report: 'Report',
  Notification: 'Notification',
  Ranking: 'Ranking',
  Token: 'Token',
  Wallet: 'Wallet',
  Theme: 'Theme',
  File: 'File',
  UserAction: 'UserAction',
  CSRF: 'Csrf',
};

const Action = {
  readAny: 'readAny',
  updateAny: 'updateAny',
  createAny: 'createAny',
  deleteAny: 'deleteAny',
  readOwn: 'readOwn',
  updateOwn: 'updateOwn',
  createOwn: 'createOwn',
  deleteOwn: 'deleteOwn'
}

const ActionName = {
  login: 'login'
}

module.exports = {
  Role,
  Resource,
  Action,
  ActionName,
}