import React from "react";
import { FlatList, View, Text } from "react-native";
import LocationItemList from "../components/LocationItemList";
import { useAppSelector } from "../utils/hooks";
import { selectLocations } from "../utils/mapSlice";
import { styles } from "../utils/styles";

export default function Collection({ navigation }: MineProps): JSX.Element {
  const curLocationId = useAppSelector((state) => state.map.curLocationId);
  const locations = useAppSelector(selectLocations);
  locations.sort((a, b) => a.minD[curLocationId] - b.minD[curLocationId]);

  return (
    <View style={[styles.container, styles.whiteBg]}>
      <FlatList
        data={locations}
        renderItem={(location) => {
          // FlatList is very stupid and passes the data
          // as an object with the location and index, instead of just
          // passing them as separate optional values.
          // location.item is the actual LocationData
          return (
            <React.Fragment key={location.item.id}>
              <LocationItemList
                location={location.item}
                openItem={(item) => navigation.navigate("ItemInfo", { item })}
              />
              <Text style={[styles.avenir, styles.marginTop, styles.shelfName]}>
                {location.item.name}
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
