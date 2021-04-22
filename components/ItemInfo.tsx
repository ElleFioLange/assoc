import React from "react";
import { View, Image, Text } from "react-native";
import { styles, width } from "../utils/styles";
import { Item } from "../utils/map";

export default function ItemInfo({
  item,
}: {
  item: Item | undefined;
}): JSX.Element {
  return item ? (
    <View style={[styles.container, styles.whiteBg]}>
      <Image
        source={{ uri: item.uri }}
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
      <Text style={[styles.itemName, styles.marginTopDouble]}>{item.name}</Text>
      <Text style={[styles.itemDescription, styles.marginTop]}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et
        velit nec lacus mattis viverra laoreet nec magna. Mauris semper turpis
        non commodo bibendum. Vivamus consectetur nulla id nunc fermentum, eu
        rhoncus ex aliquet. Curabitur vehicula justo viverra ex facilisis, et
        facilisis ante pulvinar. Curabitur convallis purus non augue dapibus,
        vel tristique nunc feugiat. Etiam et elit interdum, lobortis odio sit
        amet, aliquet odio. Duis mollis vestibulum velit in tincidunt. Cras
        massa leo, blandit in facilisis a, euismod in elit. Nulla gravida
        blandit finibus. Proin tincidunt augue sapien, at porttitor quam egestas
        quis. Suspendisse quis aliquet turpis. Phasellus tortor orci, hendrerit
        nec lectus sit amet, commodo rhoncus ex. Praesent gravida maximus
        dignissim.
      </Text>
    </View>
  ) : (
    <View />
  );
  // <View style={[styles.container, styles.whiteBg]}>
  //   <View>
  //     <Image
  //       source={{ uri: "https://i.imgur.com/ywNOECX.png" }}
  //       width={100}
  //       height={100}
  //     />
  //   </View>
  //   <Text style={styles.itemName}>{item.name}</Text>
  //   <Text style={styles.itemDescription}>
  //     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet
  //     sodales enim eu interdum. Cras elit sapien, tristique et mattis eget,
  //     interdum in ligula. Nullam condimentum nisl vitae tellus auctor, a
  //     lobortis est interdum. Ut luctus nunc dui, a consectetur magna rutrum
  //     sed. Pellentesque aliquam vitae dui et lobortis. Aliquam eu bibendum
  //     magna. Quisque pellentesque felis nec laoreet mattis. Nam sed nibh
  //     luctus, congue enim ut, ultricies erat. Nullam placerat, justo vitae
  //     interdum vehicula, dui sem pulvinar ligula, a rutrum sapien sapien eget
  //     felis. Sed viverra nibh in turpis blandit tempor. Curabitur enim tellus,
  //     vestibulum quis nisl finibus, efficitur tincidunt nunc. Donec bibendum
  //     urna ut felis fringilla convallis. Duis vitae augue non tellus pharetra
  //     varius. Donec tortor nulla, euismod sit amet consequat vel, luctus id
  //     elit. Nam at eleifend ante. In fringilla finibus neque at blandit.
  //     Nullam nec arcu sapien.
  //   </Text>
  // </View>
  // ) : (
  //   <View />
  // );
}
