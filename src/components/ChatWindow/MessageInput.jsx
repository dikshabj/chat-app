import React, { useState } from "react";
import axios from "axios";
import useConversation from "../../zustand/useConversation";

function MessageInput() {
  const [message, setMessage] = useState("");
  const { messages, setMessages, selectedConversation } = useConversation();

  // 1. Ye Actual API Call Function hai
  const sendMessage = async (msg) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("ChatAppUser"));
      const token = storedUser?.token;

      const res = await axios.post(
        `http://localhost:5000/message/send/${selectedConversation._id}`,
        { message: msg },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ UI Update: Naya message list mein add karo
      setMessages([...messages, res.data]);

    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  // 2. Ye Form Submit Handler hai (Jo missing tha)
  const handleSendMessage = async (e) => {
    e.preventDefault(); // Page refresh hone se rokega
    
    if (!message) return; // Khali message mat bhejo
    
    await sendMessage(message); // API call karo
    setMessage(""); // Input box khali kar do
  };

  return (
    // ✅ Ab yahan 'handleSendMessage' exist karta hai
    <form className="px-4 py-3 bg-slate-800" onSubmit={handleSendMessage}>
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Type a message..."
          className="border-none text-sm rounded-full block w-full p-3 pl-5 bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="absolute inset-y-0 right-3 flex items-center pr-2 text-blue-400 hover:text-blue-200 transition-colors">
           {/* SVG Icon */}
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <line x1="22" y1="2" x2="11" y2="13"></line>
             <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
           </svg>
        </button>
      </div>
    </form>
  );
}

export default MessageInput;