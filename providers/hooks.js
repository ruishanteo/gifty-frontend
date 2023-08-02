import { useContext } from "react";

import { AuthContext } from "./AuthProvider";
import { AxiosContext } from "./AxiosProvider";
import { NotificationContext } from "./NotificationProvider";

export function useAuth() {
  return useContext(AuthContext);
}

export function useAxios() {
  return useContext(AxiosContext);
}

export function useNotification() {
  return useContext(NotificationContext);
}
