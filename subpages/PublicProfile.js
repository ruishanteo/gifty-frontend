import { FlatList, View } from "react-native";
import { Button, IconButton, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import UserAvatar from "../components/UserAvatar";
import Layout from "../components/Layout";
import { Listing } from "../components/Listing";
import PaginationNav from "../components/PaginationNav";
import React from "react";

export const PublicProfile = ({ navigation }) => {
  const theme = useTheme();
  const [isFollowing, setIsFollowing] = React.useState(false);
  return (
    <SafeAreaView>
      <Layout
        iconName="chevron-left"
        title="Name XXX"
        onAction={() => navigation.goBack()}
      >
        <View
          style={{
            alignItems: "center",
            gap: 10,
            marginHorizontal: 15,
          }}
        >
          <UserAvatar />
          {isFollowing ? (
            <Button
              onPress={() => setIsFollowing(!isFollowing)}
              buttonColor={theme.colors.secondary}
              textColor={theme.colors.background}
              icon="account-off"
            >
              Unfollow
            </Button>
          ) : (
            <Button
              onPress={() => setIsFollowing(!isFollowing)}
              buttonColor={theme.colors.secondary}
              textColor={theme.colors.background}
              icon="account-plus"
            >
              Follow
            </Button>
          )}

          <View style={{ justifyContent: "left", width: "80%" }}>
            <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
              Name:
            </Text>
            <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
              Birthday: {moment().format("DD MMM YYYY")}
            </Text>

            {/* <FlatList
              data={data.listing}
              renderItem={({ item }) => (
                <Listing listing={item} navigation={navigation} />
              )}
              keyExtractor={(item) => item.id}
              numColumns={2}
              ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
              columnWrapperStyle={{
                justifyContent: "space-between",
              }}
              contentContainerStyle={{ paddingBottom: 80 }}
              ListFooterComponent={
                <PaginationNav
                  goToPage={handlePageChange}
                  currentPageNumber={data.currentPage}
                  maxPageNumber={data.totalPages}
                />
              }
              ListHeaderComponent={
                <Text
                  variant="titleMedium"
                  style={{
                    color: theme.colors.secondary,
                    fontWeight: "bold",
                  }}
                >
                  WISHLIST
                </Text>
              }
            /> */}
          </View>
        </View>
      </Layout>
    </SafeAreaView>
  );
};
