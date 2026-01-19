import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [authUser] = useAuth();

    useEffect(() => {
        // Log to see what authUser looks like (Open Console F12)
        console.log("Socket Context - authUser:", authUser);

        if (authUser) {
            // SAFETY CHECK: Handle both structures
            // Case A: authUser = { user: { _id: "..." }, token: "..." }
            // Case B: authUser = { _id: "...", name: "..." }
            const userId = authUser.user?._id || authUser._id;

            if (!userId) {
                console.log("User ID not found in authUser, cannot connect socket.");
                return;
            }

            const newSocket = io("http://localhost:5000", {
                query: {
                    userId: userId,
                },
            });

            setSocket(newSocket);
            console.log("Socket connected for User:", userId);

            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
                console.log("Online Users updated:", users);
            });

            return () => newSocket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};