/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "uuid";

declare type TMap = {
  curNode: import("./map").MapNode;
  curPosition: number;
  data: Map<string, import("./map").MapNode>;
};

declare type NetworkImageProps = {
  uri: string;
  w: number;
  h: number;
};

declare type ScreenProps = {
  map: TMap;
  navigation: any;
};

declare type HomeProps = ScreenProps & {
  setMap: React.Dispatch<React.SetStateAction<TMap>>;
};

declare type MainProps = HomeProps & {
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  setItem: React.Dispatch<
    React.SetStateAction<import("./map").Item | undefined>
  >;
};

declare type AnswerProps = {
  answer: string;
  navigation: any;
};

declare type BrowserProps = ScreenProps & {
  setItem: React.Dispatch<
    React.SetStateAction<import("./map").Item | undefined>
  >;
};

declare type ShadowStyle = {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowRadius: number;
  shadowOpacity: number;
};
