import { FlatList, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "@rneui/themed";

import Layout from "../components/Layout";
import { Listing } from "../components/Listing";
import { LoadingIcon } from "../components/LoadingIcon";
import { useWishlistedListings } from "../api/listing";
import noGiftsFound from "../assets/noGiftsFound.png";

export const WishResult = ({ route, navigation }) => {
  const theme = useTheme();
  const { friend, personId } = route.params;
  const { isLoading, data } = useWishlistedListings(personId);

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

        {isLoading ? (
          <LoadingIcon styles={{ marginVertical: 50 }} />
        ) : (
          <>
            {data.listing.length > 0 ? (
              <FlatList
                style={{ marginHorizontal: 15 }}
                data={data.listing}
                renderItem={({ item }) => (
                  <Listing listing={item} navigation={navigation} />
                )}
                keyExtractor={(item) => item.id}
                numColumns={2}
                ItemSeparatorComponent={() => <View style={{ height: "2%" }} />}
                columnWrapperStyle={{ justifyContent: "space-between" }}
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

            <Text variant="titleSmall" style={{ marginVertical: 30 }}>
              See more
            </Text>
          </>
        )}
      </Layout>
    </SafeAreaView>
  );
};
