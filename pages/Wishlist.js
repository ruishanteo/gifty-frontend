import * as React from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import {
  Button,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { ListItem, SearchBar } from "@rneui/themed";
import Modal from "react-native-modal";
import Layout from "../components/Layout";

export const Wishlist = ({ navigation }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);

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
      <View style={{ height: "92.5%" }}>
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
      <View style={{ alignItems: "flex-end" }}>
        <IconButton
          onPress={() => setOpen(true)}
          containerColor={theme.colors.secondary}
          iconColor={theme.colors.background}
          size={30}
          icon="plus"
        />
      </View>

      <Modal
        animationType="slide"
        visible={open}
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              { backgroundColor: theme.colors.tertiary },
            ]}
          >
            <Layout
              title="Add Person"
              onAction={() => setOpen(false)}
              iconName="close"
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 20,
                }}
                flexDirection="row"
              >
                <Text variant="bodyLarge" style={{ width: 60 }}>
                  Name:
                </Text>
                <TextInput
                  mode="flat"
                  style={{
                    backgroundColor: theme.colors.tertiary,
                    width: 200,
                  }}
                  theme={{
                    colors: { onSurfaceVariant: theme.colors.font },
                  }}
                  textColor={theme.colors.font}
                  activeUnderlineColor={theme.colors.font}
                  placeholder="Add Name"
                />
              </View>
              <Button
                buttonColor={theme.colors.quaternary}
                textColor={theme.colors.background}
                icon="check"
                onPress={console.log("add person")}
                style={{ marginTop: 20 }}
              >
                Done
              </Button>
            </Layout>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
});
