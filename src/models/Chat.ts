import { MessageModel } from "./Message"
import { User } from "./User"

export type Chat = {
    _id?: any
    room: string
    messages: MessageModel[]
    users: User[]
    createdByUserId?: string
}