/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useRef } from "react";
import * as firebase from "firebase";
import { useAppDispatch } from "../utils/hooks";
import { setUser } from "../utils/userSlice";
import {
  TextInput,
  Pressable,
  Alert,
  Text,
  Animated,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ImageBackground,
  Easing,
  Keyboard,
  Platform,
} from "react-native";
import { styles, width } from "../utils/styles";
const AnimTextInput = Animated.createAnimatedComponent(TextInput);

export default function Landing({ navigation }: LandingProps): JSX.Element {
  firebase.app();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailAnim = useRef(new Animated.Value(0)).current;
  const passwordAnim = useRef(new Animated.Value(0)).current;

  const emailRef = useRef<TextInput>();
  const passwordRef = useRef<TextInput>();

  const toggleEmail = (focused: boolean) => {
    focused
      ? Animated.timing(emailAnim, {
          useNativeDriver: true,
          toValue: 1,
          duration: 200,
          easing: Easing.ease,
        }).start()
      : Animated.timing(emailAnim, {
          useNativeDriver: true,
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
        }).start();
  };

  const togglePassword = (focused: boolean) => {
    focused
      ? Animated.timing(passwordAnim, {
          useNativeDriver: true,
          toValue: 1,
          duration: 200,
          easing: Easing.ease,
        }).start()
      : Animated.timing(passwordAnim, {
          useNativeDriver: true,
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
        }).start();
  };

  async function signIn(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        navigation.navigate("Home");
      })
      .catch((e) => Alert.alert("Error signing in", e.message));
  }

  async function signUp(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        firebase
          .database()
          .ref("userInit")
          .once("value", (snapshot) => {
            firebase.database().ref(`users/${user!.uid}`).set(snapshot.val());
          });
        user!.updateProfile({ displayName: "budyy" });
        setEmail("");
        setPassword("");
        navigation.navigate("Home");
      })
      .catch((e) => Alert.alert("Error signing up", e.message));
  }

  return (
    <ImageBackground
      source={require("../assets/signin_bg.png")}
      style={[styles.bg, styles.whiteBg]}
    >
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={Keyboard.dismiss}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <AnimTextInput
            keyboardType="email-address"
            onChangeText={setEmail}
            allowFontScaling={false}
            autoCapitalize="none"
            disableFullscreenUI
            value={email}
            placeholder="email"
            ref={emailRef}
            style={[
              styles.input,
              styles.shadow,
              {
                shadowOffset: {
                  width: 0,
                  height: emailAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, width],
                  }),
                },
                shadowRadius: emailAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 10],
                }),
              },
              styles.marginTop,
              styles.border,
            ]}
            onFocus={() => toggleEmail(true)}
            onBlur={() => toggleEmail(false)}
          />
          <AnimTextInput
            secureTextEntry
            onChangeText={setPassword}
            allowFontScaling={false}
            autoCapitalize="none"
            disableFullscreenUI
            value={password}
            placeholder="password"
            ref={passwordRef}
            style={[
              styles.input,
              styles.shadow,
              {
                shadowOffset: {
                  width: 0,
                  height: passwordAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, width * 0.02],
                  }),
                },
                shadowRadius: passwordAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 10],
                }),
              },
              styles.marginTop,
              styles.border,
            ]}
            onFocus={() => togglePassword(true)}
            onBlur={() => togglePassword(false)}
          />
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#395aff" : "#1122f4",
              },
              styles.logOut,
              styles.marginTopDouble,
            ]}
            onPress={() => {
              Keyboard.dismiss();
              emailRef.current!.blur();
              passwordRef.current!.blur();

              signIn(email, password);
            }}
          >
            <Text style={styles.purchaseText}>Sign In</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#395aff" : "#1122f4",
              },
              styles.logOut,
              styles.marginTop,
            ]}
            onPress={() => {
              Keyboard.dismiss();
              emailRef.current!.blur();
              passwordRef.current!.blur();

              signUp(email, password);
            }}
          >
            <Text style={styles.purchaseText}>Sign Up</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}
