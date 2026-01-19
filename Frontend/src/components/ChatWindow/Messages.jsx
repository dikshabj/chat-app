import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../context/useGetMessages";
import Loading from "../Shared/Loading";
import useConversation from "../../zustand/useConversation";
import useListenMessages from "../../context/useListenMessages"; // Import

function Messages() {
  const { messages, loading } = useGetMessages();
  const { selectedConversation } = useConversation();
  const lastMessageRef = useRef();
  useListenMessages();

  // Scroll to bottom whenever new message comes
  useEffect(() => {
    setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    // ✅ FIX: 'flex-1' aur 'overflow-auto' ka use karein.
    // Isse ye bich ki jagah lega aur scroll karega, lekin input ko niche nahi dhakelega.
    <div className="flex-1 overflow-y-auto px-4 py-2">
      
      {loading && <Loading />}

      {!loading && messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center">
             <p className="text-4xl">👋</p>
             <p className="text-gray-400 mt-2">Say Hi to {selectedConversation?.name}!</p>
        </div>
      )}

      {!loading && messages.length > 0 && messages.map((msg) => (
        <div key={msg._id} ref={lastMessageRef}>
            <Message message={msg} />
        </div>
      ))}
      
    </div>
  );
}

export default Messages;