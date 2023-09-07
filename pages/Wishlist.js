import * as React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import {
  Button,
  Divider,
  HelperText,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Icon, Image, ListItem, SearchBar } from "@rneui/themed";
import Modal from "react-native-modal";
import { Formik } from "formik";
import * as Yup from "yup";

import { useUser } from "../providers/hooks";
import UserAvatar from "../components/UserAvatar";
import Layout from "../components/Layout";
import {
  useDeletePerson,
  usePersons,
  useRemoveFriend,
  useUpdatePerson,
} from "../api/person";
import noWishlist from "../assets/noWishlist.png";
import { LoadingIcon } from "../components/LoadingIcon";
import { ConfirmModal } from "../components/ConfirmModal";

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

function Item({ item, navigation }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const deletePersonMutation = useDeletePerson(item.id);
  const updatePersonMutation = useUpdatePerson(item.id);
  const removeFriendMutation = useRemoveFriend(item.userId);

  return (
    <>
      <ListItem.Swipeable
        bottomDivider
        onPress={() =>
          navigation.navigate("WishResult", { friend: item, personId: item.id })
        }
        leftContent={() =>
          item.user ? (
            <Button
              onPress={() =>
                navigation.navigate("PublicProfile", {
                  user: item.user,
                  userId: item.user.id,
                })
              }
              icon="eye"
              buttonColor={theme.colors.quaternary}
              textColor={theme.colors.surface}
              style={{
                height: "100%",
                justifyContent: "center",
              }}
            >
              View
            </Button>
          ) : (
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
          )
        }
        rightContent={() => (
          <Button
            onPress={() => setConfirm(true)}
            icon={item.user ? "account-off" : "delete"}
            buttonColor={theme.colors.quaternary}
            textColor={theme.colors.surface}
            style={{
              height: "100%",
              justifyContent: "center",
            }}
          >
            {item.user ? "Unfollow" : "Delete"}
          </Button>
        )}
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
          {item.user ? (
            <UserAvatar avatarProps={item.user.avatar} size={24} />
          ) : (
            <Avatar
              size={24}
              rounded
              title={item.name.charAt(0).toUpperCase()}
              containerStyle={{ backgroundColor: "gray" }}
            />
          )}
          <ListItem.Title style={{ color: theme.colors.font }}>
            {item.name}
          </ListItem.Title>
        </ListItem.Content>

        <ListItem.Chevron />
      </ListItem.Swipeable>
      <CustomFormModal
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
      <ConfirmModal
        action={() =>
          item.user
            ? removeFriendMutation.mutateAsync()
            : deletePersonMutation.mutateAsync()
        }
        open={confirm}
        setOpen={setConfirm}
      />
    </>
  );
}

export const Wishlist = ({ navigation }) => {
  const theme = useTheme();
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = React.useState("");
  const { data, isLoading, refetch } = usePersons(searchQuery);

  const windowWidth = Dimensions.get("window").width;

  React.useEffect(() => {
    refetch();
  }, [refetch, searchQuery]);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <SafeAreaView>
      <View style={{ height: "100%", marginHorizontal: 15 }}>
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
          onPress={() => navigation.navigate("MyWishResult")}
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
            <UserAvatar size={24} />
            <ListItem.Title style={{ color: theme.colors.font }}>
              {user.username} (Me)
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <Divider bold={true} style={{ height: 3 }} />
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Icon name="account-group" type="material-community" />
            <Text variant="titleLarge">Friends</Text>
          </View>
        </View>
        {isLoading ? (
          <LoadingIcon fullSize={true} />
        ) : data.persons.length === 0 ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: "85%",
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

      <View
        style={{
          left: windowWidth - 70,
          bottom: 5,
          position: "absolute",
        }}
      >
        <IconButton
          onPress={() => navigation.navigate("NewPerson")}
          containerColor={theme.colors.secondary}
          iconColor={theme.colors.background}
          size={30}
          icon="plus"
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
