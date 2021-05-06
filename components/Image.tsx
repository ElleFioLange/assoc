import React from "react";
import { Image as RNImage, StyleProp, ImageStyle } from "react-native";
import { styles, width } from "../utils/styles";

export default function Image({
  content,
  style,
}: {
  content: ContentData;
  style?: StyleProp<ImageStyle>;
}): JSX.Element {
  return (
    <RNImage
      source={{ uri: content.uri, cache: "force-cache" }}
      style={[styles.image, style]}
      width={content.w >= content.h ? width : (width * content.w) / content.h}
      height={content.w < content.h ? width : (width * content.h) / content.w}
    />
  );
}
