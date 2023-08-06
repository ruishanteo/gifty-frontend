import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Image } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";

import logo from "../assets/logo.png";

export function Home() {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.tertiary, paddingBottom: -20 }}
    >
      <View style={[styles.container]}>
        <Image
          containerStyle={{ width: 50, aspectRatio: 1 }}
          source={{ uri: Image.resolveAssetSource(logo).uri }}
        />
        <Text style={{ fontFamily: "BestMoment" }} variant="displayLarge">
          gifty
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 70,
    flexDirection: "row",
    gap: 15,
  },
});
