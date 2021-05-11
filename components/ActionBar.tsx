import React from "react";
import {
  Pressable,
  StyleProp,
  ViewStyle,
  Text,
  GestureResponderEvent,
} from "react-native";
import { styles, accentBlue, accentBlueLite } from "../utils/styles";

export default function ActionBar({
  title,
  onPress,
  style,
}: {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style: StyleProp<ViewStyle>;
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
      <Text style={[styles.avenir, styles.actionBarText]}>{title}</Text>
    </Pressable>
  );
}
