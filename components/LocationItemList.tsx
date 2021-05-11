import React from "react";
import {
  FlatList,
  Text,
  View,
  TouchableWithoutFeedback,
  Platform,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import openMaps from "react-native-open-maps";
import { styles, width, accentBlue } from "../utils/styles";

export default function LocationItemList({
  location,
  openItem,
}: {
  location: LocationData;
  openItem: (item: ItemData) => void;
}): JSX.Element {
  const items = Object.keys(location.items).map((key) => location.items[key]);
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => {
        const content = item.content[0];
        if (content.image) {
          return (
            <View style={styles.shelfItem}>
              <TouchableWithoutFeedback onPress={() => openItem(item)}>
                {/* 
              I have absolutely no idea why, but if I use the
              custom content component that I wrote then it eats the
              touch responder or something and openItem never gets called.
              */}
                <Image
                  source={{ uri: content.image.uri, cache: "force-cache" }}
                  style={styles.image}
                  width={
                    content.image.w >= content.image.h
                      ? width
                      : (width * content.image.w) / content.image.h
                  }
                  height={
                    content.image.w < content.image.h
                      ? width
                      : (width * content.image.h) / content.image.w
                  }
                />
              </TouchableWithoutFeedback>
            </View>
          );
        }
        if (content.video) {
          return (
            <View style={styles.shelfItem}>
              <TouchableWithoutFeedback onPress={() => openItem(item)}>
                {/* 
              I have absolutely no idea why, but if I use the
              custom content component that I wrote then it eats the
              touch responder or something and openItem never gets called.
              */}
                <Image
                  source={{
                    uri: content.video.posterUri,
                    cache: "force-cache",
                  }}
                  style={styles.image}
                  width={
                    content.video.w >= content.video.h
                      ? width
                      : (width * content.video.w) / content.video.h
                  }
                  height={
                    content.video.w < content.video.h
                      ? width
                      : (width * content.video.h) / content.video.w
                  }
                />
              </TouchableWithoutFeedback>
            </View>
          );
        }
        if (content.map) {
          return (
            <View style={styles.shelfItem}>
              <TouchableWithoutFeedback onPress={() => openItem(item)}>
                {/* 
              I have absolutely no idea why, but if I use the
              custom content component that I wrote then it eats the
              touch responder or something and openItem never gets called.
              */}
                <MapView
                  style={[
                    {
                      width: width * 0.99,
                      height: width * 0.99,
                    },
                  ]}
                  initialRegion={{
                    latitude: content.map.latitude,
                    longitude: content.map.longitude,
                    latitudeDelta: content.map.viewDelta,
                    longitudeDelta: content.map.viewDelta,
                  }}
                  showsMyLocationButton={false}
                  showsPointsOfInterest={false}
                  showsCompass={false}
                  onLongPress={() =>
                    openMaps({
                      latitude: content.map?.latitude,
                      longitude: content.map?.longitude,
                      provider: Platform.OS === "ios" ? "apple" : "google",
                    })
                  }
                  scrollEnabled={false}
                  zoomEnabled={false}
                  rotateEnabled={false}
                  pitchEnabled={false}
                >
                  <Marker
                    coordinate={{
                      latitude: content.map.latitude,
                      longitude: content.map.longitude,
                    }}
                    pinColor={accentBlue}
                  />
                </MapView>
              </TouchableWithoutFeedback>
            </View>
          );
        }
        return <Text>Error loading content</Text>;
      }}
      horizontal={true}
      style={styles.locationShelf}
      keyExtractor={(item) => item.id}
    />
  );
}
