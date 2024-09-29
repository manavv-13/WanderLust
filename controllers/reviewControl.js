const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");

module.exports.createReview = wrapAsync(async (req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newRev = new Review(req.body.review);
    newRev.author = res.locals.currUser._id;
    listing.review.push(newRev);
    await newRev.save();
    await listing.save();
    req.flash("success","New Review Added");
    res.redirect(`/listings/${id}`);
});

module.exports.destroyReview = wrapAsync(async (req,res,next)=>{
    let {id,reviewId}=req.params;
    let review = await Review.findById(reviewId);
    await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted Successfully");
    res.redirect(`/listings/${id}`);
});

