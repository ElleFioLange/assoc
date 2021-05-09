import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import AppLoading from "expo-app-loading";
import { Alert } from "react-native";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import * as firebase from "firebase";
import * as SecureStore from "expo-secure-store";

import Landing from "./screens/Landing";
import Home from "./screens/Home";
import Answer from "./screens/Answer";
import ItemInfo from "./screens/ItemInfo";
import MapScreen from "./screens/MapScreen";
import Collection from "./screens/Collection";
import LocationInfo from "./screens/LocationInfo";
import Purchase from "./screens/Purchase";
import Share from "./screens/Share";
import Settings from "./screens/Settings";
import Tokens from "./screens/Tokens";

import store from "./utils/store";
import { setUser, setSaved } from "./utils/userSlice";
import { setTokens } from "./utils/tokensSlice";
import { setMap, setCurLocationId } from "./utils/mapSlice";
import { fetchSettings } from "./utils/settingsSlice";

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
  if (user) {
    const { uid, displayName } = user;
    store.dispatch(setUser({ uid, displayName }));
    const uidRef = firebase.database().ref(`users/${uid}`);
    uidRef.child("tokens").on("value", (snapshot) => {
      store.dispatch(setTokens(snapshot.val()));
    });
    uidRef.child("map").on("value", (snapshot) => {
      store.dispatch(setMap(snapshot.val()));
    });
    uidRef.child("curLocationId").on("value", (snapshot) => {
      store.dispatch(setCurLocationId(snapshot.val()));
    });
    uidRef.child("saved").on("value", (snapshot) => {
      store.dispatch(setSaved(snapshot.val()));
    });
  } else {
    const uid = store.getState().user.uid;
    const uidRef = firebase.database().ref(`users/${uid}`);
    uidRef.child("tokens").off();
    uidRef.child("map").off();
    uidRef.child("curLocationId").off();
    uidRef.child("saved").off();
    store.dispatch(setUser({ uid: "", displayName: "" }));
    SecureStore.deleteItemAsync("credential");
  }
});

// TODO Push notifications
// TODO Analytics
// TODO All the backend lol goddamn
// TODO Unlock item functionality

enableScreens();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  const [credStatus, setCredStatus] = useState("checking");

  useEffect(() => {
    store.dispatch(fetchSettings());
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
          initialRouteName={credStatus === "available" ? "Home" : "Landing"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{ gestureEnabled: false }}
          />
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
            options={{
              stackPresentation: "fullScreenModal",
            }}
          />
          <Stack.Screen
            name="Share"
            component={Share}
            options={{ stackPresentation: "fullScreenModal" }}
          />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="LocationInfo" component={LocationInfo} />
          <Stack.Screen name="Collection" component={Collection} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Tokens" component={Tokens} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
