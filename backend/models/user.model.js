import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
    },
    password : {
        type : String,
        required : true
    },
    confirmPassword :{
         type : String,
         
    },
    profilePic : {
        type : String,
        default : "", //by default it will be empty
    }
   

}, {timestamps : true});

const User = mongoose.model("User", userSchema);
export default User;