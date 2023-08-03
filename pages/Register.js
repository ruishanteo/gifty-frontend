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
  username: Yup.string().required("Required"),
  email: Yup.string().email("Please enter a valid email").required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords do not match"),
  birthday: Yup.string().required("Required"),
});

export function Register({ navigation }) {
  const theme = useTheme();
  const register = useRegister();

  const [openDatePicker, setOpenDatePicker] = React.useState(false);

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
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            birthday: "",
          }}
          onSubmit={(values) => register(values)}
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
            <>
              <View style={{ width: "75%" }}>
                <TextInput
                  mode="outlined"
                  label="Username"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                  error={errors.username && touched.username}
                />
                <HelperText
                  type="error"
                  visible={Boolean(errors.username && touched.username)}
                >
                  {errors.username}
                </HelperText>
                <TextInput
                  mode="outlined"
                  label="Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  error={errors.email && touched.email}
                />
                <HelperText
                  type="error"
                  visible={Boolean(errors.email && touched.email)}
                >
                  {errors.email}
                </HelperText>
                <TextInput
                  mode="outlined"
                  label="Password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  error={errors.password && touched.password}
                />
                <HelperText
                  type="error"
                  visible={Boolean(errors.password && touched.password)}
                >
                  {errors.password}
                </HelperText>
                <TextInput
                  mode="outlined"
                  label="Confirm Password"
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  error={errors.confirmPassword && touched.confirmPassword}
                />
                <HelperText
                  type="error"
                  visible={Boolean(
                    errors.confirmPassword && touched.confirmPassword
                  )}
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
                    {values.birthday ? (
                      <Text>
                        {moment(values.birthday).format("DD MMM YYYY")}
                      </Text>
                    ) : (
                      <Text>Please select your birthday</Text>
                    )}
                  </View>
                </TouchableOpacity>
                <HelperText
                  type="error"
                  visible={Boolean(errors.birthday && touched.birthday)}
                >
                  {errors.birthday}
                </HelperText>
                <DatePickerModal
                  locale="en-GB"
                  mode="single"
                  visible={openDatePicker}
                  onDismiss={() => setOpenDatePicker(false)}
                  date={values.birthday}
                  onConfirm={(params) => {
                    setOpenDatePicker(false);
                    setFieldValue("birthday", params.date);
                  }}
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
