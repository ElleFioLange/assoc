/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import * as Linking from "expo-linking";
import { firestore } from "firebase";
import { View, Text, ScrollView, Pressable, FlatList } from "react-native";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setSaved } from "../redux/userSlice";
import { FontAwesome5 } from "@expo/vector-icons";
import Content from "../components/Content";
import Connections from "../components/Connections";
import { styles, width, accentBlue, accentBlueLite } from "../utils/styles";

// TODO change saved functionality to tag functionality

export default function ItemInfo({
  navigation,
  route,
}: ItemInfoProps): JSX.Element {
  const { item } = route.params;

  const dispatch = useAppDispatch();
  const saved = useAppSelector((state) => state.user.saved);
  const uid = useAppSelector((state) => state.user.id);

  async function toggleSaved() {
    const { id } = item;
    const newSaved = { ...saved };
    saved[id] ? delete newSaved[id] : (newSaved[id] = true);
    firestore().collection("users").doc(uid).update({ saved: newSaved });
    dispatch(setSaved(newSaved));
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
            style={[styles.shelf, styles.marginTopDouble]}
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
        <Connections connections={Object.values(item.connections)} />
        <View style={[styles.marginTopDouble, styles.itemActionContainer]}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? accentBlueLite : accentBlue,
              },
              styles.itemAction,
            ]}
            onPress={toggleSaved}
          >
            <FontAwesome5
              name="star"
              color="white"
              size={width * 0.07}
              solid={saved ? saved[item.id] !== undefined : false}
            />
          </Pressable>
          {/* {item.purchaseInfo ? (
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? accentBlueLite : accentBlue,
                },
                styles.itemAction,
              ]}
              onPress={openPurchase}
            >
              <FontAwesome5
                name="shopping-cart"
                color="white"
                size={width * 0.07}
              />
            </Pressable>
          ) : null} */}
          {item.link ? (
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? accentBlueLite : accentBlue,
                },
                styles.itemAction,
              ]}
              onPress={() => Linking.openURL(item.link!)}
            >
              <FontAwesome5 name="link" color="white" size={width * 0.07} />
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
      <View style={{ marginBottom: width * 0.35 }} />
    </ScrollView>
  );
}
