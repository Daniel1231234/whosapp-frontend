import { Box, Button, FormControl, Textarea, useColorMode } from "@chakra-ui/react"
import React, { useContext, useState } from "react"
import { Socket } from "socket.io-client"
import { useTypingIndicator } from "../../services/useTypingIndicator"
import { AuthContext } from "../../store/AuthContext"

// import './Chat.css'

type Props = {
  socket: Socket<any>
}

export const SendMessage = (props: Props) => {
  const [message, setMessage] = useState('')
  const { loggedinUser } = useContext(AuthContext)
  const user = loggedinUser()
  const { handleStartTyping, handleStopTyping } = useTypingIndicator(props.socket);


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    handleStartTyping(user.name, user.room);
  }

  const sendMsg = (event: React.FormEvent) => {
    event.preventDefault()
    let room: string = user.room
    handleStopTyping(room);
    if (message !== '') {
      const messageToSave = {
        sender: user.name,
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
      handleStopTyping(user.room);
      sendMsg(e);
    }
  };

  return (
    <FormControl
      onSubmit={sendMsg}
      display="flex" gap="10px" >
      <Textarea colorScheme="messenger"
        size='sm'
        value={message}
        onChange={handleChange}
        placeholder="Type your message"
        onKeyDown={onStartTyping}
      />
      <Button colorScheme='teal' variant='solid' onClick={sendMsg}>Send</Button>
    </FormControl>
  )
}