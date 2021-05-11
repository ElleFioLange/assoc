import React from "react";
import { View, Text, ScrollView } from "react-native";
import LocationItemList from "../components/LocationItemList";
import Connections from "../components/Connections";
import { styles, width } from "../utils/styles";

export default function LocationInfo({
  navigation,
  route,
}: LocationInfoProps): JSX.Element {
  const { location } = route.params;
  const connections: ConnectionData[] = [];
  Object.keys(location.items).map((key) => {
    if (location.items[key].connections)
      return connections.push(
        ...Object.values(location.items[key].connections)
      );
  });

  return (
    <ScrollView style={[styles.whiteBg, styles.scrollPadding]}>
      <View style={styles.container}>
        <LocationItemList
          location={location}
          openItem={(item) => navigation.navigate("ItemInfo", { item })}
        />
        <Text
          style={[styles.locationName, styles.marginTopDouble, styles.avenir]}
        >
          {location.name}
        </Text>
        <Text style={[styles.itemDescription, styles.marginTop, styles.avenir]}>
          {location.description}
        </Text>
        <Connections connections={connections} />
      </View>
      <View style={{ marginBottom: width * 0.35 }} />
    </ScrollView>
  );
}
