import React from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";
import { styles, width } from "../utils/styles";

// TODO fix the image to use the new item.content property instead of item.mainContent
// TODO item description

export default function ItemInfo({
  navigation,
  route,
}: ItemInfoProps): JSX.Element {
  const { item } = route.params;
  return (
    <ScrollView style={[styles.whiteBg]}>
      <View style={styles.container}>
        {item.content.length > 1 ? (
          <FlatList
            data={item.content}
            // FlatList is very stupid and passes the data
            // as an object with the content under the key "item"
            renderItem={({ item }) => {
              return (
                <View style={styles.shelfItem}>
                  <Image
                    source={{ uri: item.uri }}
                    style={[styles.carouselImage]}
                    width={item.w >= item.h ? width : (width * item.w) / item.h}
                    height={item.w < item.h ? width : (width * item.h) / item.w}
                  />
                </View>
              );
            }}
            horizontal={true}
            style={[
              styles.shelf,
              {
                height:
                  Math.max(
                    ...item.content.map((content) => content.h / content.w)
                  ) * width,
              },
              styles.marginTopDouble,
            ]}
            keyExtractor={(_, index) => `${item.id}-content-${index}`}
          />
        ) : (
          <Image
            source={{ uri: item.content[0].uri }}
            style={[styles.carouselImage, styles.marginTopDouble]}
            width={
              item.content[0].w >= item.content[0].h
                ? width
                : (width * item.content[0].w) / item.content[0].h
            }
            height={
              item.content[0].w < item.content[0].h
                ? width
                : (width * item.content[0].h) / item.content[0].w
            }
          />
        )}
        <Text style={[styles.itemName, styles.marginTopDouble, styles.avenir]}>
          {item.name}
        </Text>
        <Text style={[styles.itemDescription, styles.marginTop, styles.avenir]}>
          {item.description}
        </Text>
        {item.purchaseInfo ? (
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#395aff" : "#1122f4",
              },
              styles.purchase,
              styles.marginTopDouble,
            ]}
            onPress={() => navigation.navigate("Purchase", { item })}
          >
            <Text style={[styles.avenir, styles.purchaseText]}>Purchase</Text>
          </Pressable>
        ) : null}
      </View>
      <View style={{ marginBottom: width * 0.25 }} />
    </ScrollView>
  );
}
