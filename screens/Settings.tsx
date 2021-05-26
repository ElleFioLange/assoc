/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from "react";
import * as firebase from "firebase";
import * as SecureStore from "expo-secure-store";
import { ScrollView, Text, View, Alert } from "react-native";
import ActionBar from "../components/ActionBar";
import Setting from "../components/Setting";
import { useAppSelector, useAppDispatch } from "../utils/reduxHooks";
import { setUser } from "../utils/userSlice";
import {
  setInvertBg,
  setAutoAd,
  setDisableAnimations,
  setAutoPlayVideos,
} from "../utils/settingsSlice";
import { styles } from "../utils/styles";

export default function Settings({ navigation }: SettingsProps): JSX.Element {
  firebase.app();

  const [deleting, setDeleting] = useState(false);

  const uid = useAppSelector((state) => state.user.uid);
  const displayName = useAppSelector((state) => state.user.displayName);
  const invertBg = useAppSelector((state) => state.settings.invertBg);
  const autoAd = useAppSelector((state) => state.settings.autoAd);
  const disableAnimations = useAppSelector(
    (state) => state.settings.disableAnimations
  );
  const autoPlayVideos = useAppSelector(
    (state) => state.settings.autoPlayVideos
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

  function toggleAutoPlayVideos() {
    dispatch(setAutoPlayVideos(!autoPlayVideos));
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

  async function resetUser() {
    firebase
      .database()
      .ref(`userInit`)
      .once("value", (snapshot) => {
        firebase.database().ref(`users/${uid}`).set(snapshot.val());
      });
  }

  async function deleteAccount() {
    setDeleting(true);
    const credential = await SecureStore.getItemAsync("credential");
    const { email, password } = JSON.parse(credential!);
    await firebase.auth().signInWithEmailAndPassword(email, password);
    const uidRef = firebase.database().ref(`users/${uid}`);
    uidRef.child("tokens").off();
    uidRef.child("map").off();
    uidRef.child("curLocationId").off();
    uidRef.child("saved").off();
    dispatch(setUser({ uid: "", displayName: "" }));
    SecureStore.deleteItemAsync("credential");
    firebase
      .auth()
      .currentUser!.delete()
      .then(() => {
        firebase.database().ref(`/users/${uid}`).remove();
        setDeleting(false);
        navigation.navigate("Landing");
      })
      .catch();
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
      pointerEvents={deleting ? "none" : "auto"}
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
        <Setting
          title="Auto play videos"
          value={autoPlayVideos}
          cb={toggleAutoPlayVideos}
        />
      </View>
      <View>
        <ActionBar
          title="Sign Out"
          style={styles.marginTopDouble}
          onPress={signOut}
        />
        <ActionBar
          title={deleting ? "Deleting account..." : "Delete My Account"}
          style={styles.marginTop}
          onPress={doubleCheck}
        />
        {__DEV__ && (
          <ActionBar
            title="Reset User"
            style={styles.marginTop}
            onPress={resetUser}
          />
        )}
      </View>
    </ScrollView>
  );
}
