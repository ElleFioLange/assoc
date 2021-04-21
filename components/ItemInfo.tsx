import React from "react";
import { View, Image, Text } from "react-native";
import { styles } from "../utils/styles";
import { Item } from "../utils/map";

export default function ItemInfo({
  item,
}: {
  item: Item | undefined;
}): JSX.Element {
  return item ? (
    <View style={[styles.container, styles.whiteBg]}>
      <Image source={{ uri: item.uri }} width={100} height={100} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDescription}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet
        sodales enim eu interdum. Cras elit sapien, tristique et mattis eget,
        interdum in ligula. Nullam condimentum nisl vitae tellus auctor, a
        lobortis est interdum. Ut luctus nunc dui, a consectetur magna rutrum
        sed. Pellentesque aliquam vitae dui et lobortis. Aliquam eu bibendum
        magna. Quisque pellentesque felis nec laoreet mattis. Nam sed nibh
        luctus, congue enim ut, ultricies erat. Nullam placerat, justo vitae
        interdum vehicula, dui sem pulvinar ligula, a rutrum sapien sapien eget
        felis. Sed viverra nibh in turpis blandit tempor. Curabitur enim tellus,
        vestibulum quis nisl finibus, efficitur tincidunt nunc. Donec bibendum
        urna ut felis fringilla convallis. Duis vitae augue non tellus pharetra
        varius. Donec tortor nulla, euismod sit amet consequat vel, luctus id
        elit. Nam at eleifend ante. In fringilla finibus neque at blandit.
        Nullam nec arcu sapien.
      </Text>
    </View>
  ) : (
    <View />
  );
}
