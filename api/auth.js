import { useAuth, useAxios, useNotification } from "../providers/hooks";

export function useLogin() {
  const { publicAxios } = useAxios();
  const { setAccessToken } = useAuth();
  const { showNotification } = useNotification();

  return async (loginRequest) => {
    return await publicAxios
      .post("public/auth/login", loginRequest)
      .then((res) => {
        setAccessToken(res.data.data.token);
        showNotification({
          title: "Login Successful",
          description: "Welcome to gifty!",
          type: "success",
        });
      })
      .catch((error) => {
        showNotification({
          title: "Login Failed",
          description: error.response.data?.message || "Please try again.",
          type: "error",
        });
      });
  };
}
