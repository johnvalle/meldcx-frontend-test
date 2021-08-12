import axios, { AxiosResponse, ResponseType } from "axios"

import { LoginCredentials } from "../constants"

const API = axios.create({
  baseURL: "http://35.201.2.209:8000/",
  headers: {
    "Content-Type": "application/json",
  },
})

function MeldAPI() {
  return {
    fetchDevices: async (): Promise<AxiosResponse<any>> => {
      const response = await API.get("/devices").catch((err) => console.error(err))
      return response?.data
    },
    login: async (payload: LoginCredentials): Promise<AxiosResponse<ResponseType>> => {
      const response = await API.post("/login", payload).catch((err) => console.error(err))
      return response?.data
    },
  }
}

export default MeldAPI()
