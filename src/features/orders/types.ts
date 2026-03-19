import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ImageSourcePropType } from "react-native";

export type OrdersIconName = keyof typeof MaterialCommunityIcons.glyphMap;
export type OrderStatusTabKey = "active" | "completed" | "cancelled";
export type OrderStatusTone = "cancelled" | "delivered" | "pending";

export interface OrdersMockItem {
  id: string;
  label: string;
}

export interface OrderStatusTab {
  id: OrderStatusTabKey;
  label: string;
}

export interface OrderListItem {
  id: string;
  image?: ImageSourcePropType;
  placeholderIconName?: OrdersIconName;
  priceLabel: string;
  primaryActionLabel?: string;
  quantityLabel: string;
  secondaryActionLabel?: string;
  statusLabel: string;
  statusTone: OrderStatusTone;
  title: string;
  timestamp: string;
}
