import React from "react";
import {
  Pressable,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from "react-native";
import { styles, accentBlue, accentBlueLite } from "../utils/styles";

export default function ActionBar({
  onPress,
  style,
  children,
}: {
  onPress: (event: GestureResponderEvent) => void;
  style: StyleProp<ViewStyle>;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? accentBlueLite : accentBlue,
        },
        styles.actionBar,
        style,
      ]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}
