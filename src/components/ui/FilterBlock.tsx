import type { ReactNode } from "react";

import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "../../theme";

export type FilterBlockProps = {
  title: string;
  children?: ReactNode;
};

export function FilterBlock({ title, children }: FilterBlockProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: radius.xl,
    backgroundColor: colors.surface.card,
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.heading.md.fontSize,
    lineHeight: typography.heading.md.lineHeight,
    fontWeight: typography.heading.md.fontWeight,
  },
  content: {
    gap: spacing.sm,
  },
});
