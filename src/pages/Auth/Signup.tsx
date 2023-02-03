import { useContext, useState } from "react"
import { AuthContext } from "../../store/AuthContext"
import { useToastMsg } from "../../cmps/UI/Toast/useToastMsg"
import { toastContent } from "../../cmps/UI/Toast/toastContent"
import { Button, Heading, Input, InputGroup, InputRightElement, Stack } from "@chakra-ui/react"
import React from "react"
import { utilService } from "../../services/utilService"
import FormCard from "../../cmps/UI/FormCard"

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
      let capitalizeName = utilService.capitalizeWords(name) 
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
    <>
      <Stack align={'center'}>
        <Heading textAlign="center" fontSize={'1xl'}>Sign up to out service</Heading>
      </Stack>
      <FormCard isSignUp={true}
        setSignup={props.setSignup}
        name={name}
        setName={setName}
        actionBtn="Sign up"
        onAction={signupHandker}
        password={password}
        email={email}
        setEmail={setEmail}
        setPassword={setPassword} />
    </>
  )
}


      // <div className="signup-card authContainer">
      //     <Input variant='filled'
      //       className="authTextbox"
      //       type="text"
      //       value={name}
      //       onChange={(e) => setName(e.target.value)}
      //       placeholder="Full Name"
      //     />
      //     <Input variant='filled'
      //       type="text"
      //       className="authTextbox"
      //       value={email}
      //       onChange={(e) => setEmail(e.target.value)}
      //       placeholder="Email"
      //     />
      //     <InputGroup size="md">
      //     <Input variant='filled' pr='4.5rem'
      //       type={passwordShown ? 'text' : 'password'}
      //       value={password}
      //       className="authTextbox"
      //       onChange={(e) => setPassword(e.target.value)}
      //       placeholder="Password"
      //     />
      //     <InputRightElement width='4.5rem'>
      //       <Button h='1.75rem' size='sm' onClick={handleShow}>
      //         {passwordShown ? 'Hide' : 'Show'}
      //       </Button>
      //     </InputRightElement>
      //     </InputGroup>
      //     <button className="authBtn"  onClick={signupHandker}>
      //       Register
      //     </button>
      //     <div>
      //       Allready have an account? <Button variant="link" color="darkblue" onClick={() => {props.setSignup(false)}}>Login</Button> now.
      //     </div>
      // </div>