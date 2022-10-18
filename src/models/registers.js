const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
  
   email:{
        type:String,
        required:true,
        unique:true
    },
   passward:{
        type:String,
        required:true
    },
   confirmpassward:{
        type:String,
        required:true
    },
})
//  lets create collections
const Register = new mongoose.model("Register",employeeSchema)
module.exports = Register;