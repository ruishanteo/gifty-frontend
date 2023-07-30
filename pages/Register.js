import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import {
  DatePickerModal,
  enGB,
  registerTranslation,
} from "react-native-paper-dates";
import moment from "moment";
import { Image } from "@rneui/themed";

import logo from "../assets/logo.png";

export function Register({ navigation }) {
  const theme = useTheme();

  const [date, setDate] = React.useState(undefined);
  const [openDatePicker, setOpenDatePicker] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpenDatePicker(false);
  }, [setOpenDatePicker]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpenDatePicker(false);
      setDate(params.date);
    },
    [setOpenDatePicker, setDate]
  );

  registerTranslation("en-GB", enGB);

  return (
    <View style={styles.container}>
      <Image
        containerStyle={{
          width: "40%",
          aspectRatio: 1,
        }}
        source={{ uri: Image.resolveAssetSource(logo).uri }}
      />
      <Text variant="headlineMedium">Get Started</Text>
      <View style={{ width: "75%" }}>
        <TextInput mode="outlined" placeholder="Username" />
        <TextInput mode="outlined" placeholder="Email" />
        <TextInput mode="outlined" placeholder="Password" />
        <TextInput mode="outlined" placeholder="Confirm Password" />
        <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
          <View
            style={{
              width: "100%",
              height: 50,
              marginTop: 6,

              borderColor: "grey",
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            {date ? (
              <Text>{moment(date).format("DD MMM YYYY")}</Text>
            ) : (
              <Text>Please select your birthday</Text>
            )}
          </View>
        </TouchableOpacity>
        <DatePickerModal
          locale="en-GB"
          mode="single"
          visible={openDatePicker}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
        />
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
        Sign up
      </Button>
      <Text>Already have an account?</Text>
      <Button
        style={{ marginTop: -5 }}
        onPress={() => navigation.navigate("Login")}
      >
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
