import React from "react";
import { View, Text, ScrollView } from "react-native";
import NodeItemList from "../components/NodeItemList";
import { styles, width } from "../utils/styles";

export default function NodeInfo({
  navigation,
  route,
}: NodeInfoProps): JSX.Element {
  const { node } = route.params;
  return (
    <ScrollView style={[styles.whiteBg, styles.scrollPadding]}>
      <View style={styles.container}>
        <NodeItemList
          node={node}
          openItem={(item) => navigation.navigate("ItemInfo", { item })}
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
