/* eslint-disable react/prop-types */
import React, { useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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
import Home from "./components/Home";
import Map from "./components/Map";
import Mine from "./components/Mine";
import Logo from "./assets/logo.svg";
import Svg, { Circle, Line } from "react-native-svg";

import Animated, { Easing } from "react-native-reanimated";

import { styles, win, width, height } from "./utils/styles";

import { ascFn, ansFn } from "./utils/ApiCalls";
import { MapNode, Item, devMap } from "./utils/map";

function Home({ map, setMap, navigation }: HomeProps): JSX.Element {
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

  // Only for dev so that the loading animation actually runs
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

  // DO THIS NEXT
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
            <View>
              {modalContent}
              <Button title="Close" onPress={() => setModalVis(false)} />
            </View>
          </Modal>
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
                  onPress={() => {}}
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
                  onPress={openMine}
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
          {/* </SafeAreaView> */}
        </ImageBackground>
      </Animated.View>
    </ImageBackground>
  );
}

const Stack = createStackNavigator();

export default function App(): JSX.Element {
  const [map, setMap] = useState(devMap);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => <Home {...props} map={map} setMap={setMap} />}
        </Stack.Screen>
        <Stack.Screen name="Map">
          {(props) => <Map {...props} map={map} />}
        </Stack.Screen>
        <Stack.Screen name="Mine">
          {(props) => <Mine {...props} map={map} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
