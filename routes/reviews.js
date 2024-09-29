const express = require('express');
const router = express.Router({mergeParams:true});
const {validateReview,isLoggedIn,authorizeUser, authorizeAuthor} = require("../middleware.js");
const { createReview, destroyReview } = require('../controllers/reviewControl.js');


router.post("/",isLoggedIn,validateReview,createReview);

router.delete("/:reviewId",isLoggedIn,authorizeAuthor,destroyReview);

module.exports = router;