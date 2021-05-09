import React, { useState } from "react";
import * as firebase from "firebase";
import { View, Pressable, Text } from "react-native";
import { styles, accentBlue, accentBlueLite } from "../utils/styles";

// TODO All of it lol
// TODO Payment processing
// TODO Payment UI

export default function Share({ navigation, route }: ShareProps): JSX.Element {
  const [curCode, setCurCode] = useState<string>();
  firebase
    .database()
    .ref("shortcutItemDirectory")
    .once("value")
    .then((snapshot) => {
      setCurCode(snapshot.val());
    });

  return (
    <View style={[styles.container, styles.whiteBg]}>
      <Text>Yo what up?</Text>
      <Pressable
        style={({ pressed }) => [
          { backgroundColor: pressed ? accentBlueLite : accentBlue },
          styles.purchase,
        ]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.purchaseText}>asd</Text>
      </Pressable>
    </View>
  );
}
