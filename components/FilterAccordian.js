import React from "react";
import { FlatList, View } from "react-native";
import { useTheme } from "react-native-paper";
import { ListItem } from "@rneui/themed";

import { FilterChip } from "./FilterChip.js";

export const FilterAccordian = ({ type }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = React.useState(false);
  //use type to query for the array of chips associated to type
  const setChips = ["clothes", "accessories", "decor"];

  return (
    <ListItem.Accordion
      bottomDivider
      content={
        <ListItem.Content>
          <ListItem.Title style={{ color: theme.colors.font }}>
            {type}
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
        {setChips.map((filterProp, index) => (
          <FilterChip key={index} type={type} filterProp={filterProp} />
        ))}
      </View>
    </ListItem.Accordion>
  );
};
