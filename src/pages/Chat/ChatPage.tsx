import { Socket } from 'socket.io-client';
import { Messages } from './Messages';
import { RoomAndUsers } from './RoomAndUsers';
import { SendMessage } from './SendMessage';
import { useContext, useEffect, useState } from 'react';
import { UsersContext } from '../../store/UserContext';
import { WebsocketContext } from '../../store/SocketContext';
import './Chat.css'



export const ChatPage = () => {
  const { setShowHeader } = useContext(UsersContext)
  const socket = useContext(WebsocketContext);


  useEffect(() => {
    setShowHeader(false)
  }, [])

  useEffect(() => {}, [])

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
