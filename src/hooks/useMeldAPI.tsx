import { useQuery, useMutation } from "react-query";

import { MeldAPI } from "../api";

/**
 * Custom useMutation hook for posting data to login endpoint
 */
export function useLoginMutation() {
  return useMutation("login", MeldAPI.login);
}

/**
 * Custom useQuery hook for fetching data from fetchDevices endpoint
 */
export function useFetchDevicesQuery() {
  return useQuery("devices", MeldAPI.fetchDevices, { refetchInterval: 5000 }); // polls every 5 second (Instruction #4)
}
