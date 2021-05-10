import React from "react";
import { View, Text, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import LocationItemList from "../components/LocationItemList";
import { styles, width } from "../utils/styles";

// TODO Show connected locations

export default function LocationInfo({
  navigation,
  route,
}: LocationInfoProps): JSX.Element {
  const { location } = route.params;
  return (
    <ScrollView style={[styles.whiteBg, styles.scrollPadding]}>
      <View style={styles.container}>
        <LocationItemList
          location={location}
          openItem={(item) => navigation.navigate("ItemInfo", { item })}
        />
        <Text style={[styles.itemName, styles.marginTopDouble, styles.avenir]}>
          {location.name}
        </Text>
        <Text style={[styles.itemDescription, styles.marginTop, styles.avenir]}>
          {location.description}
        </Text>
      </View>
      <Text>Outoing Connections</Text>
      <FlatList
        data={Object.keys(location.outgoing)}
        renderItem={({ item }) => (
          <View>
            <Text>{item}</Text>
          </View>
        )}
        keyExtractor={(item) => item}
        style={{ width }}
      />
      <View style={{ marginBottom: width * 0.25 }} />
    </ScrollView>
  );
}
