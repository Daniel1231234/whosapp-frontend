import { Button, Center, Heading } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../../store/SocketContext";
import { useNavigate, useParams } from "react-router-dom";
import { UsersContext } from "../../store/UserContext";
import { ChatsContext } from "../../store/ChatContext";
import { useToastMsg } from "../../cmps/UI/Toast/useToastMsg";
import { Chat } from "../../models/Chat";
import { toastContent } from "../../cmps/UI/Toast/toastContent";
import { AuthContext } from "../../store/AuthContext";
import { CustomSpinner } from "../../cmps/UI/CustomSpinner";

export const Invite = () => {
  const [room, setRoom] = useState<Chat | any>(null)
  const socket = useContext(WebsocketContext);
  const { handleJoinRoom } = useContext(UsersContext)
  const { setShowHeader, loggedinUser } = useContext(AuthContext)
  const { getRoomById, saveChatRoom } = useContext(ChatsContext)
  const { roomId } = useParams();
  const toastErr = useToastMsg(toastContent.error)
  const navigate = useNavigate()



  useEffect(() => {
    const loadRoom = async () => {
      if (!roomId) return toastErr.showToast()
      const roomToJoin = await getRoomById(roomId)
      setRoom(roomToJoin)
    }


    loadRoom()
  }, [])

  const joinUserChat = () => {
    try {
      if (!roomId) return toastErr.showToast()
      saveChatRoom(room)
      const updatedUser = handleJoinRoom(room.room)
      socket.emit('join_room', updatedUser)
      setShowHeader(false)
      navigate(`/chat/${roomId}`)
    } catch (err) {
      console.log(err)
    }

  }

  if (!loggedinUser()) return (
    <div className="main-layout">
      <Heading>If you want to join your friend's chat, please login first.</Heading>
      <Button onClick={() => navigate('/login')}>Login</Button>
    </div>
  )

  if (!room && roomId) return <CustomSpinner />
  return (
    <div className="main-layout" style={{ marginTop: '100px', textAlign: 'center' }}>
      <Heading>Join to <span style={{ color: 'darkblue' }}>{room?.room ? room.room : 'Loading...'}</span> </Heading>
      <Center h='100px' >
        <Button colorScheme='whatsapp' size="lg" onClick={joinUserChat} >Join Chat</Button>
      </Center>
    </div>
  )
}