/* eslint-disable react/prop-types */
import React, { useState, useRef } from "react";
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
  ScrollView,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import Animated, { Easing } from "react-native-reanimated";
import Logo from "../assets/logo.svg";
import MapIcon from "../assets/map.svg";
import MineIcon from "../assets/mine.svg";
import SettingsIcon from "../assets/settings.svg";
import TokensIcon from "../assets/tokens.svg";
import { styles, win, width } from "../utils/styles";
import { Item } from "../utils/map";

export default function Home({ navigation, route }: HomeProps): JSX.Element {
  const { map, setMap } = route.params;

  // States for input placeholders
  const [asc, setAsc] = useState("");
  const [ans, setAns] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);
  // Using this to hide items as carousel updates so there's no jumping
  const [hideItems, setHideItems] = useState(false);

  // This is the animation that fades the UI out for the loading.
  // The actual wobbly animation is just a gif that's loaded underneath
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Toggle the loading animation
  const toggleAnimation = (loading: boolean) => {
    loading
      ? Animated.timing(fadeAnim, {
          toValue: 0.25,
          duration: 650,
          easing: Easing.ease,
        }).start()
      : Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 650,
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
      setAsc("");
      navigation.navigate("Answer", { answer: "Placeholder" });
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
      setHideItems(true);
      setMap(newMap);
      setHideItems(false);
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
                    placeholder="search"
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
                      navigation.navigate("ItemInfo", { item });
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
                        style={[
                          { opacity: hideItems ? 0 : 1 },
                          styles.carouselImage,
                        ]}
                        width={
                          item.dims.w >= item.dims.h
                            ? width
                            : (width * item.dims.w) / item.dims.h
                        }
                        height={
                          item.dims.w < item.dims.h
                            ? width
                            : (width * item.dims.h) / item.dims.w
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
                    navigation.navigate("Map", { map });
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
                  <MapIcon />
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigation.navigate("Mine", { map });
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
                  <MineIcon />
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
                  <SettingsIcon />
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigation.navigate("Tokens");
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
                  <TokensIcon />
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
