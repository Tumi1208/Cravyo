import type { OrderListItem, OrderStatusTab, OrdersMockItem } from "./types";

export const orderStatusTabs: OrderStatusTab[] = [
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

export const activeOrders: OrderListItem[] = [
  {
    id: "active-strawberry-shake",
    title: "Strawberry shake",
    timestamp: "29 Nov, 01:20 pm",
    priceLabel: "$20.00",
    quantityLabel: "2 items",
    statusLabel: "Preparing order",
    statusTone: "pending",
    primaryActionLabel: "Cancel Order",
    secondaryActionLabel: "Track Driver",
    image: require("../../../assets/home/best-seller-4.jpg"),
  },
];

export const completedOrders: OrderListItem[] = [
  {
    id: "completed-chicken-curry",
    title: "Chicken Curry",
    timestamp: "29 Nov, 01:20 pm",
    priceLabel: "$50.00",
    quantityLabel: "2 items",
    statusLabel: "Order delivered",
    statusTone: "delivered",
    primaryActionLabel: "Leave a review",
    secondaryActionLabel: "Order Again",
    image: require("../../../assets/home/best-seller-2.jpg"),
  },
  {
    id: "completed-burger",
    title: "Bean and Vegetable Burger",
    timestamp: "10 Nov, 06:05 pm",
    priceLabel: "$50.00",
    quantityLabel: "2 items",
    statusLabel: "Order delivered",
    statusTone: "delivered",
    primaryActionLabel: "Leave a review",
    secondaryActionLabel: "Order Again",
    image: require("../../../assets/home/recommend-1.jpg"),
  },
  {
    id: "completed-coffee-latte",
    title: "Coffee Latte",
    timestamp: "10 Nov, 08:30 am",
    priceLabel: "$8.00",
    quantityLabel: "1 item",
    statusLabel: "Order delivered",
    statusTone: "delivered",
    primaryActionLabel: "Leave a review",
    secondaryActionLabel: "Order Again",
    placeholderIconName: "coffee-outline",
  },
  {
    id: "completed-strawberry-cheesecake",
    title: "Strawberry Cheesecake",
    timestamp: "03 Oct, 03:40 pm",
    priceLabel: "$22.00",
    quantityLabel: "2 items",
    statusLabel: "Order delivered",
    statusTone: "delivered",
    primaryActionLabel: "Leave a review",
    secondaryActionLabel: "Order Again",
    image: require("../../../assets/images/foods/cupcake-1.jpg"),
  },
];

export const cancelledOrders: OrderListItem[] = [
  {
    id: "cancelled-sushi-wave",
    title: "Sushi Wave",
    timestamp: "02 Nov, 04:00 pm",
    priceLabel: "$103.00",
    quantityLabel: "3 items",
    statusLabel: "Order cancelled",
    statusTone: "cancelled",
    image: require("../../../assets/home/best-seller-1.jpg"),
  },
  {
    id: "cancelled-fruit-tea",
    title: "Fruit and Berry Tea",
    timestamp: "12 Oct, 03:15 pm",
    priceLabel: "$15.00",
    quantityLabel: "2 items",
    statusLabel: "Order cancelled",
    statusTone: "cancelled",
    placeholderIconName: "tea-outline",
  },
];

export const ordersMock: OrdersMockItem[] = [...activeOrders, ...completedOrders, ...cancelledOrders].map(
  (order) => ({
    id: order.id,
    label: order.title,
  }),
);
