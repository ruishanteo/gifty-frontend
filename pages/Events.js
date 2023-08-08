import React from "react";
import { FlatList, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { enGB, registerTranslation } from "react-native-paper-dates";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "@rneui/themed";

import moment from "moment";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { NewEvent } from "../subpages/NewEvent.js";
import { useEvents } from "../api/event.js";
import noPageFound from "../assets/noPageFound.png";

export function Events({ navigation }) {
  const theme = useTheme();
  const { isLoading, data } = useEvents();
  registerTranslation("en-GB", enGB);

  if (isLoading) return null;

  const events = data.events.map((event) => ({
    ...event,
    date: moment(event.date),
  }));

  const countDateDiff = (event) => {
    return Math.ceil(event.date.diff(moment(), "days", true)) - 1;
  };

  const sortedEvents = [
    ...events
      .filter((d) => countDateDiff(d) >= 0)
      .sort((a, b) => {
        return countDateDiff(a) - countDateDiff(b);
      }),
    ...events
      .filter((d) => countDateDiff(d) < 0)
      .sort((a, b) => {
        return countDateDiff(b) - countDateDiff(a);
      }),
  ];

  const dateDiff = ({ event }) => {
    const rawDiff = countDateDiff(event);
    return (
      <View
        flexDirection="row"
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {rawDiff < 0 ? (
          <>
            <Text variant="displaySmall">{Math.abs(rawDiff)}</Text>
            <MaterialCommunityIcons name="arrow-down" color="red" size={20} />
          </>
        ) : (
          <>
            <Text variant="displaySmall">{rawDiff}</Text>
            <MaterialCommunityIcons name="arrow-up" color="green" size={20} />
          </>
        )}
      </View>
    );
  };

  const EventView = ({ event, navigation }) => {
    const formattedDate = React.useMemo(
      () => (event.date ? moment(event.date).format("DD MMM YYYY") : ""),
      [event.date]
    );

    return (
      <Card
        onPress={() =>
          navigation.navigate("DetailedEvent", {
            event: {
              ...event,
              date: formattedDate,
            },
          })
        }
        style={{
          height: 150,
          width: "49%",
          borderRadius: 15,
          backgroundColor: theme.colors.tertiary,
        }}
      >
        <Card.Title
          style={{
            backgroundColor: theme.colors.quaternary,
            width: "100%",
            borderTopEndRadius: 15,
            borderTopStartRadius: 15,
            height: "20%",
          }}
          titleStyle={{ textAlign: "center", color: theme.colors.background }}
          titleVariant="titleMedium"
          title={event.name}
        />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "70%",
          }}
        >
          <Text>{dateDiff({ event })}</Text>
          <Text>{moment(event.date).format("DD MMM YYYY")}</Text>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 15,
          width: "95%",
          height: "98%",
        }}
      >
        <Text
          variant="titleLarge"
          style={{ marginBottom: 20, textAlign: "center" }}
        >
          Events
        </Text>
        {events.length === 0 ? (
          <>
            <Image
              containerStyle={{ width: 250, aspectRatio: 1 }}
              source={{ uri: Image.resolveAssetSource(noPageFound).uri }}
            />
            <Text
              variant="titleSmall"
              style={{ marginTop: -120, marginLeft: 50 }}
            >
              No events found!
            </Text>
          </>
        ) : (
          <FlatList
            style={{ height: "80%" }}
            data={sortedEvents}
            renderItem={({ item }) => (
              <EventView event={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.name}
            numColumns={2}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
        )}
      </View>
      <NewEvent />
    </SafeAreaView>
  );
}
