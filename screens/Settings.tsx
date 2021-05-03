/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import * as firebase from "firebase";
import * as SecureStore from "expo-secure-store";
import { ScrollView, Text, Switch, View, Pressable, Alert } from "react-native";
import { useAppSelector, useAppDispatch } from "../utils/hooks";
import {
  setInvertBg,
  setAutoAd,
  setDisableAnimations,
} from "../utils/settingsSlice";
import { setUser } from "../utils/userSlice";
import { styles } from "../utils/styles";

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

  function deleteAccount() {
    const uid = firebase.auth().currentUser!.uid;
    firebase
      .auth()
      .currentUser!.delete()
      .then(() => {
        firebase.database().ref(`/users/${uid}`).set(null);
        SecureStore.deleteItemAsync("credential");
        dispatch(setUser({ uid: "", displayName: "" }));
        navigation.navigate("Landing");
      })
      .catch((e) => Alert.alert("Error deleting account", e.message));
  }

  return (
    <ScrollView
      style={[styles.scrollPadding, styles.whiteBg]}
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
        <View style={[styles.s_tContainer, styles.marginTopDouble]}>
          <Text style={[styles.avenir, styles.s_tName]}>Invert background</Text>
          <Switch
            value={invertBg}
            trackColor={{ false: "white", true: "#1122f4" }}
            thumbColor={invertBg ? "white" : "black"}
            ios_backgroundColor={"white"}
            onValueChange={toggleInvertBg}
          />
        </View>
        <View style={[styles.marginTopDouble, styles.s_tContainer]}>
          <Text style={[styles.avenir, styles.s_tName]}>
            Automatically play ad when out of tokens
          </Text>
          <Switch
            value={autoAd}
            trackColor={{ false: "white", true: "#1122f4" }}
            thumbColor={autoAd ? "white" : "black"}
            ios_backgroundColor={"white"}
            onValueChange={toggleAutoAd}
          />
        </View>
        <View style={[styles.marginTopDouble, styles.s_tContainer]}>
          <Text style={[styles.avenir, styles.s_tName]}>
            Disable animations
          </Text>
          <Switch
            value={disableAnimations}
            trackColor={{ false: "white", true: "#1122f4" }}
            thumbColor={disableAnimations ? "white" : "black"}
            ios_backgroundColor={"white"}
            onValueChange={toggleDisableAnimations}
          />
        </View>
      </View>
      <View>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#395aff" : "#1122f4",
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
              backgroundColor: pressed ? "#395aff" : "#1122f4",
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
