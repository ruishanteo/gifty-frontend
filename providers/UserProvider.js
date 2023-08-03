import React, { createContext, useContext, useEffect, useState } from "react";

import { AuthContext } from "./AuthProvider";
import { AxiosContext } from "./AxiosProvider";
import { NotificationContext } from "./NotificationProvider";

const UserContext = createContext(null);
const { Provider } = UserContext;

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const { protectedAxios } = useContext(AxiosContext);
  const { logout } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);

  const reloadUser = async () => {
    const user = await protectedAxios
      .get("auth/", {})
      .then((res) => {
        const currentUser = res.data?.data?.user;
        setUser(currentUser);
        return currentUser;
      })
      .catch((error) => {
        showNotification({
          title: "An error as occured",
          description: "Please try again later.",
          type: "error",
        });
        setUser(null);
        logout();
      });
    return user;
  };

  useEffect(() => {
    reloadUser();
  }, []);

  console.log("ya1");

  if (!user) return null;

  return (
    <Provider
      value={{
        user,
        reloadUser,
      }}
    >
      {children}
    </Provider>
  );
}

export { UserContext, UserProvider };
