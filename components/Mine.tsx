import React from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { styles, width } from "../utils/styles";
import { MapNode } from "../utils/map";

export default function Mine({ navigation, route }: MineProps): JSX.Element {
  const { map } = route.params;
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
                      navigation.navigate("ItemInfo", { item });
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
