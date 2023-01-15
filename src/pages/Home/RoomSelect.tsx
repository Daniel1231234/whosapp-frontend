import { Button, FormControl, Select } from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Socket } from "socket.io-client"
import { useToastMsg } from "../../cmps/UI/Toast/useToastMsg"
import { Chat } from "../../models/Chat"
import { User } from "../../models/User"
import { ChatsContext } from "../../store/ChatContext"
import { UsersContext } from "../../store/UserContext"
import './Home.css'

type Props = {
    socket: Socket<any>
}
export const RoomSelect =  (props: Props) => {
    const [roomId, setRoomId] = useState<string | any>("")
    const navigate = useNavigate()
    const userCtx = useContext(UsersContext)
    const user = userCtx.user()
    const chatCtx = useContext(ChatsContext)
    const notValidRoomToast = useToastMsg({title: 'Error!', description:'Please select a room', status:'error'})
    
    const deleteToastSuccess = useToastMsg({title: 'Your Chatroom has deleted successfully', status:'success'})
    const deleteToastErr = useToastMsg({title: 'Can not removing the chat', status:'error'})


    const deleteChatRoom = async (e: any) => {        
        e.preventDefault()
        try {
            if (roomId === '') return notValidRoomToast.showToast()
            userCtx.deleteUserRoom(roomId)
            chatCtx.deleteRoom(roomId)
            deleteToastSuccess.showToast()
        } catch (err) {
            console.log(err)
            deleteToastErr.showToast()
        }
    }


    const onGoToChat = (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (roomId === '') return notValidRoomToast.showToast()        
            const chosenChat = user.chatRooms.find((r: Chat) => r._id === roomId);
            if (!chosenChat) return
                chatCtx.saveChatRoom(chosenChat)
    
                const updatedUser = Object.assign({}, user, {  room: chosenChat.room });
                userCtx.setUser(updatedUser)
                
                props.socket.emit('join_room', updatedUser);
                userCtx.setShowHeader(false);
                navigate(`/chat/${roomId}`);
        } catch (err) {
            console.log(err)
        }    
    }


    return (
        <>
            <FormControl  style={{display:'flex', flexDirection:'column', gap:16, width:'100%'}}>
                <Select
                    size='lg'
                    variant='outline'
                    color="inherit"
                    onChange={(e) => setRoomId(e.target.value)}>
                  <option className="room-options" value="">Choose ChatRoom</option>
                  {user && user.chatRooms?.map((room:Chat) => (
                      <option className="room-options" key={room._id} value={room._id}>
                          {room.room}
                      </option>
                  ))}
                </Select>
                <Button onClick={onGoToChat}  size="lg" colorScheme='whatsapp'>Join</Button>
            <Button onClick={deleteChatRoom} size="lg" marginBottom=".5rem"
                 colorScheme='orange'>Delete room</Button>
            </FormControl>
        </>
    )
  
}




