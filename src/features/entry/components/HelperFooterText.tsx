import { Pressable, StyleSheet, Text, View } from "react-native";

import { typography } from "../../../theme";
import { entryColors } from "../constants";

type HelperFooterTextProps = {
  prompt: string;
  actionLabel: string;
  onPress?: () => void;
};

export function HelperFooterText({
  prompt,
  actionLabel,
  onPress,
}: HelperFooterTextProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.prompt}>{prompt} </Text>
      <Pressable accessibilityRole="button" onPress={onPress}>
        <Text style={styles.action}>{actionLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  prompt: {
    color: entryColors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
    fontFamily: typography.fontFamily.regular,
  },
  action: {
    color: entryColors.brandOrangeStrong,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    fontFamily: typography.fontFamily.medium,
  },
});
