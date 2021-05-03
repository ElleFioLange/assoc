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

// TODO fix the image to use the new item.content property instead of item.mainContent

export default function Collection({ navigation }: MineProps): JSX.Element {
  const nodes = useAppSelector(selectNodes);
  // nodes.sort((a, b) => a.minD(map.curNode.id) - b.minD(map.curNode.id));

  return (
    <View style={[styles.container, styles.whiteBg]}>
      <FlatList
        data={nodes}
        renderItem={(node) => {
          // FlatList is very stupid and passes the data
          // as an object with the node and index, instead of just
          // passing them as separate optional values.
          // node.item is the actual NodeData
          const items = Object.keys(node.item.items).map(
            (key) => node.item.items[key]
          );
          return (
            <React.Fragment key={node.item.id}>
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
              <Text
                style={[
                  styles.avenir,
                  styles.marginTop,
                  { fontSize: 20, fontWeight: "200" },
                ]}
              >
                {node.item.name}
              </Text>
            </React.Fragment>
          );
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollPadding}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
