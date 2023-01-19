import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

const socketIoServerUrl = import.meta.env.MODE === 'development' ? 'http://localhost:3001/chat' : 'https://whosapp.onrender.com/chat'

export const socket = io(socketIoServerUrl);
export const WebsocketContext = createContext<Socket>(socket);
export const WebsocketProvider = WebsocketContext.Provider;




