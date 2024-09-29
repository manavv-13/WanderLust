const express = require('express');
const router = express.Router();
const {validateListing,isLoggedIn,authorizeUser} = require("../middleware.js");
const { renderNewForm, allListings, showInfo, renderEditForm, updateListing,createListing ,destroyListing} = require('../controllers/listingControl.js');
const multer  = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({storage});


router.route("/")
.get(allListings)
.post(isLoggedIn,upload.single('listing[image]'),validateListing, createListing);

router.get("/new",isLoggedIn,renderNewForm);

router.route("/:id")
.get(showInfo)
.patch(isLoggedIn,authorizeUser,upload.single('listing[image]'),validateListing, updateListing)
.delete(isLoggedIn,authorizeUser, destroyListing);


router.get("/:id/edit",isLoggedIn, renderEditForm);

module.exports = router;