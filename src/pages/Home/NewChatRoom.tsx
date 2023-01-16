import { Button, FormControl, Input } from "@chakra-ui/react"
import React, { useContext, useState } from "react"
import { ChatsContext } from "../../store/ChatContext"
import { UsersContext } from "../../store/UserContext"


type Props = {
    setShow: any
}
export const NewChatRoom = (props: Props) => {
    const [roomName, setRoomName] = useState("")

    const userCtx = useContext(UsersContext)
    const chatCtx = useContext(ChatsContext)

    const user = userCtx.user()

    const createChatroom = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const room = roomName
            const newRoomFromBackend = await chatCtx.createRoom(room, user._id)
            userCtx.addUserRoom(newRoomFromBackend)
            props.setShow(false)
        } catch (err) {
            console.log(err)
        }

    }

  return (
      <FormControl
          onSubmit={createChatroom}
          display="flex"
          flexDirection="column"
          gap="1rem">
            <h3 style={{textAlign:'center', fontSize:'1.5rem', fontWeight:'700'}}>Create new chat </h3>
          <Input
              size="lg"
              type="text"
              id="room"
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Type the new chat name here..." />
            <Button onClick={createChatroom} colorScheme='messenger'>Submit</Button>
        </FormControl>
  )
}