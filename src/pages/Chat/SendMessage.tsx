import { Button, FormControl,  Textarea } from "@chakra-ui/react"
import React, { useContext, useState } from "react"
import { Socket } from "socket.io-client"
import { useTypingIndicator } from "../../services/useTypingIndicator"
import { AuthContext } from "../../store/AuthContext"

import './Chat.css'

type Props = {
  socket: Socket<any>
}

export const SendMessage = (props: Props) => {
  const [message, setMessage] = useState('')
   const { loggedinUser } = useContext(AuthContext)
  const user = loggedinUser()
  const {  handleStartTyping, handleStopTyping} = useTypingIndicator(props.socket);
 
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    handleStartTyping(user.name);
  }

  const sendMsg =  (event: React.FormEvent) => {
    event.preventDefault()
    handleStopTyping();
        if (message !== '') {
          const messageToSave = {
            sender:user.name,
            room: user.room,
            txt: message,
          }
          console.log(messageToSave);
          
            props.socket.emit('send_message', messageToSave)
           setMessage("")
      }
  }

  const onStartTyping = (e: any) => {
    if (e.key === 'Enter' && e.shiftKey) {
       e.preventDefault();
        setMessage(message + "\n")
      } else if (e.key === 'Enter') {
      e.preventDefault();
        handleStopTyping();
        sendMsg(e);
      }
  };

  // const handleKeyup = () => {
  //   console.log('keyup');
    
  // }

  
  return (
    <>
      <FormControl onSubmit={sendMsg} className="sendMessageContainer">
          <Textarea
              variant="outline"
              // onKeyUp={handleKeyup}
              value={message}
              onChange={handleChange}
              placeholder="Type your message"
              onKeyDown={onStartTyping}
          />
          <Button  colorScheme='teal' variant='solid' onClick={sendMsg}>Send</Button>
        </FormControl>
      </>
  )
}