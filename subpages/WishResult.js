import { FlatList, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "@rneui/themed";

import Layout from "../components/Layout";
import { Listing } from "../components/Listing";
import { LoadingIcon } from "../components/LoadingIcon";
import { useMyWishlistedListings, useWishlistedListings } from "../api/listing";
import noGiftsFound from "../assets/noGiftsFound.png";

export const WishResult = ({ route, navigation }) => {
  const theme = useTheme();
  const { friend, personId } = route.params;
  const { isLoading: isWishlistedListingLoading, data: wishlistedListingData } =
    useWishlistedListings(personId);
  const {
    isLoading: isMyWishlistedListingLoading,
    data: myWishlistedListingData,
  } = useMyWishlistedListings(friend.userId);

  return (
    <SafeAreaView style={{ marginHorizontal: 15 }}>
      <Layout
        title={friend.name}
        onAction={() => navigation.goBack()}
        iconName="chevron-left"
      >
        {friend.user && (
          <>
            <Text variant="bodyLarge">{friend.name}'s Picks: </Text>
            {isMyWishlistedListingLoading ? (
              <LoadingIcon styles={{ marginVertical: 50 }} />
            ) : (
              <>
                {myWishlistedListingData.listing.length > 0 ? (
                  <FlatList
                    style={{ marginHorizontal: 15, height: "40%" }}
                    data={myWishlistedListingData.listing}
                    renderItem={({ item }) => (
                      <Listing listing={item} navigation={navigation} />
                    )}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    ItemSeparatorComponent={() => (
                      <View style={{ height: "2%" }} />
                    )}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    contentContainerStyle={{ paddingBottom: 50 }}
                  />
                ) : (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      containerStyle={{ width: 250, aspectRatio: 1 }}
                      source={{
                        uri: Image.resolveAssetSource(noGiftsFound).uri,
                      }}
                    />
                  </View>
                )}
              </>
            )}
          </>
        )}
        <Text variant="bodyLarge">My Picks: </Text>
        {isWishlistedListingLoading ? (
          <LoadingIcon styles={{ marginVertical: 50 }} />
        ) : (
          <>
            {wishlistedListingData.listing.length > 0 ? (
              <FlatList
                style={{ marginHorizontal: 15, height: "40%" }}
                data={wishlistedListingData.listing}
                renderItem={({ item }) => (
                  <Listing listing={item} navigation={navigation} />
                )}
                keyExtractor={(item) => item.id}
                numColumns={2}
                ItemSeparatorComponent={() => <View style={{ height: "2%" }} />}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                contentContainerStyle={{ paddingBottom: 50 }}
              />
            ) : (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  containerStyle={{ width: 250, aspectRatio: 1 }}
                  source={{ uri: Image.resolveAssetSource(noGiftsFound).uri }}
                />
              </View>
            )}
          </>
        )}
      </Layout>
    </SafeAreaView>
  );
};
