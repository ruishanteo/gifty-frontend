import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  HelperText,
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
import { Formik } from "formik";
import moment from "moment";
import * as Yup from "yup";

import { useUpdatePassword, useUpdateUser } from "../api/auth";
import { useUser } from "../providers/hooks";

const FieldModal = ({ buttonDisplayText, name, open, setOpen, children }) => {
  const theme = useTheme();

  return (
    <>
      <Button
        onPress={() => setOpen(true)}
        mode="contained"
        style={{ width: "60%", marginTop: 10 }}
        textColor={theme.colors.font}
      >
        {buttonDisplayText}
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
                heigh: "50%",
              },
            ]}
          >
            <View
              style={{ width: "100%", flexDirection: "row", marginBottom: 10 }}
            >
              <Text variant="titleLarge" style={{ flexGrow: 1 }}>
                Edit {name}
              </Text>
              <IconButton onPress={() => setOpen(false)} icon="close" />
            </View>
            <View
              style={{ width: "100%", marginTop: 10, justifyContent: "center" }}
            >
              {children}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const UpdateParticular = (name) => {
  const theme = useTheme();
  const updateUser = useUpdateUser();
  const { user } = useUser();
  const nameInUser = name.toLowerCase();
  const [open, setOpen] = React.useState(false);

  return (
    <FieldModal
      buttonDisplayText={`${name}: ${user[nameInUser]}`}
      name={name}
      open={open}
      setOpen={setOpen}
    >
      <Formik
        validationSchema={Yup.object().shape({
          [name]: Yup.string().required(`${name} is required`),
        })}
        initialValues={{ [name]: user[nameInUser] }}
        onSubmit={(values) => {
          updateUser({ [`new${name}`]: values[name] });
          setOpen(false);
        }}
      >
        {({
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              mode="flat"
              placeholder={name}
              onChangeText={handleChange(name)}
              onBlur={handleBlur(name)}
              value={values[name]}
              error={errors[name] && touched[name]}
            />
            <HelperText
              type="error"
              visible={Boolean(errors[name] && touched[name])}
            >
              {errors[name]}
            </HelperText>
            <Button
              onPress={handleSubmit}
              disabled={isSubmitting}
              icon="check"
              mode="contained"
              buttonColor={theme.colors.quaternary}
              textColor={theme.colors.surface}
            >
              Done
            </Button>
          </>
        )}
      </Formik>
    </FieldModal>
  );
};

const UpdatePassword = () => {
  const theme = useTheme();
  const updatePassword = useUpdatePassword();
  const [open, setOpen] = React.useState(false);

  return (
    <FieldModal
      buttonDisplayText="Change password"
      name="password"
      open={open}
      setOpen={setOpen}
    >
      <Formik
        validationSchema={Yup.object().shape({
          currentPassword: Yup.string().required("Required"),
          newPassword: Yup.string().required("Required"),
          confirmNewPassword: Yup.string()
            .required("Required")
            .oneOf([Yup.ref("newPassword"), null], "Passwords do not match"),
        })}
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
        onSubmit={(values) => {
          updatePassword(values);
          setOpen(false);
        }}
      >
        {({
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              mode="flat"
              label="Current password"
              onChangeText={handleChange("currentPassword")}
              onBlur={handleBlur("currentPassword")}
              value={values.currentPassword}
              error={errors.currentPassword && touched.currentPassword}
            />
            <HelperText
              type="error"
              visible={Boolean(
                errors.currentPassword && touched.currentPassword
              )}
            >
              {errors.newPassword}
            </HelperText>
            <TextInput
              mode="flat"
              label="New password"
              onChangeText={handleChange("newPassword")}
              onBlur={handleBlur("newPassword")}
              value={values.newPassword}
              error={errors.newPassword && touched.newPassword}
            />
            <HelperText
              type="error"
              visible={Boolean(errors.newPassword && touched.newPassword)}
            >
              {errors.newPassword}
            </HelperText>
            <TextInput
              mode="flat"
              label="Confirm new password"
              onChangeText={handleChange("confirmNewPassword")}
              onBlur={handleBlur("confirmNewPassword")}
              value={values.confirmNewPassword}
              error={errors.confirmNewPassword && touched.confirmNewPassword}
            />
            <HelperText
              type="error"
              visible={Boolean(
                errors.confirmNewPassword && touched.confirmNewPassword
              )}
            >
              {errors.confirmNewPassword}
            </HelperText>
            <Button
              onPress={handleSubmit}
              disabled={isSubmitting}
              icon="check"
              mode="contained"
              buttonColor={theme.colors.quaternary}
              textColor={theme.colors.surface}
            >
              Done
            </Button>
          </>
        )}
      </Formik>
    </FieldModal>
  );
};

export const EditProfile = ({ navigation }) => {
  const theme = useTheme();
  const updateUser = useUpdateUser();
  const { user } = useUser();

  const [openDatePicker, setOpenDatePicker] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpenDatePicker(false);
  }, [setOpenDatePicker]);

  const onConfirmSingle = React.useCallback(
    async (params) => {
      await updateUser({ newBirthday: params.date });
      setOpenDatePicker(false);
    },
    [setOpenDatePicker]
  );

  registerTranslation("en-GB", enGB);

  return (
    <SafeAreaView>
      <IconButton icon="chevron-left" onPress={() => navigation.goBack()} />

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text variant="titleLarge" style={{ marginBottom: 20 }}>
          Edit Profile
        </Text>
        <Button onPress={() => navigation.navigate("EditAvatar")}>
          <Avatar.Image
            size={150}
            source={{
              url:
                user.avatarURL ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            }}
          />
        </Button>
        {UpdateParticular("Username")}
        {UpdateParticular("Email")}
        <Button
          onPress={() => setOpenDatePicker(true)}
          mode="contained"
          style={{ width: "60%", marginTop: 10 }}
        >
          <Text style={{ color: theme.colors.font }}>
            Birthday: {moment(user.birthday).format("DD MMM YYYY")}
          </Text>
        </Button>
        {UpdatePassword()}
        <DatePickerModal
          locale="en-GB"
          mode="single"
          visible={openDatePicker}
          onDismiss={onDismissSingle}
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
