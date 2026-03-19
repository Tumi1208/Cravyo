import { StyleSheet, Text, View } from "react-native";

import { colors, radius, shadows, spacing, typography } from "../../theme";

export type OrderCardProps = {
  orderId: string;
  status: string;
  total: string;
  eta?: string;
};

export function OrderCard({ orderId, status, total, eta }: OrderCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.orderId}>{orderId}</Text>
        <Text style={styles.status}>{status}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.total}>{total}</Text>
        {eta ? <Text style={styles.eta}>{eta}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.xl,
    backgroundColor: colors.surface.card,
    ...shadows.card,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  orderId: {
    color: colors.text.primary,
    fontSize: typography.label.lg.fontSize,
    lineHeight: typography.label.lg.lineHeight,
    fontWeight: typography.label.lg.fontWeight,
  },
  status: {
    color: colors.brand.primaryStrong,
    fontSize: typography.label.md.fontSize,
    lineHeight: typography.label.md.lineHeight,
    fontWeight: typography.label.md.fontWeight,
  },
  total: {
    color: colors.text.primary,
    fontSize: typography.heading.md.fontSize,
    lineHeight: typography.heading.md.lineHeight,
    fontWeight: typography.heading.md.fontWeight,
  },
  eta: {
    color: colors.text.secondary,
    fontSize: typography.body.md.fontSize,
    lineHeight: typography.body.md.lineHeight,
  },
});
