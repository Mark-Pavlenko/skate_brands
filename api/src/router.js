const express = require("express");
const router = express.Router();
const user = require("./controllers/user");
const wallet = require("./controllers/wallet");
const csrf = require("./controllers/csrf");
const donor = require("./controllers/donor");
const login = require("./controllers/login");

const { validator } = require("./middlewares/validator");
const { verifyCSRFToken } = require("./middlewares/verify_csrf_token");
const {
  verifyIdToken,
} = require("./middlewares/verify_idtoken");
const { grantAccess } = require("./middlewares/grant_access");
const { Action, Resource } = require("./util/constant");
const validates = require("./validates/validates");

// User
router.get(
  "/user/:user_id",
  verifyIdToken,
  user.getUserByKey
);
router.post(
  "/user",
  validator(validates.createUser),
  verifyIdToken,
  user.createUser
);

//Donor
router.put(
  "/verification-code/verify",
  validator(validates.verifyCode),
  donor.verifyCode
);

// Wallet
router.get(
  "/wallet/:wallet_address/user_id",
  verifyIdToken,
  grantAccess(Action.readAny, Resource.Wallet),
  wallet.getUserIdByWalletAddress
);
router.get(
  "/wallet/:wallet_address/nft",
  verifyIdToken,
  grantAccess(Action.readAny, Resource.Wallet),
  wallet.getAllNFTs
);

// User Action
router.post(
  "/user-action",
  validator(validates.userAction),
  verifyIdToken,
  verifyCSRFToken,
  grantAccess(Action.createOwn, Resource.UserAction),
  // userAction.addUserAction
);

// CSRF
router.get(
  "/csrf",
  verifyIdToken,
  grantAccess(Action.readAny, Resource.CSRF),
  csrf.refreshCsrfToken
);

// Login
router.post(
    "/login",
    verifyIdToken,
    login.login
);

module.exports = router;
