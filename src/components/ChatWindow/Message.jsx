import React from "react";
import { useAuth } from "../../context/AuthProvider";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
    //  Curly braces {} hata kar Square brackets [] lagaye
    const [authUser] = useAuth(); 
    const { selectedConversation } = useConversation();

    // 1. Current User ID Logic
    const currentUserId = authUser?.user?._id || authUser?._id;
    const msgSenderId = message.senderId;

    // Debugging (Ab ye sahi ID print karega)
    // console.log("My ID:", currentUserId, "Sender ID:", msgSenderId);

    // 2. Check if message is from me
    // Dono ko String banakar check kiya taaki galti na ho
    const fromMe = currentUserId && msgSenderId 
        ? currentUserId.toString() === msgSenderId.toString() 
        : false;

    // 3. Styling Logic
    const bubbleBgColor = fromMe ? "bg-pink-200 text-black" : "bg-yellow-200 text-black";
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const formattedTime = extractTime(message.createdAt);

    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-header opacity-50 text-xs flex gap-1 items-center mb-1 text-gray-400">
                {formattedTime}
            </div>
            <div className={`chat-bubble ${bubbleBgColor} rounded-3xl py-3 px-4 shadow-md`}>
                {message.message}
            </div>
        </div>
    );
};

export default Message;

// Helper Functions
function extractTime(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}:${minutes}`;
}
function padZero(number) {
    return number.toString().padStart(2, "0");
}