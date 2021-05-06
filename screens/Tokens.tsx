import React from "react";
import * as firebase from "firebase";
import { ScrollView, View, Text, Pressable } from "react-native";
import TokenOption from "../components/TokenOption";
import { useAppSelector } from "../utils/hooks";
import { styles } from "../utils/styles";

export default function Tokens(): JSX.Element {
  const tokens = useAppSelector((state) => state.tokens);

  function buyTokens(quantity: number) {
    const uid = firebase.auth().currentUser?.uid;
    firebase
      .database()
      .ref(`users/${uid}/tokens`)
      .set(tokens + quantity);
  }

  return (
    <ScrollView style={[styles.scrollPadding, styles.whiteBg]}>
      <View style={styles.container}>
        <Text style={[styles.avenir, styles.s_tTitle, styles.marginTopDouble]}>
          You have {tokens} tokens
        </Text>
      </View>
      <View style={[styles.container, styles.marginTop]}>
        <TokenOption quantity={10} price={1} cb={buyTokens} />
        <TokenOption quantity={25} price={2} cb={buyTokens} />
        <TokenOption quantity={75} price={5} cb={buyTokens} />
        <TokenOption quantity={200} price={10} cb={buyTokens} />
      </View>
    </ScrollView>
  );
}
