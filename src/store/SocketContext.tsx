import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

const prodUrl = import.meta.env.PROD ?  process.env.RENDER_EXTERNAL_URL : 'nothing in here'

const socketIoServerUrl = import.meta.env.MODE === 'development' ? 'http://localhost:3001/chat' : 'https://whosapp.onrender.com/chat'
// console.log(socketIoServerUrl, '   => socketIoServerUrl');
// console.log(prodUrl, '  =>  prodUrl');

export const socket = io(socketIoServerUrl);
export const WebsocketContext = createContext<Socket>(socket);
export const WebsocketProvider = WebsocketContext.Provider;



// import { createContext } from 'react';
// import { io, Socket } from 'socket.io-client';

// const socketIoServerUrl = import.meta.env.MODE === 'development' ? localUrl : 'https://whosapp.onrender.com/chat'
// console.log(import.meta.env);

// export const socket = io(socketIoServerUrl);
// export const WebsocketContext = createContext<Socket>(socket);
// export const WebsocketProvider = WebsocketContext.Provider;

