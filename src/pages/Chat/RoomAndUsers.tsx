import './Chat.css'
import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Socket } from "socket.io-client"
import { CopyLink } from "../../cmps/UI/CopyLink"
import { User } from "../../models/User"
import { ChatsContext } from "../../store/ChatContext"
import { UsersContext } from "../../store/UserContext"
import { Button, ButtonGroup, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { Chat } from "../../models/Chat"
import { AuthContext } from "../../store/AuthContext"
import { UserList } from "./UserList"
import { InviteModal } from './InviteModal'

type Props = {
  socket: Socket<any>
}

export const RoomAndUsers = (props: Props) => {
  const [roomUsers, setRoomUsers] = useState<User[] | []>([])
  const navigate = useNavigate()
  const { loggedinUser, setShowHeader } = useContext(AuthContext)
  const {  handleJoinRoom } = useContext(UsersContext)
  const { currRoom, saveChatRoom } = useContext(ChatsContext)
  const cuurentRoomChat = currRoom()
  const { isOpen, onOpen, onClose } = useDisclosure()

      useEffect(() => {
        if (!props.socket) return
            props.socket.on('chatroom_users', (data:any) => {
            console.log("chatroom_users  from socket => ", data)
            setRoomUsers(data)
        })

        return () => {
            props.socket.off('chatroom_users')
        }
      }, [props.socket, roomUsers])
  


  const leaveRoom =  () => {
    const room = currRoom()
    const leavingUser = handleJoinRoom("")
    props.socket.emit('leave_room', leavingUser)  
    
    const updatedChatWithUsers = removeUserFromChat(loggedinUser(), room)
    console.log(updatedChatWithUsers, ' updatedChatWithUsers')
    saveChatRoom(updatedChatWithUsers)

   setShowHeader(true)
    navigate('/home')
  }

  
  return (
    <div className="roomAndUsersColumn">
      <h2 style={{ fontFamily: 'Edu QLD Beginner, cursive', fontSize:'3rem', textAlign:'center'}} className="roomTitle">{loggedinUser() ? loggedinUser().room : 'WhosApp'}</h2>
      
      <UserList roomUsers={roomUsers}  />

      <Divider className="divider" />

      <ButtonGroup className="btns-chat">
        <Button colorScheme='red' onClick={leaveRoom} >Back</Button>
        {cuurentRoomChat?.room === 'Public room' ? "" : <Button colorScheme='whatsapp' onClick={() => onOpen()} >Invite</Button> }
      </ButtonGroup>
      <InviteModal onClose={onClose} isOpen={isOpen} currRoom={cuurentRoomChat} />
    </div>
  )
}


function removeUserFromChat(user: User, room: any): Chat {
    const updatedUsers = room.users.filter((u:User) => u._id !== user._id);
    return { ...room, users: updatedUsers };
}