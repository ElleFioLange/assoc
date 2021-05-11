import React, { useState } from "react";
import * as firebase from "firebase";
import * as SecureStore from "expo-secure-store";
import { useAppDispatch } from "../utils/hooks";
import { setUser } from "../utils/userSlice";
import {
  Modal,
  View,
  Alert,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ImageBackground,
  Keyboard,
  Platform,
} from "react-native";
import ActionBar from "../components/ActionBar";
import CustomTextInput from "../components/CustomTextInput";
import DatePicker from "@react-native-community/datetimepicker";
import { styles, width, win } from "../utils/styles";

export default function Landing({ navigation }: LandingProps): JSX.Element {
  firebase.app();
  const dispatch = useAppDispatch();

  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState<Date>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [signingUp, setSigningUp] = useState(false);

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
      setSigningIn(true);
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
          setSigningIn(false);
          navigation.replace("Home");
        })
        .catch((e) => {
          Alert.alert("Error signing in", e.message);
          setSigningIn(false);
        });
    }
  }

  function getSignUpInfo() {
    if (testInputs()) {
      setModal(true);
    }
  }

  async function signUp() {
    setSigningUp(true);
    firebase
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
            firebase.database().ref(`users/${user?.uid}`).set(snapshot.val());
            firebase
              .database()
              .ref(`users/${user?.uid}/birthDate`)
              .set(birthDate?.toJSON());
          });
        user?.updateProfile({ displayName: name });
        dispatch(setUser({ displayName: name }));
        setEmail("");
        setPassword("");
        setName("");
        setBirthDate(undefined);
        setSigningUp(false);
        navigation.replace("Home");
      })
      .catch((e) => {
        Alert.alert("Error signing up", e.message);
        setSigningUp(false);
      });
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
        <View
          style={styles.container}
          pointerEvents={signingIn || signingUp ? "none" : "auto"}
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
              <View style={[styles.container, { minWidth: win.width }]}>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <CustomTextInput
                    placeholder="name"
                    value={name}
                    setValue={setName}
                  />
                </KeyboardAvoidingView>
                <View
                  style={[
                    styles.input,
                    styles.birthDatePicker,
                    styles.border,
                    styles.marginTop,
                  ]}
                >
                  <Text
                    style={[
                      styles.avenir,
                      styles.birthDateLabel,
                      {
                        color: birthDate ? "black" : "#9194ab",
                      },
                    ]}
                  >
                    {birthDate?.toLocaleDateString() || "birthdate"}
                  </Text>
                </View>
                <DatePicker
                  textColor="black"
                  style={{ width: width }}
                  value={birthDate || new Date()}
                  display="spinner"
                  onChange={(_, selectedDate) => {
                    setBirthDate(selectedDate || birthDate);
                    Keyboard.dismiss();
                  }}
                  maximumDate={new Date()}
                />
                <ActionBar
                  title="Submit"
                  style={styles.marginTopDouble}
                  onPress={() => {
                    if (!name) Alert.alert("Name is required");
                    else if (!birthDate) Alert.alert("Birthdate is required");
                    else {
                      setModal(false);
                      signUp();
                    }
                  }}
                />
                <ActionBar
                  title="Cancel"
                  style={styles.marginTop}
                  onPress={() => {
                    setName("");
                    setBirthDate(undefined);
                    setModal(false);
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <CustomTextInput
              placeholder="email"
              props={{ autoCapitalize: "none", keyboardType: "email-address" }}
              value={email}
              setValue={setEmail}
            />
            <CustomTextInput
              placeholder="password"
              props={{ secureTextEntry: true, autoCapitalize: "none" }}
              style={styles.marginTop}
              value={password}
              setValue={setPassword}
            />
          </KeyboardAvoidingView>
          <ActionBar
            title={signingIn ? "Signing In..." : "Sign In"}
            style={styles.marginTopDouble}
            onPress={() => {
              Keyboard.dismiss();

              signIn();
            }}
          />
          <ActionBar
            title={signingUp ? "Signing Up..." : "Sign Up"}
            style={styles.marginTop}
            onPress={() => {
              Keyboard.dismiss();

              getSignUpInfo();
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}
