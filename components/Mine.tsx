/* eslint-disable react/no-children-prop */
import React, { useState } from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { FlatList, View, Text, Image, Button } from "react-native";
import { styles } from "../utils/styles";
import { Item } from "../utils/map";

import ItemInfo from "./ItemInfo";

function Browser({ map, setItem, navigation }: BrowserProps) {
  const nodes = Array.from(map.data.values());
  const curNodeId = map.curNode.id;
  nodes.sort((a, b) => a.minD(curNodeId) - b.minD(curNodeId));

  return (
    <View style={[styles.container, styles.whiteBg]}>
      <Button
        onPress={() => {
          setItem(Array.from(map.curNode.items.values())[0]);
          navigation.navigate("MineItem");
        }}
        title="Item"
      />
    </View>
    // <>
    //   {nodes.map((node: MapNode) => (
    //     <View key={node.name}>
    //       <FlatList
    //         data={Array.from(node.items.values())}
    //         renderItem={({ item }) => (
    //           <View style={styles.shelfItem}>
    //             <Image source={{ uri: item.uri }} width={100} height={100} />
    //           </View>
    //         )}
    //         horizontal={true}
    //         style={styles.shelf}
    //         keyExtractor={(item) => item.name}
    //       />
    //       <Text>{node.name}</Text>
    //     </View>
    //   ))}
    // </>
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
