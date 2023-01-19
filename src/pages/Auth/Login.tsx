import {useContext, useState} from "react"
import './Auth.css'
import { useToastMsg } from "../../cmps/UI/Toast/useToastMsg"
import { AuthContext } from "../../store/AuthContext"
import { Navigate, useNavigate } from "react-router-dom"
import { toastContent } from "../../cmps/UI/Toast/toastContent"
import { Button } from "@chakra-ui/react"

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
      const res = await authCtx.login(email, password)
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
      <div className="login-card authContainer">
          <input
            type="text"
            value={email}
            className="authTextbox"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <input
            type="password"
          value={password}
          className="authTextbox"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button  onClick={handleLogin} className="authBtn">
            Login
          </button>
          <div>
            Don't have an account? <Button color="darkblue" variant="link" onClick={() => {props.setSignup(true)}}>Signup</Button> now.
      </div>

      </div>
  )
}
