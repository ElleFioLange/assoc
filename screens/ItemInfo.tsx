import React from "react";
import { View, Text, ScrollView, Pressable, FlatList } from "react-native";
import Image from "../components/Image";
import { styles, width, accentBlue, accentBlueLite } from "../utils/styles";

// TODO add share and save buttons

export default function ItemInfo({
  navigation,
  route,
}: ItemInfoProps): JSX.Element {
  const { item } = route.params;
  return (
    // No scroll padding bc it's too much for the top and not enough
    // for the bottom.
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
                  <Image content={item} />
                </View>
              );
            }}
            horizontal={true}
            style={[styles.shelf, styles.marginTopDouble]}
            keyExtractor={(_, index) => `${item.id}-content-${index}`}
          />
        ) : (
          <Image content={item.content[0]} style={styles.marginTopDouble} />
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
                backgroundColor: pressed ? accentBlueLite : accentBlue,
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
      {/* Just to give some space on the bottom for scrolling */}
      <View style={{ marginBottom: width * 0.25 }} />
    </ScrollView>
  );
}
