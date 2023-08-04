import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DatePickerModal,
  enGB,
  registerTranslation,
} from "react-native-paper-dates";
import moment from "moment";
import Layout from "../components/Layout";

export const DetailedEvent = ({ route, navigation }) => {
  const theme = useTheme();
  const { event } = route.params;
  registerTranslation("en-GB", enGB);

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

  const EditProp = ({ prop }) => {
    return (
      <View
        flexDirection="row"
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ width: 200 }} variant="bodyLarge">
          {prop}
        </Text>
        <View
          style={{
            width: 200,
            height: 50,
            backgroundColor: theme.colors.tertiary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {prop === "date" ? (
            <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
              <Text>{moment(event.date).format("DD MMM YYYY")}</Text>
            </TouchableOpacity>
          ) : (
            <TextInput
              style={{ width: 200, backgroundColor: theme.colors.tertiary }}
              placeholder={event[prop]}
            />
          )}
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <Layout
        title={event.name}
        iconName="chevron-left"
        onAction={() => navigation.goBack()}
      >
        <View
          style={{
            gap: 20,
            alignItems: "center",
          }}
        >
          <EditProp prop="name" />
          <EditProp prop="date" />
          <DatePickerModal
            locale="en-GB"
            mode="single"
            visible={openDatePicker}
            onDismiss={onDismissSingle}
            date={date}
            onConfirm={onConfirmSingle}
          />
          <Button
            mode="contained"
            icon="delete"
            buttonColor={theme.colors.quaternary}
            onPress={() => console.log("delete event")}
            style={{ width: 300 }}
          >
            Delete
          </Button>
        </View>
      </Layout>
    </SafeAreaView>
  );
};
