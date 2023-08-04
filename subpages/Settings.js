import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Switch, Text, useTheme } from "react-native-paper";
import { ListItem } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";

import { useAuth } from "../providers/hooks";
import Layout from "../components/Layout";

export const Settings = ({ navigation }) => {
  const theme = useTheme();
  const { logout } = useAuth();

  const [open, setOpen] = React.useState(false);

  return (
    <SafeAreaView>
      <Layout
        title="Settings"
        onAction={() => navigation.goBack()}
        iconName="chevron-left"
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <ListItem
            bottomDivider
            onPress={() => navigation.navigate("EditProfile")}
            style={{ width: "100%" }}
            containerStyle={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.secondary,
            }}
          >
            <ListItem.Content>
              <ListItem.Title style={{ color: theme.colors.font }}>
                Account Information
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem
            bottomDivider
            style={{ width: "100%" }}
            containerStyle={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.secondary,
            }}
          >
            <ListItem.Content>
              <ListItem.Title style={{ color: theme.colors.font }}>
                Dark Mode
              </ListItem.Title>
            </ListItem.Content>
            <Switch
            //value={isSwitchOn} onValueChange={onToggleSwitch}
            />
          </ListItem>

          <ListItem
            bottomDivider
            onPress={() => navigation.navigate("TNC")}
            style={{ width: "100%" }}
            containerStyle={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.secondary,
            }}
          >
            <ListItem.Content>
              <ListItem.Title style={{ color: theme.colors.font }}>
                Terms and Conditions
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>

          <ListItem
            bottomDivider
            onPress={() => setOpen(true)}
            style={{ width: "100%" }}
            containerStyle={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.secondary,
            }}
          >
            <ListItem.Content>
              <ListItem.Title style={{ color: "red" }}>
                Delete Account
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>

          <ListItem
            bottomDivider
            style={{ width: "100%" }}
            containerStyle={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.secondary,
            }}
          >
            <ListItem.Content style={{ alignItems: "center" }}>
              <Button
                mode="contained"
                buttonColor={theme.colors.secondary}
                onPress={() => logout()}
              >
                Logout
              </Button>
            </ListItem.Content>
          </ListItem>

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
                  title="Are you sure?"
                  onAction={() => setOpen(false)}
                  iconName="close"
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <Text>This action is irreversible.</Text>
                    <View flexDirection="row" style={{ gap: 15 }}>
                      <Button
                        buttonColor={theme.colors.quaternary}
                        textColor={theme.colors.background}
                        icon="close"
                        onPress={() => setOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        buttonColor={theme.colors.quaternary}
                        textColor={theme.colors.background}
                        icon="check"
                        onPress={() => console.log("delete account")}
                      >
                        Confirm
                      </Button>
                    </View>
                  </View>
                </Layout>
              </View>
            </View>
          </Modal>
        </View>
      </Layout>
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
