import React, { createContext, useContext, useEffect, useState } from "react";

import { AuthContext } from "./AuthProvider";
import { AxiosContext } from "./AxiosProvider";

const UserContext = createContext(null);
const { Provider } = UserContext;

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const { protectedAxios } = useContext(AxiosContext);
  const { logout } = useContext(AuthContext);

  const reloadUser = async () => {
    const user = await protectedAxios
      .get("auth/", {})
      .then((res) => {
        const currentUser = res.user;
        setUser(currentUser);
        return currentUser;
      })
      .catch(() => {
        setUser(null);
        logout();
      });
    return user;
  };

  useEffect(() => {
    reloadUser();
  }, []);

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
