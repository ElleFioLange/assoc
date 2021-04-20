import React, { useState, useRef } from "react";
import {
  View,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Pressable,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import Logo from "./assets/logo.svg";

export default function Home({
  mapState,
  dims,
  setModal,
}: HomeProps): JSX.Element {
  const [asc, setAsc] = useState("");
  const [ans, setAns] = useState("");

  return (
    <ScrollView>
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={Keyboard.dismiss}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Logo />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
