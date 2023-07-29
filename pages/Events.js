import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { enGB, registerTranslation } from "react-native-paper-dates";

import { NewEvent } from "../subpages/NewEvent.js";

export function Events() {
  const theme = useTheme();
  registerTranslation("en-GB", enGB);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      {/* Array.map(() => <Flatlist/>) */}

      <NewEvent />
    </View>
  );
}
