import axios, { AxiosResponse } from "axios"

import { LoginCredentials } from "../constants"

// Initialize API variable by creating new Axios Instance
const API = axios.create({
  baseURL: "http://35.201.2.209:8000/",
  headers: {
    "Content-Type": "application/json",
  },
})

/**
 * MeldAPI Endpoint
 *
 *
 * @returns {Object}
 * @example
 *    MeldAPI.fetchDevices()
 *    MeldAPI.login()
 */
function MeldAPI() {
  return {
    fetchDevices: async (): Promise<AxiosResponse<any>> => {
      const response = await API.get("/devices")
      return response
    },
    login: async (payload: LoginCredentials): Promise<AxiosResponse<any>> => {
      const response = await API.post("/login", payload)
      return response
    },
  }
}

export default MeldAPI()
