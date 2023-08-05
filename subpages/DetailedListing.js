import * as React from "react";
import { Dimensions, SafeAreaView, ScrollView, View } from "react-native";
import { Avatar, Button, IconButton, Text, useTheme } from "react-native-paper";
import { BottomSheet, Image, ListItem } from "@rneui/themed";

import Layout from "../components/Layout";

export const DetailedListing = ({ route, navigation }) => {
  const { listing } = route.params;

  const theme = useTheme();

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const windowWidth = Dimensions.get("window").width;

  const list = [{ title: "List Item 1" }, { title: "List Item 2" }];
  const selectedItems = [];

  return (
    <SafeAreaView>
      <ScrollView>
        <Layout
          iconName="chevron-left"
          title="Edit Avatar"
          onAction={() => navigation.goBack()}
        >
          <IconButton icon="chevron-left" onPress={() => navigation.goBack()} />

          <View
            style={{ alignItems: "center", width: windowWidth }}
            flexDirection="column"
          >
            <Image
              containerStyle={{ width: "95%", aspectRatio: 1 }}
              source={{
                uri: "https://reactnative.dev/img/tiny_logo.png",
              }}
            />

            <View style={{ width: "95%", gap: 10 }}>
              <Text variant="titleLarge" numberOfLines={2}>
                {listing.title}
              </Text>
              <Text variant="bodyLarge">{listing.description}</Text>
            </View>
            <View
              flexDirection="row"
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                width: "95%",
              }}
            >
              <Avatar.Image
                size={30}
                source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
              />

              <Button
                variant="contained"
                buttonColor={theme.colors.secondary}
                textColor={theme.colors.surface}
                style={{ width: "45%", marginLeft: 10 }}
              >
                Learn more
              </Button>

              <IconButton
                onPress={() => setOpenDrawer(true)}
                icon={listing.isGifted ? "gift" : "gift-outline"}
                iconColor={theme.colors.secondary}
              />
              <IconButton
                onPress={() => setOpenDrawer(true)}
                icon={listing.isGifted ? "heart" : "heart-outline"}
                iconColor={theme.colors.secondary}
              />

              <IconButton
                onPress={() => setOpenDrawer(true)}
                icon={listing.isSaved ? "bookmark" : "bookmark-outline"}
                iconColor={theme.colors.secondary}
              />
            </View>
            <BottomSheet
              modalProps={{}}
              onBackdropPress={() => setOpenDrawer(false)}
              isVisible={openDrawer}
            >
              <ListItem>
                <ListItem.Content>
                  <IconButton
                    onPress={() => setOpenDrawer(false)}
                    icon="close"
                    iconColor={theme.colors.secondary}
                  />
                </ListItem.Content>
              </ListItem>
              {list.map((l, i) => (
                <ListItem bottomDivider key={i}>
                  <View
                    flexDirection="row"
                    style={{
                      alignItems: "center",
                      width: "90%",
                      marginLeft: 20,
                      marginBottom: 20,
                      gap: 20,
                    }}
                  >
                    <ListItem.CheckBox
                      key={i}
                      checked={true}
                      // checked={selectedItems.includes(l.title)}
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      onPress={() => {
                        console.log("pressed", l);
                        selectedItems.push(l.title);
                      }}
                    />
                    <ListItem.Content>
                      <ListItem.Title>{l.title}</ListItem.Title>
                    </ListItem.Content>
                  </View>
                </ListItem>
              ))}
            </BottomSheet>
          </View>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};