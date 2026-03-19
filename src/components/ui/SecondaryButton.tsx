import { Pressable, StyleSheet, Text, type PressableProps } from "react-native";

import { colors, radius, spacing, typography } from "../../theme";

export type SecondaryButtonProps = PressableProps & {
  label: string;
};

export function SecondaryButton({ label, ...props }: SecondaryButtonProps) {
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
    borderWidth: 1,
    borderColor: colors.border.strong,
    backgroundColor: colors.surface.card,
  },
  label: {
    color: colors.text.primary,
    fontSize: typography.label.lg.fontSize,
    lineHeight: typography.label.lg.lineHeight,
    fontWeight: typography.label.lg.fontWeight,
  },
});
