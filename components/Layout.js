import { View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";

export default function Layout({ iconName, onAction, title, children }) {
  const theme = useTheme();
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginVertical: 20,
        }}
      >
        <IconButton
          style={{ position: "absolute", left: 0 }}
          icon={iconName}
          onPress={onAction}
        />
        <Text
          variant="titleLarge"
          style={{
            textAlign: "center",
            color: theme.colors.font,
          }}
        >
          {title}
        </Text>
      </View>
      {children}
    </>
  );
}
