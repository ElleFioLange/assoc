import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import LocationItemList from "../components/LocationItemList";
import { useAppSelector } from "../utils/hooks";
import { selectLocations, selectLocationById } from "../utils/mapSlice";
import { styles, width } from "../utils/styles";

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
            return (
              <React.Fragment key={item.id}>
                <View
                  style={[styles.container, styles.marginTop, styles.itemShelf]}
                >
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate("ItemInfo", { item })}
                  >
                    {/* 
                    I have absolutely no idea why, but if I use the
                    custom content component that I wrote then it eats the
                    touch responder or something and openItem never gets called.
                    */}
                    <Image
                      source={{ uri: content.uri, cache: "force-cache" }}
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
              </React.Fragment>
            );
          }}
          contentContainerStyle={[styles.scrollPadding]}
          keyExtractor={(item) => item.id}
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
