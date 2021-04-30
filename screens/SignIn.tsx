import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { View, TextInput, Pressable, Alert, Text } from "react-native";
import { styles } from "../utils/styles";

export default function SignIn({ navigation }: SignInProps): JSX.Element {
  async function signIn() {
    try {
      const { user } = await Auth.signIn({
        username: "asdf",
        password: "asdf",
      });
    } catch (e) {
      Alert.alert("Error signing in", e.message);
    }
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#395aff" : "#1122f4",
          },
          styles.logOut,
        ]}
        onPress={() => signIn()}
      >
        <Text>what</Text>
      </Pressable>
    </View>
  );
}
