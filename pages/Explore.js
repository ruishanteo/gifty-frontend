import * as React from "react";
import { Dimensions, FlatList, SafeAreaView, View } from "react-native";
import {
  Button,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { BottomSheet, ListItem, SearchBar } from "@rneui/themed";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Listing } from "../components/Listing";
import { FilterAccordian } from "../components/FilterAccordian";

export const Explore = ({ navigation }) => {
  const theme = useTheme();

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const windowWidth = Dimensions.get("window").width;

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  //filter properties- types
  const types = ["Sort", "Category", "Platform"];

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
      <View
        style={{ alignItems: "center", width: windowWidth }}
        flexDirection="row"
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
            width: windowWidth - 80,
          }}
          round={true}
        />
        <IconButton
          onPress={() => setOpenDrawer(true)}
          iconColor={theme.colors.secondary}
          icon="tune"
          size={26}
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

      <BottomSheet
        onBackdropPress={() => setOpenDrawer(false)}
        isVisible={openDrawer}
      >
        <KeyboardAwareScrollView>
          <ListItem
            bottomDivider
            containerStyle={{ backgroundColor: theme.colors.background }}
          >
            <View
              flexDirection="row"
              style={{
                flex: 1,
                alignItems: "center",
                height: 45,
              }}
            >
              <IconButton
                onPress={() => setOpenDrawer(false)}
                iconColor={theme.colors.secondary}
                icon="close"
              />
              <Text
                variant="bodyLarge"
                style={{
                  flex: 1,
                  textAlign: "center",
                }}
              >
                Filter and Sort
              </Text>
              <Button
                onPress={() => console.log("reset")}
                textColor={theme.colors.secondary}
              >
                Reset
              </Button>
            </View>
          </ListItem>

          {types.map((type, index) => (
            <FilterAccordian key={index} type={type} />
          ))}

          <ListItem
            bottomDivider
            containerStyle={{ backgroundColor: theme.colors.background }}
          >
            <View flexDirection="column">
              <ListItem.Title style={{ color: theme.colors.font }}>
                Price Range ($)
              </ListItem.Title>
              <ListItem.Content>
                <View
                  flexDirection="row"
                  style={{
                    flex: 1,
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 30,
                    marginTop: 10,
                  }}
                >
                  <TextInput
                    mode="outlined"
                    placeholder="Lowest"
                    style={{ width: "40%" }}
                  />
                  <Text>-</Text>
                  <TextInput
                    mode="outlined"
                    placeholder="Highest"
                    style={{ width: "40%" }}
                  />
                </View>
              </ListItem.Content>
            </View>
          </ListItem>

          <ListItem
            bottomDivider
            containerStyle={{ backgroundColor: theme.colors.background }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                padding: 25,
              }}
            >
              <Button
                mode="contained"
                buttonColor={theme.colors.quaternary}
                textColor={theme.colors.surface}
                icon="check"
              >
                Done
              </Button>
            </View>
          </ListItem>
        </KeyboardAwareScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};
