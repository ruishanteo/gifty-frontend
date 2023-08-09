import { useContext } from "react";

import { AuthContext } from "./AuthProvider";
import { AxiosContext } from "./AxiosProvider";
import { NotificationContext } from "./NotificationProvider";
import { ThemeContext } from "./ThemeProvider";
import { UserContext } from "./UserProvider";
import { QueryContext } from "./QueryProvider";

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

export function useQueryContext() {
  return useContext(QueryContext);
}

export function useAppTheme() {
  return useContext(ThemeContext);
}
