import {useContext, useState} from "react"
import './Auth.css'
import { useToastMsg } from "../../cmps/UI/Toast/useToastMsg"
import { AuthContext } from "../../store/AuthContext"
import { useNavigate } from "react-router-dom"

type Props =  {
  setSignup: any
}

export const Login = (props: Props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const authCtx = useContext(AuthContext)
  const toastLoginErr = useToastMsg({ status: 'error', title: 'Username or Password are invalid', description: 'Try again', isShow: true })
  
  
  const login = async () => {
    try {
      if (email.trim() === "" || password.trim() === "")  return  toastLoginErr.showToast()
      authCtx.login(email, password)
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
          <button  onClick={login} className="authBtn">
            Login
          </button>
          <div>
            Don't have an account? <button onClick={() => {props.setSignup(true)}}>Signup</button> now.
      </div>

      </div>
  )
}
