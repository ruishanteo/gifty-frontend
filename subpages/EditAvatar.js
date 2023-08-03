import React from "react";
import { ScrollView, View, useColorScheme } from "react-native";
import { Avatar, Button, IconButton, Text, useTheme } from "react-native-paper";
import { Icon } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { createIconSetFromFontello } from "react-native-vector-icons";
import noseIconConfig from "../assets/noseConfig.json";
import lipsIconConfig from "../assets/lipsConfig.json";

const NoseIcon = createIconSetFromFontello(noseIconConfig);
const LipsIcon = createIconSetFromFontello(lipsIconConfig);

export const EditAvatar = ({ navigation }) => {
  const theme = useTheme();
  const [isMale, setIsMale] = React.useState();
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView>
      <ScrollView>
        <IconButton icon="chevron-left" onPress={() => navigation.goBack()} />
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 10 }}
        >
          <Text variant="titleLarge" style={{ marginBottom: 10 }}>
            Edit Avatar
          </Text>
          <Avatar.Image
            size={150}
            source={{
              url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            }}
          />

          <View flexDirection="row">
            <IconButton
              containerColor={
                isMale ? theme.colors.secondary : theme.colors.primary
              }
              iconColor={theme.colors.background}
              icon="gender-male"
              onPress={() => {
                console.log("set gender male");
                setIsMale(true);
              }}
            />
            <IconButton
              containerColor={
                isMale ? theme.colors.primary : theme.colors.secondary
              }
              iconColor={theme.colors.background}
              icon="gender-female"
              onPress={() => {
                console.log("set gender female");
                setIsMale(false);
              }}
            />
          </View>

          <View
            flexDirection="row"
            style={{
              alignItems: "center",
              height: 45,
            }}
          >
            <IconButton icon="chevron-left" />
            <Button
              buttonColor={theme.colors.tertiary}
              style={{
                alignItems: "center",
                width: 200,
              }}
            >
              <Icon
                name="square"
                type="material-community"
                color={theme.colors.font}
                iconProps={{ size: 25 }}
              />
            </Button>
            <IconButton icon="chevron-right" />
          </View>

          <View
            flexDirection="row"
            style={{
              alignItems: "center",
              height: 45,
            }}
          >
            <IconButton icon="chevron-left" />
            <Button
              buttonColor={theme.colors.tertiary}
              style={{
                alignItems: "center",
                width: 200,
              }}
            >
              <Icon
                name="face-man"
                type="material-community"
                color={theme.colors.font}
                iconProps={{ size: 25 }}
              />
            </Button>
            <IconButton icon="chevron-right" />
          </View>

          <View
            flexDirection="row"
            style={{
              alignItems: "center",
              height: 45,
            }}
          >
            <IconButton icon="chevron-left" />
            <Button
              buttonColor={theme.colors.tertiary}
              style={{
                alignItems: "center",
                width: 200,
              }}
            >
              <Icon
                name="face-woman-profile"
                type="material-community"
                color={theme.colors.font}
                iconProps={{ size: 25 }}
              />
            </Button>
            <IconButton icon="chevron-right" />
          </View>

          <View
            flexDirection="row"
            style={{
              alignItems: "center",
              height: 45,
            }}
          >
            <IconButton icon="chevron-left" />
            <Button
              buttonColor={theme.colors.tertiary}
              style={{
                alignItems: "center",
                width: 200,
              }}
            >
              <Icon
                name="hat-fedora"
                type="material-community"
                color={theme.colors.font}
                iconProps={{ size: 25 }}
              />
            </Button>
            <IconButton icon="chevron-right" />
          </View>

          <View
            flexDirection="row"
            style={{
              alignItems: "center",
              height: 45,
            }}
          >
            <IconButton icon="chevron-left" />
            <Button
              buttonColor={theme.colors.tertiary}
              style={{
                alignItems: "center",
                width: 200,
              }}
            >
              <Icon
                name="tshirt-crew-outline"
                type="material-community"
                color={theme.colors.font}
                iconProps={{ size: 25 }}
              />
            </Button>
            <IconButton icon="chevron-right" />
          </View>

          <View
            flexDirection="row"
            style={{
              alignItems: "center",
              height: 45,
            }}
          >
            <Button
              buttonColor={theme.colors.tertiary}
              style={{
                alignItems: "center",
                width: 200,
              }}
            >
              <Icon
                name="ear-hearing"
                type="material-community"
                color={theme.colors.font}
                iconProps={{ size: 25 }}
              />
            </Button>
          </View>
          <View
            flexDirection="row"
            style={{
              alignItems: "center",
              height: 45,
            }}
          >
            <Button
              buttonColor={theme.colors.tertiary}
              style={{
                alignItems: "center",
                width: 200,
              }}
            >
              <Icon
                name="eye-outline"
                type="material-community"
                color={theme.colors.font}
                iconProps={{ size: 25 }}
              />
            </Button>
          </View>
          <View
            flexDirection="row"
            style={{
              alignItems: "center",
              height: 45,
            }}
          >
            <Button
              buttonColor={theme.colors.tertiary}
              style={{
                alignItems: "center",
                width: 200,
              }}
            >
              <Icon
                name="glasses"
                type="material-community"
                color={theme.colors.font}
                iconProps={{ size: 25 }}
              />
            </Button>
          </View>
          <View
            flexDirection="row"
            style={{
              alignItems: "center",
              height: 45,
            }}
          >
            <Button
              buttonColor={theme.colors.tertiary}
              style={{
                alignItems: "center",
                width: 200,
              }}
            >
              <NoseIcon
                name="nose"
                size={25}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </Button>
          </View>
          <View
            flexDirection="row"
            style={{
              alignItems: "center",
              height: 45,
            }}
          >
            <Button
              buttonColor={theme.colors.tertiary}
              style={{
                alignItems: "center",
                width: 200,
              }}
            >
              <LipsIcon
                name="lips"
                size={25}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
