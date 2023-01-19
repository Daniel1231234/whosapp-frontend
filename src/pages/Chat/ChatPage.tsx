import { Socket } from 'socket.io-client';
import { Messages } from './Messages';
import { RoomAndUsers } from './RoomAndUsers';
import { SendMessage } from './SendMessage';
import { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from '../../store/SocketContext';
import './Chat.css'
import { AuthContext } from '../../store/AuthContext';



export const ChatPage = () => {
  const { setShowHeader } = useContext(AuthContext)
  const socket = useContext(WebsocketContext);


  useEffect(() => {
    setShowHeader(false)
  }, [])



  return (
    <div className='chatContainer'>
      <RoomAndUsers
        socket={socket} 
         />
      <div className='messagesContainer'>
        <Messages  socket={socket} />
        <SendMessage
          socket={socket} />
      </div>
    </div>
  )
}
