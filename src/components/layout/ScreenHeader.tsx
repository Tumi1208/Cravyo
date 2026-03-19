import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "../../theme";

export type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
};

export function ScreenHeader({ title, subtitle, actionLabel }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {actionLabel ? (
        <Pressable accessibilityRole="button">
          <Text style={styles.action}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  copy: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.heading.lg.fontSize,
    lineHeight: typography.heading.lg.lineHeight,
    fontWeight: typography.heading.lg.fontWeight,
  },
  subtitle: {
    color: colors.text.secondary,
    fontSize: typography.body.md.fontSize,
    lineHeight: typography.body.md.lineHeight,
  },
  action: {
    color: colors.brand.primaryStrong,
    fontSize: typography.label.md.fontSize,
    lineHeight: typography.label.md.lineHeight,
    fontWeight: typography.label.md.fontWeight,
  },
});
