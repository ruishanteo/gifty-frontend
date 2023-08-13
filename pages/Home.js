import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Icon, Image, ListItem } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";

import logo from "../assets/logo.png";
import Layout from "../components/Layout";
import { Listing } from "../components/Listing";
import React from "react";

const reminderEvents = [
  { title: "event 1" },
  { title: "event 2" },
  { title: "event 2" },
];

const listing = {
  source:
    "https://www.at-languagesolutions.com/en/wp-content/uploads/2016/06/http-1.jpg",
  title: "listing",
  price: 5050,
  platform: "test",
};

export function Home() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
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
            {reminderEvents.length === 0 ? (
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
              reminderEvents.map((reminderItem, index) => (
                <ListItem
                  key={index}
                  bottomDivider
                  containerStyle={{ backgroundColor: theme.colors.background }}
                >
                  <ListItem.Content>
                    <Text variant="bodyLarge">{reminderItem.title}</Text>
                    <Text variant="bodySmall">date</Text>
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
            onPress={() => setOpen(true)}
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
              <Listing listing={listing} />
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
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
