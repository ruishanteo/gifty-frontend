import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  Button,
  HelperText,
  IconButton,
  TextInput,
  useTheme,
} from "react-native-paper";
import { Avatar, ListItem, SearchBar } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import { Formik } from "formik";
import * as Yup from "yup";

import Layout from "../components/Layout";
import { useCreatePerson } from "../api/person";

function CustomFormModal({ title, open, setOpen, initialValues, onSubmit }) {
  const theme = useTheme();
  return (
    <Modal
      animationType="slide"
      visible={open}
      onRequestClose={() => setOpen(false)}
    >
      <Formik
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
        })}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={initialValues || { name: "" }}
        onSubmit={async (values) => await onSubmit(values)}
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
          <View style={styles.centeredView}>
            <View
              style={[
                styles.modalView,
                { backgroundColor: theme.colors.tertiary },
              ]}
            >
              <Layout
                title={title}
                onAction={() => setOpen(false)}
                iconName="close"
              >
                <TextInput
                  disabled={isSubmitting}
                  mode="flat"
                  style={{
                    backgroundColor: theme.colors.tertiary,
                    width: 250,
                  }}
                  theme={{
                    colors: { onSurfaceVariant: theme.colors.font },
                  }}
                  textColor={theme.colors.font}
                  activeUnderlineColor={theme.colors.font}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  error={errors.name && touched.name}
                  placeholder="Name"
                />
                <HelperText
                  type="error"
                  visible={Boolean(errors.name && touched.name)}
                >
                  {errors.name}
                </HelperText>
                <Button
                  onPress={handleSubmit}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  buttonColor={theme.colors.quaternary}
                  textColor={theme.colors.background}
                  icon="check"
                  style={{ marginTop: 20 }}
                >
                  Done
                </Button>
              </Layout>
            </View>
          </View>
        )}
      </Formik>
    </Modal>
  );
}

export const NewPerson = ({ navigation }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = React.useState("");
  const createPersonMutation = useCreatePerson();
  const [open, setOpen] = React.useState(false);

  const windowWidth = Dimensions.get("window").width;

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <SafeAreaView>
      <View style={{ height: "100%" }}>
        <Layout
          iconName="chevron-left"
          title="Add Friends"
          onAction={() => navigation.goBack()}
        >
          <SearchBar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            containerStyle={{
              backgroundColor: "transparent",
              borderBottomColor: "transparent",
              borderTopColor: "transparent",
            }}
            inputContainerStyle={{ backgroundColor: theme.colors.primary }}
            round={true}
          />

          <ListItem
            bottomDivider
            onPress={() => navigation.navigate("PublicProfile")}
            containerStyle={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.secondary,
            }}
          >
            <ListItem.Content
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
                justifyContent: "flex-start",
              }}
            >
              <Avatar
                size={24}
                rounded
                source={{
                  uri: "https://randomuser.me/api/portraits/men/36.jpg",
                }}
              />
              <ListItem.Title style={{ color: theme.colors.font }}>
                name
              </ListItem.Title>
            </ListItem.Content>

            <ListItem.Chevron />
          </ListItem>
        </Layout>
      </View>
      <View
        style={{
          left: windowWidth - 120,
          bottom: 5,
          position: "absolute",
        }}
      >
        <Button
          onPress={() => setOpen(true)}
          buttonColor={theme.colors.secondary}
          icon="plus"
          mode="contained"
        >
          Friends
        </Button>
      </View>
      <CustomFormModal
        title="Add Person"
        open={open}
        setOpen={setOpen}
        onSubmit={async (values) => {
          await createPersonMutation.mutateAsync(values);
          setOpen(false);
        }}
      />
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
