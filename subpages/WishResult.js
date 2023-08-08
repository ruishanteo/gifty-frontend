import { Dimensions, FlatList, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Listing } from "../components/Listing";
import Layout from "../components/Layout";
import { useWishlistedListings } from "../api/listing";

export const WishResult = ({ route, navigation }) => {
  const theme = useTheme();
  const { friend, personId } = route.params;
  const { isLoading, data } = useWishlistedListings(personId);

  const windowWidth = Dimensions.get("window").width;

  if (isLoading) return null;
  const listings = data.listing;

  return (
    <SafeAreaView style={{ marginHorizontal: 15 }}>
      <Layout
        title=""
        onAction={() => navigation.goBack()}
        iconName="chevron-left"
      >
        <Text variant="titleSmall">Displaying results for: </Text>
        <View
          style={{
            width: "40%",
            alignItems: "center",
          }}
        >
          <Text variant="headlineLarge">{friend.name}</Text>
        </View>

        <FlatList
          style={{ marginHorizontal: 15 }}
          data={listings}
          renderItem={({ item }) => (
            <Listing listing={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          ItemSeparatorComponent={() => <View style={{ height: "2%" }} />}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />

        <Text variant="titleSmall" style={{ marginVertical: 30 }}>
          See more
        </Text>
      </Layout>
    </SafeAreaView>
  );
};
