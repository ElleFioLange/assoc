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
import Share from "./screens/Share";
import Settings from "./screens/Settings";
import Tokens from "./screens/Tokens";

import store from "./redux/store";
import { setUser } from "./redux/userSlice";
import { addLocation } from "./redux/locationsSlice";
import { addItem } from "./redux/itemsSlice";
import { fetchSettings } from "./redux/settingsSlice";

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

firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);

// TODO Push notifications
// TODO Analytics
// TODO All the backend lol goddamn
// TODO Unlock item functionality

enableScreens();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  const [credStatus, setCredStatus] = useState("checking");
  const [disableAnimations, setDisableAnimations] = useState(
    store.getState().settings.disableAnimations
  );

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const { uid } = user;
      const fstore = firebase.firestore();
      fstore
        .collection("users")
        .doc(uid)
        .get()
        .then((doc) => {
          const data = doc.data() as TUserData;
          store.dispatch(setUser(data));
          const { locations, items } = data;
          const locationIds = Object.keys(locations);
          for (let i = 0; i < locationIds.length; i += 10) {
            fstore
              .collection("locations")
              .where("id", "in", locationIds.slice(i, i + 10))
              .get()
              .then((docs) => {
                docs.forEach((doc) => {
                  const docData = doc.data() as TLocation;
                  docData.items = locations[docData.id];
                  store.dispatch(addLocation(docData));
                });
              });
          }
          const itemIds = Object.values(items);
          for (let i = 0; i < locationIds.length; i += 10) {
            fstore
              .collection("items")
              .where("id", "in", itemIds.slice(i, i + 10))
              .get()
              .then((docs) => {
                docs.forEach((doc) => {
                  const docData = doc.data() as TItem;
                  // Set connections to only those unlocked by the user
                  docData.connections = items[docData.id];
                  store.dispatch(addItem(docData));
                });
              });
          }
        })
        .then(() => setCredStatus("available"));
    }
  });

  useEffect(() => {
    store.dispatch(fetchSettings());
    checkForCredential();
    store.subscribe(() => {
      setDisableAnimations(store.getState().settings.disableAnimations);
    });
  });

  async function checkForCredential() {
    const data = await SecureStore.getItemAsync("credential");
    console.log(data);
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
            Alert.alert("Error signing in", e.message, [
              {
                text: "Ok",
                style: "default",
              },
              {
                text: "Reset saved credentials",
                onPress: () => SecureStore.deleteItemAsync("credential"),
                style: "destructive",
              },
            ]);
            SecureStore.deleteItemAsync("credential");
            setCredStatus("unavailable");
          }
        );
    } else {
      setCredStatus("unavailable");
    }
  }

  return credStatus === "checking" ? (
    <AppLoading />
  ) : (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={credStatus === "available" ? "Home" : "Landing"}
          screenOptions={{
            headerShown: false,
            stackAnimation: disableAnimations ? "none" : "default",
          }}
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
