import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    //console.log("message sent" , req.params.id , req.body.message)
    //ab hmne dekha message sent arha h console me sirf api hit krne se 
    //to basically hume ek msg id or message chahiye , id mongo dega or message user (sender/receiver)
    //req.params.id krne ke bd hmne jo id pass kri vo agyi console.log se

    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id; //current logged in user

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        // UPDATE: Message creation ko IF block ke BAHAR kiya hai.
        // Taki agar conversation pehle se bani ho, tab bhi message create ho sake.
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            //await newMessage.save();
            conversation.messages.push(newMessage._id);
            //await conversation.save();
        }

        //hmne yaha promises ka use kiya taki code paralelly run kre
        //commented code se , code line by line run kr rha tha
        await Promise.all([conversation.save(), newMessage.save()]);

        // ---  SOCKET IO LOGIC ADDED HERE ---
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            // Send to this specific user only
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        // -

    //  UPDATE: Response bhejna zaroori hai taaki loading hte
        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error in sending message: " + error);
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getMessage = async(req, res)=>{
    try {
        const {id : chatUser} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants : { $all : [senderId , chatUser]}
        }).populate("messages")

        if(!conversation){

            return res.status(201).json([]);
        }

        const messages = conversation.messages;
        res.status(200).json(messages);
        
    } catch (error) {
        console.log("Message getting error:" +error)
        res.status(500).json({message : "Internal server error"})
    }
}