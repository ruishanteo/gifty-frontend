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
import { useLogin } from "../api/auth";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export function Login({ navigation }) {
  const theme = useTheme();
  const login = useLogin();

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
        <Text variant="headlineMedium">Welcome back</Text>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => login(values)}
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
                Login
              </Button>
            </>
          )}
        </Formik>
        <Text>Don't have an account?</Text>
        <Button
          style={{ marginTop: -5 }}
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </Button>
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
