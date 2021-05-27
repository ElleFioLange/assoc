import React from "react";
import { View, Text } from "react-native";
import { styles } from "../utils/styles";

export default function Answer({ route }: AnswerProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Text selectable style={styles.answer}>
        {route.params.answer}
      </Text>
    </View>
  );
}
