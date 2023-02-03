import React, {   useState } from 'react';
import  {Chat} from '../models/Chat';
import chatService from '../services/chatService';


interface ChatsContextObj {
    createRoom: Function
    deleteRoom: Function
    currRoom: Function
    setCurrRoom: React.Dispatch<React.SetStateAction<Chat | null>>;
    saveChatRoom: Function
    getRoomById: Function
};

export const ChatsContext = React.createContext<ChatsContextObj>({
    createRoom: () => { },
    deleteRoom: () => {},
    currRoom: () => {},
    setCurrRoom: () => {},
    saveChatRoom: () => {},
    getRoomById: () => { },
});



const ChatsContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [currRoom, setCurrRoom] = useState<Chat | null>(null)

    

    const getRoomById = async (roomId: string) => {
        const chat = await chatService.getById(roomId)
        return chat
    }


    const deleteRoom = async (roomId: string) => {
        await chatService.removeChatFromBack(roomId)
    }  


    const createRoom = async (room: string, createdByUserId: string) => {
        try {
            const newChat = await chatService.createNewChat(room, createdByUserId)
            console.log('newChat => ', newChat)
            return newChat
        } catch (err) {
            console.log(err)
        }
    }

    const saveChatRoom = (room: Chat) => {
        setCurrRoom(room)
        chatService.saveChatToStorage(room)
    }

    const getChatRoom  = () =>  {
        return chatService.loadChatFromStorage()
    }




  const contextValue: ChatsContextObj = {
      createRoom,
      deleteRoom,
      currRoom:getChatRoom,
      setCurrRoom,
      saveChatRoom,
      getRoomById,
  };

  return (
    <ChatsContext.Provider value={contextValue}>
      {children}
    </ChatsContext.Provider>
  );
};

export default ChatsContextProvider;