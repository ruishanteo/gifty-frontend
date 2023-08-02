import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Text,
  useTheme,
} from "react-native-paper";
import { Image } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useUser } from "../providers/hooks";

export function Profile({ navigation }) {
  const theme = useTheme();
  const { user } = useUser();

  const windowWidth = Dimensions.get("window").width;

  const listings = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item First Item First Item First Item",
      source: "https://reactnative.dev/img/tiny_logo.png",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item Second Item Second Item Second Item",
      source: "https://reactnative.dev/img/tiny_logo.png",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item Third Item Third Item Third Item",
      source:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==",
    },
  ];

  const Item = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetailedListing", { listing: item })}
    >
      <View
        style={{
          width: (windowWidth * 0.89) / 3,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: theme.colors.secondary,
          backgroundColor: theme.colors.surface,
        }}
      >
        <Image
          containerStyle={{
            width: "100%",
            aspectRatio: 1,
          }}
          source={{ uri: item.source }}
        />
        <Text
          numberOfLines={2}
          style={{ padding: 10, color: theme.colors.font }}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: windowWidth * 0.8,
                height: "100%",
              }}
            />

            <IconButton
              icon="cog"
              iconColor={theme.colors.secondary}
              size={30}
              onPress={() => navigation.navigate("Settings")}
            />
          </View>
          <Avatar.Image
            size={120}
            source={{
              url:
                user.avatarURL ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            }}
          />
          <Text variant="displaySmall" style={{ marginVertical: 15 }}>
            {user.username}
          </Text>

          <Card
            elevation={0}
            mode="outlined"
            style={[
              styles.card,
              {
                backgroundColor: "transparent",
              },
            ]}
          >
            <View
              flexDirection="row"
              style={{ padding: 10, alignItems: "center" }}
            >
              <MaterialCommunityIcons
                name="gift-outline"
                color={theme.colors.secondary}
                size={25}
              />
              <Text variant="titleLarge">{"  "}Gifted</Text>
              <View style={{ flexGrow: 1 }} />

              <Button
                mode="text"
                textColor={theme.colors.secondary}
                icon="chevron-right"
                contentStyle={{ flexDirection: "row-reverse" }}
                onPress={() => navigation.navigate("GiftedHistory")}
              >
                View more
              </Button>
            </View>
            <Card.Content>
              <FlatList
                data={listings}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item) => item.id}
                horizontal={true}
                ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
              />
            </Card.Content>
          </Card>

          <Card
            elevation={0}
            mode="outlined"
            style={[
              styles.card,
              {
                backgroundColor: "transparent",
              },
            ]}
          >
            <View
              flexDirection="row"
              style={{ padding: 10, alignItems: "center" }}
            >
              <MaterialCommunityIcons
                name="gift-outline"
                color={theme.colors.secondary}
                size={25}
              />
              <Text variant="titleLarge">{"  "}Saved</Text>
              <View style={{ flexGrow: 1 }} />

              <Button
                mode="text"
                textColor={theme.colors.secondary}
                icon="chevron-right"
                contentStyle={{ flexDirection: "row-reverse" }}
                onPress={() => navigation.navigate("SavedList")}
              >
                View more
              </Button>
            </View>
            <Card.Content>
              <FlatList
                data={listings}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item) => item.id}
                horizontal={true}
                ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
              />
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    borderRadius: 0,
    width: "100%",
  },
});
