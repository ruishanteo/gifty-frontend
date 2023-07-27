import { StyleSheet, Text, View } from "react-native";

export function Wishlist() {
  return (
    <View style={styles.container}>
      <Text>Wishlist</Text>
    </View>
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
