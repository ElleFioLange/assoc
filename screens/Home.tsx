import React, { useState, useRef } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectLocationById } from "../redux/locationsSlice";
import { selectItemDict } from "../redux/itemsSlice";
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
import Content from "../components/Content";
import Carousel from "react-native-snap-carousel";
import Animated, { Easing } from "react-native-reanimated";
import Logo from "../assets/logo.svg";
import MapIcon from "../assets/map.svg";
import CollectionIcon from "../assets/collection.svg";
import SettingsIcon from "../assets/settings.svg";
import TokensIcon from "../assets/tokens.svg";
import { styles, win, width } from "../utils/styles";

// TODO Write the asc and answer functionality
// TODO Advert functionality
// TODO User verification in order to purchase tokens

export default function Home({ navigation }: HomeProps): JSX.Element {
  const invertBg = useAppSelector((state) => state.settings.invertBg);
  const curLocationId = useAppSelector((state) => state.user.curLocationId);
  const curLocation = useAppSelector((state) =>
    selectLocationById(state, curLocationId)
  );
  const itemDict = useAppSelector((state) => selectItemDict(state));
  const curItems = curLocation?.items.map((id) => itemDict[id]);

  const disableAnimations = useAppSelector(
    (state) => state.settings.disableAnimations
  );

  // Loading state to block interaction during the animation
  const [loading, setLoading] = useState(false);

  // States for input text
  const [asc, setAsc] = useState("");
  const [search, setSearch] = useState("");

  // Using this to hide items as carousel updates so there's no jumping
  const [hideItems, setHideItems] = useState(false);

  // This is the animation that fades the UI out while loading.
  // The actual wobbly animation is just a gif that's loaded underneath
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Toggle the loading animation
  const toggleAnimation = (anim: boolean) => {
    if (!disableAnimations) {
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
    }
  };

  // Only for dev so that the loading animation actually runs
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleAsc = (question: string) => {
    setLoading(true);
    toggleAnimation(true);
    sleep(1500).then(() => {
      fetch("https://api.openai.com/v1/engines/davinci/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer sk-EV7pP6fQtc6JEURvvZexyelkqHkgKThm3RJEkZv9",
        },
        body: JSON.stringify({
          prompt:
            "ARCHITECTURE comes about as a result of the synthesizing by the architect of creative responses to input from the client; data gathered from the site and the climate; and an understanding of structure, materials, space and light. Working from the inside-out, the architect guides the growth of an IDEA resulting from the combination of these responses to a completed design which is as much a portrait of the client as it may be of himself. I am particularly attracted to buildings by native peoples.  They ALWAYS are responsive to the individual sites in macro and micro aspects with a resulting solution which ‘belongs’ there both inside and out.  I can’t think of any building that I wish I had designed but can appreciate good design when I see it.  One of my favorite buildings is the old chemistry building built in 1916 which was designed by Barry Byrne who worked for Louis Sullivan in Chicago, Frank Lloyd Wright and Walter Burley Griffin.  Few people know about this little building but it is hidden away and in generally original condition.  Another building I enjoy in New Mexico was designed by Frank Lloyd Wright located in Pecos.  Again, few people know it is there which is fine by the owners who are relatives of the original client.",
          max_tokens: 50,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          toggleAnimation(false);
          setLoading(false);
          setAsc("");
          navigation.navigate("Answer", { answer: data.choices[0].text });
        })
        .catch((e) => {
          console.error(e);
          toggleAnimation(false);
          setLoading(false);
          setAsc("");
        });
      // toggleAnimation(false);
      // setLoading(false);
      // setAsc("");
      // navigation.navigate("Answer", { answer: "Placeholder" });
    });
  };

  const handleAns = (answer: string) => {
    console.log(answer);
    console.log(answer === "Dieter Rams");
    setLoading(true);
    toggleAnimation(true);
    setHideItems(true);
    sleep(1500).then((value) => {
      setHideItems(false);
      setSearch("");
      toggleAnimation(false);
      setLoading(false);
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
                    onChangeText={setSearch}
                    allowFontScaling={false}
                    autoCapitalize="none"
                    disableFullscreenUI={true}
                    enablesReturnKeyAutomatically={true}
                    value={search}
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
              {curLocation ? (
                <Carousel
                  layout={"default"}
                  data={curItems || []}
                  contentContainerCustomStyle={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  // enableMomentum={true}
                  decelerationRate={"fast"}
                  style={styles.shadow}
                  renderItem={({ item }: { item: TItem | undefined }) => (
                    <TouchableWithoutFeedback
                      onPress={() => {
                        if (item) navigation.navigate("ItemInfo", { item });
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
                        <Content
                          content={item!.content[0]}
                          style={{
                            opacity: hideItems ? 0 : 1,
                            borderRadius: width * 0.03,
                          }}
                          poster
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                  sliderWidth={win.width}
                  itemWidth={width}
                />
              ) : (
                <View
                  style={[
                    styles.marginTopDouble,
                    styles.card,
                    { backgroundColor: "none" },
                  ]}
                />
              )}
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
                  <CollectionIcon />
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
              <View style={{ marginBottom: width * 0.35 }} />
            </View>
          </ScrollView>
        </ImageBackground>
      </Animated.View>
    </ImageBackground>
  );
}
