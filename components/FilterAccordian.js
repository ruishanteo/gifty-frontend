import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { ListItem } from "@rneui/themed";

import { FilterChip } from "./FilterChip.js";

export const FilterAccordian = ({ filterProp }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <ListItem.Accordion
      bottomDivider
      content={
        <ListItem.Content>
          <ListItem.Title style={{ color: theme.colors.font }}>
            {filterProp.label}
          </ListItem.Title>
        </ListItem.Content>
      }
      isExpanded={isExpanded}
      onPress={() => setIsExpanded(!isExpanded)}
      containerStyle={{ backgroundColor: theme.colors.background }}
    >
      <View
        flexDirection="row"
        flexWrap="wrap"
        style={{
          backgroundColor: theme.colors.surface,
          gap: 10,
          padding: 10,
        }}
      >
        {filterProp.chips.map((chip, index) => (
          <FilterChip key={index} filterProp={filterProp} chip={chip} />
        ))}
      </View>
    </ListItem.Accordion>
  );
};
