import {useContext, useState} from "react"
import './Auth.css'
import { AuthContext } from "../../store/AuthContext"
import { useToastMsg } from "../../cmps/UI/Toast/useToastMsg"

type Props = {
  setSignup:any
}


export const Signup = (props: Props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const { signUp } = useContext(AuthContext)
  const toastSignupErr = useToastMsg({ status: 'error', title: 'Sign up has failed', description: 'Username or Password are invalid', isShow: true })


  const signupHandker = async () => {
    try {
      if (email.trim() === "" || password.trim() === "" || name.trim() === "") return toastSignupErr.showToast()
      let capitalizeName = capitalizeWords(name) 
      const isValid = await signUp(capitalizeName, password.toLowerCase(), email.toLowerCase())
      console.log(isValid)
      
      if (isValid === 'Email is allready exist') {
        setEmail("")
        setPassword("")
        setName("")
        return
      }
      props.setSignup(false)
    } catch (err) {
      console.log(err)
    }
  }


  return (
      <div className="signup-card authContainer">
          <input 
            className="authTextbox"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            type="text"
            className="authTextbox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            className="authTextbox"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="authBtn"  onClick={signupHandker}>
            Register
          </button>
          <div>
            Allready have an account? <button onClick={() => {props.setSignup(false)}}>Login</button> now.
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