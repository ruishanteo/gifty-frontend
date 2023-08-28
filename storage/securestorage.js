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
const DARK_MODE_KEY = "darkMode";
const SCHEDULED_NOTIFICATIONS_KEY = "scheduledNotifications";

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

export async function getSavedDarkMode() {
  return JSON.parse(await getKeyFromStorage(DARK_MODE_KEY));
}

export async function setSavedDarkMode(darkMode) {
  await saveKeyToStorage(DARK_MODE_KEY, JSON.stringify(darkMode));
}

export async function getScheduledNotifications() {
  const storedValue = await getKeyFromStorage(SCHEDULED_NOTIFICATIONS_KEY);
  return storedValue ? JSON.parse(storedValue) : {};
}

export async function setScheduledNotifications(scheduledNotifications) {
  await saveKeyToStorage(
    SCHEDULED_NOTIFICATIONS_KEY,
    JSON.stringify(scheduledNotifications)
  );
}
