import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import LocationItemList from "../components/LocationItemList";
import MapView, { Marker } from "react-native-maps";
import openMaps from "react-native-open-maps";
import { useAppSelector } from "../utils/reduxHooks";
import { selectLocations, selectLocationById } from "../utils/mapSlice";
import { styles, width, accentBlue } from "../utils/styles";

function All({ route }: CollectionAllProps): JSX.Element {
  const navigation = useNavigation<CollectionAllScreenNavigationProp>();
  const { curLocation } = route.params;

  const locations = useAppSelector(selectLocations);
  locations.sort((a, b) => curLocation.minD[a.id] - curLocation.minD[b.id]);

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

function Saved({ route }: CollectionSavedProps): JSX.Element {
  const navigation = useNavigation<CollectionSavedScreenNavigationProp>();
  const { curLocation } = route.params;

  const savedRecord = useAppSelector((state) => state.user.saved);
  const saved = savedRecord ? Object.values(savedRecord) : null;
  if (saved)
    saved.sort(
      (a, b) => curLocation.minD[a.parentId] - curLocation.minD[b.parentId]
    );

  return (
    <View style={[styles.container, styles.whiteBg]}>
      {saved ? (
        <FlatList
          data={saved}
          renderItem={({ item }) => {
            const content = item.content[0];
            if (content.image) {
              return (
                <>
                  <View style={[styles.container, styles.shelf]}>
                    <TouchableWithoutFeedback
                      onPress={() => navigation.navigate("ItemInfo", { item })}
                    >
                      {/*
                      I have absolutely no idea why, but if I use the
                      custom content component that I wrote then it eats the
                      touch responder or something and openItem never gets called.
                      */}
                      <Image
                        source={{
                          uri: content.image.uri,
                          cache: "force-cache",
                        }}
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
                  <Text
                    style={[styles.avenir, styles.marginTop, styles.shelfName]}
                  >
                    {item.name}
                  </Text>
                </>
              );
            }
            if (content.video) {
              return (
                <>
                  <View style={[styles.container, styles.shelf]}>
                    <TouchableWithoutFeedback
                      onPress={() => navigation.navigate("ItemInfo", { item })}
                    >
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
                  <Text
                    style={[styles.avenir, styles.marginTop, styles.shelfName]}
                  >
                    {item.name}
                  </Text>
                </>
              );
            }
            if (content.map) {
              return (
                <>
                  <View style={[styles.container, styles.shelf]}>
                    <TouchableWithoutFeedback
                      onPress={() => navigation.navigate("ItemInfo", { item })}
                    >
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
                            latitude: content.map.latitude,
                            longitude: content.map.longitude,
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
            return <Text>Error loading content for {item.name}</Text>;
          }}
          contentContainerStyle={styles.scrollPadding}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={[styles.avenir, styles.saveText]}>
          Save some items to access them more easily
        </Text>
      )}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Collection(): JSX.Element {
  const curLocationId = useAppSelector((state) => state.map.curLocationId);
  const curLocation = useAppSelector((state) =>
    selectLocationById(state, curLocationId)
  );

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "All") {
            iconName = "box-open";
          } else if (route.name === "Saved") {
            iconName = "star";
          }

          return (
            <FontAwesome5
              name={iconName}
              size={size}
              color={color}
              solid={focused}
            />
          );
        },
      })}
    >
      <Tab.Screen name="All" component={All} initialParams={{ curLocation }} />
      <Tab.Screen
        name="Saved"
        component={Saved}
        initialParams={{ curLocation }}
      />
    </Tab.Navigator>
  );
}
