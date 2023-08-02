export const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.EXPO_PUBLIC_LOCAL_API_URL
    : process.env.EXPO_PUBLIC_API_URL;
