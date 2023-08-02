import React, { createContext, useContext } from "react";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import { AuthContext } from "./AuthProvider";
import { API_URL } from "../config/config";
import { setJWT } from "../storage/securestorage";

const AxiosContext = createContext();
const { Provider } = AxiosContext;

function AxiosProvider({ children }) {
  const authContext = useContext(AuthContext);

  const publicAxios = axios.create({
    baseURL: `${API_URL}/public/`,
  });

  const protectedAxios = axios.create({
    baseURL: `${API_URL}/api/`,
  });

  protectedAxios.interceptors.request.use(
    (config) => {
      config.headers.Accept = "application/json";
      if (!config.headers.Authorization) {
        config.headers.Authorization = `${authContext.getAccessToken()}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const refreshAuthLogic = (failedRequest) => {
    const data = {
      refreshToken: authContext.authState.refreshToken,
    };
    const options = {
      method: "POST",
      data,
      url: `${API_URL}/api/refreshToken`,
    };
    return axios(options)
      .then(async (tokenRefreshResponse) => {
        failedRequest.response.config.headers.Authorization =
          tokenRefreshResponse.data.accessToken;
        authContext.setAuthState({
          ...authContext.authState,
          accessToken: tokenRefreshResponse.data.accessToken,
        });

        await setJWT(
          tokenRefreshResponse.data.accessToken,
          authContext.authState.refreshToken
        );

        return Promise.resolve();
      })
      .catch((e) => {
        authContext.setAuthState({
          accessToken: null,
          refreshToken: null,
        });
      });
  };

  createAuthRefreshInterceptor(protectedAxios, refreshAuthLogic, {});

  return (
    <Provider
      value={{
        protectedAxios,
        publicAxios,
      }}
    >
      {children}
    </Provider>
  );
}

export { AxiosContext, AxiosProvider };
