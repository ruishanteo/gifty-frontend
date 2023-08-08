import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import { BottomNav } from "./components/BottomNav.js";
import { Register } from "./pages/Register.js";
import { Login } from "./pages/Login.js";
import { NotificationProvider } from "./providers/NotificationProvider.js";
import { AuthProvider } from "./providers/AuthProvider.js";
import { useAuth } from "./providers/hooks.js";
import { AxiosProvider } from "./providers/AxiosProvider.js";
import { UserProvider } from "./providers/UserProvider.js";
import { QueryProvider } from "./providers/QueryProvider.js";
import { ResetPassword } from "./pages/ResetPassword.js";

async function cacheFonts(fonts) {
  for (let i = 0; i < fonts.length; i++) {
    const element = fonts[i];
    await Font.loadAsync(element);
  }
}

const Stack = createNativeStackNavigator();
function GetRoutes() {
  const authContext = useAuth();

  return (
    <>
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
    </>
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const colorScheme = useColorScheme();
  const paperTheme =
    colorScheme === "dark"
      ? {
          ...MD3DarkTheme,
          colors: {
            ...MD3DarkTheme.colors,
            primary: "#bc9c9b",
            secondary: "#d1c1c1",
            tertiary: "#b5a596",
            quaternary: "#efd9c6",
            background: "black",
            error: "#ff0000",
            surface: "#78736f",
            font: "white",
          },
        }
      : {
          ...MD3LightTheme,
          colors: {
            ...MD3LightTheme.colors,
            primary: "#d1c1c1",
            secondary: "#bc9c9b",
            tertiary: "#efd9c6",
            quaternary: "#b5a596",
            error: "#ff0000",
            font: "black",
          },
        };

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
    <PaperProvider theme={paperTheme}>
      <NotificationProvider>
        <AuthProvider>
          <AxiosProvider>
            <QueryProvider>
              <NavigationContainer
                theme={{ colors: { background: paperTheme.colors.background } }}
              >
                <GetRoutes />
              </NavigationContainer>
            </QueryProvider>
          </AxiosProvider>
        </AuthProvider>
      </NotificationProvider>
    </PaperProvider>
  );
}
