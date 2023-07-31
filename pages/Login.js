import React from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

import { Image } from "@rneui/themed";

import logo from "../assets/logo.png";
import { SafeAreaView } from "react-native-safe-area-context";

export function Login({ navigation }) {
  const theme = useTheme();
  const windowHeight = Dimensions.get("window").height;

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <Image
          containerStyle={{
            width: "40%",
            aspectRatio: 1,
          }}
          source={{ uri: Image.resolveAssetSource(logo).uri }}
        />
        <Text variant="headlineMedium">Welcome back</Text>
        <View style={{ width: "75%" }}>
          <TextInput mode="outlined" placeholder="Email" />
          <TextInput mode="outlined" placeholder="Password" />
        </View>
        <Button
          mode="contained"
          textColor={theme.colors.surface}
          buttonColor={theme.colors.secondary}
          style={{
            marginTop: 10,
            marginBottom: 15,
          }}
        >
          Login
        </Button>
        <Text>Don't have an account?</Text>
        <Button
          style={{ marginTop: -5 }}
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </Button>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 40,
  },
});
