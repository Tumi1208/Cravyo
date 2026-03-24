import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

import { CravyoSheetScreen } from "../../components/layout/CravyoSheetScreen";
import { CravyoPillTabs } from "../../components/ui/CravyoPillTabs";
import {
  activeOrders,
  cancelledOrders,
  completedOrders,
  orderStatusTabs,
} from "./mock";
import type { OrderListItem, OrderStatusTabKey } from "./types";

const orderGroups: Record<OrderStatusTabKey, OrderListItem[]> = {
  active: activeOrders,
  completed: completedOrders,
  cancelled: cancelledOrders,
};

export function MyOrdersScreen() {
  const [activeTab, setActiveTab] = useState<OrderStatusTabKey>("active");
  const orders = orderGroups[activeTab];
  const handleOrderAction = (order: OrderListItem, actionLabel: string) => {
    Alert.alert(actionLabel, `${actionLabel} for ${order.title} is not wired to live data yet.`);
  };

  return (
    <CravyoSheetScreen activeNavKey="orders" backHref="/(tabs)" title="My Orders">
      <CravyoPillTabs
        activeKey={activeTab}
        items={orderStatusTabs.map((tab) => ({ key: tab.id, label: tab.label }))}
        onChange={(key) => setActiveTab(key as OrderStatusTabKey)}
        size="small"
        style={styles.tabs}
      />

      <View style={styles.list}>
        {orders.map((order, index) => (
          <View
            key={order.id}
            style={[styles.orderRow, index < orders.length - 1 ? styles.rowDivider : null]}
          >
            <OrderArtwork order={order} />

            <View style={styles.orderMain}>
              <Text style={styles.orderTitle}>{order.title}</Text>
              <Text style={styles.orderTimestamp}>{order.timestamp}</Text>
              <OrderStatusText order={order} />

              {order.primaryActionLabel || order.secondaryActionLabel ? (
                <View style={styles.actionRow}>
                  {order.primaryActionLabel ? (
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => handleOrderAction(order, order.primaryActionLabel!)}
                      style={styles.primaryAction}
                    >
                      <Text style={styles.primaryActionLabel}>{order.primaryActionLabel}</Text>
                    </Pressable>
                  ) : null}

                  {order.secondaryActionLabel ? (
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => handleOrderAction(order, order.secondaryActionLabel!)}
                    >
                      <Text style={styles.secondaryActionLabel}>
                        {order.secondaryActionLabel}
                      </Text>
                    </Pressable>
                  ) : null}
                </View>
              ) : null}
            </View>

            <View style={styles.orderMeta}>
              <Text style={styles.priceLabel}>{order.priceLabel}</Text>
              <Text style={styles.quantityLabel}>{order.quantityLabel}</Text>
            </View>
          </View>
        ))}
      </View>
    </CravyoSheetScreen>
  );
}

function OrderArtwork({ order }: { order: OrderListItem }) {
  if (order.image) {
    return <Image resizeMode="cover" source={order.image} style={styles.orderImage} />;
  }

  return (
    <View style={[styles.orderImage, styles.orderPlaceholder]}>
      {/*
        TODO: Replace the generic artwork placeholder with the matching exported
        product art once the full profile/order asset pack is available.
      */}
      <MaterialCommunityIcons
        color="#E07A3A"
        name={order.placeholderIconName ?? "silverware-fork-knife"}
        size={26}
      />
    </View>
  );
}

function OrderStatusText({ order }: { order: OrderListItem }) {
  const statusColor =
    order.statusTone === "delivered"
      ? "#E7B17F"
      : order.statusTone === "cancelled"
        ? "#E0A090"
        : "#D8A06E";
  const iconName =
    order.statusTone === "delivered"
      ? "clock-check-outline"
      : order.statusTone === "cancelled"
        ? "close-circle-outline"
        : "progress-clock";

  return (
    <View style={styles.statusRow}>
      <MaterialCommunityIcons color={statusColor} name={iconName} size={13} />
      <Text style={[styles.statusLabel, { color: statusColor }]}>{order.statusLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    width: "100%",
    marginBottom: 18,
  },
  list: {
    marginTop: 2,
  },
  orderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    paddingVertical: 18,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3E3D6",
  },
  orderImage: {
    width: 62,
    height: 62,
    borderRadius: 18,
  },
  orderPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF2E4",
  },
  orderMain: {
    flex: 1,
    paddingTop: 2,
  },
  orderTitle: {
    color: "#2D2422",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
  },
  orderTimestamp: {
    marginTop: 4,
    color: "#86736A",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
  },
  statusRow: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statusLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
  },
  actionRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  primaryAction: {
    borderRadius: 999,
    backgroundColor: "#F3B477",
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  primaryActionLabel: {
    color: "#FFFFFF",
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "700",
  },
  secondaryActionLabel: {
    color: "#D7A16E",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
  },
  orderMeta: {
    alignItems: "flex-end",
    paddingTop: 3,
  },
  priceLabel: {
    color: "#E1A067",
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "700",
  },
  quantityLabel: {
    marginTop: 18,
    color: "#7C6B63",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "500",
  },
});
