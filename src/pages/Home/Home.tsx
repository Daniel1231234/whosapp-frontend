import './Home.css'
import { useContext, useEffect, useState } from 'react';
import { NewChatRoom } from './NewChatRoom';
import { RoomSelect } from './RoomSelect';
import './Home.css'
import { UsersContext } from '../../store/UserContext';
import { WebsocketContext } from '../../store/SocketContext';
import { Button, Text } from '@chakra-ui/react'

export function Home() {
  const [show, setShow] = useState(false)
  const userCtx = useContext(UsersContext)
  const user = userCtx.user()
  const socket = useContext(WebsocketContext);

  
  useEffect(() => {
    userCtx.setShowHeader(true)
  }, [])


  return (
    <div className='homeContainer main-layout'>
          <Text fontSize='4xl' style={{textAlign:'center'}}>Welcome, <span style={{fontWeight:'500', color:'darkblue'}}>{user?.name}</span></Text>
      <div className='homeBtns'>
        {!show &&  <Button  size="lg" onClick={() => { setShow(true) }} colorScheme='whatsapp'>Create new Chatroom</Button>}
        {show && <Button  size="md" onClick={() => { setShow(false) }} colorScheme='red'>Back</Button> }
      </div>
      <div className='formContainer'>
        {show && <NewChatRoom setShow={setShow}  />}
        {!show && <RoomSelect socket={socket} />}
      </div>
    </div>
  );
}
