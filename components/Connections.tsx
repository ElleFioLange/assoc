import React from "react";
import { Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { styles, width } from "../utils/styles";

export default function Connections({
  connections,
}: {
  connections: TConnection[];
}): JSX.Element {
  return (
    <View style={[{ width }, styles.marginTopDouble]}>
      <Text style={[styles.avenir, styles.connectionTitle]}>Connections</Text>
      {connections.map((connection) => {
        return connection.isSource ? (
          <View key={connection.id} style={styles.connection}>
            <Text style={styles.connectionName}>{connection.ownerId}</Text>
            <FontAwesome5 name="long-arrow-alt-right" size={width * 0.05} />
            <Text style={styles.connectionKey}>
              &quot;{connection.key}&quot;
            </Text>
            <FontAwesome5 name="long-arrow-alt-right" size={width * 0.05} />
            <Text style={styles.connectionName}>{connection.partnerId}</Text>
          </View>
        ) : (
          <View key={connection.id} style={styles.connection}>
            <Text style={styles.connectionName}>{connection.partnerId}</Text>
            <FontAwesome5 name="long-arrow-alt-left" size={width * 0.05} />
            <Text style={styles.connectionKey}>
              &quot;{connection.key}&quot;
            </Text>
            <FontAwesome5 name="long-arrow-alt-left" size={width * 0.05} />
            <Text style={styles.connectionName}>{connection.ownerId}</Text>
          </View>
        );
      })}
    </View>
  );
}
