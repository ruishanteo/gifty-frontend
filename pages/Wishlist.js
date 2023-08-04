import * as React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, useTheme } from "react-native-paper";
import { ListItem, SearchBar } from "@rneui/themed";

export const Wishlist = ({ navigation }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const friends = [
    { name: "Amy", id: 1 },
    { name: "BooBoo", id: 2 },
    { name: "Charlie", id: 3 },
    { name: "Donald", id: 4 },
  ];

  const Item = ({ item }) => (
    <ListItem.Swipeable
      bottomDivider
      onPress={() => navigation.navigate("WishResult", { friend: item })}
      rightContent={(reset) => (
        <Button
          onPress={() => console.log(reset)}
          icon="delete"
          buttonColor={theme.colors.quaternary}
          textColor={theme.colors.surface}
          style={{
            height: "100%",
            justifyContent: "center",
          }}
        >
          Delete
        </Button>
      )}
      containerStyle={{
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.secondary,
      }}
    >
      <ListItem.Content>
        <ListItem.Title style={{ color: theme.colors.font }}>
          {item.name}
        </ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );

  return (
    <SafeAreaView>
      <View>
        <SearchBar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          containerStyle={{
            backgroundColor: "transparent",
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
          }}
          inputContainerStyle={{ backgroundColor: theme.colors.primary }}
          round={true}
        />

        <FlatList
          data={friends}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
        />
      </View>
    </SafeAreaView>
  );
};
