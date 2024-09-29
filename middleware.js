const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");

module.exports.validateListing = (req,res,next)=>{
    const {error} = listingSchema.validate(req.body);
    if(error){
        next(new ExpressError(400,error));
    }
    else{
        next();
    }
};

module.exports.validateReview = (req,res,next)=>{
    const {error} = reviewSchema.validate(req.body);
    if(error){
        next(new ExpressError(400,error));
    }
    else{
        next();
    }
}

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
    req.session.redirectUrl = req.originalUrl;
    req.flash("error","You must be logged in!");
    return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
}
    else{
    res.locals.redirectUrl = "/listings";
}
    next();
}

module.exports.authorizeUser = async (req,res,next)=>{
    let {id} = req.params;
    let listing  = await Listing.findById(id);
    if(!(res.locals.currUser._id.equals(listing.owner))){
        req.flash("error","Access Denied!")
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.authorizeAuthor = async (req,res,next)=>{
    let {id,reviewId}=req.params;
    let review = await Review.findById(reviewId);
    if(!(res.locals.currUser._id.equals(review.author._id))){
        req.flash("error","Access Denied!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}