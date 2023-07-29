import { StyleSheet, useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { BottomNav } from "./components/BottomNav.js";
import { Register } from "./pages/Register.js";
import { Login } from "./pages/Login.js";

const Stack = createNativeStackNavigator();

const getIsSignedIn = () => {
  return true;
};

export default function App() {
  const isSignedIn = getIsSignedIn();

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
