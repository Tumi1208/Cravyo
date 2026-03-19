import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { Href } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type HomeBottomNavItem = {
  href: Href;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  key: string;
};

type HomeBottomNavProps = {
  activeKey: string;
  items: readonly HomeBottomNavItem[];
  onNavigate: (href: Href) => void;
};

export function HomeBottomNav({
  activeKey,
  items,
  onNavigate,
}: HomeBottomNavProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      {items.map((item) => {
        const isActive = item.key === activeKey;

        return (
          <Pressable
            key={item.key}
            accessibilityLabel={item.key}
            accessibilityRole="button"
            onPress={() => onNavigate(item.href)}
            style={styles.item}
          >
            <MaterialCommunityIcons
              color={isActive ? "#FFFFFF" : "rgba(255,255,255,0.9)"}
              name={item.iconName}
              size={22}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: "#F6B678",
    paddingTop: 14,
    paddingHorizontal: 18,
    shadowColor: "#D0823E",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  item: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
  },
});
