import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Avatar,
  Button,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import {
  DatePickerModal,
  enGB,
  registerTranslation,
} from "react-native-paper-dates";
import Modal from "react-native-modal";

import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const inputFields = (name) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const windowHeight = Dimensions.get("window").height;

  return (
    <>
      <Button
        onPress={() => setOpen(true)}
        mode="contained"
        style={{ width: "60%", marginTop: 10 }}
        textColor={theme.colors.font}
      >
        {name}
      </Button>
      <Modal
        animationType="slide"
        visible={open}
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {
                backgroundColor: theme.colors.tertiary,
                height: windowHeight * 0.25,
              },
            ]}
          >
            <View style={{ width: "100%" }}>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <MaterialCommunityIcons name="close" size={26} />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10, justifyContent: "center" }}>
              <Text variant="titleLarge">Edit {name}</Text>
              <TextInput placeholder={name} />
              <Button
                icon="check"
                mode="contained"
                buttonColor={theme.colors.quaternary}
                textColor={theme.colors.surface}
                onPress={() => setOpen(false)}
              >
                Done
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export const EditProfile = ({ navigation }) => {
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
    <SafeAreaView>
      <IconButton icon="chevron-left" onPress={() => navigation.goBack()} />

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text variant="titleLarge" style={{ marginBottom: 20 }}>
          Edit Profile
        </Text>
        <Button onPress={() => console.log("changed picture")}>
          <Avatar.Image
            size={150}
            source={{
              url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            }}
          />
        </Button>
        {inputFields("Username")}
        {inputFields("Email")}
        <Button
          onPress={() => setOpenDatePicker(true)}
          mode="contained"
          style={{ width: "60%", marginTop: 10 }}
        >
          {date ? (
            <Text style={{ color: theme.colors.font }}>
              {moment(date).format("DD MMM YYYY")}
            </Text>
          ) : (
            <Text style={{ color: theme.colors.font }}>Birthday</Text>
          )}
        </Button>
        {inputFields("Password")}
        <DatePickerModal
          locale="en-GB"
          mode="single"
          visible={openDatePicker}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
});
