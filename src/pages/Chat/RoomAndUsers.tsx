import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Socket } from "socket.io-client"
import { Modal } from "../../cmps/Modal"
import { CopyLink } from "../../cmps/UI/CopyLink"
import { User } from "../../models/User"
import { ChatsContext } from "../../store/ChatContext"
import { UsersContext } from "../../store/UserContext"
import { Button, ButtonGroup, Divider } from '@chakra-ui/react'
import './Chat.css'
import { Chat } from "../../models/Chat"

type Props = {
  socket: Socket<any>

}

export const RoomAndUsers = (props: Props) => {
  const [usersState, setUsersState] = useState<User[] | []>([])

  const [showInvite, setShowIntive] = useState(false)
  const navigate = useNavigate()
  const { user, setUser } = useContext(UsersContext)
  const { currRoom, saveChatRoom } = useContext(ChatsContext)
  const cuurentRoomChat = currRoom()
  const invitationLink = import.meta.env.MODE === 'development' ? `${window.location.origin}/join/${cuurentRoomChat?._id}` : `https://whosapp.onrender.com/join/${cuurentRoomChat?._id}`

  const sendInvitiationLink = async () => {
    setShowIntive(true)
  }


function removeUserFromChat(user: User, room: any): Chat {
    const updatedUsers = room.users.filter((u:User) => u._id !== user._id);
    return { ...room, users: updatedUsers };
}

  const leaveRoom = async () => {
    const room = currRoom()
    const updatedUser = Object.assign({}, user(), { lastSeen: Date.now(), room: '', lastRoom: user().room });
    const updatesChatWithUsers = removeUserFromChat(updatedUser, room)
    saveChatRoom(updatesChatWithUsers)
    setUser(updatedUser)
    
    props.socket.emit('leave_room', updatedUser)  
    navigate('/')
  }


  useEffect(() => {
    if (!props.socket) return
    props.socket.on('chatroom_users', (data: User[] | []) => {
      console.log("chatroom_users  from socket => ", data)
      console.log(data)
      
      setUsersState(data)
    })
      return () => {
    props.socket.off('chatroom_users');
    };
    
  }, [props.socket])





  return (
    <div className="roomAndUsersColumn">
      <h2 style={{ fontFamily: 'Edu QLD Beginner, cursive', fontSize:'3rem', textAlign:'center'}} className="roomTitle">{user() ? user().room : 'WhosApp'}</h2>
      
      <ul className="usersList">
        { usersState?.map((user:User) => (
          <li key={user._id}>{ user.name }</li>
        ))}
      </ul>

      <Divider className="divider" />

      <ButtonGroup className="btns-chat">
        <Button colorScheme='red' onClick={leaveRoom} >Back</Button>
        {cuurentRoomChat?.room === 'Public room' ? "" : <Button colorScheme='whatsapp' onClick={sendInvitiationLink} >Invite</Button> }
        
      </ButtonGroup>

      
         {showInvite && (
        <Modal>
          <>
          <div className="modal-container">
              <div className="modal-context">
                {user().room === 'Public room' ? <h2>This is a public room, you dont Need to invite your friend</h2> : <CopyLink link={invitationLink} /> }
            <button className="btn" onClick={() => setShowIntive(false)}>
              close
            </button>
            </div>
            </div>
            </>
        </Modal>
      )}
    </div>
  )
}

