import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader"; // Ensure import is correct
import useConversation from "../../zustand/useConversation";
import { useAuth } from "../../context/AuthProvider";

const ChatContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    useEffect(() => {
        // Cleanup function (unmount hone par selection hata do)
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
        // ✅ FIX: 'md:min-w-[450px]' HATA DIYA hai.
        // 'w-full h-full' lagaya taaki ye parent ki puri jagah le le.
        <div className='w-full h-full flex flex-col'> 
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    <ChatHeader />
                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    );
};

export default ChatContainer;

// ✅ NO CHAT COMPONENT (Isme bhi w-full h-full zaruri hai)
const NoChatSelected = () => {
    const { authUser } = useAuth(); // Display User Name
    return (
        <div className='flex items-center justify-center w-full h-full bg-slate-900'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 {authUser?.name} ❄</p>
                <p>Select a chat to start messaging</p>
            </div>
        </div>
    );
};