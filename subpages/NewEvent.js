import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Button, Switch, Text, useTheme } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import Modal from "react-native-modal";

import moment from "moment";

import Layout from "../components/Layout";

export function NewEvent() {
  const theme = useTheme();

  const [date, setDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

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
          <Text variant="titleMedium" style={{ color: theme.colors.font }}>
            {title}
          </Text>
        </View>
        <View style={{ width: 150 }}>{object}</View>
      </View>
    );
  };

  return (
    <View style={{ marginBottom: -35 }}>
      <Button
        onPress={() => setOpen(true)}
        buttonColor={theme.colors.secondary}
        textColor={theme.colors.background}
        padding={5}
        icon="plus"
      >
        Event
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
              { backgroundColor: theme.colors.tertiary },
            ]}
          >
            <Layout
              title="Add Event"
              onAction={() => setOpen(false)}
              iconName="close"
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
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
                  textColor={theme.colors.background}
                  padding={5}
                  style={{ marginTop: 50 }}
                  icon="check"
                >
                  Done
                </Button>
              </View>
            </Layout>

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
  },
});
