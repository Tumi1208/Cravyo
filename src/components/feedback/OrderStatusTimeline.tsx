import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "../../theme";

export type TimelineStep = {
  label: string;
  caption?: string;
};

export type OrderStatusTimelineProps = {
  steps: TimelineStep[];
  activeIndex: number;
};

export function OrderStatusTimeline({ steps, activeIndex }: OrderStatusTimelineProps) {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isActive = index <= activeIndex;

        return (
          <View key={step.label} style={styles.step}>
            <View style={[styles.marker, isActive ? styles.activeMarker : null]} />
            <View style={styles.copy}>
              <Text style={[styles.label, isActive ? styles.activeLabel : null]}>{step.label}</Text>
              {step.caption ? <Text style={styles.caption}>{step.caption}</Text> : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  step: {
    flexDirection: "row",
    gap: spacing.md,
  },
  marker: {
    width: 12,
    height: 12,
    marginTop: 4,
    borderRadius: 999,
    backgroundColor: colors.border.strong,
  },
  activeMarker: {
    backgroundColor: colors.brand.primary,
  },
  copy: {
    flex: 1,
    gap: spacing.xxs,
  },
  label: {
    color: colors.text.primary,
    fontSize: typography.label.md.fontSize,
    lineHeight: typography.label.md.lineHeight,
    fontWeight: typography.label.md.fontWeight,
  },
  activeLabel: {
    color: colors.brand.primaryStrong,
  },
  caption: {
    color: colors.text.secondary,
    fontSize: typography.body.sm.fontSize,
    lineHeight: typography.body.sm.lineHeight,
  },
});
