const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
// creating document/schema
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
// here we will use middleware for hashing


employeeSchema.pre("save", async function(next){
    if(this.isModified("passward")){

        
        console.log(`the current passward is ${this.passward}`);
        this.passward= await bcrypt.hash(this.passward,10);
        console.log(`the current passward is ${this.passward}`);
     this.comfirmpassward = undefined; // comfirmpassward ki field store nhi hoga
    }
        next();
})
//  lets create collections
const Register = new mongoose.model("Register",employeeSchema)
module.exports = Register;