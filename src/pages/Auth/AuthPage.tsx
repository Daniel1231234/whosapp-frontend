import { useState } from "react"
import { Login } from "./Login"
import { Signup } from "./Signup"
import './Auth.css'
import { Heading, Text } from '@chakra-ui/react'




export const AuthPage = () => {
  const [signup, setSignup] = useState(false)
  
      return (
        <div className="auth-page pageContainer main-layout">
          <Heading fontSize='4xl' className="auth-title">Welcome to Who's App!</Heading>
          <Text
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            fontSize='1xl'
            fontWeight='bold'
          >{signup ? 'Sign up' : 'Log in'} to our service and start chatting!</Text>
              {!signup && <Login setSignup={setSignup} /> }
              {signup && <Signup setSignup={setSignup} /> }
        </div>
      )
    }
    
    
