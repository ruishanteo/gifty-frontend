import {
  useAuth,
  useAxios,
  useNotification,
  useUser,
} from "../providers/hooks";

export function useLogin() {
  const { publicAxios } = useAxios();
  const { setAccessToken } = useAuth();
  const { showNotification } = useNotification();

  return async (loginRequest) => {
    return await publicAxios
      .post("auth/login", loginRequest)
      .then((res) => {
        setAccessToken(res.data.data.token);
        showNotification({
          title: "Login successful",
          description: `Welcome back ${res.data.data.user.username}!`,
          type: "success",
        });
      })
      .catch((error) => {
        showNotification({
          title: "Login failed",
          description: error.response.data?.message || "Please try again.",
          type: "error",
        });
      });
  };
}

export function useRegister() {
  const { publicAxios } = useAxios();
  const { setAccessToken } = useAuth();
  const { showNotification } = useNotification();

  return async (registerRequest) => {
    return await publicAxios
      .post("auth/register", registerRequest)
      .then((res) => {
        setAccessToken(res.data.data.token);
        showNotification({
          title: "Register successful",
          description: "Welcome to gifty!",
          type: "success",
        });
      })
      .catch((error) => {
        showNotification({
          title: "Registration failed",
          description: error.response.data?.message || "Please try again.",
          type: "error",
        });
      });
  };
}

export function useUpdateUser() {
  const { protectedAxios } = useAxios();
  const { reloadUser } = useUser();
  const { showNotification } = useNotification();

  return async (updateRequest) => {
    return await protectedAxios
      .put("auth/updateUser", updateRequest)
      .then((res) => {
        reloadUser();
        showNotification({
          title: "Update Successful",
          description: "Updated your account information",
          type: "success",
        });
        return res;
      })
      .catch((error) => {
        showNotification({
          title: "Update failed",
          description: error.response.data?.message || "Please try again.",
          type: "error",
        });
      });
  };
}
