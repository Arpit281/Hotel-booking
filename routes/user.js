const express = require("express");
const router = express.Router();
const wrapAsync = require("../util/asyncWrap.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/user.js");
const user = require("../models/user.js");

router
  .route("/signup")
  .get(userController.signupForm)
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(userController.userLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

router.get("/logout", userController.logout);

module.exports = router;
