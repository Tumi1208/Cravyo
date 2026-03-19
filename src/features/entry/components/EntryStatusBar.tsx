import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { typography } from "../../../theme";

type EntryStatusBarProps = {
  color: string;
};

export function EntryStatusBar({ color }: EntryStatusBarProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.time, { color }]}>16:04</Text>
      <View style={styles.iconRow}>
        <MaterialCommunityIcons color={color} name="signal-cellular-3" size={16} />
        <Feather color={color} name="wifi" size={14} />
        <Feather color={color} name="battery" size={15} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  time: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "600",
    fontFamily: typography.fontFamily.semibold,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
