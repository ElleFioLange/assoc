import React from "react";
import { Image } from "react-native";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import { width } from "./styles";

class Base {
  name: string;

  id: string;

  date: number;

  constructor(name: string) {
    this.id = uuid();
    this.name = name;
    this.date = new Date().getUTCSeconds();
  }
}

export class MapNode extends Base {
  // Immediate connections that lead to this node
  incomingNeighbors = new Map<string, Edge>();

  // Immediate connections from this node to others
  outgoingNeighbors = new Map<string, Edge>();

  // All nodes that can reach this node
  incoming = new Map<string, MapNode>();

  // All nodes that this node can reach
  outgoing = new Map<string, MapNode>();

  // Minimum distance to another node (undef if not connected)
  #minD = new Map<string, number>();

  // All content at this node (get by ID)
  items = new Map<string, Item>();

  // Content at a certain position
  positions = new Map<number, Item[]>();

  connect(node: MapNode, name: string, thisPos: number, nodePos: number): void {
    // Check if connection already exists
    if (this.outgoingNeighbors.has(node.id))
      throw new Error("Connection already exists");

    // Can't connect position to itself on same node
    if (node === this && thisPos === nodePos)
      throw new Error("Can't connect position to itself on the same node");

    // Make an edge and add connection
    const edge = new Edge(name, this, node, thisPos, nodePos);
    this.outgoingNeighbors.set(node.id, edge);
    node.incomingNeighbors.set(this.id, edge);
    this.outgoing.set(node.id, node);
    node.incoming.set(this.id, this);

    this.#minD.set(node.id, 1);

    // update min distance for incoming nodes
    Array.from(this.incoming.values()).forEach((inNode) => {
      const minDToNew = inNode.minD(node.id);
      const minDToThis = inNode.minD(this.id);
      if (minDToNew > minDToThis + 1) {
        inNode.updateMinD(node.id, minDToThis + 1);
      }
    });
  }

  minD(id: string): number {
    const distance = this.#minD.get(id);
    if (typeof distance === "number") return distance;
    return Infinity;
  }

  updateMinD(id: string, distance: number): void {
    this.#minD.set(id, distance);
  }
}

export class Edge {
  name: string;

  source: MapNode;

  sink: MapNode;

  sourcePosition: number;

  sinkPosition: number;

  constructor(
    name: string,
    source: MapNode,
    sink: MapNode,
    sourcePosition: number,
    sinkPosition: number
  ) {
    this.name = name;
    this.source = source;
    this.sink = sink;
    this.sourcePosition = sourcePosition;
    this.sinkPosition = sinkPosition;
  }
}

export class Item extends Base {
  type: string;

  uri: string;

  dims: { w: number; h: number };

  position: number;

  constructor(
    name: string,
    type: string,
    uri: string,
    dims: { w: number; h: number },
    position: number
  ) {
    super(name);
    this.type = type;
    this.uri = uri;
    this.dims = dims;
    this.position = position;
  }
}

const home = new MapNode("Home");
const dieterRams = new MapNode("Dieter Rams");

const dj1 = new Item(
  "Dior J1s",
  "image",
  "http://localhost:8888/assoc/dev_assets/dior_j1s.jpeg",
  { w: 1118, h: 745 },
  1
);
const tripleS = new Item(
  "Balenciaga Triple S",
  "image",
  "http://localhost:8888/assoc/dev_assets/triple_s.png",
  { w: 375, h: 183 },
  2
);
const radio = new Item(
  "Radio",
  "image",
  "http://localhost:8888/assoc/dev_assets/radio.jpg",
  { w: 424, h: 463 },
  1
);

home.items.set(dj1.id, dj1);
home.items.set(tripleS.id, tripleS);

dieterRams.items.set(radio.id, radio);

export const devMap: TMap = {
  data: new Map([
    [home.id, home],
    [dieterRams.id, dieterRams],
  ]),
  curNode: home,
  curPosition: 1,
};
