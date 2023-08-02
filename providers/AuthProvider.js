import React, { createContext, useCallback, useEffect, useState } from "react";

import { clearJWT, getJWT, setJWT } from "../storage/securestorage";

const AuthContext = createContext(null);
const { Provider } = AuthContext;

function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
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

  const setAccessToken = async (accessToken) => {
    await setJWT(accessToken, "");
    setAuthState({
      ...authState,
      accessToken,
      authenticated: accessToken ? true : false,
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  const loadJWT = useCallback(async () => {
    const jwt = await getJWT();
    setAuthState({
      accessToken: jwt?.accessToken || null,
      refreshToken: jwt?.refreshToken || null,
      authenticated: (jwt?.accessToken && true) || false,
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  if (loading) return null;

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAccessToken,
        logout,
      }}
    >
      {children}
    </Provider>
  );
}

export { AuthContext, AuthProvider };
