import { createServer, Model, belongsTo } from "miragejs";
import { MapNode, Item, MapState } from "../map";

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
  2,
  799
);
const radio = new Item(
  "Radio",
  "image",
  "http://localhost:8888/assoc/dev_assets/radio.jpg",
  { w: 424, h: 463 },
  1,
  49.99
);

home.items.set(dj1.id, dj1);
home.items.set(tripleS.id, tripleS);

dieterRams.items.set(radio.id, radio);

const devMap = new MapState(
  home,
  1,
  new Map([
    [home.id, home],
    [dieterRams.id, dieterRams],
  ])
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function () {
  createServer({
    models: {
      user: Model,
      map: Model.extend({
        user: belongsTo(),
      }),
      token: Model.extend({
        user: belongsTo(),
      }),
    },

    seeds(server) {
      const user = server.create("user", { id: "1" });
      server.create("map", { user, state: devMap });
      server.create("token", { user, quantity: 10 });
    },

    routes() {
      this.get("/api/:userId/map", (schema, request) => {
        const userId = request.params.userId;

        return schema.users.find(userId).map;
      });

      this.get("/api/:userId/tokens", (schema, request) => {
        const userId = request.params.userId;

        return schema.users.find(userId).tokens;
      });
    },
  });
}
