// Writing this in JS instead of TS because it's only for testing and Mirage hates TS for some reason

import { Server, Model, belongsTo, Response } from "miragejs";

const devMap = [
  {
    name: "Home",
    id: "auuq98u3ro3qunqwc0",
    outgoing: [{ name: "Design", id: "2iqjv9sq2f90asjvqd" }],
    incoming: [],
    minD: { "2iqjv9sq2f90asjvqd": 1 },
    items: [
      {
        name: "Dior J1s",
        id: "auu8acm3ro3qunqwc0",
        parentName: "Home",
        parentId: "auuq98u3ro3qunqwc0",
        mainContent: {
          uri: "http://localhost:8888/assoc/dev_server/assets/dior_j1s.jpeg",
          w: 1118,
          h: 745,
        },
        numUnlocked: 0,
      },
      {
        name: "Off-White Bag",
        id: "auu8acm3ro9cmeqwc0",
        parentName: "Home",
        parentId: "auuq98u3ro3qunqwc0",
        mainContent: {
          uri:
            "http://localhost:8888/assoc/dev_server/assets/offwhite_bag.jpeg",
          w: 780,
          h: 838,
        },
        numUnlocked: 10,
        purchasable: true,
        purchaseInfo: {
          dynamic: {
            maxPrice: 429,
            minPrice: 339,
            numNeededForMin: 150,
          },
        },
      },
      {
        name: "Red Octobers",
        id: "a7d8xkd3ro9cmeqwc0",
        parentName: "Home",
        parentId: "auuq98u3ro3qunqwc0",
        mainContent: {
          uri:
            "http://localhost:8888/assoc/dev_server/assets/red_octobers.jpeg",
          w: 1118,
          h: 747,
        },
        numUnlocked: 2,
        purchasable: true,
        purchaseInfo: {
          static: 24999.99,
        },
      },
      {
        name: "Supreme Crowbar",
        id: "a7d8xkd38duwieqwc0",
        parentName: "Home",
        parentId: "auuq98u3ro3qunqwc0",
        mainContent: {
          uri:
            "http://localhost:8888/assoc/dev_server/assets/supreme_crowbar.png",
          w: 300,
          h: 135,
        },
        numUnlocked: 25,
      },
      {
        name: "Balenciaga Triple S",
        id: "a7dix8d3ro9cmeqwc0",
        parentName: "Home",
        parentId: "auuq98u3ro3qunqwc0",
        mainContent: {
          uri: "http://localhost:8888/assoc/dev_server/assets/triple_s.jpeg",
          w: 375,
          h: 183,
        },
        numUnlocked: 999999,
        purchaseInfo: {
          dynamic: {
            maxPrice: 949,
            minPrice: 699,
            numNeededForMin: 600,
          },
        },
      },
      {
        name: "Undefeated J4s",
        id: "a7d8xkd46sscmeqwc0",
        parentName: "Home",
        parentId: "auuq98u3ro3qunqwc0",
        mainContent: {
          uri:
            "http://localhost:8888/assoc/dev_server/assets/undefeated_j4s.jpeg",
          w: 750,
          h: 600,
        },
        numUnlocked: 47,
      },
      {
        name: "Visvim Sandals",
        id: "a7d8xkd3ro9cmeq39f",
        parentName: "Home",
        parentId: "auuq98u3ro3qunqwc0",
        mainContent: {
          uri: "http://localhost:8888/assoc/dev_server/assets/vv_sandals.jpeg",
          w: 455,
          h: 475,
        },
        numLocked: 35,
        purchaseInfo: {
          static: 159,
        },
      },
    ],
  },
  {
    name: "Dieter Rams",
    id: "2iqjv9sq2f90asjvqd",
    outgoing: [],
    incoming: [{ name: "Design", id: "auuq98u3ro3qunqwc0" }],
    // eslint-disable-next-line prettier/prettier
    minD: { "auuq98u3ro3qunqwc0": 1 },
    items: [
      {
        name: "Ipod",
        id: "2iqjv9sq2f90as29dj",
        parentName: "Dieter Rams",
        parentId: "2iqjv9sq2f90asjvqd",
        mainContent: {
          uri: "http://localhost:8888/assoc/dev_server/assets/ipod.jpeg",
          w: 569,
          h: 381,
        },
        numUnlocked: 328,
      },
      {
        name: "Light",
        id: "2iqjv9sq2f9027d8al",
        parentName: "Dieter Rams",
        parentId: "2iqjv9sq2f90asjvqd",
        mainContent: {
          uri: "http://localhost:8888/assoc/dev_server/assets/light.jpg",
          w: 1500,
          h: 1143,
        },
        numUnlocked: 15,
        purchaseInfo: {
          static: 79.99,
        },
      },
      {
        name: "Radio",
        id: "2iqjv9sq2f28d9s888",
        parentName: "Dieter Rams",
        parentId: "2iqjv9sq2f90asjvqd",
        mainContent: {
          uri: "http://localhost:8888/assoc/dev_server/assets/radio.jpg",
          w: 424,
          h: 463,
        },
        numUnlocked: 2589,
        purchaseInfo: {
          static: 39.99,
        },
      },
      {
        name: "Record Player",
        id: "2iqjv9sq2f90as849s",
        parentName: "Dieter Rams",
        parentId: "2iqjv9sq2f90asjvqd",
        mainContent: {
          uri:
            "http://localhost:8888/assoc/dev_server/assets/record_player.jpg",
          w: 1200,
          h: 1200,
        },
        numUnlocked: 5,
        purchasInfo: {
          dynamic: {
            maxPrice: 399.99,
            minPrice: 299.99,
            numNeededForMin: 15,
            maxAvailable: 15,
          },
        },
      },
      {
        name: "T3",
        id: "2iqjv9sq2f90as9die",
        parentName: "Dieter Rams",
        parentId: "2iqjv9sq2f90asjvqd",
        mainContent: {
          uri: "http://localhost:8888/assoc/dev_server/assets/t3.jpg",
          w: 2550,
          h: 3300,
        },
        numUnlocked: 25,
      },
    ],
  },
];

new Server({
  models: {
    user: Model.extend({
      map: belongsTo(),
      curNodeId: belongsTo(),
      token: belongsTo(),
    }),
    map: Model.extend({
      user: belongsTo(),
    }),
    curNodeId: Model.extend({
      user: belongsTo(),
    }),
    token: Model.extend({
      user: belongsTo(),
    }),
  },

  seeds(server) {
    const user = server.create("user", { id: "1" });
    server.create("map", { user, data: devMap });
    server.create("curNodeId", { user, data: "auuq98u3ro3qunqwc0" });
    server.create("token", { user, data: 10 });
  },

  routes() {
    this.namespace = "assoc";
    this.timing = 100;

    this.get("/:userId/map", (schema, request) => {
      const userId = request.params.userId;
      const user = schema.users.find(userId);
      const { map, curNodeId } = user;

      return { map, curNodeId };
    });

    this.post("/:userId/map", (schema, request) => {
      const userId = request.params.userId;
      const user = schema.users.find(userId);
      const { map } = user;
      const { query } = JSON.parse(request.requestBody);

      if (query === "Dieter Rams")
        return { map, curNodeId: "2iqjv9sq2f90asjvqd" };

      return { map, curNodeId: "auuq98u3ro3qunqwc0" };
    });

    this.get("/:userId/tokens", (schema, request) => {
      const userId = request.params.userId;

      return schema.users.find(userId).token.data;
    });

    this.post("/:userId/tokens", (schema, request) => {
      const userId = request.params.userId;
      const user = schema.user.find(userId);
      const { tokens } = user;
      const { quantity } = JSON.parse(request.requestBody);

      if (tokens < quantity)
        return new Response(400, undefined, {
          quantity: quantity,
          e: "Error: Not enough tokens",
        });
      return tokens - quantity;
    });
  },
});
