import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/socketContext.jsx";

function ChatHeader() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  if (!selectedConversation) return null;

  const isOnline = onlineUsers.includes(selectedConversation._id);

  return (
    // ✅ FIX: 'w-full' add kiya taaki ye pura width le.
    // 'sticky top-0 z-10' bhi add kar sakte ho agar scroll karte waqt header chipka rehna chahiye.
    <div className="w-full flex items-center gap-4 bg-slate-800 px-4 md:px-6 py-3 border-b border-slate-700 shadow-md">
      
      {/* Avatar Container */}
      <div className="relative"> 
        <div className="w-10 h-10 rounded-full overflow-hidden ring ring-slate-600 ring-offset-base-100 ring-offset-2">
          <img 
            src={selectedConversation.profilePic || `https://ui-avatars.com/api/?name=${selectedConversation.name}&background=random`} 
            alt="user avatar" 
            className="w-full h-full object-cover"
          />
        </div>

        {isOnline && (
           <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full"></span>
        )}
      </div>

      {/* Name & Status */}
      <div className="flex flex-col flex-1"> {/* 'flex-1' text ko failne ki jagah dega */}
        <h3 className="font-semibold text-gray-100 text-lg tracking-wide capitalize truncate">
            {selectedConversation.name}
        </h3>
        
        <span className={`text-xs font-medium ${isOnline ? "text-green-400" : "text-gray-400"}`}>
            {isOnline ? "Online" : "Offline"} 
        </span>
      </div>
    </div>
  );
}

export default ChatHeader;