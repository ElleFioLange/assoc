import React from "react";
import { Image, StyleProp, ImageStyle, Text, Platform } from "react-native";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import { accentBlue, styles, width } from "../utils/styles";
import MapView, { Marker } from "react-native-maps";
import openMaps from "react-native-open-maps";
import { useAppSelector } from "../redux/hooks";

export default function Content({
  content,
  style,
  poster,
}: {
  content: TContent;
  style?: StyleProp<ImageStyle>;
  poster?: boolean;
}): JSX.Element {
  const autoPlayVideos = useAppSelector(
    (state) => state.settings.autoPlayVideos
  );
  switch (content.type) {
    case "image": {
      return (
        <Image
          source={{ uri: content.uri, cache: "force-cache" }}
          style={[styles.image, style]}
          // Scale width and height down slightly so that the image
          // doesn't draw over any of the borders
          width={
            content.w >= content.h
              ? width * 0.99
              : (width * 0.99 * content.w) / content.h
          }
          height={
            content.w < content.h
              ? width * 0.99
              : (width * 0.99 * content.h) / content.w
          }
        />
      );
    }
    case "video": {
      return poster ? (
        <Image
          source={{ uri: content.posterUri, cache: "force-cache" }}
          style={[styles.image, style]}
          // Scale width and height down slightly so that the image
          // doesn't draw over any of the borders
          width={
            content.posterW >= content.posterH
              ? width * 0.99
              : (width * 0.99 * content.posterW) / content.posterH
          }
          height={
            content.posterW < content.posterH
              ? width * 0.99
              : (width * 0.99 * content.posterH) / content.posterW
          }
        />
      ) : (
        <VideoPlayer
          videoProps={{
            shouldPlay: autoPlayVideos,
            resizeMode: Video.RESIZE_MODE_CONTAIN,
            posterSource: {
              uri: content.posterUri,
            },
            source: {
              uri: content.videoUri,
            },
          }}
          showFullscreenButton={false}
          width={
            content.videoW >= content.videoH
              ? width * 0.99
              : (width * 0.99 * content.videoW) / content.videoH
          }
          height={
            content.videoW < content.videoH
              ? width * 0.99
              : (width * 0.99 * content.videoH) / content.videoW
          }
        />
      );
    }
    case "map": {
      return (
        <MapView
          style={[
            {
              width: width * 0.99,
              height: width * 0.99,
            },
            style,
          ]}
          initialRegion={{
            latitude: content.latitude,
            longitude: content.longitude,
            latitudeDelta: content.viewDelta,
            longitudeDelta: content.viewDelta,
          }}
          showsMyLocationButton={false}
          showsPointsOfInterest={false}
          showsCompass={false}
          onLongPress={() =>
            openMaps({
              latitude: content?.latitude,
              longitude: content?.longitude,
              provider: Platform.OS === "ios" ? "apple" : "google",
            })
          }
          scrollEnabled={false}
          zoomEnabled={!poster}
          rotateEnabled={!poster}
          pitchEnabled={!poster}
        >
          <Marker
            coordinate={{
              latitude: content.latitude,
              longitude: content.longitude,
            }}
            pinColor={accentBlue}
          />
        </MapView>
      );
    }
    default: {
      return <Text>Error loading content</Text>;
    }
  }
}
