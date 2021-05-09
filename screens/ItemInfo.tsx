import React from "react";
import * as firebase from "firebase";
import { View, Text, ScrollView, Pressable, FlatList } from "react-native";
import { useAppSelector } from "../utils/hooks";
import { FontAwesome5 } from "@expo/vector-icons";
import Content from "../components/Content";
import { styles, width, accentBlue, accentBlueLite } from "../utils/styles";

// TODO Figure out a way to incorporate links into item description
// TODO Add sharing functionality

export default function ItemInfo({
  navigation,
  route,
}: ItemInfoProps): JSX.Element {
  firebase.app();

  const { item } = route.params;

  const saved = useAppSelector((state) => state.user.saved);

  function toggleSaved() {
    const uid = firebase.auth().currentUser?.uid;
    saved && saved[item.id]
      ? firebase.database().ref(`users/${uid}/saved/${item.id}`).remove()
      : firebase.database().ref(`users/${uid}/saved/${item.id}`).set(item);
  }

  return (
    // No scroll padding bc it's too much for the top and not enough
    // for the bottom.
    <ScrollView style={styles.whiteBg}>
      <View style={styles.container}>
        {item.content.length > 1 ? (
          <FlatList
            data={item.content}
            // FlatList is very stupid and passes the data
            // as an object with the content under the key "item"
            renderItem={({ item }) => {
              return (
                <View style={styles.shelfItem}>
                  <Content content={item} />
                </View>
              );
            }}
            horizontal={true}
            style={[styles.locationShelf, styles.marginTopDouble]}
            keyExtractor={(_, index) => `${item.id}-content-${index}`}
          />
        ) : (
          <Content content={item.content[0]} style={styles.marginTopDouble} />
        )}
        <Text style={[styles.itemName, styles.marginTopDouble, styles.avenir]}>
          {item.name}
        </Text>
        <Text style={[styles.itemDescription, styles.marginTop, styles.avenir]}>
          {item.description}
        </Text>
        <View style={[styles.marginTopDouble, styles.itemActionContainer]}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? accentBlueLite : accentBlue,
              },
              styles.itemAction,
            ]}
            onPress={() => toggleSaved()}
          >
            <FontAwesome5
              name="star"
              color="white"
              size={width * 0.07}
              solid={saved ? saved[item.id] !== undefined : false}
            />
          </Pressable>
          {item.purchaseInfo ? (
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? accentBlueLite : accentBlue,
                },
                styles.itemAction,
              ]}
              onPress={() => navigation.navigate("Purchase", { item })}
            >
              <FontAwesome5
                name="shopping-cart"
                color="white"
                size={width * 0.07}
              />
            </Pressable>
          ) : null}
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? accentBlueLite : accentBlue,
              },
              styles.itemAction,
            ]}
            onPress={() => navigation.navigate("Share", { item })}
          >
            <FontAwesome5 name="share" color="white" size={width * 0.07} />
          </Pressable>
        </View>
      </View>
      {/* Just to give some space on the bottom for scrolling */}
      <View style={{ marginBottom: width * 0.25 }} />
    </ScrollView>
  );
}
