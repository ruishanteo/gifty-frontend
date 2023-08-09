import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import { BottomNav } from "./components/BottomNav.js";
import { Register } from "./pages/Register.js";
import { Login } from "./pages/Login.js";
import { NotificationProvider } from "./providers/NotificationProvider.js";
import { AuthProvider } from "./providers/AuthProvider.js";
import { useAuth, useAppTheme } from "./providers/hooks.js";
import { AxiosProvider } from "./providers/AxiosProvider.js";
import { UserProvider } from "./providers/UserProvider.js";
import { QueryProvider } from "./providers/QueryProvider.js";
import { ResetPassword } from "./pages/ResetPassword.js";
import { ThemeProvider } from "./providers/ThemeProvider.js";

async function cacheFonts(fonts) {
  for (let i = 0; i < fonts.length; i++) {
    const element = fonts[i];
    await Font.loadAsync(element);
  }
}

const Stack = createNativeStackNavigator();
function GetRoutes() {
  const authContext = useAuth();
  const { paperTheme } = useAppTheme();

  return (
    <NavigationContainer
      theme={{
        colors: { background: paperTheme.colors.background },
      }}
    >
      {authContext?.authState?.authenticated ? (
        <UserProvider>
          <BottomNav />
        </UserProvider>
      ) : (
        <>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await cacheFonts([
          { BestMoment: require("./assets/fonts/Best-Moment.otf") },
          { nose: require("./assets/fonts/nose.ttf") },
          { lips: require("./assets/fonts/lips.ttf") },
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <AxiosProvider>
            <QueryProvider>
              <GetRoutes />
            </QueryProvider>
          </AxiosProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}
