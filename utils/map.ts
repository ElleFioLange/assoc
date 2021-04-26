import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import { serialize } from "serialize-javascript";

class Base {
  name: string;

  id: string;

  date: number;

  constructor(name: string) {
    this.id = uuid();
    this.name = name;
    this.date = new Date().getUTCSeconds();
  }

  serialize(): string {
    return serialize(this);
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

  // Minimum distance to another node
  // Private var returns undef if not connected
  // Public func return Infinity if not connected
  minD = new Map<string, number>();

  // All content at this node (get by ID)
  items = new Map<string, Item>();

  // Items at a certain position, user positions.keys() to get all available positions
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

    this.minD.set(node.id, 1);

    // update min distance for incoming nodes
    Array.from(this.incoming.values()).forEach((inNode) => {
      const minDToNew = inNode.getMinD(node.id);
      const minDToThis = inNode.getMinD(this.id);
      if (minDToNew > minDToThis + 1) {
        inNode.minD.set(node.id, minDToThis + 1);
      }
    });
  }

  // Using this to return Infinity if two nodes are not connected
  getMinD(id: string): number {
    const distance = this.minD.get(id);
    if (typeof distance === "number") return distance;
    return Infinity;
  }

  copy(): MapNode {
    return eval("(" + this.serialize() + ")");
  }
}

export class Edge extends Base {
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
    super(name);
    this.source = source;
    this.sink = sink;
    this.sourcePosition = sourcePosition;
    this.sinkPosition = sinkPosition;
  }

  copy(): Edge {
    return eval("(" + this.serialize() + ")");
  }
}

export class Item extends Base {
  type: string;

  uri: string;

  dims: { w: number; h: number };

  position: number;

  price: number | undefined;

  constructor(
    name: string,
    type: string,
    uri: string,
    dims: { w: number; h: number },
    position: number,
    price?: number
  ) {
    super(name);
    this.type = type;
    this.uri = uri;
    this.dims = dims;
    this.position = position;
    if (price) this.price = price;
  }

  copy(): Item {
    return eval("(" + this.serialize() + ")");
  }
}

export class MapState {
  curNode: MapNode;

  curPosition: number;

  data: Map<string, MapNode>;

  constructor(
    curNode: MapNode,
    curPosition: number,
    data: Map<string, MapNode>
  ) {
    this.curNode = curNode;
    this.curPosition = curPosition;
    this.data = data;
  }

  addNode(newNode: MapNode, position = 1): void {
    this.data.set(newNode.id, newNode);
    this.curNode = newNode;
    this.curPosition = position;
  }

  addItem(item: Item, position = this.curPosition): void {
    this.curNode.items.set(item.id, item);
    const prevItemsAtPos = this.curNode.positions.get(position);
    prevItemsAtPos
      ? this.curNode.positions.set(position, prevItemsAtPos.concat([item]))
      : this.curNode.positions.set(position, [item]);
  }

  serialize(): string {
    return serialize(this);
  }

  copy(): MapNode {
    return eval("(" + this.serialize() + ")");
  }
}
