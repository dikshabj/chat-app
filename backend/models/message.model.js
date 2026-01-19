import mongoose from "mongoose";
import User from "./user.model.js";

 const messageSchema =  mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    message : {
        type : String,
        required : true,
        maxLength : 1000,
        trim : true,
        validate: [
            {
                validator : (value) => value.length > 0,
                message : 'Message cannot be empty',

            },
          
        ],
    },
    createdAt : {
        type: Date,
        default : Date.now
    },
 }, {timestamps : true})

 const Message = mongoose.model("Message" , messageSchema);
 export default Message;