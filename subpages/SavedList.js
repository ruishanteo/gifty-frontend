import React, { useEffect } from "react";
import { Dimensions, FlatList, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "@rneui/themed";

import { Listing } from "../components/Listing";
import { useSavedListings } from "../api/listing";
import Layout from "../components/Layout";

export const SavedList = ({ navigation }) => {
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = React.useState("");
  const { isLoading, data, refetch } = useSavedListings(searchQuery);

  const windowWidth = Dimensions.get("window").width;

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    refetch();
  }, [refetch, searchQuery]);

  if (isLoading) return null;
  const listings = data.listing;

  return (
    <SafeAreaView>
      <Layout
        title="Saved"
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

        <FlatList
          style={{ height: "100%", marginHorizontal: 15 }}
          data={listings}
          renderItem={({ item }) => (
            <Listing listing={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          ItemSeparatorComponent={() => <View style={{ height: "2%" }} />}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      </Layout>
    </SafeAreaView>
  );
};
