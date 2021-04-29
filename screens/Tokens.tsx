import React from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { useAppSelector, useThunkDispatch } from "../utils/hooks";
import { addTokens } from "../utils/tokensSlice";
import { styles } from "../utils/styles";

export default function Tokens(): JSX.Element {
  const dispatch = useThunkDispatch();
  const quantity = useAppSelector((state) => state.tokens.quantity);

  function buyTokens(quantity: number) {
    dispatch(addTokens(quantity));
  }

  return (
    <ScrollView style={[styles.scrollPadding, styles.whiteBg]}>
      <View style={styles.container}>
        <Text style={[styles.avenir, styles.s_tTitle, styles.marginTopDouble]}>
          You have {quantity} tokens
        </Text>
      </View>
      <View style={[styles.container, styles.marginTopDouble]}>
        <View style={styles.s_tContainer}>
          <Text style={styles.s_tName}>10 Tokens</Text>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#395aff" : "#1122f4",
              },
              styles.tokenPurchase,
            ]}
            onPress={() => buyTokens(10)}
          >
            <Text style={[styles.avenir, styles.purchaseText]}>$1.00</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
