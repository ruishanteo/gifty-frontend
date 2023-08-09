import React, { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

import { getSavedDarkMode, setSavedDarkMode } from "../storage/securestorage";

const ThemeContext = createContext(null);
const { Provider } = ThemeContext;

function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const colorScheme = useColorScheme();

  async function setDarkModeTheme(newMode) {
    setDarkMode(newMode);
    await setSavedDarkMode(newMode);
  }

  async function toggleDarkModeTheme() {
    setDarkModeTheme(!darkMode);
  }

  useEffect(() => {
    async function getCurrentDarkMode() {
      const savedDarkMode = await getSavedDarkMode();
      if (savedDarkMode === null) {
        const newMode = colorScheme === "dark";
        setDarkModeTheme(newMode);
      } else {
        setDarkModeTheme(savedDarkMode);
      }
    }
    getCurrentDarkMode();
  }, []);

  const paperTheme = darkMode
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

  return (
    <PaperProvider theme={paperTheme}>
      <Provider
        value={{
          darkMode,
          setDarkMode,
          toggleDarkModeTheme,
          paperTheme,
        }}
      >
        {children}
      </Provider>
    </PaperProvider>
  );
}

export { ThemeContext, ThemeProvider };
