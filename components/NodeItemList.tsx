import React from "react";
import { FlatList, View, TouchableWithoutFeedback, Image } from "react-native";
import { styles, width } from "../utils/styles";

export default function NodeItemList({
  node,
  openItem,
}: {
  node: NodeData;
  openItem: (item: ItemData) => void;
}): JSX.Element {
  const items = Object.keys(node.items).map((key) => node.items[key]);
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => {
        const content = item.content[0];
        return (
          <View style={styles.shelfItem}>
            <TouchableWithoutFeedback onPress={() => openItem(item)}>
              {/* 
              I have absolutely no idea why, but if I use the
              custom image component that I wrote then it eats the
              touch responder or something and openItem never gets called.
              */}
              <Image
                source={{ uri: content.uri, cache: "force-cache" }}
                style={styles.image}
                width={
                  content.w >= content.h
                    ? width
                    : (width * content.w) / content.h
                }
                height={
                  content.w < content.h
                    ? width
                    : (width * content.h) / content.w
                }
              />
            </TouchableWithoutFeedback>
          </View>
        );
      }}
      horizontal={true}
      style={styles.shelf}
      keyExtractor={(item) => item.id}
    />
  );
}
