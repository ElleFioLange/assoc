import React, { useState, useRef } from "react";
import * as firebase from "firebase";
import * as SecureStore from "expo-secure-store";
import { useAppDispatch } from "../utils/hooks";
import { setUser } from "../utils/userSlice";
import {
  Modal,
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
import { styles, width, win } from "../utils/styles";
const AnimTextInput = Animated.createAnimatedComponent(TextInput);

// TODO add an age check to sign up

export default function Landing({ navigation }: LandingProps): JSX.Element {
  firebase.app();
  const dispatch = useAppDispatch();

  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nameAnim = useRef(new Animated.Value(0)).current;
  const emailAnim = useRef(new Animated.Value(0)).current;
  const passwordAnim = useRef(new Animated.Value(0)).current;

  const nameRef = useRef<TextInput>();
  const emailRef = useRef<TextInput>();
  const passwordRef = useRef<TextInput>();

  const toggleName = (focused: boolean) => {
    focused
      ? Animated.timing(nameAnim, {
          useNativeDriver: true,
          toValue: 1,
          duration: 200,
          easing: Easing.ease,
        }).start()
      : Animated.timing(nameAnim, {
          useNativeDriver: true,
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
        }).start();
  };
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

  function testInputs() {
    const regex = RegExp(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!regex.test(email)) {
      Alert.alert("Invalid email", "You probably have a typo");
      return false;
    }
    if (password.length < 12) {
      Alert.alert(
        "Password too short",
        'Passwords must be at least 12 characters. Try using a passphrase to make it easier to remember, like "crabsatthebeach"'
      );
      return false;
    }
    return true;
  }

  async function signIn() {
    if (testInputs()) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          SecureStore.setItemAsync(
            "credential",
            JSON.stringify({ email, password })
          );
          setEmail("");
          setPassword("");
          navigation.replace("Home");
        })
        .catch((e) => Alert.alert("Error signing in", e.message));
    }
  }

  function getName() {
    if (testInputs()) {
      setModal(true);
    }
  }

  async function signUp() {
    name
      ? firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(({ user }) => {
            SecureStore.setItemAsync(
              "credential",
              JSON.stringify({ email, password })
            );
            firebase
              .database()
              .ref("userInit")
              .once("value", (snapshot) => {
                firebase
                  .database()
                  .ref(`users/${user?.uid}`)
                  .set(snapshot.val());
              });
            user?.updateProfile({ displayName: name });
            dispatch(setUser({ displayName: name }));
            setEmail("");
            setPassword("");
            setName("");
            navigation.replace("Home");
          })
          .catch((e) => Alert.alert("Error signing up", e.message))
      : Alert.alert("Name is required");
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
          <Modal
            visible={modal}
            transparent={false}
            animationType="slide"
            onRequestClose={() => setModal(false)}
          >
            <TouchableWithoutFeedback
              style={styles.container}
              onPress={Keyboard.dismiss}
            >
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
              >
                <View style={[styles.container, { minWidth: win.width }]}>
                  <AnimTextInput
                    onChangeText={setName}
                    allowFontScaling={false}
                    // disableFullscreenUI
                    value={name}
                    placeholder="name"
                    placeholderTextColor="#9194ab"
                    ref={nameRef}
                    style={[
                      styles.input,
                      styles.shadow,
                      {
                        shadowOffset: {
                          width: 0,
                          height: nameAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, width],
                          }),
                        },
                        shadowRadius: nameAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 10],
                        }),
                      },
                      styles.border,
                    ]}
                    onFocus={() => toggleName(true)}
                    onBlur={() => toggleName(false)}
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
                      setModal(false);
                      signUp();
                    }}
                  >
                    <Text style={styles.purchaseText}>Submit</Text>
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
                      setName("");
                      toggleName(false);
                      setModal(false);
                    }}
                  >
                    <Text style={styles.purchaseText}>Cancel</Text>
                  </Pressable>
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </Modal>
          <AnimTextInput
            keyboardType="email-address"
            onChangeText={setEmail}
            allowFontScaling={false}
            autoCapitalize="none"
            disableFullscreenUI
            value={email}
            placeholder="email"
            placeholderTextColor="#9194ab"
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
            onChangeText={(input) => setPassword(input.trim())}
            allowFontScaling={false}
            autoCapitalize="none"
            disableFullscreenUI
            value={password}
            placeholder="password"
            placeholderTextColor="#9194ab"
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
              emailRef.current?.blur();
              passwordRef.current?.blur();

              signIn();
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
              emailRef.current?.blur();
              passwordRef.current?.blur();

              getName();
            }}
          >
            <Text style={styles.purchaseText}>Sign Up</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}
