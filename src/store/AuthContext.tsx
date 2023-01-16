import axios from "axios";
import { createContext,  useState } from "react";
import { useToastMsg } from "../cmps/UI/Toast/useToastMsg";
import { toastContent } from "../cmps/UI/Toast/toastContent";
import { User } from "../models/User";
import { useNavigate } from "react-router-dom";
import { storageService } from "../services/localStorageService";

type AuthContextObj = {
  signUp: (name: string, password: string, email: string) => any;
  login: (email: string, password: string) => void
  logout: () => void
  isAuth: boolean
}

export const AuthContext = createContext<AuthContextObj>({
  signUp: () => { },
  login: () => { },
  logout: () => { },
  isAuth:false
})

const AuthContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [isAuth, setIsAuth] = useState(false)
  const navigate = useNavigate()
  const BASE_URL = process.env.NODE_ENV !== "development" ? "/api" : "//localhost:3001/api"
  const toatsSuccess = useToastMsg(toastContent.loginSuccess)
  const toatsError = useToastMsg(toastContent.loginErr)
  const toastSigUp = useToastMsg(toastContent.signupSuccess)

  const toastEmailErr = useToastMsg({title: 'Email is allready exist!', description:'Try again', status:'error'})
  
  
    const handleLogin = async (email: string, password: string) => {
     try {
      const { data } = await axios.post<User | any>(`${BASE_URL}/auth/login`, { email, password })
    
      if (data.access_token) {
        storageService.saveToStorage('token', data.access_token )
        
        const updatedUser = Object.assign({}, data.user, { password: undefined, room: '' });
        console.log(updatedUser);
        storageService.saveToStorage('user', updatedUser)
        setIsAuth(true)
        navigate('/')
        toatsSuccess.showToast()
      } else {
        return toatsError.showToast()
    }     
    } catch (err) {
       console.log(err);
    }
  }


  

  const handleSignup = async (name: string, password: string, email: string) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/users/signup`, { email, password, name })
      if (data === "Email is allready exist") {
        toastEmailErr.showToast()
        return data
      }
      // console.log(data, ' user signup')
      toastSigUp.showToast()
    } catch (err) {
      console.log(err)
    }    
  }


  const handleLogout = () => {
    setIsAuth(false)
    storageService.saveToStorage('token', null)
    storageService.saveToStorage('user', null)
    navigate('/login')
  }

  const contextVal:AuthContextObj = {
    signUp: handleSignup,
    login: handleLogin,
    logout: handleLogout,
    isAuth
  }

  return (
    <AuthContext.Provider value={contextVal}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider