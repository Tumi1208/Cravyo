import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "../../theme";

export type CategoryTab = {
  key: string;
  label: string;
};

export type CategoryTabsProps = {
  items: CategoryTab[];
  activeKey: string;
};

export function CategoryTabs({ items, activeKey }: CategoryTabsProps) {
  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isActive = item.key === activeKey;

        return (
          <Pressable key={item.key} accessibilityRole="button" style={[styles.tab, isActive ? styles.activeTab : null]}>
            <Text style={[styles.label, isActive ? styles.activeLabel : null]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  tab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.surface.card,
  },
  activeTab: {
    borderColor: colors.brand.primary,
    backgroundColor: colors.surface.muted,
  },
  label: {
    color: colors.text.secondary,
    fontSize: typography.label.md.fontSize,
    lineHeight: typography.label.md.lineHeight,
    fontWeight: typography.label.md.fontWeight,
  },
  activeLabel: {
    color: colors.brand.primaryStrong,
  },
});
