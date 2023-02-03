import axios from "axios";
import { User } from "../models/User";
import { httpService } from "./httpService";
import { storageService } from "./localStorageService";

  const endpoint = 'auth'

  interface LoginResponse {
     userIsExist: any;
    token: string;
}



async function register (email: string, password: string | any, name: string):Promise<any>  {
  return await httpService.post(`${endpoint}/signup`, {email, password, name})
};

async function login(email: string, password: string ) {
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
 localStorage.removeItem('user')
 localStorage.removeItem('token')
};


function getCurrUser() {
  return storageService.loadFromStorage('user')  
}




const authService = {
  register,
  login,
  logout,
  getCurrUser,
};

export default authService;
