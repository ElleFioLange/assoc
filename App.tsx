import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
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
} from "./screens/Components";

import "./dev_server/server";

import store from "./utils/redux/store";
import { fetchMap } from "./utils/redux/mapSlice";
import { fetchTokens } from "./utils/redux/tokensSlice";

enableScreens();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  const { userId } = store.getState().user;

  useEffect(() => {
    store.dispatch(fetchMap(userId));
    store.dispatch(fetchTokens(userId));
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={"Home"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Home} />
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
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen
            name="NodeInfo"
            component={NodeInfo}
            options={{ stackPresentation: "formSheet" }}
          />
          <Stack.Screen name="Mine" component={Mine} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Tokens" component={Tokens} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
