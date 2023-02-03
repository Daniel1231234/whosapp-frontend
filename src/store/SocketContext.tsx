import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

const socketIoServerUrl = import.meta.env.MODE === 'development' ? 'http://localhost:3001/' : ''
// let socketIoServerUrl = `${location.protocol}//${location.hostname}:3001/chat`;
// console.log(socketIoServerUrl)

export const socket = io(socketIoServerUrl);
export const WebsocketContext = createContext<Socket>(socket);
export const WebsocketProvider = WebsocketContext.Provider;




