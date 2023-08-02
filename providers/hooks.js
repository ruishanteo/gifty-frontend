import { useContext } from "react";

import { AuthContext } from "./AuthProvider";
import { AxiosContext } from "./AxiosProvider";
import { NotificationContext } from "./NotificationProvider";
import { UserContext } from "./UserProvider";

export function useAuth() {
  return useContext(AuthContext);
}

export function useAxios() {
  return useContext(AxiosContext);
}

export function useUser() {
  return useContext(UserContext);
}

export function useNotification() {
  return useContext(NotificationContext);
}
