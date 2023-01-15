import { Button, Center, Heading } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../../store/SocketContext";
import { useNavigate, useParams } from "react-router-dom";
import { UsersContext } from "../../store/UserContext";
import { ChatsContext } from "../../store/ChatContext";
import {  useToastMsg } from "../../cmps/UI/Toast/useToastMsg";
import { Chat } from "../../models/Chat";
import { toastContent } from "../../cmps/UI/Toast/toastContent";

export const Invite = () => {
  const [room, setRoom] = useState<Chat | any>(null)
    const socket = useContext(WebsocketContext);
    const { addUserRoom, user, setUser, setShowHeader } = useContext(UsersContext)
    const {getRoomById, saveChatRoom} = useContext(ChatsContext)
    const { roomId } = useParams();
    const toastErr = useToastMsg(toastContent.error)
    const navigate = useNavigate()
  


  useEffect(() => {
    console.log('Initial use effect!')
    const loadRoom = async () => {
      if (!roomId) return toastErr.showToast()
      console.log(roomId, ' roomId FROM INVITE.TS 24')
      const roomToJoin = await getRoomById(roomId)
      console.log(roomToJoin, ' roomToJoin FROM INVITE.TS 24')
      setRoom(roomToJoin)
    }
    
    
    console.log('end use effect!')
    loadRoom()
    // return () => {}
  }, [])

  const joinUserChat = async () => {
    try { 
      if (!roomId) return toastErr.showToast()

      // addUserRoom(room)
      saveChatRoom(room)

      const updatedUser = Object.assign({}, user(), { room: room?.room });
      console.log('updatedUser FRON JOINFUNCTION => ', updatedUser);
      
      setUser(updatedUser)
      
      socket.emit('join_room', updatedUser)
      setShowHeader(false)
      navigate(`/chat/${roomId}`)

    } catch (err) {
      console.log(err)
      }

    }

  return (
    <div className="main-layout" style={{marginTop:'100px', textAlign:'center'}}>
    <Heading>Join to <span style={{color:'darkblue'}}>{room?.room ? room.room : 'Loading...'}</span> </Heading>
    <Center h='100px' >
        <Button colorScheme='whatsapp' size="lg" onClick={joinUserChat} >Join Chat</Button>
    </Center>
    </div>
  )
}