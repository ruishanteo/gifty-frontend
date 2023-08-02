import React from "react";
import { FlatList, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { enGB, registerTranslation } from "react-native-paper-dates";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { NewEvent } from "../subpages/NewEvent.js";

export function Events() {
  const theme = useTheme();
  registerTranslation("en-GB", enGB);

  const events = [
    { name: "Event 1", date: moment("28072023", "DDMMYYYY") },
    { name: "Event 2", date: moment("29072023", "DDMMYYYY") },
    { name: "Event 3", date: moment("30072023", "DDMMYYYY") },
    { name: "Event 4", date: moment("31072023", "DDMMYYYY") },
    { name: "Event 5", date: moment("01082023", "DDMMYYYY") },
    { name: "Event 6", date: moment("04082023", "DDMMYYYY") },
  ];

  // const sortedEvents = events.sort((a , b) =>
  //a.date.diff(moment(), "days") > b.date.diff(moment(), "days"))

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

  const EventView = ({ event }) => (
    <Card
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
        }}
        titleStyle={{ textAlign: "center", color: theme.colors.background }}
        titleVariant="titleMedium"
        title={event.name}
      />
      {dateDiff({ event })}
      <Card.Title
        titleStyle={{ textAlign: "center" }}
        title={moment(event.date).format("DD MMM YYYY")}
      />
      {console.log(event)}
    </Card>
  );

  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Text variant="titleLarge" style={{ marginBottom: 20 }}>
        Events
      </Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          marginHorizontal: 15,
        }}
      >
        <FlatList
          data={events}
          renderItem={({ item }) => <EventView event={item} />}
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
