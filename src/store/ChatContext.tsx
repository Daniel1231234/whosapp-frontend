import axios from 'axios';
import React, {   useState } from 'react';
import  {Chat} from '../models/Chat';
import { MessageModel } from '../models/Message';
import { storageService } from '../services/localStorageService';


type ChatsContextObj = {
    createRoom: (roomName: string, createdByUserId: string) => any
    deleteRoom: (roomId: string) => any
    currRoom: () => any
    setCurrRoom: (chatRoom:Chat | null) => any
    saveChatRoom: (chatRoom:Chat | null) => any
    setRoomMsgs: (roomUsers:MessageModel[] | []) => any
    getRoomById: (roomId:string) => any
};

export const ChatsContext = React.createContext<ChatsContextObj>({
    createRoom: () => { },
    deleteRoom: () => {},
    currRoom: () => {},
    setCurrRoom: () => {},
    saveChatRoom: () => {},
    setRoomMsgs: () => {},
    getRoomById: () => { },
});



const ChatsContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [currRoom, setCurrRoom] = useState<Chat | null>(null)
    const BASE_URL = process.env.NODE_ENV !== "development" ? "/api/chats" : "//localhost:3001/api/chats"

    

    const getRoomById = async (roomId:string) => {
        const { data } = await axios.get<Chat | null>(`${BASE_URL}/${roomId}`)
        if (!data) return
        return data
    }

    const setRoomMsgs = (msgs:MessageModel[] | []) => {
        const room = getChatRoom()
        if (!room || room.length === 0) return
        const updatedRoom = {...room, messages:msgs}
        console.log('updatedRoom => ', updatedRoom)
        saveChatRoom(updatedRoom)
    }

    const deleteRoom = async (roomId: string) => {
        const { data } = await axios.delete(`${BASE_URL}/${roomId}`)
        console.log(data)
    }  


    const createRoom = async (room: string, createdByUserId: string) => {
        try {
            const newChat = {
                room,
                messages:[],
                users: [],
                createdByUserId
            }
            const { data } = await axios.post(BASE_URL + '/', newChat)
            return data
        } catch (err) {
            console.log(err)
        }
    }

    const saveChatRoom = (room: any) => {
        storageService.saveToStorage('chat', room)
    }

    const getChatRoom  = () =>  {
        const room = storageService.loadFromStorage('chat')
        return room
    }




  const contextValue: ChatsContextObj = {
      createRoom,
      deleteRoom,
      currRoom:getChatRoom,
      setCurrRoom,
      saveChatRoom,
      setRoomMsgs,
      getRoomById,
  };

  return (
    <ChatsContext.Provider value={contextValue}>
      {children}
    </ChatsContext.Provider>
  );
};

export default ChatsContextProvider;