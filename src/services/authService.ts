import axios from "axios";
import { User } from "../models/User";
import { httpService } from "./httpService";
import { storageService } from "./localStorageService";

  const endpoint = 'auth'

  interface LoginResponse {
     userIsExist: any;
    token: string;
}



async function register (email: string, password: string | any, name: string)  {
  return await httpService.post(`${endpoint}/signup`, {email, password, name})
};

async function login(email: string, password: string | any) {
  try {
    const {userIsExist, token}:LoginResponse = await httpService.post(`${endpoint}/login`, { email, password })
    if (userIsExist) storageService.saveToStorage('user', userIsExist)
    if (token) storageService.saveToStorage('token', token)
    return {userIsExist, token}
  } catch (err) {
    console.log(err)
  }

};

async function logout ()  {
  // storageService.saveToStorage('user', null)
  // storageService.saveToStorage('token', "")
   sessionStorage.clear()
};


function getCurrUser() {
  return storageService.loadFromStorage('user')  
}

function authData() {
  const user = storageService.loadFromStorage('user')  
  const token = storageService.loadFromStorage('token')
  return {user,token}
}


const authService = {
  register,
  login,
  logout,
  getCurrUser,
  authData
};

export default authService;
