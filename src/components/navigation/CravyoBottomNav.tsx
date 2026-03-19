import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { Href } from "expo-router";

import { HomeBottomNav } from "../../features/home/components/HomeBottomNav";

export type CravyoBottomNavKey =
  | ""
  | "home"
  | "menu"
  | "favorites"
  | "orders"
  | "support";

export type CravyoBottomNavItem = {
  href: Href;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  key: Exclude<CravyoBottomNavKey, "">;
};

export const CRAVYO_BOTTOM_NAV_ITEMS: readonly CravyoBottomNavItem[] = [
  { key: "home", iconName: "home-outline", href: "/(tabs)" },
  { key: "menu", iconName: "silverware-fork-knife", href: "/(tabs)/menu" },
  { key: "favorites", iconName: "heart-outline", href: "/(tabs)/favorites" },
  { key: "orders", iconName: "clipboard-text-outline", href: "/orders" },
  { key: "support", iconName: "headset", href: "/support" },
] as const;

type CravyoBottomNavProps = {
  activeKey: CravyoBottomNavKey;
  onNavigate: (href: Href) => void;
};

export function CravyoBottomNav({ activeKey, onNavigate }: CravyoBottomNavProps) {
  return (
    <HomeBottomNav
      activeKey={activeKey}
      items={CRAVYO_BOTTOM_NAV_ITEMS}
      onNavigate={onNavigate}
    />
  );
}
