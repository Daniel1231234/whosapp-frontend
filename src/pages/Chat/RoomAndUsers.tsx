import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Socket } from "socket.io-client"
import { User } from "../../models/User"
import { ChatsContext } from "../../store/ChatContext"
import { UsersContext } from "../../store/UserContext"
import { Box, Button, ButtonGroup, useDisclosure } from '@chakra-ui/react'
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
  const { handleLeaveRoom } = useContext(UsersContext)
  const { currRoom, saveChatRoom } = useContext(ChatsContext)
  const cuurentRoomChat = currRoom()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!props.socket) return
    props.socket.on('chatroom_users', (data: any) => {
      console.log("chatroom_users  from socket => ", data)
      if (data) setRoomUsers(data)

    })
    return () => {
      props.socket.off('chatroom_users')
    }
  }, [props.socket, roomUsers])



  const leaveRoom = () => {
    const room = currRoom()
    const leavingUser = handleLeaveRoom()
    props.socket.emit('leave_room', leavingUser, room.room)

    const updatedChatWithUsers = removeUserFromChat(loggedinUser(), room)
    console.log(updatedChatWithUsers, ' updatedChatWithUsers')
    saveChatRoom(updatedChatWithUsers)

    setShowHeader(true)
    navigate('/home')
  }

  return (
    <>
      <Box as="h2" fontSize="1.5rem" style={{
        fontFamily: 'Edu QLD Beginner, cursive',
        textAlign: 'center',
        color: 'whitesmoke'
      }}>{loggedinUser() ? loggedinUser().room : 'WhosApp'}</Box>

      <UserList roomUsers={roomUsers} />

      <ButtonGroup>
        <Button size="sm" colorScheme='red' onClick={leaveRoom} >Back</Button>
        {cuurentRoomChat?.room === 'Public room' ? "" : <Button size="sm" colorScheme='whatsapp' onClick={() => onOpen()} >Invite</Button>}
      </ButtonGroup>
      <InviteModal onClose={onClose} isOpen={isOpen} currRoom={cuurentRoomChat} />
    </>
  )
}


function removeUserFromChat(user: User, room: any): Chat {
  const updatedUsers = room.users.filter((u: User) => u._id !== user._id);
  return { ...room, users: updatedUsers };
}