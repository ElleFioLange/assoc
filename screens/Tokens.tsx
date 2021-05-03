import React from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { useAppSelector, useThunkDispatch } from "../utils/hooks";
import { setTokens } from "../utils/tokensSlice";
import { styles } from "../utils/styles";

export default function Tokens(): JSX.Element {
  const dispatch = useThunkDispatch();
  const tokens = useAppSelector((state) => state.tokens);

  function buyTokens(quantity: number) {
    dispatch(setTokens(quantity + tokens));
  }

  return (
    <ScrollView style={[styles.scrollPadding, styles.whiteBg]}>
      <View style={styles.container}>
        <Text style={[styles.avenir, styles.s_tTitle, styles.marginTopDouble]}>
          You have {tokens} tokens
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
        <View style={[styles.s_tContainer, styles.marginTop]}>
          <Text style={styles.s_tName}>25 Tokens</Text>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#395aff" : "#1122f4",
              },
              styles.tokenPurchase,
            ]}
            onPress={() => buyTokens(25)}
          >
            <Text style={[styles.avenir, styles.purchaseText]}>$2.00</Text>
          </Pressable>
        </View>
        <View style={[styles.s_tContainer, styles.marginTop]}>
          <Text style={styles.s_tName}>75 Tokens</Text>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#395aff" : "#1122f4",
              },
              styles.tokenPurchase,
            ]}
            onPress={() => buyTokens(75)}
          >
            <Text style={[styles.avenir, styles.purchaseText]}>$5.00</Text>
          </Pressable>
        </View>
        <View style={[styles.s_tContainer, styles.marginTop]}>
          <Text style={styles.s_tName}>200 Tokens</Text>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#395aff" : "#1122f4",
              },
              styles.tokenPurchase,
            ]}
            onPress={() => buyTokens(200)}
          >
            <Text style={[styles.avenir, styles.purchaseText]}>$10.00</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
