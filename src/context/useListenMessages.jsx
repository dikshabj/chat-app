import { useEffect } from "react";
import { useSocketContext } from "./socketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
            // Sound effect (Optional)
            // const sound = new Audio(notificationSound);
            // sound.play();
			setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};

export default useListenMessages;