import { create } from "zustand";

const useConversation = create((set) => ({
  // 1. State to store the user we are chatting with
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

  // 2. State to store the messages of the current chat
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;