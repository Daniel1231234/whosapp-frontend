import axios from "axios";
import { Chat } from "../models/Chat";
import { httpService } from "./httpService";
import { storageService } from "./localStorageService";

  const endpoint = 'chats'
// const BASE_URL = process.env.NODE_ENV !== "development" ? "/api/" : "//localhost:3001/api/"
const BASE_URL = process.env.NODE_ENV !== "development" ? "/api/chats" : "//localhost:3001/api/chats"

async function getById(roomId: string) {
    console.log(roomId, ' FROM CHAT SERVICE')
    const { data } = await axios.get<Chat | null>(`${BASE_URL}/${roomId}`)
    // const room = await httpService.get(endpoint + `/`, {roomId})
    console.log(data, ' room by id')
    return data
}


async function createNewChat  (room: string, createdByUserId: string)  {
    try {
        const newChat = {
            room,
            messages:[],
            users: [],
            createdByUserId
        }
        const res = await httpService.post(endpoint + '/', newChat)
        return res
    } catch (err) {
        console.log(err)
    }
}


async function removeChatFromBack(roomId:string) {
    await httpService.delete(endpoint + "/", {roomId})

}


function saveChatToStorage(chat:Chat) {
    storageService.saveToStorage('chat', chat)
}

 function loadChatFromStorage() {
   return storageService.loadFromStorage('chat')
    
}



const chatService = {
   getById, 
   saveChatToStorage,
   loadChatFromStorage,
   createNewChat,
   removeChatFromBack
};

export default chatService;
