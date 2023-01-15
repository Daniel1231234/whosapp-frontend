import Axios from "axios"
// import { router } from "@/router"

const BASE_URL = process.env.NODE_ENV !== "development" ? "/api" : "//localhost:3001/api"
const axios = Axios.create({
  withCredentials: true,
})

export const httpService = {
  get(endpoint:string, data:any) {
    return ajax(endpoint, "GET", data)
  },
  post(endpoint:string, data:any) {
    console.log(data)
    return ajax(endpoint, "POST", data)
  },
  put(endpoint:string, data:any) {
    console.log(data, "data")
    return ajax(endpoint, "PUT", data)
  },
  delete(endpoint:string, data:any) {
    return ajax(endpoint, "DELETE", data)
  },
}

async function ajax(endpoint:string, method = "GET", data = null) {
  console.log(method)
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === "GET" ? data : null,
    })
    // console.log(res.data, "res dataa")
    return res.data
  } catch (err:any) {
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data:`,
      data
    )
    console.dir(err)
    if (err.response && err.response.status === 401) {
      // Depends on routing startegy - hash or history
    //   window.location.assign("/#/login")
        window.location.assign("/login")
      //   router.push("/login")
    }
    throw err
  }
}