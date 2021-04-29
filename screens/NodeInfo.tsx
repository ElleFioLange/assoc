import React from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { styles, width } from "../utils/styles";

export default function NodeInfo({
  navigation,
  route,
}: NodeInfoProps): JSX.Element {
  const { node } = route.params;
  return (
    <ScrollView style={[styles.whiteBg, styles.scrollPadding]}>
      <View style={styles.container}>
        <FlatList
          data={Array.from(node.items.values())}
          renderItem={({ item }) => (
            <View style={styles.shelfItem}>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate("ItemInfo", { item });
                }}
              >
                <Image
                  source={{ uri: item.mainContent.uri }}
                  style={[styles.carouselImage]}
                  width={
                    item.mainContent.w >= item.mainContent.h
                      ? width
                      : (width * item.mainContent.w) / item.mainContent.h
                  }
                  height={
                    item.mainContent.w < item.mainContent.h
                      ? width
                      : (width * item.mainContent.h) / item.mainContent.w
                  }
                />
              </TouchableWithoutFeedback>
            </View>
          )}
          horizontal={true}
          style={[
            styles.shelf,
            {
              height:
                Math.max(
                  ...Array.from(node.items.values()).map(
                    (item) => item.mainContent.h / item.mainContent.w
                  )
                ) * width,
              width,
            },
          ]}
        />
        <Text style={[styles.itemName, styles.marginTopDouble, styles.avenir]}>
          {node.name}
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
      </View>
      <View style={{ marginBottom: width * 0.25 }} />
    </ScrollView>
  );
}
