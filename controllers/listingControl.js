const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.allListings = wrapAsync(async (req, res, next) => {
  let listings = await Listing.find({});
  res.render("listings/index.ejs", { listings });
});

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showInfo = wrapAsync(async (req, res, next) => {
  let { id } = req.params;
  let data = await Listing.findById(id)
    .populate({ path: "review", populate: { path: "author" } })
    .populate("owner");
  if (data) {
    res.render("listings/info.ejs", { data });
  } else {
    req.flash("error", "Invalid Request");
    res.redirect("/listings");
  }
});

module.exports.createListing = wrapAsync(async (req, res, next) => {
  let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
  })
    .send();
  let newListing = new Listing(req.body.listing);
  const url = req.file.path;
  const filename = req.file.filename;
  newListing.owner = req.user._id;
  newListing.image = {url,filename};
  newListing.geometry = response.body.features[0].geometry;
  await newListing.save();
  req.flash("success", "New Listing Added");
  res.redirect("/listings");
});

module.exports.renderEditForm = wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let data = await Listing.findById(id);
    if(!data){
        req.flash("error","Invalid Request");
        res.redirect(`/listings/${id}`);
    }
    res.render("listings/edit.ejs",{data});
});

module.exports.updateListing =wrapAsync(async (req,res,next)=>{
    let {id} = req.params;
    let editedListing = await Listing.findByIdAndUpdate(id,req.body.listing);
    if(req.file){
      const url = req.file.path;
      const filename = req.file.filename;
      editedListing.image = {url,filename};
      await editedListing.save();
    }
    req.flash("success","Listing Edited Successfully");
    res.redirect(`/listings/${id}`);
});

module.exports.destroyListing =wrapAsync(async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted Successfully");
    res.redirect("/listings");
});

