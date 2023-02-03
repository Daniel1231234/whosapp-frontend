import { Box, Flex } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../store/AuthContext';
import { WebsocketContext } from '../../store/SocketContext';
import { Messages } from './Messages';
import { RoomAndUsers } from './RoomAndUsers';
import { SendMessage } from './SendMessage';


type Props = {}
export const ChatPage = (props: Props) => {
    const { setShowHeader } = useContext(AuthContext)
    const socket = useContext(WebsocketContext);

    useEffect(() => {
        setShowHeader(false)
    }, [])

    return (
        <Flex
            className='main-layout'
            flexDir='column'
            justifyContent="flex-end"
            h="100vh"
            bg='gray.800'>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                minHeight="10vh"
                borderBottomWidth="2px"
                borderBottomColor="whiteAlpha.500"
            >
                <RoomAndUsers socket={socket} />
            </Box>
            <Box overflow="auto" minHeight="70%" >
                <Messages socket={socket} />
            </Box>
            <Box pb="1rem" mt="1rem"   >
                <SendMessage socket={socket} />
            </Box>
        </Flex>
    )
}