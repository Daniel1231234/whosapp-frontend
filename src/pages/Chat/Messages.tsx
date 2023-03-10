import { useContext, useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import { MessageModel } from '../../models/Message'
import { Message } from './Message'
import { TypingIndicator } from './TypingIndicator '
import { useTypingIndicator } from '../../services/useTypingIndicator'
import { AuthContext } from '../../store/AuthContext'
import { Box } from '@chakra-ui/react'


type Props = {
  socket: Socket<any>
}

export const Messages = (props: Props) => {
  const { currentTypingUser } = useTypingIndicator(props.socket);
  const [msgRecived, setMsgRecived] = useState<MessageModel[] | any>([])
  const messagesColumnRef = useRef<HTMLDivElement>(null);
  const { loggedinUser } = useContext(AuthContext)
  const user = loggedinUser()

  useEffect(() => {
    if (messagesColumnRef.current) {
      messagesColumnRef.current.scrollTop = messagesColumnRef.current.scrollHeight;
    }
  }, [props.socket, msgRecived])


  useEffect(() => {
    if (!props.socket) return
    props.socket.on('last_msgs', (data: any) => {
      console.log(data)
      setMsgRecived((state: MessageModel[] | any) => [...state, ...data])
    })

    return () => { props.socket.off('last_msgs') }
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
  }, [props.socket, user.room, msgRecived])


  return (
    <Box ref={messagesColumnRef}>
      {msgRecived.map((msg: MessageModel) => <Message
        key={msg._id}
        username={user.name}
        msgRecived={msgRecived}
        setMsgRecived={setMsgRecived}
        msg={msg}
        socket={props.socket} />)
      }
      <TypingIndicator currentTypingUser={currentTypingUser} />
    </Box>
  )
}

