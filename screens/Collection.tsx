import React from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useAppSelector } from "../utils/hooks";
import { selectNodes } from "../utils/mapSlice";
import { styles, width } from "../utils/styles";

export default function Collection({ navigation }: MineProps): JSX.Element {
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
                          source={{ uri: item.mainContent.uri }}
                          style={[styles.carouselImage]}
                          width={
                            item.mainContent.w >= item.mainContent.h
                              ? width
                              : (width * item.mainContent.w) /
                                item.mainContent.h
                          }
                          height={
                            item.mainContent.w < item.mainContent.h
                              ? width
                              : (width * item.mainContent.h) /
                                item.mainContent.w
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
                      Math.max(
                        ...items.map(
                          (item) => item.mainContent.h / item.mainContent.w
                        )
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollPadding}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
