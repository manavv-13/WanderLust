const mongoose = require('mongoose');
const Listing = require("../models/listing.js");
const data = require("../init/data.js");

main().then(()=>{
    console.log("connection done!");
}).catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/WanderLust');
}

const inititaliseDb = async ()=>{
await Listing.deleteMany({});
data.data = data.data.map((obj)=>({...obj,owner:"66f25abe1b3d4168543d5110"}));
await Listing.insertMany(data.data);
console.log("Inserted Succesfully");
}
inititaliseDb();