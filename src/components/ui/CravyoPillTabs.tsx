import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";

type CravyoPillTabItem = {
  key: string;
  label: string;
};

type CravyoPillTabsProps = {
  activeKey: string;
  fill?: boolean;
  items: readonly CravyoPillTabItem[];
  onChange: (key: string) => void;
  size?: "regular" | "small";
  style?: StyleProp<ViewStyle>;
};

export function CravyoPillTabs({
  activeKey,
  fill = true,
  items,
  onChange,
  size = "regular",
  style,
}: CravyoPillTabsProps) {
  const isCompact = size === "small";

  return (
    <View style={[styles.container, style]}>
      {items.map((item) => {
        const isActive = item.key === activeKey;

        return (
          <Pressable
            accessibilityRole="button"
            key={item.key}
            onPress={() => onChange(item.key)}
            style={[
              styles.item,
              fill ? styles.fillItem : null,
              isCompact ? styles.compactItem : null,
              isActive ? styles.activeItem : null,
            ]}
          >
            <Text
              style={[
                styles.label,
                isCompact ? styles.compactLabel : null,
                isActive ? styles.activeLabel : null,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 32,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: "rgba(242, 183, 126, 0.12)",
  },
  fillItem: {
    flex: 1,
  },
  compactItem: {
    minHeight: 28,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  activeItem: {
    backgroundColor: "#F3B477",
  },
  label: {
    color: "#D8A06E",
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "500",
  },
  compactLabel: {
    fontSize: 13,
    lineHeight: 16,
  },
  activeLabel: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
