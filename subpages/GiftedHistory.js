import React from "react";
import { Dimensions, FlatList, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "@rneui/themed";

import { Listing } from "../components/Listing";
import Layout from "../components/Layout";

export const GiftedHistory = ({ navigation }) => {
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = React.useState("");

  const windowWidth = Dimensions.get("window").width;

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };
  //listing array
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
      description:
        "Enim commodo eiusmod laboris officia qui aliqua id eiusmod commodo. Veniam duis pariatur ex ut ex tempor nisi cillum ullamco mollit nisi reprehenderit velit cupidatat. Ex dolor deserunt amet voluptate commodo ea nostrud commodo quis sit sit et. Consectetur nisi aliqua aute cupidatat anim consequat nostrud ea aute elit aliquip sint adipisicing id. Lorem tempor incididunt ullamco officia.",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item Third Item Third Item Third Item",
      source:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==",
    },
  ];

  return (
    <SafeAreaView>
      <Layout
        title="Gifted"
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
