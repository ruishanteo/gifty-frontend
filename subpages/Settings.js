import { ListItem } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { Button, IconButton, Switch, Text, useTheme } from "react-native-paper";

import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../providers/hooks";

export const Settings = ({ navigation }) => {
  const theme = useTheme();
  const { logout } = useAuth();

  return (
    <SafeAreaView>
      <IconButton icon="chevron-left" onPress={() => navigation.goBack()} />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text variant="titleLarge" style={{ marginBottom: 20 }}>
          Settings
        </Text>

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
          onPress={() => console.log("terms and conditions")}
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
      </View>
    </SafeAreaView>
  );
};
