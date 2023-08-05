import React, { createContext, useContext } from "react";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import { AuthContext } from "./AuthProvider";
import { NotificationContext } from "./NotificationProvider";
import { API_URL } from "../config/config";

const AxiosContext = createContext();
const { Provider } = AxiosContext;

function AxiosProvider({ children }) {
  const authContext = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);

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

  protectedAxios.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      showNotification({
        title: "Request failed",
        description:
          error.response?.data?.message || error.message || "Please try again.",
        type: "error",
      });
      return Promise.reject(error);
    }
  );

  publicAxios.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      showNotification({
        title: "Request failed",
        description:
          error.response?.data?.message || error.message || "Please try again.",
        type: "error",
      });
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
      url: `${API_URL}/public/auth/refreshToken`,
    };
    return axios(options)
      .then(async (tokenRefreshResponse) => {
        await authContext.setTokens(tokenRefreshResponse.tokens);
        failedRequest.response.config.headers.Authorization =
          tokenRefreshResponse.tokens.accessToken;
        return Promise.resolve();
      })
      .catch((e) => {
        authContext.logout();
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
