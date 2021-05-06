import React from "react";
import { View, Text, Switch } from "react-native";
import { styles, accentBlue } from "../utils/styles";

export default function Setting({
  title,
  value,
  cb,
}: {
  title: string;
  value: boolean;
  cb: () => void;
}): JSX.Element {
  return (
    <View style={[styles.s_tContainer, styles.marginTopDouble]}>
      <Text style={[styles.avenir, styles.s_tName]}>{title}</Text>
      <Switch
        value={value}
        trackColor={{ false: "white", true: accentBlue }}
        thumbColor={value ? "white" : "black"}
        ios_backgroundColor={"white"}
        onValueChange={cb}
      />
    </View>
  );
}
