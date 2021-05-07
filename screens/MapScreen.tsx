/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { View, StyleSheet, Animated, PanResponder } from "react-native";
import Svg, { Polygon, Text, G } from "react-native-svg";
import { useAppSelector, useAppDispatch } from "../utils/hooks";
import { selectLocations, setCurLocationId } from "../utils/mapSlice";
import { styles, win } from "../utils/styles";

// Parameters for sizing
const sideLength = win.width * 0.15;
const edgeRad = (Math.sqrt(3) / 2) * sideLength;
const vertices: number[][] = [];
for (let i = 0; i < 6; i++) {
  vertices.push([
    Math.cos((i * Math.PI) / 3) * sideLength,
    Math.sin((i * Math.PI) / 3) * sideLength,
  ]);
}
const points = vertices.join(" ");

// Gets the center coordinate of a hexagon from its index
function getCenter(index: number): { x: number; y: number } {
  if (index === 0) return { x: win.width / 2, y: win.height / 2 };

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

  const y = vertSign * vertOffsetFactor * edgeRad + win.height / 2;

  const horizSign = ringIndex < ring * 3 ? 1 : -1;
  const horizIndex = Math.min(
    ringIndex,
    Math.abs(ring * 3 - ringIndex),
    Math.abs(ring * 6 - ringIndex),
    ring
  );
  const x = horizSign * horizIndex * 1.5 * sideLength + win.width / 2;

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

const AnimatedG = Animated.createAnimatedComponent(G);

export default function MapScreen({ navigation }: MapProps): JSX.Element {
  const curLocationId = useAppSelector((state) => state.map.curLocationId);
  const locations = useAppSelector(selectLocations);
  const dispatch = useAppDispatch();

  // Using state for pan tracking instead of animated component
  // so that I can progressively render the hexagons instead of
  // having to render them all at once, which actually ends up being
  // more responsive
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);

  // Pan Responder setup
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
  pan.x.addListener((value) => setPanX(value.value));
  pan.y.addListener((value) => setPanY(value.value));

  // Sort list of locations according to their minimum
  // distance from the current location. Array spread first
  // so as to not mutate the selector array
  const data = [...locations];
  data.sort((a, b) => {
    if (!a.minD[curLocationId]) return -1;
    if (!b.minD[curLocationId]) return 1;
    return a.minD[curLocationId] - b.minD[curLocationId];
  });

  // Only for testing
  const test = data.map((location) => {
    return { id: location.id, name: location.name };
  });
  for (let i = 2; i < 91; i++) {
    test.push({ id: `${i}`, name: `${i}` });
  }

  const hexCenters: { x: number; y: number }[] = [];
  for (let i = 0; i < test.length; i++) {
    hexCenters.push(getCenter(i));
  }

  return (
    <View style={[styles.container, styles.whiteBg]}>
      <Svg height={win.height} width={win.width}>
        {test.map((location, index) => {
          const center = hexCenters[index];
          const onScreen =
            center.x > -panX - sideLength &&
            center.x < win.width - panX + sideLength &&
            center.y > -panY - sideLength &&
            center.y < win.height - panY + sideLength;
          return onScreen ? (
            <AnimatedG
              // x={Animated.add(pan.x, new Animated.Value(center.x))}
              // y={Animated.add(pan.y, new Animated.Value(center.y))}
              x={panX + center.x}
              y={panY + center.y}
              key={location.id}
              {...panResponder.panHandlers}
            >
              <Polygon
                onPress={() =>
                  navigation.navigate("LocationInfo", { location: data[0] })
                }
                onLongPress={() => {
                  dispatch(setCurLocationId(data[1].id));
                  navigation.navigate("Home");
                }}
                // rotation={test.length - 1 - index}
                delayLongPress={250}
                points={points}
                stroke="#1122f4"
                fill={index ? "white" : "#1122f4"}
                strokeWidth={Math.max(
                  StyleSheet.hairlineWidth,
                  4 -
                    0.007 *
                      Math.sqrt(
                        (center.x - win.width / 2) ** 2 +
                          (center.y - win.height / 2) ** 2
                      )
                )}
              />
              <Text
                fill={index ? "black" : "white"}
                fontSize={sideLength * 0.25}
                fontFamily="avenir"
                alignmentBaseline="central"
                textAnchor="middle"
              >
                {location.name}
              </Text>
            </AnimatedG>
          ) : null;
        })}
      </Svg>
      <View></View>
    </View>
  );
}
