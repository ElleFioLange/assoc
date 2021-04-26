import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { enableScreens } from "react-native-screens";
import AppLoading from "expo-app-loading";
import { getMap, getTokens } from "./utils/api/client";
import {
  Answer,
  Home,
  ItemInfo,
  MapScreen,
  Mine,
  NodeInfo,
  Purchase,
  Settings,
  Tokens,
} from "./components/Components";

const userId = "1";

enableScreens();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  const [mapLoading, setMapLoading] = useState(true);
  const [tokensLoading, setTokensLoading] = useState(true);

  let map;
  let tokens;
  getMap(userId).then((value) => (map = value));
  getTokens(userId).then((value) => (tokens = value));

  return mapLoading || tokensLoading ? (
    <AppLoading />
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Home"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} initialParams={{ map }} />
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
          options={{ stackPresentation: "formSheet" }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          initialParams={{ map }}
        />
        <Stack.Screen
          name="NodeInfo"
          component={NodeInfo}
          options={{ stackPresentation: "formSheet" }}
        />
        <Stack.Screen name="Mine" component={Mine} initialParams={{ map }} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Tokens" component={Tokens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
