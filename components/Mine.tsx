/* eslint-disable react/no-children-prop */
import React, { useState } from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import {
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { styles, width, win } from "../utils/styles";
import { Item, MapNode } from "../utils/map";

import ItemInfo from "./ItemInfo";

function Browser({ map, setItem, navigation }: BrowserProps) {
  const nodes = Array.from(map.data.values());
  nodes.sort((a, b) => a.minD(map.curNode.id) - b.minD(map.curNode.id));

  return (
    <ScrollView style={styles.whiteBg}>
      <View style={styles.marginTopDouble}>
        {nodes.map((node: MapNode) => (
          <View key={node.name} style={styles.container}>
            <FlatList
              data={Array.from(node.items.values())}
              renderItem={({ item }) => (
                <View style={styles.shelfItem}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setItem(item);
                      navigation.navigate("MineItem");
                    }}
                  >
                    <Image
                      source={{ uri: item.uri }}
                      style={[styles.carouselImage]}
                      width={
                        item.dims.w >= item.dims.h
                          ? width
                          : (width * item.dims.w) / item.dims.h
                      }
                      height={
                        item.dims.w < item.dims.h
                          ? width
                          : (width * item.dims.h) / item.dims.w
                      }
                    />
                  </TouchableWithoutFeedback>
                </View>
              )}
              horizontal={true}
              style={styles.shelf}
              keyExtractor={(item) => item.name}
            />
            <Text
              style={[
                styles.avenir,
                styles.marginTop,
                { width: width, fontWeight: "500" },
              ]}
            >
              {node.name}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const Stack = createNativeStackNavigator();

export default function Mine({ map }: ScreenProps): JSX.Element {
  const [item, setItem] = useState<Item>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        stackPresentation: "formSheet",
      }}
    >
      <Stack.Screen name="Browser">
        {(props) => <Browser {...props} map={map} setItem={setItem} />}
      </Stack.Screen>
      <Stack.Screen name="MineItem">
        {() => <ItemInfo item={item} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
