import axios, { AxiosResponse } from "axios";

import { LoginCredentials, Notification } from "../constants";
import useAuthStore from "../stores/useAuthStore";

// Initialize API variable by creating new Axios Instance
const API = axios.create({
  baseURL: "http://35.201.2.209:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * MeldAPI Endpoint
 *
 *
 * @returns {Object}
 * @example
 *    MeldAPI.fetchDevices()
 *    MeldAPI.login({ email: "test@test.com", password: "Test123!" })
 *    MeldAPI.notify({
 *      name: "John Valle",
 *      email: "vallejohn.personal@gmail.com",
 *      repoUrl: "https://github.com/johnvalle/meldcx-frontend-test",
 *      message: "What a pun-tastic message!"
 *    })
 */
function MeldAPI() {
  // token from localStorage
  const token = useAuthStore.getState().token;

  return {
    fetchDevices: async (): Promise<AxiosResponse<any>> => {
      const response = await API.get("/devices");
      return response;
    },
    login: async (payload: LoginCredentials): Promise<AxiosResponse<any>> => {
      const response = await API.post("/login", payload);
      return response;
    },
    notify: async (payload: Notification): Promise<AxiosResponse<any>> => {
      const response = await API.post("/notify", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    },
  };
}

export default MeldAPI();
