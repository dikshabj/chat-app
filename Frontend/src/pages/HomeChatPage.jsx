import React from 'react';
import SidebarContainer from '../components/sidebar/SidebarContainer.jsx';
import ChatContainer from '../components/ChatWindow/ChatContainer.jsx';
import useConversation from '../zustand/useConversation.js';

function HomeChatPage() {
  const { selectedConversation } = useConversation();

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      
      {/* LEFT SIDE: Sidebar */}
      {/* Change: 'md:w-[30%]' hata kar ek fixed width (e.g., 'md:w-[350px]') lagayenge */}
      <div className={`border-r border-slate-700 flex-col transition-all duration-300
          ${selectedConversation ? "hidden md:flex" : "flex w-full"} 
          md:w-[350px] lg:w-[400px]`} 
      >
        <SidebarContainer /> 
      </div>

      {/* RIGHT SIDE: Chat Window */}
      {/* Change: 'md:w-[70%]' hata kar 'flex-1' lagaya.
          'flex-1' ka matlab hai: "Jitni jagah bachi hai, wo sab le lo" */}
      <div className={`bg-slate-900 flex-col transition-all duration-300
          ${selectedConversation ? "flex w-full" : "hidden md:flex"} 
          flex-1`}
      >
        <ChatContainer />
      </div>
      
    </div>
  );
}

export default HomeChatPage;