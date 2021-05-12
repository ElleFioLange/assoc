import React from "react";
import * as firebase from "firebase";
import { ScrollView, View, Text, Pressable, Alert } from "react-native";
import TokenOption from "../components/TokenOption";
import { useAppSelector } from "../utils/reduxHooks";
import { styles, accentBlue, accentBlueLite } from "../utils/styles";

// TODO User feedback
// TODO Advert functionality
// TODO Microtransactions

export default function Tokens(): JSX.Element {
  const tokens = useAppSelector((state) => state.tokens);
  const uid = firebase.auth().currentUser?.uid;
  const tokenDatabaseRef = firebase.database().ref(`users/${uid}/tokens`);
  const feedbackDatabaseRef = firebase
    .database()
    .ref(`users/${uid}/lastFeedback`);

  function buyTokens({ price, quantity }: { price: number; quantity: number }) {
    tokenDatabaseRef.set(tokens + quantity);
  }

  function watchAd() {
    tokenDatabaseRef.set(tokens + 3);
  }

  function giveFeedback() {
    feedbackDatabaseRef.once("value", (snapshot) => {
      if (snapshot.val() > new Date().getTime() - 604800) {
        Alert.alert("Reward available once a week", "Give feedback anyway?", [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Ok",
            onPress: openFeedback,
          },
        ]);
      } else openFeedback();
    });
  }

  function openFeedback() {
    feedbackDatabaseRef.set(new Date().getTime());
    tokenDatabaseRef.set(tokens + 5);
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
        <View style={[styles.s_tContainer, styles.marginTop]}>
          <Text style={styles.s_tName}>3 Tokens</Text>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? accentBlueLite : accentBlue,
              },
              styles.tokenPurchase,
            ]}
            onPress={watchAd}
          >
            <Text style={[styles.avenir, styles.actionBarText]}>
              Watch an ad
            </Text>
          </Pressable>
        </View>
        <View style={[styles.s_tContainer, styles.marginTop]}>
          <Text style={styles.s_tName}>5 Tokens</Text>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? accentBlueLite : accentBlue,
              },
              styles.tokenPurchase,
            ]}
            onPress={giveFeedback}
          >
            <Text style={[styles.avenir, styles.actionBarText]}>
              Give feedback
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
