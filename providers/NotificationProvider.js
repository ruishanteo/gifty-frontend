import { createContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Easing,
  Notifier,
  NotifierComponents,
  NotifierWrapper,
} from "react-native-notifier";
import * as Device from "expo-device";

const NotificationContext = createContext(null);
const { Provider } = NotificationContext;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function NotificationProvider({ children }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function registerForPushNotificationsAsync() {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
      if (Device.isDevice) await Notifications.getPermissionsAsync();
      setLoading(false);
    }
    registerForPushNotificationsAsync();
  }, []);

  async function schedulePushNotification(content, delay = 2) {
    await Notifications.scheduleNotificationAsync({
      content,
      trigger: { seconds: delay },
    });
  }

  async function pushNotification(content) {
    await Notifications.scheduleNotificationAsync({
      content,
      trigger: { seconds: 0 },
    });
  }

  function showNotification(content) {
    console.log(content);
    Notifier.showNotification({
      duration: 3000,
      showAnimationDuration: 800,
      showEasing: Easing.ease,
      hideOnPress: true,
      Component: content.type
        ? NotifierComponents.Alert
        : NotifierComponents.Notification,
      componentProps: {
        alertType: content.type,
      },
      ...content,
    });
  }

  if (loading) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NotifierWrapper queueMode="reset">
        <Provider
          value={{
            schedulePushNotification,
            pushNotification,
            showNotification,
          }}
        >
          {children}
        </Provider>
      </NotifierWrapper>
    </GestureHandlerRootView>
  );
}

export { NotificationContext, NotificationProvider };