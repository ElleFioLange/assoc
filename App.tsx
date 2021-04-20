import React, { useState, useRef } from "react";
// import AppLoading from "expo-app-loading";
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
  Modal,
  Button,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import Mine from "./components/Mine";
import Logo from "./assets/logo.svg";
import Svg, { Circle, Line } from "react-native-svg";

import Animated, { Easing } from "react-native-reanimated";

import { styles, win, width, height } from "./utils/Styles";

import { ascFn, ansFn } from "./utils/ApiCalls";
import { MapNode, Item, devMap } from "./utils/Map";

// const fpItems = [
//   {
//     name: "red octobers",
//     content: (
//       <Image
//         source={require("./assets/product_pics/red_octobers.jpeg")}
//         style={styles.productPic}
//       />
//     ),
//   },
//   {
//     name: "off---white bag",
//     content: (
//       <Image
//         source={require("./assets/product_pics/offwhite_bag.jpeg")}
//         style={styles.productPic}
//       />
//     ),
//   },
//   {
//     name: "supreme crowbar",
//     content: (
//       <Image
//         source={require("./assets/product_pics/supreme_crowbar.png")}
//         style={styles.productPic}
//       />
//     ),
//   },
//   {
//     name: "dior j1s",
//     content: (
//       <Image
//         source={require("./assets/product_pics/dior_j1s.jpeg")}
//         style={styles.productPic}
//       />
//     ),
//   },
//   {
//     name: "vv sandals",
//     content: (
//       <Image
//         source={require("./assets/product_pics/vv_sandals.jpeg")}
//         style={styles.productPic}
//       />
//     ),
//   },
// ];

// const drItems = [
//   {
//     name: "ipod",
//     content: (
//       <Image
//         source={require("./assets/product_pics/dr/ipod.jpeg")}
//         style={styles.productPic}
//       />
//     ),
//   },
//   {
//     name: "light",
//     content: (
//       <Image
//         source={require("./assets/product_pics/dr/light.jpg")}
//         style={styles.productPic}
//       />
//     ),
//   },
//   {
//     name: "radio",
//     content: (
//       <Image
//         source={require("./assets/product_pics/dr/radio.jpg")}
//         style={styles.productPic}
//       />
//     ),
//   },
//   {
//     name: "record_player",
//     content: (
//       <Image
//         source={require("./assets/product_pics/dr/record_player.jpg")}
//         style={styles.productPic}
//       />
//     ),
//   },
//   // {
//   //   name: "t3",
//   //   image: require("./assets/product_pics/dr/t3.jpg"),
//   // },
// ];

export default function App(): JSX.Element {
  const [map, setMap] = useState(devMap);

  // States for input placeholders
  const [asc, setAsc] = useState("");
  const [ans, setAns] = useState("");

  // Modal and loading states
  const [modalVis, setModalVis] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
  const [loading, setLoading] = useState(false);

  // This is the animation that fades the UI out for the loading.
  // The actual wobbly animation is just a gif that's loaded underneath
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Have to pass loading in by hand in order to get the state update to register within a callback
  const toggleLoading = (loading: boolean) => {
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
    setLoading(!loading);
  };

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleAsc = (question: string) => {
    toggleLoading(true);
    sleep(1500).then((value) => {
      setModalContent(
        <Text style={styles.answer}>This is placeholder text</Text>
      );
      setModalVis(true);
      toggleLoading(false);
    });
  };

  const openMap = () => {
    setModalContent(
      <View style={[styles.container, { width: width, height: height }]}>
        <Svg height="100%" width="100%" viewBox="0 0 100 100">
          <Line
            x1="50"
            y1="75"
            x2="50"
            y2="25"
            stroke="#e0e0e0"
            strokeWidth="1"
          />
          <Line
            x1="50"
            y1="75"
            x2="65"
            y2="95"
            stroke="#e0e0e0"
            strokeWidth="1"
          />
          <Line
            x1="50"
            y1="75"
            x2="80"
            y2="75"
            stroke="#e0e0e0"
            strokeWidth="1"
          />
          <Line
            x1="15"
            y1="72"
            x2="65"
            y2="95"
            stroke="#e0e0e0"
            strokeWidth="1"
          />
          <Line
            x1="15"
            y1="72"
            x2="10"
            y2="50"
            stroke="#e0e0e0"
            strokeWidth="1"
          />
          <Line
            x1="50"
            y1="25"
            x2="10"
            y2="50"
            stroke="#e0e0e0"
            strokeWidth="1"
          />
          <Line
            x1="50"
            y1="25"
            x2="75"
            y2="20"
            stroke="#e0e0e0"
            strokeWidth="1"
          />
          <Line
            x1="80"
            y1="75"
            x2="75"
            y2="20"
            stroke="#e0e0e0"
            strokeWidth="1"
          />
          <Line
            x1="55"
            y1="-10"
            x2="75"
            y2="20"
            stroke="#e0e0e0"
            strokeWidth="1"
          />
          <Circle
            cx="50"
            cy="75"
            r="5"
            stroke="#2462ff"
            strokeWidth="0.5"
            fill="white"
          />
          <Circle
            cx="50"
            cy="25"
            r="5"
            stroke="#2462ff"
            strokeWidth="0.5"
            fill="white"
          />
          <Circle
            cx="80"
            cy="75"
            r="5"
            stroke="#2462ff"
            strokeWidth="0.5"
            fill="white"
          />
          <Circle
            cx="65"
            cy="95"
            r="5"
            stroke="#2462ff"
            strokeWidth="0.5"
            fill="white"
          />
          <Circle
            cx="15"
            cy="72"
            r="5"
            stroke="#2462ff"
            strokeWidth="0.5"
            fill="white"
          />
          <Circle
            cx="10"
            cy="50"
            r="5"
            stroke="#2462ff"
            strokeWidth="0.5"
            fill="white"
          />
          <Circle
            cx="75"
            cy="20"
            r="5"
            stroke="#2462ff"
            strokeWidth="0.5"
            fill="white"
          />
          <Circle
            cx="55"
            cy="-10"
            r="5"
            stroke="#2462ff"
            strokeWidth="0.5"
            fill="white"
          />
        </Svg>
      </View>
    );
    setModalVis(true);
  };

  const openMine = () => {
    setModalContent(Mine(map));
    setModalVis(true);
  };

  const openItem = (item: Item) => {
    setModalContent(
      <View style={styles.container}>
        <View
          style={{
            width: width,
            height: width * 0.6,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={{ uri: item.uri }} />
        </View>
        <Text style={{ fontSize: 15 }}>{item.name}</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet
          sodales enim eu interdum. Cras elit sapien, tristique et mattis eget,
          interdum in ligula. Nullam condimentum nisl vitae tellus auctor, a
          lobortis est interdum. Ut luctus nunc dui, a consectetur magna rutrum
          sed. Pellentesque aliquam vitae dui et lobortis. Aliquam eu bibendum
          magna. Quisque pellentesque felis nec laoreet mattis. Nam sed nibh
          luctus, congue enim ut, ultricies erat. Nullam placerat, justo vitae
          interdum vehicula, dui sem pulvinar ligula, a rutrum sapien sapien
          eget felis. Sed viverra nibh in turpis blandit tempor. Curabitur enim
          tellus, vestibulum quis nisl finibus, efficitur tincidunt nunc. Donec
          bibendum urna ut felis fringilla convallis. Duis vitae augue non
          tellus pharetra varius. Donec tortor nulla, euismod sit amet consequat
          vel, luctus id elit. Nam at eleifend ante. In fringilla finibus neque
          at blandit. Nullam nec arcu sapien.
        </Text>
      </View>
    );
    setModalVis(true);
  };

  // Stall until fonts are loaded
  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // } else {
  return (
    <ImageBackground source={require("./assets/bg_anim.gif")} style={styles.bg}>
      <Animated.View
        style={[styles.bg, { opacity: fadeAnim }]}
        pointerEvents={loading ? "none" : "auto"}
      >
        <ImageBackground source={require("./assets/bg.png")} style={styles.bg}>
          {/* <SafeAreaView style={styles.container}> */}
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVis}
            onRequestClose={() => {
              setModalVis(!modalVis);
            }}
          >
            <View style={[styles.container, { padding: width * 0.05 }]}>
              {modalContent}
            </View>
            <View>
              <Button title="Close" onPress={() => setModalVis(false)} />
            </View>
          </Modal>
          <ScrollView>
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
                    style={styles.shadow}
                  />
                  <TextInput
                    onChangeText={setAsc}
                    value={asc}
                    placeholder="ASC"
                    style={[styles.input, styles.shadow]}
                    onSubmitEditing={({ nativeEvent }) =>
                      handleAsc(nativeEvent.text)
                    }
                  />
                  <TextInput
                    onChangeText={setAns}
                    value={ans}
                    placeholder="ANSWER"
                    style={[styles.input, styles.shadow]}
                    onSubmitEditing={({ nativeEvent }) => {
                      ansFn(
                        nativeEvent.text,
                        toggleLoading,
                        setModalContent,
                        setModalVis
                      );
                    }}
                  />
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            <Text
              style={{
                // fontFamily: "Montserrat-Bold",
                fontSize: 50,
                padding: 100,
              }}
            >
              Hello this is test
            </Text>
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
                  <TouchableWithoutFeedback onPress={() => openItem(item)}>
                    <View style={[styles.shadow, styles.card]}>
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
                <Text>{map.curNode.name === "Home" ? "Hello" : "Goodbye"}</Text>
                <Pressable
                  onPress={() => {
                    const newMap = { ...map };
                    newMap.curNode = Array.from(newMap.data.values())[1];
                    setMap(newMap);
                  }}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#ededed" : "white",
                    },
                    styles.pressable,
                    styles.shadow,
                  ]}
                >
                  <Text>Map</Text>
                </Pressable>
                <Pressable
                  onPress={openMine}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#ededed" : "white",
                    },
                    styles.pressable,
                    styles.shadow,
                  ]}
                >
                  <Text>Mine</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
          {/* </SafeAreaView> */}
        </ImageBackground>
      </Animated.View>
    </ImageBackground>
  );
}
