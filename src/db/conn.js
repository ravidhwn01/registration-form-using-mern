const mongoose = require("mongoose")
 mongoose.connect("mongodb://localhost:27017/registrationForm")
 .then(()=>{
    console.log("connection successful");
 }).catch((e)=>{
    console.log("NO connection! Oops");
 })

 