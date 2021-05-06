/* eslint-disable react/prop-types */
import React, { useState, useRef } from "react";
import { useAppSelector } from "../utils/hooks";
import { selectNodeById } from "../utils/mapSlice";
import {
  View,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Pressable,
  ScrollView,
} from "react-native";
import Image from "../components/Image";
import Carousel from "react-native-snap-carousel";
import Animated, { Easing } from "react-native-reanimated";
import Logo from "../assets/logo.svg";
import MapIcon from "../assets/map.svg";
import MineIcon from "../assets/mine.svg";
import SettingsIcon from "../assets/settings.svg";
import TokensIcon from "../assets/tokens.svg";
import { styles, win, width } from "../utils/styles";

export default function Home({ navigation }: HomeProps): JSX.Element {
  const invertBg = useAppSelector((state) => state.settings.invertBg);
  const curNodeId = useAppSelector((state) => state.map.curNodeId);
  const curNode = useAppSelector((state) => selectNodeById(state, curNodeId));

  // Loading state to block interaction during the animation
  const [loading, setLoading] = useState(false);

  // States for input text
  const [asc, setAsc] = useState("");
  const [ans, setAns] = useState("");

  // Using this to hide items as carousel updates so there's no jumping
  const [hideItems, setHideItems] = useState(false);

  // This is the animation that fades the UI out while loading.
  // The actual wobbly animation is just a gif that's loaded underneath
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Toggle the loading animation
  const toggleAnimation = (anim: boolean) => {
    setLoading(anim);
    anim
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
    sleep(1500).then(() => {
      toggleAnimation(false);
      setAsc("");
      navigation.navigate("Answer", { answer: "Placeholder" });
    });
  };

  const handleAns = (answer: string) => {
    console.log(answer);
    console.log(answer === "Dieter Rams");
    toggleAnimation(true);
    setHideItems(true);
    sleep(1500).then((value) => {
      // const newMap = { ...map };
      // newMap.curNode = Array.from(newMap.data.values())[
      //   answer === "Dieter Rams" ? 1 : 0
      // ];
      // console.log(newMap.curNode.name);
      // setHideItems(true);
      // setMap(newMap);
      setHideItems(false);
      setAns("");
      toggleAnimation(false);
    });
  };

  const staticBackground = invertBg
    ? require("../assets/bg_invert.png")
    : require("../assets/bg.png");
  const animBackground = invertBg
    ? require("../assets/bg_anim_invert.gif")
    : require("../assets/bg_anim.gif");

  return (
    <ImageBackground source={animBackground} style={styles.bg}>
      <Animated.View
        style={[styles.bg, { opacity: fadeAnim }]}
        pointerEvents={loading ? "none" : "auto"}
      >
        <ImageBackground source={staticBackground} style={styles.bg}>
          <ScrollView style={styles.scrollPadding}>
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
                data={
                  curNode
                    ? Object.keys(curNode.items).map(
                        (key) => curNode.items[key]
                      )
                    : []
                }
                contentContainerCustomStyle={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                // enableMomentum={true}
                decelerationRate={"fast"}
                style={styles.shadow}
                renderItem={({ item }: { item: ItemData }) => (
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
                        content={item.content[0]}
                        style={{ opacity: hideItems ? 0 : 1 }}
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
                    styles.pageNav,
                    styles.shadow,
                    styles.border,
                  ]}
                >
                  <MapIcon />
                </Pressable>
                <Pressable
                  onPress={async () => {
                    navigation.navigate("Collection");
                  }}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#ededed" : "white",
                    },
                    styles.pageNav,
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
                    styles.pageNav,
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
                    styles.pageNav,
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
