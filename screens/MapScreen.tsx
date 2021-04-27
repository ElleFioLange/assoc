/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import { View, StyleSheet, Animated, PanResponder } from "react-native";
// import { ReactNativeZoomableView } from "@dudigital/react-native-zoomable-view";
import Svg, { Polygon, Text } from "react-native-svg";
import { styles, win } from "../utils/styles";

// Parameters for sizing
const sideLength = win.width * 0.25;
const edgeRad = (Math.sqrt(3) / 2) * sideLength;

// Function to get the center coordinate of a hexagon from its index
function getCenter(
  index: number,
  center: { x: number; y: number }
): { x: number; y: number } {
  if (index === 0) return { x: center.x, y: center.y };

  let ring = 0;
  while ((ring ** 2 + ring) / 2 < Math.ceil(index / 6)) ring++;
  // 1|2|4|7   Determines ring based on which column the index falls in after being divided by 6
  //   3|5|8   Each ring has 6 times its number of hexagons (ring 2 has 12, ring 4 has 24, etc.) (except ring 0 which has 1)
  //     6|9   Math.ceil(index / 6) gives which group of 6 the index falls in
  //      |10  Using the diagonal formula in order to figure out which ring that group is in

  const ringIndex = index - (((ring - 1) ** 2 + ring - 1) * 3 + 1);
  // Subtracts the number of hexagons in all previous rings from the index
  // to get an index within the ring itself (diagonal formula * 6 + 1)
  // * 3 in practice because diagonal formula has a / 2

  const vertSign =
    ringIndex <= (ring * 6) / 4 || ringIndex > (ring * 6 * 3) / 4 ? -1 : 1;
  // Whether the hexagon is above the origin or not
  // Returns -1 if above or at 0 with positive X, 1 if below or at 0 with negative X
  // Inverted because of the way the SVG Module draws (0, 0 is the top left corner)

  const vertIndex = Math.min(
    ringIndex,
    Math.abs(ring * 3 - ringIndex),
    ring * 6 - ringIndex
  );
  // Minimum of distance to 0 index from right side (ringIndex),
  // distance to bottom hexagon (Math.abs(ring * 3 - ringIndex)),
  // and distance to to 0 index from left side (ring * 6 - ringIndex)

  const vertOffsetFactor =
    ring * 2 - Math.min(ring, vertIndex) + Math.min(0, ring - vertIndex) * 2;
  // Start with ring * 2 (max VOF)
  // Subtract 1 for each index away from top, up to ring (hexagons arranged in a column from here on out)
  // Subtract 2 for each past ring (hexagons in a column are offset by twice the vertical distance)

  const y = vertSign * vertOffsetFactor * edgeRad + center.y;

  const horizSign = ringIndex < ring * 3 ? 1 : -1;
  const horizIndex = Math.min(
    ringIndex,
    Math.abs(ring * 3 - ringIndex),
    Math.abs(ring * 6 - ringIndex),
    ring
  );
  const x = horizSign * horizIndex * 1.5 * sideLength + center.x;

  // console.log(
  //   `Data for index: ${index}
  //   Ring: ${ring}
  //   RingIndex: ${ringIndex}
  //   NumVertGroups: ${numVertGroups}
  //   VertSign: ${vertSign}
  //   VertIndex: ${vertIndex}
  //   VertOffsetFactor: ${vertOffsetFactor}
  //   HorizSign: ${horizSign}
  //   HorizIndex: ${horizIndex}
  //   Center coord: ${x}, ${y}`
  // );

  return { x, y };
}

function getPoints({ x, y }: { x: number; y: number }): string[] {
  const points: string[] = [];
  for (let i = 0; i < 6; i++) {
    points.push(
      `${x + Math.cos((i * Math.PI) / 3) * sideLength},${
        y + Math.sin((i * Math.PI) / 3) * sideLength
      }`
    );
  }
  return points;
}

export default function MapScreen({
  navigation,
  route,
}: MapProps): JSX.Element {
  const { map } = route.params;
  const nodes = Array.from(map.data.values());
  nodes.sort((a, b) => a.minD(map.curNode.id) - b.minD(map.curNode.id));

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: (pan.x as any)._value,
          y: (pan.y as any)._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onMoveShouldSetPanResponderCapture: (e, gesture) => {
        return gesture.dx != 0 && gesture.dy != 0;
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  // Only for testing
  const test = nodes.map((node) => {
    return { id: node.id, name: node.name };
  });
  for (let i = 2; i < 100; i++) {
    test.push({ id: `${i}`, name: `${i}` });
  }

  return (
    <View style={[styles.container, styles.whiteBg]}>
      <Animated.View
        style={{
          transform: pan.getTranslateTransform(),
        }}
        {...panResponder.panHandlers}
      >
        <Svg height={win.height} width={win.width}>
          {nodes.map((node, index) => {
            const { x, y } = getCenter(index, {
              x: win.width / 2,
              y: win.height / 2,
            });
            const points = getPoints({ x, y });
            // console.log(node.name);
            return (
              <>
                <Polygon
                  key={node.id}
                  onPress={() => navigation.navigate("NodeInfo", { node })}
                  points={points.join(" ")}
                  stroke="black"
                  // fill={"white"}
                  strokeWidth={StyleSheet.hairlineWidth}
                />
                <Text
                  key={`${node.id}-name`}
                  fill="black"
                  fontSize="20"
                  fontFamily="avenir"
                  x={x}
                  y={y}
                  alignmentBaseline="central"
                  textAnchor="middle"
                >
                  {node.name}
                </Text>
              </>
            );
          })}
        </Svg>
      </Animated.View>
    </View>
  );
}
