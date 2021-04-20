import React from "react";
import { TouchableWithoutFeedback, View, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import { styles, win, width } from "../utils/styles";
import { Item } from "../utils/map";

export function CustomCarousel(
  map: TMap,
  openItem: (item: Item) => void
): JSX.Element {
  return (
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
  );
}
