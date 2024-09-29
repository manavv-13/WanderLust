const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");

module.exports.getSignInPage = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.registerUser = wrapAsync(async (req,res,next)=>{
    try{
        let {email,username,password}= req.body;
        let newUser = new User({email,username});
        let registeredUser = await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err) return next(err);
            req.flash("success","User Registered Succesfully");
            res.redirect("/listings");
        })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signin");
    }

});

module.exports.getLoginPage = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.loginUser = (req,res)=>{
    let{username} = req.body;
    req.flash("success",`Welcome back ${username}`);
    res.redirect(res.locals.redirectUrl);
};

module.exports.logOut = (req,res,next)=>{
    req.logout((err)=>{
        if(err) return next(err);
    })
    res.redirect("/listings");
};