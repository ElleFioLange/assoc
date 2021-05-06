import React from "react";
import { View, Text, Pressable } from "react-native";
import { styles, accentBlue, accentBlueLite } from "../utils/styles";

export default function TokenOption({
  quantity,
  price,
  cb,
}: {
  quantity: number;
  price: number;
  cb: (quantity: number) => void;
}): JSX.Element {
  return (
    <View style={[styles.s_tContainer, styles.marginTop]}>
      <Text style={styles.s_tName}>{quantity}</Text>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? accentBlueLite : accentBlue,
          },
          styles.tokenPurchase,
        ]}
        onPress={() => cb(quantity)}
      >
        <Text style={[styles.avenir, styles.purchaseText]}>${price}.00</Text>
      </Pressable>
    </View>
  );
}
