import { useQuery, useMutation } from "react-query";

import { MeldAPI } from "../api";

export function useLoginMutation() {
  return useMutation("login", MeldAPI.login);
}

export function useFetchDevicesQuery() {
  return useQuery("devices", MeldAPI.fetchDevices, { refetchInterval: 5000 });
}