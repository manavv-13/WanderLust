const mongoose = require('mongoose');
const Review = require("./review.js")
const listSchema = new mongoose.Schema({
    title:{
      type:String,
      required:true  
    },
    description:{
        type:String,
    },
    image: {
        url:String,
        filename:String,
    },
    price:{
        type:Number,
        required:true
    },
    location:{
        type:String
    },
    country:{
        type:String,
    },
    review:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
        }
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    geometry:{
        type:{
            type:String,
            enum:["Point"],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
   }
});

listSchema.post("findOneAndDelete", async(data)=>{
    if(data){
        await Review.deleteMany({_id:{$in:data.review}});
    }
})

const Listing = mongoose.model("Listing",listSchema);
module.exports = Listing;