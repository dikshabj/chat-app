import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/socketContext.jsx"; // 1. IMPORT THIS

function ChatItem({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();

  // 2. GET ONLINE USERS FROM SOCKET
  const { onlineUsers } = useSocketContext();

  // 3. CHECK IF THIS SPECIFIC USER IS ONLINE
  const isOnline = onlineUsers.includes(user._id);

  const isSelected = selectedConversation?._id === user._id;

  return (
    <div
      onClick={() => setSelectedConversation(user)}
      className={`flex gap-2 items-center hover:bg-gray-100 rounded p-2 py-1 cursor-pointer duration-300 ${
        isSelected ? "bg-gray-100" : ""
      }`}
    >
      {/* Avatar */}
      {/* 4. USE THE VARIABLE 'isOnline' INSTEAD OF 'true' */}
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className="w-12 rounded-full">
          {/* Tip: Use user.profilePic if available, fallback to the hardcoded link */}
          <img 
            src={user.profilePic || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
          />
        </div>
      </div>

      {/* Name and Email */}
      <div className="flex flex-col flex-1">
        <div className="flex gap-3 justify-between">
          <p className="font-bold text-gray-400">{user.name}</p>
        </div>
        <span className="text-sm text-gray-800">{user.email}</span>
      </div>
    </div>
  );
}

export default ChatItem;