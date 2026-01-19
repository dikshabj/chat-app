import React from 'react';
import SearchBar from './SearchBar';
import ChatList from './ChatList';
import Logout from '../logout'; // <--- 1. Import (Path adjust kar lena)

function SidebarContainer({ onSelectChat }) {
  return (
    <div className="flex flex-col h-full bg-black text-white"> {/* bg-black ensure kar lein */}
      
      {/* Header */}
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Chats</h1>
        <SearchBar />
      </div>
      
      {/* Scrollable List */}
      {/* flex-1 ka matlab ye bachi hui saari jagah le lega */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <ChatList onSelectChat={onSelectChat} />
      </div>

      {/* Logout Button (Bottom Area) */}
      <div className="p-4 mt-auto"> {/* <--- 2. Add Logout Here */}
        <Logout />
      </div>
      
    </div>
  );
}

export default SidebarContainer;