declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "uuid";

type TMap = {
  curNode: import("./map").MapNode;
  curPosition: number;
  data: Map<string, import("./map").MapNode>;
};

type RootStackParamList = {
  Home: { map: TMap; setMap: React.Dispatch<React.SetStateAction<TMap>> };
  Answer: { answer: string };
  ItemInfo: { item: import("./map").Item };
  Purchase: { item: import("./map").Item };
  Map: { map: TMap };
  NodeInfo: { node: import("./map").MapNode };
  Mine: { map: TMap };
  Settings: undefined;
  Tokens: undefined;
};

type HomeProps = import("react-native-screens/native-stack").NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;

type AnswerProps = import("react-native-screens/native-stack").NativeStackScreenProps<
  RootStackParamList,
  "Answer"
>;

type ItemInfoProps = import("react-native-screens/native-stack").NativeStackScreenProps<
  RootStackParamList,
  "ItemInfo"
>;

type PurchaseProps = import("react-native-screens/native-stack").NativeStackScreenProps<
  RootStackParamList,
  "Purchase"
>;

type MapProps = import("react-native-screens/native-stack").NativeStackScreenProps<
  RootStackParamList,
  "Map"
>;

type NodeInfoProps = import("react-native-screens/native-stack").NativeStackScreenProps<
  RootStackParamList,
  "NodeInfo"
>;

type MineProps = import("react-native-screens/native-stack").NativeStackScreenProps<
  RootStackParamList,
  "Mine"
>;

type SettingsProps = import("react-native-screens/native-stack").NativeStackScreenProps<
  RootStackParamList,
  "Settings"
>;

type TokensProps = import("react-native-screens/native-stack").NativeStackScreenProps<
  RootStackParamList,
  "Tokens"
>;
