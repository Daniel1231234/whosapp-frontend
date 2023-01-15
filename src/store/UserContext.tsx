import axios from 'axios';
import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToastMsg } from '../cmps/UI/Toast/useToastMsg';
import { Chat } from '../models/Chat';
import  {User} from '../models/User';
import { storageService } from '../services/localStorageService';


type UsersContextObj = {
  user: () => any;
  setUser: (user:User | null) => void
  showHeader: boolean
  setShowHeader: (showHeader: boolean) => void
  addUserRoom: (newChatRoom: Chat) => void
  deleteUserRoom: (roomId: string) => void
};

export const UsersContext = React.createContext<UsersContextObj>({
  user: () => {},
  setUser: () => { },
  showHeader: true,
  setShowHeader: () => { },
  addUserRoom: () => {},
  deleteUserRoom: () => {},
});

const UsersContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [showHeaderState, setShowHeaderState] = useState<boolean>(true)
  const [logedinUser, setLoggedinUser] = useState<User | null>(null);
  
  const BASE_URL = process.env.NODE_ENV !== "development" ? "/api" : "//localhost:3001/api"

  const setUser = async (user: User | null) => {
    try {
      const { data } = await axios.put(BASE_URL + '/users', user)
      console.log(data);
      if (!data) return
      setLoggedinUser(data)
      storageService.saveToStorage('user', data)
      // localStorage.setItem('user', JSON.stringify(data))
    } catch (err) {
      console.log(err)
      
    }
  }

  const addUserRoom = async (newChatRoom: Chat) => {
    const user = getUser()
    const updatedUser = {...user, chatRooms: [...user.chatRooms, newChatRoom]};
    setUser(updatedUser)
    // return updatedUser
  }

  const deleteUserRoom = async (roomId: string) => {
    try {
      const user = getUser()
      const newUserChats = user.chatRooms.filter((r: Chat) => r._id !== roomId)
      // console.log(newUserChats);
      const newUser = Object.assign({}, user, {chatRooms: newUserChats})
       setUser(newUser)
    } catch (err) {
      console.log(err)
    }
  }


  const getUser: any = () => {
   return storageService.loadFromStorage('user')
  }




  const contextValue: UsersContextObj = {
    user:getUser,
    setUser,
    showHeader:showHeaderState,
    setShowHeader: setShowHeaderState,
    addUserRoom, 
    deleteUserRoom, 
  };

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContextProvider;