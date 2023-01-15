import {  useContext, useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import { MessageModel } from '../../models/Message'
import './Chat.css'
import { UsersContext } from '../../store/UserContext'
import { Message } from './Message'
import { TypingIndicator } from './TypingIndicator '
import { useTypingIndicator } from '../../services/useTypingIndicator'


type Props = {
  socket: Socket<any>
}

export const Messages = (props: Props) => {
  const { currentTypingUser } = useTypingIndicator(props.socket);
  const [msgRecived, setMsgRecived] = useState<MessageModel[] | any>([])
  const messagesColumnRef = useRef<HTMLDivElement>(null);
  const userCtx = useContext(UsersContext)
  const user = userCtx.user()


  useEffect(() => {
    if (!props.socket) return
    props.socket.on('last_msgs', (data: any) => {
      console.log(data)
       setMsgRecived((state: MessageModel[] | any) => [...state, ...data])
    })

    return () => {props.socket.off('last_msgs')}
  }, [props.socket])


  
  useEffect(() => {    
    if (!props.socket) return
    props.socket.on('receive_message', (data: MessageModel | null) => {
      if (!data || msgRecived.find((msg: MessageModel) => msg._id === data._id)) return
      setMsgRecived((state: MessageModel[] | any) => [...state, data])
    
    })
    return () => {
      props.socket.off('receive_message');
  };
  }, [props.socket, user.room,  msgRecived])



  useEffect(() => {
    if (messagesColumnRef.current) {
          messagesColumnRef.current.scrollTop = messagesColumnRef.current.scrollHeight;
        }
  }, [msgRecived, props.socket, currentTypingUser])
  


  return (
    <div className='messagesColumn' ref={messagesColumnRef}>
      {msgRecived.map((msg: MessageModel) => <Message
        key={msg._id}
        username={user.name}
        msgRecived={msgRecived}
        setMsgRecived={setMsgRecived}
        msg={msg}
        socket={props.socket} />)        
      }
      <TypingIndicator currentTypingUser={currentTypingUser} />
    </div>
  )
}

