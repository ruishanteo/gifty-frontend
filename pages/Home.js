import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon, Image, ListItem } from "@rneui/themed";
import moment from "moment";

import Layout from "../components/Layout";
import logo from "../assets/logo.png";
import { Listing } from "../components/Listing";
import { LoadingIcon } from "../components/LoadingIcon";
import { useRandomListing } from "../api/listing";
import { useReminders } from "../api/event";

export function Home({ navigation }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const {
    data: listingData,
    isLoading: listingLoading,
    refetch,
    isFetching: listingFetching,
  } = useRandomListing();
  const { data: reminderData, isLoading: reminderLoading } = useReminders();

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.tertiary, paddingBottom: -20 }}
    >
      <View style={[styles.container]}>
        <Image
          containerStyle={{ width: 50, aspectRatio: 1 }}
          source={{ uri: Image.resolveAssetSource(logo).uri }}
        />
        <Text style={{ fontFamily: "BestMoment" }} variant="displayLarge">
          gifty
        </Text>
      </View>

      <View style={{ backgroundColor: theme.colors.background }}>
        <View style={[styles.contentContainer]}>
          <View flexDirection="row" style={{ gap: 10 }}>
            <Icon type="material-community" name="bell" />
            <Text variant="titleMedium">Coming soon</Text>
          </View>
          <View style={{ height: "30%" }}>
            {reminderLoading ? (
              <LoadingIcon />
            ) : reminderData.events.length === 0 ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  gap: 10,
                }}
              >
                <Icon
                  size={100}
                  type="material-community"
                  name="bell-sleep"
                  color={theme.colors.quaternary}
                />
                <Text>You have no upcoming reminders.</Text>
              </View>
            ) : (
              reminderData.events.map((reminderItem, index) => (
                <ListItem
                  key={index}
                  bottomDivider
                  containerStyle={{ backgroundColor: theme.colors.background }}
                >
                  <ListItem.Content>
                    <Text variant="bodyLarge">{reminderItem.name}</Text>
                    <Text variant="bodySmall">
                      {moment(reminderItem.date).format("DD MMM YYYY")}
                    </Text>
                  </ListItem.Content>
                </ListItem>
              ))
            )}
          </View>

          <View flexDirection="row" style={{ gap: 10 }}>
            <Icon type="material-community" name="help-box" />
            <Text variant="titleMedium">Random suggestion</Text>
          </View>

          <TouchableOpacity
            onPress={async () => {
              refetch();
              setOpen(true);
            }}
            style={{ alignItems: "center" }}
          >
            <Image
              containerStyle={{ width: 250, aspectRatio: 1 }}
              source={{ uri: Image.resolveAssetSource(logo).uri }}
            />
            <Text>Out of ideas? Press the gift!</Text>
          </TouchableOpacity>
        </View>
      </View>
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
              title="What about this?"
              onAction={() => setOpen(false)}
              iconName="close"
            >
              {listingLoading || listingFetching ? (
                <LoadingIcon />
              ) : (
                <View>
                  <Listing
                    listing={listingData.listing}
                    navigation={navigation}
                    onPress={() => setOpen(false)}
                  />
                  <Button
                    icon="reload"
                    mode="contained"
                    buttonColor={theme.colors.secondary}
                    style={{ marginTop: 20 }}
                    onPress={() => refetch()}
                  >
                    Refresh
                  </Button>
                </View>
              )}
            </Layout>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 70,
    flexDirection: "row",
    gap: 15,
  },
  contentContainer: {
    height: "92%",
    marginHorizontal: 15,
    marginTop: 20,
    gap: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    borderRadius: 20,
    padding: 15,
    paddingBottom: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "85%",
  },
});
