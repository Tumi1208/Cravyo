import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "../../theme";

export type BottomTabBarItem = {
  key: string;
  label: string;
};

export type BottomTabBarProps = {
  items: BottomTabBarItem[];
  activeKey: string;
};

export function BottomTabBar({ items, activeKey }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isActive = item.key === activeKey;

        return (
          <Pressable key={item.key} accessibilityRole="button" style={[styles.item, isActive ? styles.activeItem : null]}>
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
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: radius.xl,
    backgroundColor: colors.surface.card,
  },
  item: {
    flex: 1,
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
  },
  activeItem: {
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
