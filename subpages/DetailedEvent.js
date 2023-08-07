import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Button, Switch, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DatePickerModal,
  enGB,
  registerTranslation,
} from "react-native-paper-dates";

import moment from "moment";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";

import Layout from "../components/Layout";
import { useDeleteEvent, useUpdateEvent } from "../api/event";

const updateEventValidationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  date: Yup.string().required("Required"),
});

export const DetailedEvent = ({ route, navigation }) => {
  const theme = useTheme();
  const { event } = route.params;
  const updateEventMutation = useUpdateEvent();
  const deleteEventMutation = useDeleteEvent(event.id);
  registerTranslation("en-GB", enGB);

  const [openDatePicker, setOpenDatePicker] = React.useState(false);

  async function updateEvent(values) {
    const newValues = { ...values, id: event.id };
    await updateEventMutation
      .mutateAsync(newValues)
      .then(() => navigation.goBack());
  }

  async function deleteEvent() {
    await deleteEventMutation.mutateAsync().then(() => navigation.goBack());
  }

  const EditProp = ({ prop }) => {
    const { handleChange, handleBlur, setFieldValue, values, errors, touched } =
      useFormikContext();
    return (
      <View
        flexDirection="row"
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ width: 100 }} variant="bodyLarge">
          {prop.toUpperCase()}
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
            <TouchableOpacity
              onPress={() => setOpenDatePicker(true)}
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                marginLeft: 30,
              }}
            >
              <Text>
                {moment(values.date, "DD MMM YYYY").format("DD MMMM YYYY")}
              </Text>
            </TouchableOpacity>
          ) : prop === "reminder" ? (
            <Switch
              value={values[prop]}
              onValueChange={(value) => {
                setFieldValue("reminder", value);
              }}
            />
          ) : (
            <TextInput
              style={{ width: 200, backgroundColor: theme.colors.tertiary }}
              label={prop}
              multiline={true}
              maxLength={50}
              numberOfLines={5}
              onChangeText={(value) => handleChange(prop)(value)}
              onBlur={() => handleBlur(prop)}
              value={values[prop]}
              error={errors[prop] && touched[prop]}
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
        <Formik
          validationSchema={updateEventValidationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            name: event.name,
            date: event.date,
            reminder: event.reminder,
          }}
          onSubmit={(values) => updateEvent(values)}
        >
          {({ isSubmitting, handleSubmit, setFieldValue, values }) => (
            <View
              style={{
                gap: 20,
                alignItems: "center",
              }}
            >
              <EditProp prop="name" name="name" />
              <EditProp prop="date" name="date" />
              <EditProp prop="reminder" name="reminder" />
              <DatePickerModal
                locale="en-GB"
                mode="single"
                visible={openDatePicker}
                onDismiss={() => setOpenDatePicker(false)}
                onConfirm={(params) => {
                  setFieldValue("date", params.date);
                  setOpenDatePicker(false);
                }}
                date={moment(values.date, "DD MMM YYYY").toDate()}
              />

              <View flexDirection="row" style={{ width: 300, gap: 10 }}>
                <Button
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                  mode="contained"
                  icon="content-save"
                  buttonColor={theme.colors.quaternary}
                  style={{ width: "50%" }}
                >
                  Save
                </Button>
                <Button
                  mode="contained"
                  icon="delete"
                  buttonColor={theme.colors.quaternary}
                  onPress={deleteEvent}
                  style={{ width: "50%" }}
                >
                  Delete
                </Button>
              </View>
            </View>
          )}
        </Formik>
      </Layout>
    </SafeAreaView>
  );
};
