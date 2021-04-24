import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { useFonts, Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
import { enableScreens } from "react-native-screens";
import Home from "./components/Home";
import Answer from "./components/Answer";
import ItemInfo from "./components/ItemInfo";
import Purchase from "./components/Purchase";
import Map from "./components/Map";
import Mine from "./components/Mine";
import Settings from "./components/Settings";
import Tokens from "./components/Tokens";

import { devMap } from "./utils/map";

enableScreens();
const Stack = createNativeStackNavigator<RootStackParamList>();

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
        <Stack.Screen
          name="Home"
          component={Home}
          initialParams={{ map, setMap }}
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
        <Stack.Screen name="Purchase" component={Purchase} options={{ stackPresentation: "formSheet" }} />
        <Stack.Screen name="Map" component={Map} initialParams={{ map }} />
        <Stack.Screen name="Mine" component={Mine} initialParams={{ map }} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Tokens" component={Tokens} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <AppLoading />
  );
}
