import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "../../theme";

export type SectionHeaderProps = {
  title: string;
  caption?: string;
  actionLabel?: string;
};

export function SectionHeader({ title, caption, actionLabel }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        {caption ? <Text style={styles.caption}>{caption}</Text> : null}
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
    alignItems: "flex-end",
    gap: spacing.md,
  },
  copy: {
    flex: 1,
    gap: spacing.xxs,
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.heading.md.fontSize,
    lineHeight: typography.heading.md.lineHeight,
    fontWeight: typography.heading.md.fontWeight,
  },
  caption: {
    color: colors.text.secondary,
    fontSize: typography.body.sm.fontSize,
    lineHeight: typography.body.sm.lineHeight,
  },
  action: {
    color: colors.brand.primaryStrong,
    fontSize: typography.label.md.fontSize,
    lineHeight: typography.label.md.lineHeight,
    fontWeight: typography.label.md.fontWeight,
  },
});
