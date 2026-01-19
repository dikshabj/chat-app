

import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthProvider"; // Ensure this path is correct
import io from "socket.io-client";

const SocketContext = createContext();

// 1. Fixed Name: useSocketContext (CamelCase)
export const useSocketContext = () => {
    return useContext(SocketContext);
};

// 2. Fixed Name: SocketContextProvider (Capital 'S' is mandatory for Components)
export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [authUser] = useAuth();

    useEffect(() => {
        if (authUser) {
            const userId = authUser.user?._id || authUser._id;

            if (userId) {
                // Adjust URL based on environment (Vite env variable or localhost)
                const socketUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
                
                const newSocket = io(socketUrl, {
                    query: { userId: userId },
                });

                setSocket(newSocket);

                newSocket.on("getOnlineUsers", (users) => {
                    setOnlineUsers(users);
                });

                return () => newSocket.close();
            }
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