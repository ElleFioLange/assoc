import React from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useAppSelector } from "../utils/redux/hooks";
import { selectNodes } from "../utils/redux/mapSlice";
import { styles, width } from "../utils/styles";

export default function Mine({ navigation }: MineProps): JSX.Element {
  const nodes = useAppSelector(selectNodes);
  // nodes.sort((a, b) => a.minD(map.curNode.id) - b.minD(map.curNode.id));

  return (
    <View style={[styles.container, styles.whiteBg]}>
      <FlatList
        data={nodes}
        renderItem={(node) => {
          // FlatList is very stupid and passes the node as a ListRenderItem
          // Node.item is the actual MapNode
          const items = Array.from(node.item.items.values());
          return (
            <>
              <FlatList
                data={items}
                renderItem={({ item }) => {
                  return (
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
                            item.w >= item.h ? width : (width * item.w) / item.h
                          }
                          height={
                            item.w < item.h ? width : (width * item.h) / item.w
                          }
                        />
                      </TouchableWithoutFeedback>
                    </View>
                  );
                }}
                horizontal={true}
                style={[
                  styles.shelf,
                  {
                    height:
                      Math.max(...items.map((item) => item.h / item.w)) * width,
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollPadding}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
