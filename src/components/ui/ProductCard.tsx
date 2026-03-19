import { StyleSheet, Text, View } from "react-native";

import { colors, radius, shadows, spacing, typography } from "../../theme";

export type ProductCardProps = {
  title: string;
  subtitle: string;
  price: string;
};

export function ProductCard({ title, subtitle, price }: ProductCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    borderRadius: radius.xl,
    backgroundColor: colors.surface.card,
    ...shadows.card,
  },
  imagePlaceholder: {
    height: 136,
    backgroundColor: colors.surface.muted,
  },
  content: {
    gap: spacing.xs,
    padding: spacing.md,
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.heading.md.fontSize,
    lineHeight: typography.heading.md.lineHeight,
    fontWeight: typography.heading.md.fontWeight,
  },
  subtitle: {
    color: colors.text.secondary,
    fontSize: typography.body.md.fontSize,
    lineHeight: typography.body.md.lineHeight,
  },
  price: {
    color: colors.brand.primaryStrong,
    fontSize: typography.label.lg.fontSize,
    lineHeight: typography.label.lg.lineHeight,
    fontWeight: typography.label.lg.fontWeight,
  },
});
