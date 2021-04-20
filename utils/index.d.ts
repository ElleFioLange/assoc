declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "uuid";

declare type TMap = {
  curNode: import("./Map").MapNode;
  curPosition: number;
  data: Map<string, import("./Map").MapNode>;
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

declare type CustomCarouselProps = {
  map: TMap;
  winWidth: number;
  itemWidth: number;
  shadowStyle: ShadowStyle;
  openItem: (item: import("./Map").Item) => void;
};

// declare interface MapNode {
//   name: string;
//   id: string;
//   date: number;
//   incomingNeighbors: Map<string, edge>;
//   outgoingNeighbors: Map<string, edge>;
//   incoming: Map<string, MapNode>;
//   outgoing: Map<string, MapNode>;
//   #minD: Map<string, number>;
//   items: Map<string, Item>;
//   positions: Map<number, Item[]>;
//   connect: (
//     node: MapNode,
//     name: string,
//     thisPos: number,
//     nodePos: number
//   ) => void;
//   minD: (id: string) => number;
//   updateMinD: (id: string, distance: number) => void;
// }

// declare interface Item {
//   name: string;
//   id: string;
//   date: number;
//   type: string;
//   uri: string;
//   position: number;
// }
