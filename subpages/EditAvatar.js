import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { Button, IconButton, useTheme } from "react-native-paper";
import { Icon } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { createIconSetFromFontello } from "react-native-vector-icons";

import noseIconConfig from "../assets/noseConfig.json";
import lipsIconConfig from "../assets/lipsConfig.json";
import UserAvatar from "../components/UserAvatar";
import Layout from "../components/Layout";
import { useUser } from "../providers/hooks";
import { useUpdateAvatar } from "../api/auth";

const NoseIcon = createIconSetFromFontello(noseIconConfig);
const LipsIcon = createIconSetFromFontello(lipsIconConfig);

const whitelistedColors = [
  "yellow",
  "orange",
  "green",
  "red",
  "black",
  "blue",
  "white",
  "purple",
  "pink",
  "gray",
  "lightblue",
  "lightgreen",
  "lightpink",
  "lightpurple",
  "lightyellow",
  "lightgray",
];

const properties = [
  "bg",
  "face",
  "hair",
  "hat",
  "shirt",
  "ear",
  "eye",
  "glasses",
  "nose",
  "mouth",
];

const iconMap = {
  bg: { iconName: "square", colors: whitelistedColors },
  face: { iconName: "face-man", colors: ["beige", "brown"] },
  hair: {
    iconName: "face-woman-profile",
    colors: whitelistedColors,
    styles: ["normal", "thick", "mohawk", "womanLong", "womanShort"],
  },
  hat: {
    iconName: "hat-fedora",
    colors: whitelistedColors,
    styles: ["beanie", "turban", "none"],
  },
  shirt: {
    iconName: "tshirt-crew-outline",
    colors: whitelistedColors,
    styles: ["hoodie", "short", "polo"],
  },
  ear: { iconName: "ear-hearing", styles: ["small", "big"] },
  eye: {
    iconName: "eye-outline",
    styles: ["circle", "oval", "smile"],
  },
  glasses: {
    iconName: "glasses",
    styles: ["none", "round", "square"],
  },
  nose: {
    iconName: "nose",
    styles: ["short", "long", "round"],
  },
  mouth: {
    iconName: "lips",
    styles: ["laugh", "smile", "peace"],
  },
};

const PropButton = ({ name, avatarProps, setAvatarProps }) => {
  const props = iconMap[name];
  const theme = useTheme();
  const colorScheme = useColorScheme();

  const [colorIndex, setColorIndex] = React.useState(0);
  const [styleIndex, setStyleIndex] = React.useState(0);

  function updateColorIndex(name, delta) {
    const colors = props.colors;
    if (!colors) return;
    const index = (colorIndex + delta + colors.length) % colors.length;
    setColorIndex(index);
    setAvatarProps({ ...avatarProps, [`${name}Color`]: colors[index] });
  }

  function updateStyleIndex(name) {
    const styles = props.styles;
    if (!styles) return;
    const index = (styleIndex + 1) % styles.length;
    setStyleIndex(index);
    setAvatarProps({ ...avatarProps, [`${name}Style`]: styles[index] });
  }

  return (
    <View
      flexDirection="row"
      style={{
        alignItems: "center",
        height: 45,
      }}
    >
      {props.colors && (
        <IconButton
          icon="chevron-left"
          onPress={() => updateColorIndex(name, -1)}
        />
      )}

      <TouchableOpacity
        style={{
          backgroundColor: props.styles
            ? theme.colors.tertiary
            : theme.colors.quaternary,
          alignItems: "center",
          justifyContent: "center",
          width: 200,
          height: 40,
          borderRadius: 25,
        }}
        disabled={!props.styles}
        onPress={() => updateStyleIndex(name)}
      >
        {name === "nose" ? (
          <NoseIcon
            name="nose"
            size={25}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        ) : name === "mouth" ? (
          <LipsIcon
            name="lips"
            size={25}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        ) : (
          <Icon
            name={props.iconName}
            type="material-community"
            color={theme.colors.font}
            iconProps={{ size: 25 }}
          />
        )}
      </TouchableOpacity>
      {props.colors && (
        <IconButton
          icon="chevron-right"
          onPress={() => updateColorIndex(name, 1)}
        />
      )}
    </View>
  );
};

export const EditAvatar = ({ navigation }) => {
  const theme = useTheme();
  const { user } = useUser();
  const updateAvatar = useUpdateAvatar();

  const [avatarProps, setAvatarProps] = React.useState(user.avatar);

  return (
    <SafeAreaView>
      <ScrollView>
        <Layout
          iconName="chevron-left"
          title="Edit Avatar"
          onAction={() => navigation.goBack()}
        >
          <View
            style={{ justifyContent: "center", alignItems: "center", gap: 10 }}
          >
            <UserAvatar avatarProps={avatarProps} />
            {properties.map((property, index) => (
              <PropButton
                name={property}
                key={index}
                avatarProps={avatarProps}
                setAvatarProps={setAvatarProps}
              />
            ))}

            <View flexDirection="row" style={{ gap: 10 }}>
              <Button
                onPress={() => updateAvatar(avatarProps)}
                buttonColor={theme.colors.secondary}
                textColor={theme.colors.background}
                style={{ width: 150 }}
                icon="content-save"
              >
                Save
              </Button>
              <Button
                onPress={() => setAvatarProps(user.avatar)}
                buttonColor={theme.colors.secondary}
                textColor={theme.colors.background}
                style={{ width: 150 }}
                icon="close"
              >
                Discard
              </Button>
            </View>
          </View>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};
