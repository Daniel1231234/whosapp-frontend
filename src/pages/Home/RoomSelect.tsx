import { Button, FormControl, Select, useDisclosure } from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Socket } from "socket.io-client"
import CustomModal from "../../cmps/UI/CustomModal"
import { useToastMsg } from "../../cmps/UI/Toast/useToastMsg"
import { Chat } from "../../models/Chat"
import { AuthContext } from "../../store/AuthContext"
import { ChatsContext } from "../../store/ChatContext"
import { UsersContext } from "../../store/UserContext"
import './Home.css'

type Props = {
    socket: Socket<any>
}
export const RoomSelect =  (props: Props) => {
    const [roomId, setRoomId] = useState<string>("")
    const [roomName, setRoomName] = useState<string>("")
    const navigate = useNavigate()
    const {deleteUserRoom, handleJoinRoom}  = useContext(UsersContext)
    const {setShowHeader, loggedinUser} = useContext(AuthContext)
    const deleteToastSuccess = useToastMsg({title: 'Your Chatroom has deleted successfully', status:'success'})
    const deleteToastErr = useToastMsg({title: 'Can not removing the chat', status:'error'})
    const { isOpen, onOpen, onClose } = useDisclosure()
    const chatCtx = useContext(ChatsContext)
    const notValidRoomToast = useToastMsg({title: 'Error!', description:'Please select a room', status:'error'})
    
    
    const handleChangeRoom = (e:any) => {
        console.log(e.target.value)
        setRoomId(e.target.value)
        const chosenChat = loggedinUser().chatRooms.find((r: Chat) => r._id === e.target.value)
        if (chosenChat) setRoomName(chosenChat.room)
    }
    
    const deleteChatRoom = async (e: any) => {        
        e.preventDefault()
        onClose()
        try {
            if (roomId === '') return notValidRoomToast.showToast()
            await chatCtx.deleteRoom(roomId)
            await deleteUserRoom(roomId)
            deleteToastSuccess.showToast()
        } catch (err) {
            console.log(err)
            deleteToastErr.showToast()
        }
    }


    const onGoToChat =  (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (roomId === '') return notValidRoomToast.showToast()        
            const chosenChat = loggedinUser().chatRooms.find((r: Chat) => r._id === roomId);
            const updatedUser =  handleJoinRoom(chosenChat.room)                
            if (!chosenChat || !updatedUser) return console.log(chosenChat, updatedUser, ' not exist')
            const updatedChat = Object.assign({}, chosenChat, { users: [...chosenChat.users, updatedUser] })
            chatCtx.saveChatRoom(updatedChat)
            
            props.socket.emit('join_room', updatedUser);
            
            
            setShowHeader(false);
            navigate(`/chat/${roomId}`);
        } catch (err) {
            console.log(err)
        }    
    }


    const modalContent = {
        title: "Delete Room Confirmation",
        body: "Are you sure you want to delete this room? This action cannot be undone."
    }
        
    return (
        <>
            <FormControl  style={{display:'flex', flexDirection:'column', gap:16, width:'100%'}}>
                <Select
                    size='lg'
                    variant='outline'
                    color="inherit"
                    onChange={handleChangeRoom}>
                  <option className="room-options" value="">Choose ChatRoom</option>
                  {loggedinUser() && loggedinUser().chatRooms?.map((room:Chat) => (
                      <option className="room-options" key={room._id} value={room._id}>
                          {room.room}
                      </option>
                  ))}
                </Select>
                <Button onClick={onGoToChat}  size="lg" colorScheme='whatsapp'>Join</Button>
            <Button onClick={() => roomName === "Public room" ? deleteToastErr.showToast() : onOpen()} size="lg" marginBottom=".5rem"
                 colorScheme='orange'>Delete room</Button>
            </FormControl>
            <CustomModal 
                modalIsOpen={isOpen} 
                closeModal={onClose} 
                title={modalContent.title}
                body={modalContent.body} 
                onAction={deleteChatRoom}
                actionBtnTitle={"Delete"}
            />
        </>
    )
  
}




