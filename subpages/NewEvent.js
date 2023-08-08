import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import {
  Button,
  HelperText,
  IconButton,
  Switch,
  Text,
  useTheme,
} from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import Modal from "react-native-modal";

import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";

import Layout from "../components/Layout";
import { useCreateEvent } from "../api/event";

const createEventValidationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  date: Yup.string().required("Required"),
});

export function NewEvent() {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const createEventMutation = useCreateEvent();

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

  async function createEvent(values) {
    await createEventMutation.mutateAsync(values).then(() => setOpen(false));
  }

  return (
    <View style={{ alignItems: "flex-end", flex: 1 }}>
      <IconButton
        onPress={() => setOpen(true)}
        containerColor={theme.colors.secondary}
        iconColor={theme.colors.background}
        size={30}
        icon="plus"
      />

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
              <Formik
                validationSchema={createEventValidationSchema}
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={{
                  name: "",
                  birthday: "",
                  reminder: false,
                }}
                onSubmit={(values) => createEvent(values)}
              >
                {({
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                  errors,
                  touched,
                }) => (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {inputFields(
                      "Name",
                      <TextInput
                        label="name"
                        placeholder="Please add name"
                        multiline={true}
                        maxLength={50}
                        numberOfLines={5}
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        value={values.name}
                        error={errors.name && touched.name}
                      />
                    )}

                    <HelperText
                      type="error"
                      visible={Boolean(errors.name && touched.name)}
                    >
                      {errors.name}
                    </HelperText>

                    {inputFields(
                      "Date",
                      <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
                        {values.date ? (
                          <Text>
                            {moment(values.date).format("DD MMM YYYY")}
                          </Text>
                        ) : (
                          <Text>Please select date</Text>
                        )}
                      </TouchableOpacity>
                    )}
                    <HelperText
                      type="error"
                      visible={Boolean(errors.date && touched.date)}
                    >
                      {errors.date}
                    </HelperText>

                    {inputFields(
                      "Reminder",
                      <Switch
                        value={values.reminder}
                        onValueChange={(value) => {
                          setFieldValue("reminder", value);
                        }}
                      />
                    )}

                    <DatePickerModal
                      locale="en-GB"
                      mode="single"
                      visible={openDatePicker}
                      onDismiss={() => setOpenDatePicker(false)}
                      date={values.date}
                      onConfirm={(params) => {
                        setOpenDatePicker(false);
                        setFieldValue("date", params.date);
                      }}
                    />

                    <Button
                      onPress={handleSubmit}
                      disabled={isSubmitting}
                      buttonColor={theme.colors.quaternary}
                      textColor={theme.colors.background}
                      padding={5}
                      style={{ marginTop: 50 }}
                      icon="check"
                    >
                      Done
                    </Button>
                  </View>
                )}
              </Formik>
            </Layout>
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
