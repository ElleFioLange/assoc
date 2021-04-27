declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

type ItemData = {
  name: string;
  id: string;
  uri: string;
  w: number;
  h: number;
  price?: number;
};

type NodeData = {
  name: string;
  id: string;
  incoming: { name: string; id: string }[];
  outgoing: { name: string; id: string }[];
  items: ItemData[];
};

type MapData = {
  curNodeId: string;
  nodes: NodeData[];
};

type MapAction = {
  unlockNode: NodeData | undefined;
  unlockItem: NodeData | undefined;
  hint: string | undefined;
};

type RootStackParamList = {
  Home: undefined;
  Answer: { answer: string };
  ItemInfo: undefined;
  Purchase: undefined;
  Map: undefined;
  NodeInfo: undefined;
  Mine: undefined;
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
