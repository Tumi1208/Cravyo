import { entryColors, entryLayout } from "../entry/constants";

export const AUTH_COLORS = {
  hero: entryColors.brandOrange,
  bottomNavIcon: entryColors.textInverse,
} as const;

export const AUTH_LAYOUT = {
  headerHeight: entryLayout.authHeaderHeight,
  bottomNavHeight: entryLayout.authBottomNavHeight,
  horizontalPadding: entryLayout.horizontalPadding,
  panelRadius: entryLayout.panelRadius,
  framedButtonWidth: entryLayout.framedButtonWidth,
} as const;

export const AUTH_BOTTOM_NAV_ITEMS = [
  "home",
  "menu",
  "favorites",
  "orders",
  "support",
] as const;
