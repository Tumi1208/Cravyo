import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import { AUTH_BOTTOM_NAV_ITEMS, AUTH_COLORS, AUTH_LAYOUT } from "../constants";

function getIconName(item: (typeof AUTH_BOTTOM_NAV_ITEMS)[number]) {
  switch (item) {
    case "home":
      return "home-outline";
    case "menu":
      return "food-outline";
    case "favorites":
      return "heart-outline";
    case "orders":
      return "clipboard-list-outline";
    case "support":
      return "headset";
  }
}

export function AuthBottomNav() {
  return (
    <View style={styles.container}>
      {AUTH_BOTTOM_NAV_ITEMS.map((item) => (
        <View key={item} style={styles.iconSlot}>
          {/*
            TODO: Replace these placeholder vector icons with exported design icons
            once the final asset pack is available.
          */}
          <MaterialCommunityIcons
            color={AUTH_COLORS.bottomNavIcon}
            name={getIconName(item)}
            size={23}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 8,
    bottom: 8,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    height: AUTH_LAYOUT.bottomNavHeight - 12,
    borderRadius: 24,
    backgroundColor: AUTH_COLORS.hero,
  },
  iconSlot: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
});
