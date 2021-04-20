/* eslint-disable react/prop-types */
import React, { useState, useRef } from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { enableScreens } from "react-native-screens";
import {
  View,
  ImageBackground,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Pressable,
  Text,
  ScrollView,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import Animated, { Easing } from "react-native-reanimated";
import Logo from "../assets/logo.svg";

import { styles, win, width } from "../utils/styles";
import { Item } from "../utils/map";

function Main({
  map,
  setMap,
  setAnswer,
  setItem,
  navigation,
}: MainProps): JSX.Element {
  // States for input placeholders
  const [asc, setAsc] = useState("");
  const [ans, setAns] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  // This is the animation that fades the UI out for the loading.
  // The actual wobbly animation is just a gif that's loaded underneath
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Have to pass loading in by hand in order to get the state update to register within a callback
  const toggleAnimation = (loading: boolean) => {
    loading
      ? Animated.timing(fadeAnim, {
          toValue: 0.1,
          duration: 550,
          easing: Easing.ease,
        }).start()
      : Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 550,
          easing: Easing.ease,
        }).start();
  };

  // Only for dev so that the loading animation actually runs
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleAsc = (question: string) => {
    toggleAnimation(true);
    setLoading(true);
    sleep(1500).then((value) => {
      toggleAnimation(false);
      setLoading(false);
      setAnswer("Placeholder");
      navigation.navigate("Answer");
    });
  };

  const handleAns = (answer: string) => {
    toggleAnimation(true);
    sleep(1500).then((value) => {
      toggleAnimation(false);
      navigation.navigate();
    });
  };

  return (
    <ImageBackground
      source={require("../assets/bg_anim.gif")}
      style={styles.bg}
    >
      <Animated.View
        style={[styles.bg, { opacity: fadeAnim }]}
        pointerEvents={loading ? "none" : "auto"}
      >
        <ImageBackground source={require("../assets/bg.png")} style={styles.bg}>
          <ScrollView style={styles.padTopDouble}>
            <TouchableWithoutFeedback
              style={styles.container}
              onPress={Keyboard.dismiss}
            >
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
              >
                <View style={styles.container}>
                  <Logo
                    width={width}
                    height={width * 0.6}
                    style={[styles.shadow, styles.marginTopDouble]}
                  />
                  <TextInput
                    onChangeText={setAsc}
                    value={asc}
                    placeholder="ASC"
                    style={[
                      styles.input,
                      styles.shadow,
                      styles.marginTopDouble,
                    ]}
                    onSubmitEditing={({ nativeEvent }) =>
                      handleAsc(nativeEvent.text)
                    }
                  />
                  <TextInput
                    onChangeText={setAns}
                    value={ans}
                    placeholder="ANSWER"
                    style={[styles.input, styles.shadow, styles.marginTop]}
                    onSubmitEditing={({ nativeEvent }) => {
                      handleAns(nativeEvent.text);
                    }}
                  />
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            <View style={styles.container}>
              <Carousel
                layout={"default"}
                data={Array.from(map.curNode.items.values())}
                contentContainerCustomStyle={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                style={styles.shadow}
                renderItem={({ item }: { item: Item }) => (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setItem(item);
                      navigation.navigate("ItemInfo");
                    }}
                  >
                    <View
                      style={[
                        styles.shadow,
                        styles.card,
                        styles.marginTopDouble,
                      ]}
                    >
                      <Image
                        source={{ uri: item.uri }}
                        style={styles.carouselImage}
                        width={
                          item.dims.w / item.dims.h >= 0.6
                            ? width * 0.96
                            : (width * 0.56 * item.dims.w) / item.dims.h
                        }
                        height={
                          item.dims.w / item.dims.h < 0.6
                            ? width * 0.56
                            : (width * 0.96 * item.dims.h) / item.dims.w
                        }
                      />
                    </View>
                  </TouchableWithoutFeedback>
                )}
                sliderWidth={win.width}
                itemWidth={width}
              />
              <View>
                <Pressable
                  onPress={() => {
                    navigation.navigate("Map");
                  }}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#ededed" : "white",
                    },
                    styles.pressable,
                    styles.shadow,
                  ]}
                >
                  <Text>MAP</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigation.navigate("Mine");
                  }}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#ededed" : "white",
                    },
                    styles.pressable,
                    styles.shadow,
                    styles.marginTop,
                  ]}
                >
                  <Text>MINE</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </Animated.View>
    </ImageBackground>
  );
}

function Answer({ answer, navigation }: AnswerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.answer}>{answer}</Text>
    </View>
  );
}

function ItemInfo({ item, navigation }: ItemProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.uri }} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDescription}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet
        sodales enim eu interdum. Cras elit sapien, tristique et mattis eget,
        interdum in ligula. Nullam condimentum nisl vitae tellus auctor, a
        lobortis est interdum. Ut luctus nunc dui, a consectetur magna rutrum
        sed. Pellentesque aliquam vitae dui et lobortis. Aliquam eu bibendum
        magna. Quisque pellentesque felis nec laoreet mattis. Nam sed nibh
        luctus, congue enim ut, ultricies erat. Nullam placerat, justo vitae
        interdum vehicula, dui sem pulvinar ligula, a rutrum sapien sapien eget
        felis. Sed viverra nibh in turpis blandit tempor. Curabitur enim tellus,
        vestibulum quis nisl finibus, efficitur tincidunt nunc. Donec bibendum
        urna ut felis fringilla convallis. Duis vitae augue non tellus pharetra
        varius. Donec tortor nulla, euismod sit amet consequat vel, luctus id
        elit. Nam at eleifend ante. In fringilla finibus neque at blandit.
        Nullam nec arcu sapien.
      </Text>
    </View>
  );
}

enableScreens();
const Stack = createNativeStackNavigator();

export default function Home({ map, setMap }: HomeProps): JSX.Element {
  const [answer, setAnswer] = useState("");
  const [item, setItem] = useState<Item>();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        stackPresentation: "formSheet",
      }}
    >
      <Stack.Screen name="Home">
        {(props) => (
          <Main
            {...props}
            map={map}
            setMap={setMap}
            setAnswer={setAnswer}
            setItem={setItem}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Answer">
        {(props) => <Answer {...props} answer={answer} />}
      </Stack.Screen>
      <Stack.Screen name="ItemInfo">
        {(props) => <ItemInfo {...props} item={item} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
