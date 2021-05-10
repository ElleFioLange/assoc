declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

type ContentData = {
  isVideo: boolean;
  uri: string;
  w: number;
  h: number;
};

type ItemData = {
  id: string;
  name: string;
  description: string;
  parentName: string;
  parentId: string;
  content: ContentData[];
  type: "image" | "video" | "audio";
  numUnlocked: number;
  purchaseInfo: {
    static?: number;
    dynamic?: {
      maxPrice: number;
      minPrice: number;
      numNeededForMin: number;
      maxAvailable?: number;
    };
  };
  link?: string;
};

type LocationData = {
  id: string;
  name: string;
  description: string;
  parentId: string;
  incoming: Record<string, string>;
  outgoing: Record<string, string>;
  minD: Record<string, number>;
  items: Record<string, ItemData>;
};

type RootStackParamList = {
  Landing: undefined;
  Home: undefined;
  Answer: { answer: string };
  ItemInfo: { item: ItemData };
  Purchase: { item: ItemData };
  Share: { item: ItemData };
  Map: undefined;
  LocationInfo: { location: LocationData };
  Collection: undefined;
  // Collection: import("@react-navigation/native").NavigatorScreenParams<CollectionTabParamList>;
  Settings: undefined;
  Tokens: undefined;
};

type CollectionTabParamList = {
  All: { curLocation: LocationData };
  Saved: { curLocation: LocationData };
};

type CollectionAllScreenNavigationProp = import("@react-navigation/native").CompositeNavigationProp<
  import("@react-navigation/bottom-tabs").BottomTabNavigationProp<
    CollectionTabParamList,
    "All"
  >,
  import("@react-navigation/stack").StackNavigationProp<RootStackParamList>
>;

type CollectionSavedScreenNavigationProp = import("@react-navigation/native").CompositeNavigationProp<
  import("@react-navigation/bottom-tabs").BottomTabNavigationProp<
    CollectionTabParamList,
    "Saved"
  >,
  import("@react-navigation/stack").StackNavigationProp<RootStackParamList>
>;

type LandingProps = import("react-native-screens/native-stack").NativeStackScreenProps<
  RootStackParamList,
  "Landing"
>;

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

type ShareProps = import("react-native-screens/native-stack").NativeStackScreenProps<
  RootStackParamList,
  "Share"
>;

type MapProps = import("react-native-screens/native-stack").NativeStackScreenProps<
  RootStackParamList,
  "Map"
>;

type LocationInfoProps = import("react-native-screens/native-stack").NativeStackScreenProps<
  RootStackParamList,
  "LocationInfo"
>;

type CollectionProps = import("react-native-screens/native-stack").NativeStackScreenProps<
  RootStackParamList,
  "Collection"
>;

type CollectionAllProps = import("@react-navigation/bottom-tabs").BottomTabScreenProps<
  CollectionTabParamList,
  "All"
>;

type CollectionSavedProps = import("@react-navigation/bottom-tabs").BottomTabScreenProps<
  CollectionTabParamList,
  "Saved"
>;

type SettingsProps = import("react-native-screens/native-stack").NativeStackScreenProps<
  RootStackParamList,
  "Settings"
>;

type TokensProps = import("react-native-screens/native-stack").NativeStackScreenProps<
  RootStackParamList,
  "Tokens"
>;
