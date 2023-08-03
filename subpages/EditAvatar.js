import React from "react";
import { ScrollView, View, useColorScheme } from "react-native";
import { Button, IconButton, Text, useTheme } from "react-native-paper";
import { Icon } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { createIconSetFromFontello } from "react-native-vector-icons";

import noseIconConfig from "../assets/noseConfig.json";
import lipsIconConfig from "../assets/lipsConfig.json";
import UserAvatar from "../components/UserAvatar";
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

export const EditAvatar = ({ navigation }) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const { user } = useUser();
  const updateAvatar = useUpdateAvatar();
  const [avatarProps, setAvatarProps] = React.useState(
    user.avatar
      ? user.avatar
      : {
          bgColor: "",
          faceColor: "",
          hairStyle: "",
          hairColor: "",
          hatColor: "",
          hatStyle: "",
          shirtStyle: "",
          shirtColor: "",
          earSize: "",
          eyeStyle: "",
          glassesStyle: "",
          noseStyle: "",
          mouthStyle: "",
        }
  );
  const [colorIndexes, setColorIndexes] = React.useState({
    ...properties.reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {}),
  });
  const [styleIndexes, setStyleIndexes] = React.useState({
    ...properties.reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {}),
  });

  function updateColorIndex(name, delta) {
    const props = iconMap[name];
    if (!props.colors) return;

    const colorIndex = colorIndexes[name];
    const newIndex = (colorIndex + delta) % props.colors.length;
    setAvatarProps({
      ...avatarProps,
      [`${name}Color`]: props.colors[newIndex],
    });
    setColorIndexes({ ...colorIndexes, [name]: newIndex });
  }

  function updateStyleIndex(name) {
    const props = iconMap[name];
    if (!props.styles) return;

    const styleIndex = styleIndexes[name];
    const newIndex = (styleIndex + 1) % props.styles.length;
    setAvatarProps({
      ...avatarProps,
      [`${name}Style`]: props.styles[newIndex],
    });
    setStyleIndexes({ ...styleIndexes, [name]: newIndex });
  }

  const PropButton = ({ name }) => {
    const props = iconMap[name];

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

        <Button
          onPress={() => updateStyleIndex(name)}
          buttonColor={theme.colors.tertiary}
          style={{
            alignItems: "center",
            width: 200,
          }}
        >
          {name === "nose" ? (
            <NoseIcon
              onPress={() => updateStyleIndex(name)}
              name="nose"
              size={25}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          ) : name === "mouth" ? (
            <LipsIcon
              onPress={() => updateStyleIndex(name)}
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
        </Button>
        {props.colors && (
          <IconButton
            icon="chevron-right"
            onPress={() => updateColorIndex(name, 1)}
          />
        )}
      </View>
    );
  };
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
          <View style={{ marginBottom: 15 }}>
            <UserAvatar avatarProps={avatarProps} />
          </View>
          {properties.map((property, index) => (
            <PropButton name={property} key={index} />
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
              buttonColor={theme.colors.secondary}
              textColor={theme.colors.background}
              style={{ width: 150 }}
              icon="close"
            >
              Discard
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
