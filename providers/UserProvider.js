import React, { createContext, useContext, useEffect, useState } from "react";

import { AuthContext } from "./AuthProvider";
import { AxiosContext } from "./AxiosProvider";
import { LoadingIcon } from "../components/LoadingIcon";

const UserContext = createContext(null);
const { Provider } = UserContext;

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { protectedAxios } = useContext(AxiosContext);
  const { logout } = useContext(AuthContext);

  const reloadUser = async () => {
    const user = await protectedAxios
      .get("auth/0", {})
      .then((res) => {
        const currentUser = res.user;
        setUser(currentUser);
        setLoading(false);
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

  if (loading) return <LoadingIcon fullSize={true} />;
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
