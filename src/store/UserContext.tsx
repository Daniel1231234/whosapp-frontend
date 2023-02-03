import React, {  useContext } from 'react';
import { Chat } from '../models/Chat';
import { User } from '../models/User';
import userService from '../services/userService';
import { AuthContext } from './AuthContext';


interface UsersContextObj {
  addUserRoom: Function
  deleteUserRoom: Function
  handleJoinRoom: Function
  updateUserInDB: Function
  handleLeaveRoom: Function
};

export const UsersContext = React.createContext<UsersContextObj>({
  addUserRoom: () => {},
  handleJoinRoom: () => {},
  deleteUserRoom: () => {},
  updateUserInDB: () => { },
  handleLeaveRoom: () => { }
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
      const updatedUser = await userService.removeOneChat(user, roomId)
      if (updatedUser) {
        setLoggedinUser(updatedUser)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const updateUserInDB = async (name: string, email: string) => {
    try {
      const user = loggedinUser()
      const updatedUser = await userService.updateUserDetails(name, email, user)
      if (updatedUser) {
        setLoggedinUser(updatedUser)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleJoinRoom =  (roomName: string) => {
    const user: User = loggedinUser()
    const joinedUser = userService.joinRoom(user, roomName)
    if (joinedUser) {
      setLoggedinUser(joinedUser)
    }
    return joinedUser

  }

  const handleLeaveRoom = () => {
    const user: User = loggedinUser()
    const leavingUser = userService.leaveRoom(user)
    if (leavingUser) {
      setLoggedinUser(leavingUser)
    }
    return leavingUser
  }


  const contextValue: UsersContextObj = {
    addUserRoom, 
    deleteUserRoom, 
    handleJoinRoom,
    updateUserInDB,
    handleLeaveRoom
  };

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContextProvider;