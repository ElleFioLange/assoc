/* eslint-disable react/prop-types */
import React, { useState, useRef } from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
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

import ItemInfo from "./ItemInfo";

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

  // Toggle the loading animation
  const toggleAnimation = (loading: boolean) => {
    loading
      ? Animated.timing(fadeAnim, {
          toValue: 0.25,
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
      setAsc("");
      navigation.navigate("Answer");
    });
  };

  const handleAns = (answer: string) => {
    toggleAnimation(true);
    setLoading(true);
    sleep(1500).then((value) => {
      const newMap = { ...map };
      newMap.curNode = Array.from(newMap.data.values())[
        answer === "Dieter Rams" ? 1 : 0
      ];
      setMap(newMap);
      setAns("");
      toggleAnimation(false);
      setLoading(false);
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
                    allowFontScaling={false}
                    autoCapitalize="none"
                    disableFullscreenUI={true}
                    enablesReturnKeyAutomatically={true}
                    value={asc}
                    placeholder="asc"
                    style={[
                      styles.input,
                      styles.shadow,
                      styles.marginTopDouble,
                      styles.border,
                    ]}
                    onSubmitEditing={({ nativeEvent }) =>
                      handleAsc(nativeEvent.text)
                    }
                  />
                  <TextInput
                    onChangeText={setAns}
                    allowFontScaling={false}
                    autoCapitalize="none"
                    disableFullscreenUI={true}
                    enablesReturnKeyAutomatically={true}
                    value={ans}
                    placeholder="answer"
                    style={[
                      styles.input,
                      styles.shadow,
                      styles.marginTop,
                      styles.border,
                    ]}
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
                        styles.border,
                      ]}
                    >
                      <Image
                        source={{ uri: item.uri }}
                        style={styles.carouselImage}
                        width={
                          item.dims.w / item.dims.h >= 1
                            ? width * 0.96
                            : (width * 0.56 * item.dims.w) / item.dims.h
                        }
                        height={
                          item.dims.w / item.dims.h < 1
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
              <View style={styles.pressableContainer}>
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
                    styles.border,
                  ]}
                >
                  <Text style={styles.avenir}>MAP</Text>
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
                    styles.border,
                  ]}
                >
                  <Text style={[styles.barText, styles.avenir]}>MINE</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigation.navigate("Settings");
                  }}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#ededed" : "white",
                    },
                    styles.pressable,
                    styles.shadow,
                    styles.border,
                  ]}
                >
                  <Text style={[styles.barText, styles.avenir]}>SETTINGS</Text>
                </Pressable>
              </View>
              <View style={{ marginBottom: width * 0.25 }} />
            </View>
          </ScrollView>
        </ImageBackground>
      </Animated.View>
    </ImageBackground>
  );
}

function Answer({ answer }: AnswerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.answer}>{answer}</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function Home({ map, setMap }: HomeProps): JSX.Element {
  const [answer, setAnswer] = useState("");
  const [item, setItem] = useState<Item>();

  return (
    <Stack.Navigator
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
