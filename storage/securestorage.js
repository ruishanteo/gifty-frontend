import * as SecureStore from "expo-secure-store";

export async function saveKeyToStorage(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function getKeyFromStorage(key) {
  return await SecureStore.getItemAsync(key);
}

export async function deleteKeyFromStorage(key) {
  await SecureStore.deleteItemAsync(key);
}

const JWT_TOKEN_KEY = "token";

export async function getJWT() {
  return JSON.parse(await getKeyFromStorage(JWT_TOKEN_KEY));
}

export async function setJWT(accessToken, refreshToken) {
  await saveKeyToStorage(
    JWT_TOKEN_KEY,
    JSON.stringify({ accessToken, refreshToken })
  );
}

export async function clearJWT() {
  await deleteKeyFromStorage(JWT_TOKEN_KEY);
}
