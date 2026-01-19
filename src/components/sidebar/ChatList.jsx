import React from "react";
import ChatItem from "./ChatItem";
import getAllUsers from "../../context/getAllUsers";

function ChatList() {
  const [allUsers, loading] = getAllUsers();

  return (
    <div className="mt-2 flex-1 overflow-y-auto" style={{ maxHeight: "80vh" }}>
      
      {loading ? (
        <div className="flex justify-center mt-10">
           <span className="loading loading-spinner text-warning"></span>
        </div>
      ) : (
        allUsers && allUsers.length > 0 ? (
            allUsers.map((user) => (
            <ChatItem
                key={user._id}
                user={user}
                // No need to pass onClick here anymore!
            />
            ))
        ) : (
            <div className="text-center text-gray-500 mt-5">No users found</div>
        )
      )}
      
    </div>
  );
}

export default ChatList;