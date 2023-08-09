import * as React from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import {
  Button,
  HelperText,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { Image, ListItem, SearchBar } from "@rneui/themed";
import Modal from "react-native-modal";
import { Formik } from "formik";
import * as Yup from "yup";

import Layout from "../components/Layout";
import {
  useCreatePerson,
  useDeletePerson,
  usePersons,
  useUpdatePerson,
} from "../api/person";
import noWishlist from "../assets/noWishlist.png";
import { LoadingIcon } from "../components/LoadingIcon";

function FormModal({ title, open, setOpen, initialValues, onSubmit }) {
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
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 20,
                  }}
                  flexDirection="row"
                >
                  <Text variant="bodyLarge" style={{ width: 60 }}>
                    Name:
                  </Text>
                  <TextInput
                    disabled={isSubmitting}
                    mode="flat"
                    style={{
                      backgroundColor: theme.colors.tertiary,
                      width: 200,
                    }}
                    theme={{
                      colors: { onSurfaceVariant: theme.colors.font },
                    }}
                    textColor={theme.colors.font}
                    activeUnderlineColor={theme.colors.font}
                    placeholder="Add Name"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                    error={errors.name && touched.name}
                  />
                  <HelperText
                    type="error"
                    visible={Boolean(errors.name && touched.name)}
                  ></HelperText>
                </View>
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
function Item({ item, navigation }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const deletePersonMutation = useDeletePerson(item.id);
  const updatePersonMutation = useUpdatePerson(item.id);

  return (
    <>
      <ListItem.Swipeable
        bottomDivider
        onPress={() =>
          navigation.navigate("WishResult", { friend: item, personId: item.id })
        }
        leftContent={() => (
          <Button
            onPress={() => setOpen(true)}
            icon="pencil"
            buttonColor={theme.colors.quaternary}
            textColor={theme.colors.surface}
            style={{
              height: "100%",
              justifyContent: "center",
            }}
          >
            Edit
          </Button>
        )}
        rightContent={() => (
          <Button
            onPress={() => deletePersonMutation.mutateAsync()}
            icon="delete"
            buttonColor={theme.colors.quaternary}
            textColor={theme.colors.surface}
            style={{
              height: "100%",
              justifyContent: "center",
            }}
          >
            Delete
          </Button>
        )}
        containerStyle={{
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.secondary,
        }}
      >
        <ListItem.Content>
          <ListItem.Title style={{ color: theme.colors.font }}>
            {item.name}
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem.Swipeable>
      <FormModal
        title="Update Person"
        open={open}
        setOpen={setOpen}
        initialValues={{ name: item.name }}
        onSubmit={async (values) =>
          await updatePersonMutation.mutateAsync(values).finally(() => {
            setOpen(false);
          })
        }
      />
    </>
  );
}

export const Wishlist = ({ navigation }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = React.useState("");
  const createPersonMutation = useCreatePerson();
  const [open, setOpen] = React.useState(false);

  const { data, isLoading, refetch } = usePersons(searchQuery);

  React.useEffect(() => {
    refetch();
  }, [refetch, searchQuery]);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <SafeAreaView>
      <View style={{ height: "92.5%" }}>
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

        {isLoading ? (
          <LoadingIcon fullSize={true} />
        ) : data.persons.length === 0 ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Image
              containerStyle={{ width: 250, aspectRatio: 1 }}
              source={{ uri: Image.resolveAssetSource(noWishlist).uri }}
            />
          </View>
        ) : (
          <FlatList
            data={data.persons}
            renderItem={({ item }) => (
              <Item item={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
          />
        )}
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <IconButton
          onPress={() => setOpen(true)}
          containerColor={theme.colors.secondary}
          iconColor={theme.colors.background}
          size={30}
          icon="plus"
        />
      </View>
      <FormModal
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
