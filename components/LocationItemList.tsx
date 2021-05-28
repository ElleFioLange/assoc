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
import { useAppSelector } from "../redux/hooks";
import { selectItemDict } from "../redux/itemsSlice";
import openMaps from "react-native-open-maps";
import { styles, width, accentBlue } from "../utils/styles";

export default function LocationItemList({
  location,
  openItem,
}: {
  location: TLocation;
  openItem: (item: TItem) => void;
}): JSX.Element {
  const itemDict = useAppSelector(selectItemDict);
  const items = location.items.map((id) => itemDict[id]);
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => {
        if (item) {
          const content = item.content[0];
          switch (content.type) {
            case "image": {
              return (
                <>
                  <View style={[styles.container, styles.shelf]}>
                    <TouchableWithoutFeedback onPress={() => openItem(item)}>
                      {/*
                    I have absolutely no idea why, but if I use the
                    custom content component that I wrote then it eats the
                    touch responder or something and openItem never gets called.
                    */}
                      <Image
                        source={{
                          uri: content.uri,
                          cache: "force-cache",
                        }}
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
                  <Text
                    style={[styles.avenir, styles.marginTop, styles.shelfName]}
                  >
                    {item.name}
                  </Text>
                </>
              );
            }
            case "video": {
              return (
                <>
                  <View style={[styles.container, styles.shelf]}>
                    <TouchableWithoutFeedback onPress={() => openItem(item)}>
                      {/*
                  I have absolutely no idea why, but if I use the
                  custom content component that I wrote then it eats the
                  touch responder or something and openItem never gets called.
                  */}
                      <Image
                        source={{
                          uri: content.posterUri,
                          cache: "force-cache",
                        }}
                        style={styles.image}
                        width={
                          content.posterW >= content.posterH
                            ? width
                            : (width * content.posterW) / content.posterH
                        }
                        height={
                          content.posterW < content.posterH
                            ? width
                            : (width * content.posterH) / content.posterW
                        }
                      />
                    </TouchableWithoutFeedback>
                  </View>
                  <Text
                    style={[styles.avenir, styles.marginTop, styles.shelfName]}
                  >
                    {item.name}
                  </Text>
                </>
              );
            }
            case "map": {
              return (
                <>
                  <View style={[styles.container, styles.shelf]}>
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
                          latitude: content.latitude,
                          longitude: content.longitude,
                          latitudeDelta: content.viewDelta,
                          longitudeDelta: content.viewDelta,
                        }}
                        showsMyLocationButton={false}
                        showsPointsOfInterest={false}
                        showsCompass={false}
                        onLongPress={() =>
                          openMaps({
                            latitude: content.latitude,
                            longitude: content.longitude,
                            provider:
                              Platform.OS === "ios" ? "apple" : "google",
                          })
                        }
                        scrollEnabled={false}
                        zoomEnabled={false}
                        rotateEnabled={false}
                        pitchEnabled={false}
                      >
                        <Marker
                          coordinate={{
                            latitude: content.latitude,
                            longitude: content.longitude,
                          }}
                          pinColor={accentBlue}
                        />
                      </MapView>
                    </TouchableWithoutFeedback>
                  </View>
                  <Text
                    style={[styles.avenir, styles.marginTop, styles.shelfName]}
                  >
                    {item.name}
                  </Text>
                </>
              );
            }
            default: {
              return <Text>Error loading content for {item.name}</Text>;
            }
          }
        } else {
          return <Text>Error loading item</Text>;
        }
      }}
      horizontal={true}
      style={styles.shelf}
      keyExtractor={(item) => item!.id}
    />
  );
}
