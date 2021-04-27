import React from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { styles, width } from "../utils/styles";

export default function Mine({ navigation, route }: MineProps): JSX.Element {
  const { map } = route.params;
  const nodes = Array.from(map.data.values());
  nodes.sort((a, b) => a.minD(map.curNode.id) - b.minD(map.curNode.id));

  return (
    <View style={[styles.container, styles.whiteBg]}>
      <FlatList
        data={nodes}
        renderItem={(node) => {
          const items = Array.from(node.item.items.values());
          return (
            <>
              <FlatList
                // FlatList is very stupid and passes the node as a ListRenderItem
                // Node.item is the actual MapNode
                data={items}
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
                style={[
                  styles.shelf,
                  {
                    height:
                      Math.max(
                        ...items.map((item) => item.dims.h / item.dims.w)
                      ) * width,
                  },
                ]}
                keyExtractor={(item) => item.id}
              />
              <Text style={[styles.avenir, styles.marginTop]}>
                {node.item.name}
              </Text>
            </>
          );
        }}
        horizontal={false}
        contentContainerStyle={styles.scrollPadding}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
