import { useContext, useEffect, useState } from "react"
import { useToastMsg } from "../../cmps/UI/Toast/useToastMsg"
import { AuthContext } from "../../store/AuthContext"
import { Navigate, useNavigate } from "react-router-dom"
import { toastContent } from "../../cmps/UI/Toast/toastContent"
import { Box, Button, Heading, Input, Stack } from "@chakra-ui/react"
import FormCard from "../../cmps/UI/FormCard"

type Props =  {
  setSignup: any
}


export const Login = (props: Props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const authCtx = useContext(AuthContext)
  const toastLoginErr = useToastMsg({ status: 'error', title: 'Username or Password are invalid', description: 'Try again', isShow: true })
  const toastLoginSuccess = useToastMsg(toastContent.signupSuccess)
  const navigate = useNavigate()


  const handleLogin = async () => {
    try {
      if (email.trim() === "" || password.trim() === "")  return  toastLoginErr.showToast()
      const res = await authCtx.login(email.toLowerCase(), password.toLowerCase())
      if (!res) toastLoginErr.showToast()
      else {
        toastLoginSuccess.showToast()
        navigate('/home')
      }
      setEmail("")
      setPassword("")    
    } catch (err) {
    console.log(err)
    }
  }


  return (
    <>
      <Stack align={'center'}>
        <Heading textAlign="center" fontSize={'1xl'}>Sign in to your account</Heading>
      </Stack>
      <FormCard isSignUp={false}
        setSignup={props.setSignup}
        actionBtn="Sign in"
        onAction={handleLogin}
        password={password}
        email={email}
        setEmail={setEmail}
        setPassword={setPassword} />
    </>
  )
}


