import React from "react";
import { View, Pressable, Text } from "react-native";
import { styles, accentBlue, accentBlueLite } from "../utils/styles";

export default function Map({ navigation, route }: PurchaseProps): JSX.Element {
  return (
    <View style={[styles.container, styles.whiteBg]}>
      <Pressable
        style={({ pressed }) => [
          { backgroundColor: pressed ? accentBlueLite : accentBlue },
          styles.purchase,
        ]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.purchaseText}>Return</Text>
      </Pressable>
    </View>
  );
}
