/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import AppLoading from "expo-app-loading";
import { Alert } from "react-native";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import * as firebase from "firebase";
import * as SecureStore from "expo-secure-store";

import SignIn from "./screens/SignIn";
import Home from "./screens/Home";
import Answer from "./screens/Answer";
import ItemInfo from "./screens/ItemInfo";
import MapScreen from "./screens/MapScreen";
import Collection from "./screens/Collection";
import NodeInfo from "./screens/NodeInfo";
import Purchase from "./screens/Purchase";
import Settings from "./screens/Settings";
import Tokens from "./screens/Tokens";

// import "./dev_server/server";

import store from "./utils/store";
import { setMapData } from "./utils/mapSlice";
import { setUserInfo } from "./utils/userSlice";

const firebaseConfig = {
  apiKey: "AIzaSyBBrOZTRhISAGWaj6JjVm8DTPpzHRT9VRI",
  authDomain: "assoc-d30ac.firebaseapp.com",
  databaseURL: "https://assoc-d30ac-default-rtdb.firebaseio.com",
  projectId: "assoc-d30ac",
  storageBucket: "assoc-d30ac.appspot.com",
  messagingSenderId: "341782713355",
  appId: "1:341782713355:web:bb2c956fcfa4c73f85630e",
  measurementId: "G-VVME0TLGNG",
};

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    const { uid, displayName } = user;
    store.dispatch(setUserInfo({ uid, displayName }));
  }
});

enableScreens();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  const [credStatus, setCredStatus] = useState("checking");

  useEffect(() => {
    checkForCredential().then((available) => {
      if (available) {
        setCredStatus("available");
      } else {
        setCredStatus("unavailable");
      }
    });
  });

  async function checkForCredential() {
    const data = await SecureStore.getItemAsync("credential");
    if (data) {
      const { email, password } = JSON.parse(data);
      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          () => {
            return true;
          },
          (e: Error) => {
            Alert.alert("Error signing in", e.message);
            return false;
          }
        );
    } else {
      return false;
    }
  }

  return credStatus === "checking" ? (
    <AppLoading />
  ) : (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={credStatus === "available" ? "Home" : "SignIn"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="Answer"
            component={Answer}
            options={{ stackPresentation: "formSheet" }}
          />
          <Stack.Screen
            name="ItemInfo"
            component={ItemInfo}
            options={{ stackPresentation: "formSheet" }}
          />
          <Stack.Screen
            name="Purchase"
            component={Purchase}
            options={{ stackPresentation: "fullScreenModal" }}
          />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen
            name="NodeInfo"
            component={NodeInfo}
            options={{ stackPresentation: "formSheet" }}
          />
          <Stack.Screen name="Collection" component={Collection} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Tokens" component={Tokens} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
