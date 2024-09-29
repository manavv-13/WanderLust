const express = require('express');
const router = express.Router();
const passport = require('passport');
const {saveRedirectUrl} = require('../middleware.js');
const { getSignInPage, registerUser, getLoginPage, logOut, loginUser } = require('../controllers/userControl.js');

router.route("/signin")
.get(getSignInPage)
.post(registerUser);

router.route("/login")
.get(getLoginPage)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),loginUser);

router.get("/logout",logOut);


module.exports = router;