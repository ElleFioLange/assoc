/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useRef } from "react";
import * as firebase from "firebase";
import * as SecureStore from "expo-secure-store";
import { useAppDispatch, useThunkDispatch } from "../utils/hooks";
import { setUserInfo } from "../utils/userSlice";
import {
  View,
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

export default function SignIn({ navigation }: SignInProps): JSX.Element {
  firebase.app();

  const dispatch = useAppDispatch();
  const thunkDispatch = useThunkDispatch();

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

  async function signIn(
    email: string,
    password: string,
    successCb: () => void,
    errCb: (e: Error) => void
  ) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(async (credential) => {
        console.log(credential);
        await SecureStore.setItemAsync(
          "credential",
          JSON.stringify({ email, password })
        );
        const { uid, displayName } = credential.user!;
        dispatch(setUserInfo({ uid, displayName }));
        thunkDispatch(fetchMap());
        thunkDispatch(fetchTokens());
        successCb();
      }, errCb);
  }

  function successCb() {
    Keyboard.dismiss();
    emailRef.current!.blur();
    passwordRef.current!.blur();
    setEmail("");
    setPassword("");
    navigation.navigate("Home");
  }

  function errCb(e: Error) {
    Alert.alert("Error signing in", e.message);
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
              if (emailRef.current) emailRef.current.blur();
              if (passwordRef.current) passwordRef.current.blur();

              signIn(email, password, successCb, errCb);
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
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.purchaseText}>Sign Up</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}
