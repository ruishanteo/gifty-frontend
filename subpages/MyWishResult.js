import React, { useEffect } from "react";
import { Dimensions, FlatList, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "@rneui/themed";

import { Listing } from "../components/Listing";
import { LoadingIcon } from "../components/LoadingIcon";
import Layout from "../components/Layout";
import { useMyWishlistedListings } from "../api/listing";

export const MyWishResult = ({ navigation }) => {
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = React.useState("");
  const { isLoading, data, refetch } = useMyWishlistedListings(0, searchQuery);

  useEffect(() => {
    refetch();
  }, [refetch, searchQuery]);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <SafeAreaView>
      <Layout
        title="My Wishlist"
        iconName="chevron-left"
        onAction={() => navigation.goBack()}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: windowWidth,
          }}
        >
          <SearchBar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            containerStyle={{
              backgroundColor: "transparent",
              borderBottomColor: "transparent",
              borderTopColor: "transparent",
            }}
            inputContainerStyle={{
              backgroundColor: theme.colors.primary,
              width: windowWidth * 0.95,
            }}
            round={true}
          />
        </View>

        <View style={{ height: "85%" }}>
          {isLoading ? (
            <LoadingIcon />
          ) : (
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
              contentContainerStyle={{ paddingBottom: 80 }}
            />
          )}
        </View>
      </Layout>
    </SafeAreaView>
  );
};
