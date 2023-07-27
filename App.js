import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { BottomNav } from "./components/BottomNav.js";

export default function App() {
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
        {/* <View style={styles.container}>
          <Text>Test </Text>
          <StatusBar style="auto" />
        </View> */}
        <BottomNav />
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
