import { Chat } from "../models/Chat";
import { User } from "../models/User";
import { httpService } from "./httpService";
import { storageService } from "./localStorageService";

  const endpoint = 'users/'

async function updateUser(user:User | null) {
    try {
        const updatedUser = await httpService.put(endpoint, user)
        // console.log(updatedUser, ' BEFORE SAVING TO STORAGE')
        storageService.saveToStorage('user', updatedUser)
    } catch (err) {
        console.log(err)
    }
}

async function removeOneChat(user: User | null, roomId: string) {
    try {
        if (!user?.chatRooms) return
        const newUserChats = user.chatRooms.filter((r: any) => r._id !== roomId)
        const newUser = Object.assign({}, user, { chatRooms: newUserChats })
        await updateUser(newUser)
        return newUser
    } catch (err) {
        console.log(err)
     }
}

 function joinRoom(user: User | null , roomName: string) {
    try {
        const updatedUser = Object.assign({}, user, { room: roomName });
        storageService.saveToStorage('user', updatedUser)
        // await updateUser(updatedUser)
        return updatedUser
    } catch (err) {
        console.log(err)
    }
}

 function leaveRoom(user: User | null) {
    try {
        const updatedUser = Object.assign({}, user, { lastSeen: Date.now(), room:''});
        storageService.saveToStorage('user', updatedUser)
        return updatedUser
    } catch (err) {
        console.log(err)
    }
}

async function updateUserDetails(name:string, email:string, user:User) {
    try {
        const userToUpdate = Object.assign({}, user, {name:name, email:email})
        await updateUser(userToUpdate)
        return userToUpdate
    } catch (err) {
        console.log(err)
    }
}



const userService = {
    updateUser,
    removeOneChat,
    joinRoom, 
    leaveRoom,
    updateUserDetails
};

export default userService;
