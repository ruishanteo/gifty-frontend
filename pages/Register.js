import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import {
  DatePickerModal,
  enGB,
  registerTranslation,
} from "react-native-paper-dates";
import { Image } from "@rneui/themed";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";

import logo from "../assets/logo.png";
import { useRegister } from "../api/auth";

const registerValidationSchema = Yup.object().shape({
  username: Yup.string().required("Username is Required"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export function Register({ navigation }) {
  const theme = useTheme();
  const register = useRegister();

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
    <ScrollView>
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <Image
          containerStyle={{
            width: "40%",
            aspectRatio: 1,
          }}
          source={{ uri: Image.resolveAssetSource(logo).uri }}
        />
        <Text variant="headlineMedium">Get Started</Text>
        <Formik
          validationSchema={registerValidationSchema}
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => register({ ...values, birthday: date })}
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
              <View style={{ width: "75%" }}>
                <TextInput
                  mode="outlined"
                  label="Username"
                  placeholder="Username"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                  error={errors.username && touched.username}
                />
                <HelperText
                  type="error"
                  visible={errors.username && touched.username}
                >
                  {errors.username}
                </HelperText>
                <TextInput
                  mode="outlined"
                  label="Email"
                  placeholder="Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  error={errors.email && touched.email}
                />
                <HelperText
                  type="error"
                  visible={errors.email && touched.email}
                >
                  {errors.email}
                </HelperText>
                <TextInput
                  mode="outlined"
                  label="Password"
                  placeholder="Password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  error={errors.password && touched.password}
                />
                <HelperText
                  type="error"
                  visible={errors.password && touched.password}
                >
                  {errors.password}
                </HelperText>
                <TextInput
                  mode="outlined"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  error={errors.confirmPassword && touched.confirmPassword}
                />
                <HelperText
                  type="error"
                  visible={errors.confirmPassword && touched.confirmPassword}
                >
                  {errors.confirmPassword}
                </HelperText>
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
                onPress={handleSubmit}
                disabled={isSubmitting}
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
            </>
          )}
        </Formik>
        <Text>Already have an account?</Text>
        <Button
          style={{ marginTop: -5 }}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Button>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 40,
  },
});
