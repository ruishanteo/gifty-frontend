import {
  useAuth,
  useAxios,
  useNotification,
  useUser,
} from "../providers/hooks";

export function useLogin() {
  const { publicAxios } = useAxios();
  const { setTokens } = useAuth();
  const { showNotification } = useNotification();

  return async (loginRequest) => {
    return await publicAxios
      .post("auth/login", loginRequest)
      .then((res) => {
        setTokens(res.tokens);
        showNotification({
          title: "Login successful",
          description: `Welcome back ${res.user.username}!`,
          type: "success",
        });
      })
      .catch(() => {});
  };
}

export function useRegister() {
  const { publicAxios } = useAxios();
  const { setTokens } = useAuth();
  const { showNotification } = useNotification();

  return async (registerRequest) => {
    return await publicAxios
      .post("auth/register", registerRequest)
      .then((res) => {
        setTokens(res.tokens);
        showNotification({
          title: "Register successful",
          description: "Welcome to gifty!",
          type: "success",
        });
      })
      .catch(() => {});
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
      .catch(() => {});
  };
}

export function useUpdatePassword() {
  const { protectedAxios } = useAxios();
  const { reloadUser } = useUser();
  const { showNotification } = useNotification();

  return async (updateRequest) => {
    return await protectedAxios
      .put("auth/updatePassword", updateRequest)
      .then((res) => {
        reloadUser();
        showNotification({
          title: "Update Successful",
          description: "Updated your password",
          type: "success",
        });
        return res;
      })
      .catch(() => {});
  };
}

export function useUpdateAvatar() {
  const { protectedAxios } = useAxios();
  const { reloadUser } = useUser();
  const { showNotification } = useNotification();

  return async (updateRequest) => {
    return await protectedAxios
      .put("auth/updateAvatar", updateRequest)
      .then((res) => {
        reloadUser();
        showNotification({
          title: "Update Successful",
          description: "Updated your avatar",
          type: "success",
        });
        return res;
      })
      .catch(() => {});
  };
}

export function useDeleteAccount() {
  const { protectedAxios } = useAxios();
  const { logout } = useAuth();
  const { showNotification } = useNotification();

  return async () => {
    return await protectedAxios
      .delete("auth/deleteUser")
      .then((res) => {
        logout();
        showNotification({
          title: "Deleted Account Successful",
          description: "Deleted your account",
          type: "success",
        });
        return res;
      })
      .catch(() => {});
  };
}

export function useGetOTP() {
  const { publicAxios } = useAxios();
  const { showNotification } = useNotification();

  return async (values) => {
    return await publicAxios.post("auth/getOTP", values).then((res) => {
      showNotification({
        title: "OTP Sent",
        description: "Check your email for the OTP",
        type: "success",
      });
      return res;
    });
  };
}

export function useResetPassword() {
  const { publicAxios } = useAxios();
  const { showNotification } = useNotification();

  return async (resetRequest) => {
    return await publicAxios
      .post("auth/resetPassword", resetRequest)
      .then((res) => {
        showNotification({
          title: "Reset Password Successful",
          description: "Successful password reset! Please log in",
          type: "success",
        });
        return res;
      });
  };
}
