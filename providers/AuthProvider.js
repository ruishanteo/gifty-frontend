import React, { createContext, useState } from "react";

import { clearJWT } from "../storage/securestorage";

const AuthContext = createContext(null);
const { Provider } = AuthContext;

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
    authenticated: null,
  });

  const logout = async () => {
    await clearJWT();
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
    });
  };

  const setAccessToken = (accessToken) => {
    setAuthState({
      ...authState,
      accessToken,
      authenticated: accessToken ? true : false,
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAccessToken,
        setAuthState,
        logout,
      }}
    >
      {children}
    </Provider>
  );
}

export { AuthContext, AuthProvider };
