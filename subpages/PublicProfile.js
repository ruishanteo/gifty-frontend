import React from "react";
import { Dimensions, FlatList, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";

import UserAvatar from "../components/UserAvatar";
import Layout from "../components/Layout";
import { Listing } from "../components/Listing";
import { LoadingIcon } from "../components/LoadingIcon";
import { useAddFriend, useRemoveFriend, useUser } from "../api/person";
import { useMyWishlistedListings } from "../api/listing";

export const PublicProfile = ({ route, navigation }) => {
  const windowHeight = Dimensions.get("window").height;

  const { userId } = route.params;
  const { isLoading, data } = useUser(userId);
  const addFriendMutation = useAddFriend(userId);
  const removeFriendMutation = useRemoveFriend(userId);
  const {
    isLoading: isMyWishlistedListingLoading,
    data: myWishlistedListingData,
  } = useMyWishlistedListings(userId);

  const theme = useTheme();

  if (isLoading) return <LoadingIcon fullSize={true} />;

  return (
    <SafeAreaView>
      <Layout
        iconName="chevron-left"
        title={data.user.username}
        onAction={() => navigation.goBack()}
      >
        <View style={{ marginHorizontal: 15, height: windowHeight * 0.85 }}>
          {isMyWishlistedListingLoading ? (
            <LoadingIcon />
          ) : myWishlistedListingData.listing.length === 0 ? (
            <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
              No wishlisted listing
            </Text>
          ) : (
            <FlatList
              data={myWishlistedListingData.listing}
              renderItem={({ item }) => (
                <Listing listing={item} navigation={navigation} />
              )}
              keyExtractor={(item) => item.id}
              numColumns={2}
              ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
              columnWrapperStyle={{
                justifyContent: "space-between",
              }}
              contentContainerStyle={{ paddingBottom: 80 }}
              ListHeaderComponent={
                <View
                  style={{
                    alignItems: "center",
                    gap: 10,
                    marginHorizontal: 15,
                  }}
                >
                  <UserAvatar avatarProps={data.user.avatar} />

                  {data.user.isFriends ? (
                    <Button
                      onPress={() => removeFriendMutation.mutateAsync()}
                      buttonColor={theme.colors.secondary}
                      textColor={theme.colors.background}
                      icon="account-off"
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      onPress={() => addFriendMutation.mutateAsync()}
                      buttonColor={theme.colors.secondary}
                      textColor={theme.colors.background}
                      icon="account-plus"
                    >
                      Follow
                    </Button>
                  )}
                  <View style={{ justifyContent: "left", width: "80%" }}>
                    <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                      Name: {data.user.username}
                    </Text>
                    <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                      Birthday:{" "}
                      {moment(data.user.birthday).format("DD MMM YYYY")}
                    </Text>
                  </View>
                  <View style={{ justifyContent: "left", width: "100%" }}>
                    <Text
                      variant="titleMedium"
                      style={{
                        color: theme.colors.secondary,
                        fontWeight: "bold",
                      }}
                    >
                      WISHLIST
                    </Text>
                  </View>
                </View>
              }
            />
          )}
        </View>
      </Layout>
    </SafeAreaView>
  );
};
