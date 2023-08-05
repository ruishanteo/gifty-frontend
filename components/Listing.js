import { View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { Image } from "@rneui/themed";

export function Listing({ navigation, listing }) {
  const theme = useTheme();

  return (
    <Card
      onPress={() => navigation.navigate("DetailedListing", { listing })}
      style={{
        backgroundColor: theme.colors.surface,
        alignItems: "center",
        width: "49%",
        padding: 10,
        borderRadius: 0,
      }}
    >
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          containerStyle={{
            width: "100%",
            aspectRatio: 1,
            flex: 1,
          }}
          source={{
            uri: listing.source,
          }}
        />
        <Text numberOfLines={2} style={{ marginTop: 10 }}>
          {listing.title}
        </Text>
      </View>
    </Card>
  );
}
