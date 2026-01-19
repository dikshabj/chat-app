import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        // 1. LocalStorage se token nikalo
        const storedUser = JSON.parse(localStorage.getItem("ChatAppUser"));
        const token = storedUser?.token;

        if (!token) {
            console.log("No token found");
            setLoading(false);
            return;
        }

        // 2. Request mein Header lagao
        const res = await axios.get(
          `http://localhost:5000/message/get/${selectedConversation._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // <-- YE LINE MISSING THI
            },
          }
        );

        const data = res.data;
        if (data.error) throw new Error(data.error);
        
        setMessages(data);
      } catch (error) {
        console.log("Error in useGetMessages:", error);
        // Agar error aaye to user ko batayein ya chup rahein
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
    
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;