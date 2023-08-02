import React, { createContext, useContext, useEffect, useState } from "react";

import { AxiosContext } from "./AxiosProvider";

const UserContext = createContext(null);
const { Provider } = UserContext;

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const { protectedAxios } = useContext(AxiosContext);

  const reloadUser = async () => {
    const user = await protectedAxios
      .get("auth/", {})
      .then((res) => {
        const currentUser = res.data?.data?.user;
        setUser(currentUser);
        return currentUser;
      })
      .catch((error) => {
        setUser(null);
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
