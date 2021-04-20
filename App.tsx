/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { enableScreens } from "react-native-screens";
import Home from "./components/Home";
// import Map from "./components/Map";
import Mine from "./components/Mine";

import { devMap } from "./utils/map";

enableScreens();
const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  const [map, setMap] = useState(devMap);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {(props) => <Home {...props} map={map} setMap={setMap} />}
        </Stack.Screen>
        {/* <Stack.Screen name="Map">
          {(props) => <Map {...props} map={map} />}
        </Stack.Screen> */}
        <Stack.Screen name="Mine">
          {(props) => <Mine {...props} map={map} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
