import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import { withAuthenticator } from "aws-amplify-react-native";
import Amplify from "@aws-amplify/core";
import config from "./aws-exports";
import {
  Answer,
  Home,
  ItemInfo,
  MapScreen,
  Collection,
  NodeInfo,
  Purchase,
  Settings,
  Tokens,
} from "./screens/Components";

import "./dev_server/server";

import store from "./utils/store";
import { fetchMap } from "./utils/mapSlice";
import { fetchTokens } from "./utils/tokensSlice";

Amplify.configure(config);

enableScreens();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  useEffect(() => {
    store.dispatch(fetchMap(null));
    store.dispatch(fetchTokens(null));
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
          <Stack.Screen name="Collection" component={Collection} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Tokens" component={Tokens} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
