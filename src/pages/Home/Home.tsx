import './Home.css'
import { useContext, useEffect, useState } from 'react';
import { NewChatRoom } from './NewChatRoom';
import { RoomSelect } from './RoomSelect';
import { WebsocketContext } from '../../store/SocketContext';
import { Box, Button, ButtonGroup, Heading, useColorModeValue } from '@chakra-ui/react'
import { AuthContext } from '../../store/AuthContext';
import { CustomSpinner } from '../../cmps/UI/CustomSpinner';


export function Home() {
  const [show, setShow] = useState(false)
  const { loggedinUser, setShowHeader, showHeader } = useContext(AuthContext)
  const socket = useContext(WebsocketContext);

  useEffect(() => {
    setShowHeader(true)

  }, [showHeader])


  if (!loggedinUser()) return <CustomSpinner />

  return (
    <Box
      m="auto"
      bg={useColorModeValue('gray.50', 'gray.800')}
      className='homeContainer main-layout'>
      <Heading fontWeight="400" fontSize='4xl' style={{ textAlign: 'center' }}>Welcome, <Box fontWeight="bold">{loggedinUser()?.name}</Box></Heading>
      <ButtonGroup className='homeBtns'>
        {!show && <Button size="lg" onClick={() => { setShow(true) }} colorScheme='whatsapp'>Create new Chatroom</Button>}
        {show && <Button size="md" onClick={() => { setShow(false) }} colorScheme="orange">Back</Button>}
      </ButtonGroup>
      <Box boxShadow={'lg'} rounded={'md'} bg="gray.700" className='formContainer'>
        {show && <NewChatRoom setShow={setShow} />}
        {!show && <RoomSelect socket={socket} />}
      </Box>
    </Box>
  );
}
