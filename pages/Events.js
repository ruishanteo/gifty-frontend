import React from "react";
import { FlatList, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { enGB, registerTranslation } from "react-native-paper-dates";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { NewEvent } from "../subpages/NewEvent.js";

export function Events({ navigation }) {
  const theme = useTheme();
  registerTranslation("en-GB", enGB);

  const events = [
    { name: "Event 0", date: moment("28122023", "DDMMYYYY") },
    { name: "Event 5", date: moment("01082023", "DDMMYYYY") },
    { name: "Event 6", date: moment("04082023", "DDMMYYYY") },
    { name: "Event 7", date: moment("02082023", "DDMMYYYY") },
    { name: "Event 8", date: moment("05082023", "DDMMYYYY") },
    { name: "Event 9", date: moment("03082023", "DDMMYYYY") },
    { name: "Event 10", date: moment("06082023", "DDMMYYYY") },
  ];

  const sortedEvents = [
    ...events
      .filter((d) => d.date.diff(moment(), "days") >= 0)
      .sort((a, b) => {
        return a.date.diff(moment(), "days") - b.date.diff(moment(), "days");
      }),
    ...events
      .filter((d) => d.date.diff(moment(), "days") < 0)
      .sort((a, b) => {
        return b.date.diff(moment(), "days") - a.date.diff(moment(), "days");
      }),
  ];

  const dateDiff = ({ event }) => {
    const rawDiff = event.date.diff(moment(), "days");
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
    return (
      <Card
        onPress={() => navigation.navigate("DetailedEvent", { event })}
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
    <SafeAreaView
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 15,
      }}
    >
      <View>
        <Text
          variant="titleLarge"
          style={{ marginBottom: 20, textAlign: "center" }}
        >
          Events
        </Text>
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
        <NewEvent />
      </View>
    </SafeAreaView>
  );
}
