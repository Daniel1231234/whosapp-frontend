import React, {  useContext } from 'react';
import { Chat } from '../models/Chat';
import { User } from '../models/User';
import userService from '../services/userService';
import { AuthContext } from './AuthContext';


type UsersContextObj = {
  addUserRoom: (newChatRoom: Chat) => void
  deleteUserRoom: (roomId: string) => any
  handleJoinRoom: (roomName: string) => any
  updateUserInDB: (name:string, email:string) => any
};

export const UsersContext = React.createContext<UsersContextObj>({
  addUserRoom: () => {},
  handleJoinRoom: () => {},
  deleteUserRoom: () => {},
  updateUserInDB: () => {},
});

const UsersContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  
  const {loggedinUser, setLoggedinUser} = useContext(AuthContext)

  const addUserRoom = async (newChatRoom: Chat) => {
    try {
      const user = loggedinUser()
      const updatedUser = { ...user, chatRooms: [...user.chatRooms, newChatRoom] };
      await userService.updateUser(updatedUser)
      setLoggedinUser(updatedUser)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteUserRoom = async (roomId: string) => {
    try {
      const user = loggedinUser()
      const updatedUser =  await userService.removeOneChat(user, roomId)      
      setLoggedinUser(updatedUser)
    } catch (err) {
      console.log(err)
    }
  }

  const updateUserInDB = async (name: string, email: string) => {
    try {
      const user = loggedinUser()
      const updatedUser = await userService.updateUserDetails(name, email, user)
      setLoggedinUser(updatedUser)
    } catch (err) {
      console.log(err)
    }
  }

  const handleJoinRoom =  (roomName: string) => {
    const user = loggedinUser()
    if (user.room === "") {
      console.log('joining room')
      const joinedUser =  userService.joinRoom(user, roomName)
      setLoggedinUser(joinedUser)
      return joinedUser
    } else {
      console.log('leaving room')
      const leavingUser =  userService.leaveRoom(user)
      setLoggedinUser(leavingUser)
      return leavingUser
    }
  }


  const contextValue: UsersContextObj = {
    addUserRoom, 
    deleteUserRoom, 
    handleJoinRoom,
    updateUserInDB
  };

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContextProvider;