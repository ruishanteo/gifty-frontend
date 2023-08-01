import React from "react";
import { Chip } from "@rneui/themed";

export const FilterChip = ({ type, filterProp }) => {
  const [isPressed, setIsPressed] = React.useState(false);

  const handlePress = () => {
    console.log("Icon chip was pressed!");
    setIsPressed(!isPressed);
  };

  return (
    <Chip
      title={filterProp}
      onPress={handlePress}
      type={isPressed ? "solid" : "outline"}
    />
  );
};
