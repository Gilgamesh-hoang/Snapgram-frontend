import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import io, {Socket} from 'socket.io-client'
import {getAccessToken} from "@/services/token.ts";
import {useUserContext} from "@/context/AuthContext.tsx";


const INITIAL_STATE = {
    socket: null as Socket | null,
};

type IContextType = {
    socket: Socket | null;
};

const SocketContext = createContext<IContextType>(INITIAL_STATE);

export function SocketProvider({children}: { children: ReactNode }) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const {isAuthenticated} = useUserContext();

    useEffect(() => {
        if (isAuthenticated) {
            const url = import.meta.env.VITE_REACT_APP_SOCKET_SERVER_URL;
            const socketConnection = io(url, {
                query: {
                    token: `Bearer ${getAccessToken()}`,
                },

                transports: ['websocket'],
            })
            setSocket(socketConnection);


            socketConnection.on('connect', () => {
                console.log('Connected to socket server');
            });

            socketConnection.on('disconnect', () => {
                console.log('Disconnected from socket server');
            });

            return () => {
                console.log("Disconnecting socket")
                socketConnection.disconnect();
                socket?.disconnect();
                setSocket(null);
            }
        }else {
            console.log("Disconnecting socket2")
            socket?.disconnect();
            setSocket(null);
        }
    }, [isAuthenticated]);

    const value = {
        socket,
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocketContext = () => useContext(SocketContext);