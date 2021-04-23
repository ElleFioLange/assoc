import React from "react";
import { View, Image, Text, ScrollView, Button } from "react-native";
import { styles, width } from "../utils/styles";

export default function ItemInfo({
  navigation,
  route,
}: ItemInfoProps): JSX.Element {
  const { item } = route.params;
  return item ? (
    <ScrollView style={styles.whiteBg}>
      <View style={styles.container}>
        <View style={styles.marginTopDouble} />
        <Image
          source={{ uri: item.uri }}
          style={[styles.carouselImage, styles.marginTopDouble]}
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
        <Text style={[styles.itemName, styles.marginTopDouble, styles.avenir]}>
          {item.name}
        </Text>
        <Text style={[styles.itemDescription, styles.marginTop, styles.avenir]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et
          velit nec lacus mattis viverra laoreet nec magna. Mauris semper turpis
          non commodo bibendum. Vivamus consectetur nulla id nunc fermentum, eu
          rhoncus ex aliquet. Curabitur vehicula justo viverra ex facilisis, et
          facilisis ante pulvinar. Curabitur convallis purus non augue dapibus,
          vel tristique nunc feugiat. Etiam et elit interdum, lobortis odio sit
          amet, aliquet odio. Duis mollis vestibulum velit in tincidunt. Cras
          massa leo, blandit in facilisis a, euismod in elit. Nulla gravida
          blandit finibus. Proin tincidunt augue sapien, at porttitor quam
          egestas quis. Suspendisse quis aliquet turpis. Phasellus tortor orci,
          hendrerit nec lectus sit amet, commodo rhoncus ex. Praesent gravida
          maximus dignissim.
        </Text>
        {/* <Button title="test" onPress={() => navigation.navigate("Answer")} /> */}
      </View>
    </ScrollView>
  ) : (
    <View />
  );
}
