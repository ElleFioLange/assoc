/* eslint-disable react/no-children-prop */
import React from "react";
import { FlatList, View, Text, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { styles } from "../utils/styles";
import { MapNode } from "../utils/map";

function NodeSort({ map }: { map: TMap }) {
  const nodes = Array.from(map.data.values());
  const curNodeId = map.curNode.id;
  nodes.sort((a, b) => a.minD(curNodeId) - b.minD(curNodeId));

  return (
    <>
      {nodes.map((node: MapNode) => (
        <View key={node.name}>
          <FlatList
            data={Array.from(node.items.values())}
            renderItem={({ item }) => (
              <View style={styles.shelfItem}>
                <Image source={{ uri: item.uri }} />
              </View>
            )}
            horizontal={true}
            style={styles.shelf}
            keyExtractor={(item) => item.name}
          />
          <Text>{node.name}</Text>
        </View>
      ))}
    </>
  );
}

function Test() {
  return <Image source={require("../dev_assets/radio.jpg")} />;
}

function Settings() {
  return <Text>Hi this is the Settings</Text>;
}

const Tab = createBottomTabNavigator();

export default function Mine({ map }: { map: TMap }): JSX.Element {
  return (
    <Tab.Navigator>
      <Tab.Screen name="By Location" children={() => <NodeSort map={map} />} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Test" component={Test} />
    </Tab.Navigator>
  );
}
