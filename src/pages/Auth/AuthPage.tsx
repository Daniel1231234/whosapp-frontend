import { useState } from "react"
import { Login } from "./Login"
import { Signup } from "./Signup"
// import './Auth.css'
import { Box, Flex, Heading, Stack, useColorModeValue } from '@chakra-ui/react'



export const AuthPage = () => {
  const [signup, setSignup] = useState(false)
  
  return (
    <Flex className="main-layout"
      height="80vh"
      align="center"
      flexDir="column"
      justify="center"
      overflowY="auto"
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Box mt="10px" height="100%">
        <Heading mt="16px" textAlign="center" fontSize='4xl'>Welcome to Who'sApp!</Heading>
        <Stack spacing={5} mx={'auto'} maxW={'lg'} py={7} px={6}>
          {!signup && <Login setSignup={setSignup} />}
          {signup && <Signup setSignup={setSignup} />}
        </Stack>
      </Box>
    </Flex>
      )
}
    



    
