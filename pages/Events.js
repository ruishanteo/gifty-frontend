import React from "react";
import { View, Text } from "react-native";
import { Button, useTheme } from "react-native-paper";
import {
  enGB,
  registerTranslation,
  DatePickerModal,
} from "react-native-paper-dates";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { SafeAreaProvider } from "react-native-safe-area-context";

export function Events() {
  const theme = useTheme();
  registerTranslation("en-GB", enGB);

  const [date, setDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  return (
    <SafeAreaProvider>
      <View
        style={{
          justifyContent: "center",
          flex: 1,
          alignItems: "center",
        }}
      >
        <Button onPress={() => setOpen(true)} mode="outlined">
          <MaterialCommunityIcons name="plus" color={theme.colors.primary} />
          Event
        </Button>
        <DatePickerModal
          locale="en-GB"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
        />
      </View>
    </SafeAreaProvider>
  );
}
