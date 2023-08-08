import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { Image } from "@rneui/themed";
import { Formik } from "formik";
import * as Yup from "yup";

import logo from "../assets/logo.png";
import { useGetOTP, useResetPassword } from "../api/auth";

export function ResetPassword({ navigation }) {
  const theme = useTheme();
  const getOTP = useGetOTP();
  const resetPassword = useResetPassword();

  const [requested, setRequested] = React.useState(false);

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
        <Text variant="headlineMedium" style={{ marginBottom: 15 }}>
          Reset Password
        </Text>
        <Formik
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Please enter a valid email")
              .required("Required"),
            otp: requested && Yup.string().required("Required"),
            newPassword: requested && Yup.string().required("Required"),
            confirmNewPassword:
              requested &&
              Yup.string()
                .required("Required")
                .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
          })}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            email: "",
            otp: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          onSubmit={async (values) => {
            if (!requested) {
              await getOTP(values)
                .then(() => setRequested(true))
                .catch(() => {});
            } else {
              await resetPassword(values)
                .then(() => navigation.navigate("Login"))
                .catch(() => {});
            }
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
              <View style={{ width: "75%" }}>
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
                {requested && (
                  <>
                    <TextInput
                      mode="outlined"
                      label="OTP"
                      onChangeText={handleChange("otp")}
                      onBlur={handleBlur("otp")}
                      value={values.otp}
                      error={errors.otp && touched.otp}
                    />
                    <HelperText
                      type="error"
                      visible={Boolean(errors.otp && touched.otp)}
                    >
                      {errors.otp}
                    </HelperText>
                    <TextInput
                      mode="outlined"
                      label="New Password"
                      onChangeText={handleChange("newPassword")}
                      onBlur={handleBlur("newPassword")}
                      value={values.newPassword}
                      error={errors.newPassword && touched.newPassword}
                    />
                    <HelperText
                      type="error"
                      visible={Boolean(
                        errors.newPassword && touched.newPassword
                      )}
                    >
                      {errors.newPassword}
                    </HelperText>
                    <TextInput
                      mode="outlined"
                      label="Confirm New Password"
                      onChangeText={handleChange("confirmNewPassword")}
                      onBlur={handleBlur("confirmNewPassword")}
                      value={values.confirmNewPassword}
                      error={
                        errors.confirmNewPassword && touched.confirmNewPassword
                      }
                    />
                    <HelperText
                      type="error"
                      visible={Boolean(
                        errors.confirmNewPassword && touched.confirmNewPassword
                      )}
                    >
                      {errors.confirmNewPassword}
                    </HelperText>
                  </>
                )}
              </View>
              <Button
                onPress={handleSubmit}
                loading={isSubmitting}
                mode="contained"
                textColor={theme.colors.surface}
                buttonColor={theme.colors.secondary}
                style={{
                  marginTop: 10,
                  marginBottom: 15,
                }}
              >
                {!requested ? "Get OTP" : "Reset password"}
              </Button>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 40,
  },
});
