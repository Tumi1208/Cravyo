import { Pressable, StyleSheet, Text, type PressableProps } from "react-native";

import { colors, radius, spacing, typography } from "../../theme";

export type PrimaryButtonProps = PressableProps & {
  label: string;
};

export function PrimaryButton({ label, ...props }: PrimaryButtonProps) {
  return (
    <Pressable accessibilityRole="button" style={styles.button} {...props}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.brand.primary,
  },
  label: {
    color: colors.text.inverse,
    fontSize: typography.label.lg.fontSize,
    lineHeight: typography.label.lg.lineHeight,
    fontWeight: typography.label.lg.fontWeight,
  },
});
