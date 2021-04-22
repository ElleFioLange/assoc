/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { useFonts, Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
import { enableScreens } from "react-native-screens";
import Home from "./components/Home";
import Map from "./components/Map";
import Mine from "./components/Mine";
import Settings from "./components/Settings";
import Account from "./components/Account";

import { devMap } from "./utils/map";

enableScreens();
const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  const [map, setMap] = useState(devMap);

  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
  });

  return fontsLoaded ? (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Home"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home">
          {(props) => <Home {...props} map={map} setMap={setMap} />}
        </Stack.Screen>
        <Stack.Screen name="Map" component={Map} />
        {/* <Stack.Screen name="Map">
          {(props) => <Map {...props} map={map} />}
        </Stack.Screen> */}
        <Stack.Screen name="Mine">
          {(props) => <Mine {...props} map={map} />}
        </Stack.Screen>
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Account" component={Account} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <AppLoading />
  );
}
