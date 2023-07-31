import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import { BottomNav } from "./components/BottomNav.js";
import { Register } from "./pages/Register.js";
import { Login } from "./pages/Login.js";

const Stack = createNativeStackNavigator();

const getIsSignedIn = () => {
  return true;
};

async function cacheFonts(fonts) {
  for (let i = 0; i < fonts.length; i++) {
    const element = fonts[i];
    await Font.loadAsync(element);
  }
}

export default function App() {
  const isSignedIn = getIsSignedIn();
  const [appIsReady, setAppIsReady] = React.useState(false);

  const colorScheme = useColorScheme();
  const paperTheme =
    colorScheme === "dark"
      ? {
          ...MD3DarkTheme,
          colors: {
            primary: "#bc9c9b",
            secondary: "#d1c1c1",
            tertiary: "#b5a596",
            quaternary: "#efd9c6",
            surface: MD3DarkTheme.colors.background,
          },
        }
      : {
          ...MD3LightTheme,
          colors: {
            primary: "#d1c1c1",
            secondary: "#bc9c9b",
            tertiary: "#efd9c6",
            quaternary: "#b5a596",
            surface: MD3LightTheme.colors.background,
          },
        };

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await cacheFonts([
          { BestMoment: require("./assets/fonts/Best-Moment.otf") },
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
      <NavigationContainer>
        {isSignedIn ? (
          <>
            <BottomNav />
          </>
        ) : (
          <>
            <Stack.Navigator>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
          </>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
