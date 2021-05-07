import React from "react";
import { Image as RNImage, StyleProp, ImageStyle } from "react-native";
import { styles, width } from "../utils/styles";

// TODO Make this a content object that can handle videos, audio, maps, 3d models???? nfts????

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
      // Scale width down slightly so that the image
      // doesn't draw over the carousel border
      width={
        content.w >= content.h
          ? width * 0.99
          : (width * 0.99 * content.w) / content.h
      }
      height={content.w < content.h ? width : (width * content.h) / content.w}
    />
  );
}
