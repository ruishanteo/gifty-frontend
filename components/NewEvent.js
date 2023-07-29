import React from "react";
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Switch, Text, useTheme } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import Modal from "react-native-modal";
import { SafeAreaProvider } from "react-native-safe-area-context";

import moment from "moment";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export function NewEvent() {
  const theme = useTheme();

  const [date, setDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const windowHeight = Dimensions.get("window").height;

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

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

  const inputFields = (title, object) => {
    return (
      <View
        flexDirection="row"
        style={{
          paddingVertical: 10,
          height: 50,
          alignItems: "center",
        }}
      >
        <View style={{ width: 150 }}>
          <Text variant="titleMedium">{title}</Text>
        </View>
        <View style={{ width: 150 }}>{object}</View>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <View
        style={{
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Button
          onPress={() => setOpen(true)}
          buttonColor={theme.colors.secondary}
          textColor="#ffffff"
          padding="3%"
        >
          <MaterialCommunityIcons name="plus" color="#ffffff" />
          <Text style={{ color: "white" }}>{"  "}Event</Text>
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
                  height: windowHeight * 0.5,
                },
              ]}
            >
              <View style={{ width: "100%" }}>
                <TouchableOpacity onPress={() => setOpen(false)}>
                  <MaterialCommunityIcons name="close" size={26} />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.titleText}>Add Event</Text>

                {inputFields(
                  "Name",
                  <TextInput
                    placeholder="Please add name"
                    multiline={true}
                    maxLength={50}
                    numberOfLines={5}
                  />
                )}

                {inputFields(
                  "Date",
                  <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
                    {date ? (
                      <Text>{moment(date).format("DD MMM YYYY")}</Text>
                    ) : (
                      <Text>Please select date</Text>
                    )}
                  </TouchableOpacity>
                )}

                {inputFields(
                  "Reminder",
                  <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                )}

                <Button
                  buttonColor={theme.colors.quaternary}
                  textColor={theme.colors.surface}
                  padding="2%"
                  style={{ marginTop: 80 }}
                >
                  <MaterialCommunityIcons name="check" color="#ffffff" />
                  <Text style={{ color: "white" }}>{"  "}Done</Text>
                </Button>
              </View>

              <DatePickerModal
                locale="en-GB"
                mode="single"
                visible={openDatePicker}
                onDismiss={onDismissSingle}
                date={date}
                onConfirm={onConfirmSingle}
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaProvider>
  );
}

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
    backgroundColor: "#fff",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    paddingVertical: 20,
  },
});
