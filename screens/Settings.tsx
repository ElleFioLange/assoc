/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import * as firebase from "firebase";
import * as SecureStore from "expo-secure-store";
import { ScrollView, Text, View, Pressable, Alert } from "react-native";
import Setting from "../components/Setting";
import { useAppSelector, useAppDispatch } from "../utils/hooks";
import {
  setInvertBg,
  setAutoAd,
  setDisableAnimations,
} from "../utils/settingsSlice";
import { setUser } from "../utils/userSlice";
import { accentBlue, accentBlueLite, styles } from "../utils/styles";

export default function Settings({ navigation }: SettingsProps): JSX.Element {
  firebase.app();

  const displayName = useAppSelector((state) => state.user.displayName);
  const invertBg = useAppSelector((state) => state.settings.invertBg);
  const autoAd = useAppSelector((state) => state.settings.autoAd);
  const disableAnimations = useAppSelector(
    (state) => state.settings.disableAnimations
  );
  const dispatch = useAppDispatch();

  function toggleInvertBg() {
    dispatch(setInvertBg(!invertBg));
  }

  function toggleAutoAd() {
    dispatch(setAutoAd(!autoAd));
  }

  function toggleDisableAnimations() {
    dispatch(setDisableAnimations(!disableAnimations));
  }

  function signOut() {
    firebase
      .auth()
      .signOut()
      .then(() => navigation.replace("Landing"))
      .catch((e) => Alert.alert("Error signing out", e.message));
  }

  function doubleCheck() {
    Alert.alert(
      "Are you sure?",
      "Deleting your account cannot be undone, and you will lose all unlocked locations and items",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: deleteAccount,
          style: "destructive",
        },
      ]
    );
  }

  async function deleteAccount() {
    const credential = await SecureStore.getItemAsync("credential");
    const { email, password } = JSON.parse(credential!);
    await firebase.auth().signInWithEmailAndPassword(email, password);
    const uid = firebase.auth().currentUser!.uid;
    firebase
      .auth()
      .currentUser!.delete()
      .then(() => {
        firebase.database().ref(`/users/${uid}`).set(null);
        navigation.navigate("Landing");
      })
      .catch((e) => Alert.alert("Error deleting account", e.message));
  }

  return (
    <ScrollView
      style={[styles.scrollPadding, styles.whiteBg]}
      // I have absolutely no idea why, but I can't abstract this
      // into the stylesheet. Luckily it's only used here, hah! not!
      // It's also in tokens but that's the only other place
      contentContainerStyle={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text style={[styles.avenir, styles.s_tTitle, styles.marginTopDouble]}>
          Hi, {displayName}
        </Text>
        <Setting
          title="Invert background"
          value={invertBg}
          cb={toggleInvertBg}
        />
        <Setting
          title="Automatically play ad when out of tokens"
          value={autoAd}
          cb={toggleAutoAd}
        />
        <Setting
          title="Disable animations"
          value={disableAnimations}
          cb={toggleDisableAnimations}
        />
      </View>
      <View>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? accentBlueLite : accentBlue,
            },
            styles.logOut,
            styles.marginTopDouble,
          ]}
          onPress={signOut}
        >
          <Text style={[styles.avenir, styles.logOutText]}>Sign out</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? accentBlueLite : accentBlue,
            },
            styles.logOut,
            styles.marginTop,
          ]}
          onPress={doubleCheck}
        >
          <Text style={[styles.avenir, styles.logOutText]}>
            Delete my account
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
