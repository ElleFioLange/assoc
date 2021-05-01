import React from "react";
import { View, Pressable, Text } from "react-native";
import { styles } from "../utils/styles";

export default function Map({ navigation, route }: PurchaseProps): JSX.Element {
  return (
    <View style={[styles.container, styles.whiteBg]}>
      <Pressable
        style={({ pressed }) => [
          { backgroundColor: pressed ? "#395aff" : "#1122f4" },
          styles.purchase,
        ]}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.purchaseText}>Return</Text>
      </Pressable>
    </View>
  );
}
