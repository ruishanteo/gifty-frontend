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
import UserAvatar from "../components/UserAvatar";
import { useGiftedListings, useSavedListings } from "../api/listing";

export function Profile({ navigation }) {
  const theme = useTheme();
  const { user } = useUser();
  const { isLoading: savedLoading, data: savedData } = useSavedListings();
  const { isLoading: giftedLoading, data: giftedData } = useGiftedListings();

  const windowWidth = Dimensions.get("window").width;

  if (savedLoading || giftedLoading) return null;
  const savedListings = savedData.listing.slice(0, 3);
  const giftedListings = giftedData.listing.slice(0, 3);

  const Item = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("DetailedListing", {
          listing: item,
          listingId: item.id,
        })
      }
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
          <UserAvatar />
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
                disabled={giftedListings.length === 0}
              >
                View more
              </Button>
            </View>
            <Card.Content>
              {giftedListings.length === 0 ? (
                <Text>No gifted gifts found!</Text>
              ) : (
                <FlatList
                  data={giftedListings}
                  renderItem={({ item }) => <Item item={item} />}
                  keyExtractor={(item) => item.id}
                  horizontal={true}
                  ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
                />
              )}
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
                disabled={savedListings.length === 0}
              >
                View more
              </Button>
            </View>
            <Card.Content>
              {savedListings.length === 0 ? (
                <Text>No saved gifts found!</Text>
              ) : (
                <FlatList
                  data={savedListings}
                  renderItem={({ item }) => <Item item={item} />}
                  keyExtractor={(item) => item.id}
                  horizontal={true}
                  ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
                />
              )}
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
