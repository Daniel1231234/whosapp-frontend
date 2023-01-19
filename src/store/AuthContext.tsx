import axios from "axios";
import { createContext,  useContext,  useState } from "react";
import { useToastMsg } from "../cmps/UI/Toast/useToastMsg";
import { toastContent } from "../cmps/UI/Toast/toastContent";
import { User } from "../models/User";
import { useNavigate } from "react-router-dom";
import { storageService } from "../services/localStorageService";
import authService from "../services/authService";

type AuthContextObj = {
  signUp: (name: string, password: string, email: string) => any;
  login: (email: string, password: string) => any
  logout: () => any
  setLoggedinUser: (user:User | null | any) => any
  loggedinUser: () => User | null | any
  token: () => string | any
  showHeader: boolean
  setShowHeader: (showHeader: boolean) => void
}

export const AuthContext = createContext<AuthContextObj>({
  signUp: () => { },
  login: () => { },
  logout: () => { },
  setLoggedinUser: () => { },
  loggedinUser: () => null,
  token: () => "",
  showHeader: true,
  setShowHeader: () => { },
})


const AuthContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [loggedinUser, setLoggedinUser] = useState<any>(null);
    const [token, setToken] = useState<string>("");
    const [showHeaderState, setShowHeaderState] = useState<boolean>(true)


    const handleLogin = async (email: string, password: string) => {
     try {
       const data = await authService.login(email, password)
       if (data) {
         setLoggedinUser(data.userIsExist)
         setToken(data.token)
         return data
       }
    } catch (err) {
       console.log(err);
    }
  }
  
  
  const handleSignup = async (name: string, password: string, email: string) => {
    try {
      const signupUser = await authService.register(email, password, name)
      console.log(signupUser)
      return signupUser
    } catch (err) {
      console.log(err)
    }    
  }

  const getUser = () => {
   return storageService.loadFromStorage('user')
  }

  const getToken = () => {
   return storageService.loadFromStorage('token')
  }
  

  const handleLogout =  () => {
    setLoggedinUser(null)
    setToken("")
    // sessionStorage.removeItem('chat')
    authService.logout()
  }

  const contextVal:AuthContextObj = {
    signUp: handleSignup,
    login: handleLogin,
    logout: handleLogout,
    loggedinUser: getUser,
    token:getToken, 
    showHeader:showHeaderState,
    setShowHeader: setShowHeaderState,
    setLoggedinUser
  }

  return (
    <AuthContext.Provider value={contextVal}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider


