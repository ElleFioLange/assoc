import React from "react";
import { FlatList, View, Text } from "react-native";
import NodeItemList from "../components/NodeItemList";
import { useAppSelector } from "../utils/hooks";
import { selectNodes } from "../utils/mapSlice";
import { styles } from "../utils/styles";

export default function Collection({ navigation }: MineProps): JSX.Element {
  const curNodeId = useAppSelector((state) => state.map.curNodeId);
  const nodes = useAppSelector(selectNodes);
  nodes.sort((a, b) => a.minD[curNodeId] - b.minD[curNodeId]);

  return (
    <View style={[styles.container, styles.whiteBg]}>
      <FlatList
        data={nodes}
        renderItem={(node) => {
          // FlatList is very stupid and passes the data
          // as an object with the node and index, instead of just
          // passing them as separate optional values.
          // node.item is the actual NodeData
          return (
            <React.Fragment key={node.item.id}>
              <NodeItemList
                node={node.item}
                openItem={(item) => navigation.navigate("ItemInfo", { item })}
              />
              <Text
                style={[
                  styles.avenir,
                  styles.marginTop,
                  { fontSize: 20, fontWeight: "400" },
                ]}
              >
                {node.item.name}
              </Text>
            </React.Fragment>
          );
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollPadding}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
