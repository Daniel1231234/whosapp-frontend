import { MessageModel } from "./Message"
import { User } from "./User"

export type Chat = {
    _id?: string
    room: string
    messages: MessageModel[]
    users: User[]
    createdByUserId?: string
}