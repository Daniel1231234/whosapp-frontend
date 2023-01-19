import {useContext, useState} from "react"
import './Auth.css'
import { AuthContext } from "../../store/AuthContext"
import { useToastMsg } from "../../cmps/UI/Toast/useToastMsg"
import { toastContent } from "../../cmps/UI/Toast/toastContent"
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import React from "react"

type Props = {
  setSignup:any
}


export const Signup = (props: Props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [passwordShown, setPasswordShown] = useState(false);

  const { signUp } = useContext(AuthContext)
  const toastSignupErr = useToastMsg({ status: 'error', title: 'Sign up has failed', description: 'Username or Password are invalid', isShow: true })
 const toastSigUp = useToastMsg(toastContent.signupSuccess)


 const handleShow = () => {
  setPasswordShown(!passwordShown)
 }

  const signupHandker = async () => {
    try {
      if (email.trim() === "" || password.trim() === "" || name.trim() === "") return toastSignupErr.showToast()
      let capitalizeName = capitalizeWords(name) 
      const newUser = await signUp(capitalizeName, password.toLowerCase(), email.toLowerCase())
      if (!newUser) return console.log('no new user! ', newUser)
        setEmail("")
        setPassword("")
        setName("")
      toastSigUp.showToast()
      props.setSignup(false)
    } catch (err) {
      console.log(err)
    }
  }


  return (
      <div className="signup-card authContainer">
          <Input variant='filled'
            className="authTextbox"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <Input variant='filled'
            type="text"
            className="authTextbox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <InputGroup size="md">
          <Input variant='filled' pr='4.5rem'
            type={passwordShown ? 'text' : 'password'}
            value={password}
            className="authTextbox"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleShow}>
              {passwordShown ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
          </InputGroup>
          <button className="authBtn"  onClick={signupHandker}>
            Register
          </button>
          <div>
            Allready have an account? <Button variant="link" color="darkblue" onClick={() => {props.setSignup(false)}}>Login</Button> now.
          </div>

      </div>
  )
}




function capitalizeWords(str:string) {
    let words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
}