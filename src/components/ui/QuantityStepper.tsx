import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "../../theme";

export type QuantityStepperProps = {
  value: number;
  onDecrease?: () => void;
  onIncrease?: () => void;
};

export function QuantityStepper({ value, onDecrease, onIncrease }: QuantityStepperProps) {
  return (
    <View style={styles.container}>
      <Pressable accessibilityRole="button" style={styles.control} onPress={onDecrease}>
        <Text style={styles.controlLabel}>-</Text>
      </Pressable>
      <Text style={styles.value}>{value}</Text>
      <Pressable accessibilityRole="button" style={styles.control} onPress={onIncrease}>
        <Text style={styles.controlLabel}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    alignSelf: "flex-start",
    padding: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.surface.muted,
  },
  control: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.pill,
    backgroundColor: colors.surface.card,
  },
  controlLabel: {
    color: colors.brand.primaryStrong,
    fontSize: typography.label.lg.fontSize,
    lineHeight: typography.label.lg.lineHeight,
    fontWeight: typography.label.lg.fontWeight,
  },
  value: {
    minWidth: 28,
    textAlign: "center",
    color: colors.text.primary,
    fontSize: typography.label.lg.fontSize,
    lineHeight: typography.label.lg.lineHeight,
    fontWeight: typography.label.lg.fontWeight,
  },
});
