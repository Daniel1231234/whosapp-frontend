import { Chat } from "./Chat"

export type User = {
    _id?: string 
    name:string
    password: string 
    email: string 
    lastSeen:string | number | Date
    image: string 
    room: string 
    lastRoom?: string 
    chatRooms?:Chat[] | []
}

