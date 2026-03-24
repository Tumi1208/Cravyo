import type {
  DeliveryAddress,
  NotificationSetting,
  PaymentMethod,
  ProfileField,
  ProfileMenuItem,
  ProfileMockItem,
  ProfileUser,
  SettingsItem,
} from "./types";

export const profileUser: ProfileUser = {
  fullName: "John Smith",
  email: "johnsmith@example.com",
};

export const profileMenuItems: ProfileMenuItem[] = [
  {
    id: "my-orders",
    label: "My Orders",
    iconName: "clipboard-text-outline",
    href: "/orders",
  },
  {
    id: "my-profile",
    label: "My Profile",
    iconName: "account-circle-outline",
    href: "/profile/my-profile",
  },
  {
    id: "delivery-address",
    label: "Delivery Address",
    iconName: "map-marker-outline",
    href: "/profile/delivery-address",
  },
  {
    id: "payment-methods",
    label: "Payment Methods",
    iconName: "credit-card-outline",
    href: "/profile/payment-methods",
  },
  {
    id: "contact-us",
    label: "Contact Us",
    iconName: "headset",
    href: "/support/contact-us",
  },
  {
    id: "help-faqs",
    label: "Help & FAQs",
    iconName: "chat-question-outline",
    href: "/support/help-faqs",
  },
  {
    id: "settings",
    label: "Settings",
    iconName: "cog-outline",
    href: "/profile/settings",
  },
] satisfies ProfileMenuItem[];

export const profileFields: ProfileField[] = [
  { id: "full-name", label: "Full Name", value: "John Smith" },
  { id: "date-of-birth", label: "Date of Birth", value: "09 / 10 / 1991" },
  {
    id: "email",
    label: "Email",
    value: "johnsmith@example.com",
    keyboardType: "email-address",
  },
  {
    id: "phone-number",
    label: "Phone Number",
    value: "+123 567 89000",
    keyboardType: "phone-pad",
  },
] satisfies ProfileField[];

export const deliveryAddresses: DeliveryAddress[] = [
  {
    id: "home",
    label: "My home",
    line: "778 Locust View Drive Oakland, CA",
    iconName: "home-city-outline",
    isSelected: true,
  },
  {
    id: "office",
    label: "My Office",
    line: "778 Locust View Drive Oakland, CA",
    iconName: "office-building-outline",
    isSelected: false,
  },
  {
    id: "parents-house",
    label: "Parent's House",
    line: "778 Locust View Drive Oakland, CA",
    iconName: "home-heart",
    isSelected: false,
  },
] satisfies DeliveryAddress[];

export const paymentMethods: PaymentMethod[] = [
  {
    id: "saved-card",
    label: "*** *** *** 43",
    iconName: "credit-card-outline",
    isSelected: true,
  },
  {
    id: "apple-pay",
    label: "Apple Pay",
    iconName: "apple",
    isSelected: false,
  },
  {
    id: "paypal",
    label: "PayPal",
    iconName: "alpha-p-circle-outline",
    isSelected: false,
  },
  {
    id: "google-play",
    label: "Google Pay",
    iconName: "google-play",
    isSelected: false,
  },
] satisfies PaymentMethod[];

export const settingsItems: SettingsItem[] = [
  {
    id: "notification-setting",
    label: "Notification Setting",
    iconName: "bell-outline",
    href: "/profile/notification-setting",
  },
  {
    id: "password-setting",
    label: "Password Setting",
    iconName: "key-variant",
    href: "/profile/password-setting",
  },
  {
    id: "delete-account",
    label: "Delete Account",
    iconName: "account-remove-outline",
  },
] satisfies SettingsItem[];

export const notificationSettings: NotificationSetting[] = [
  { id: "general", label: "General Notification", enabled: true },
  { id: "sound", label: "Sound", enabled: true },
  { id: "sound-call", label: "Sound Call", enabled: true },
  { id: "vibrate", label: "Vibrate", enabled: false },
  { id: "special-offers", label: "Special Offers", enabled: false },
  { id: "payments", label: "Payments", enabled: false },
  { id: "promo-discount", label: "Promo and discount", enabled: false },
  { id: "cashback", label: "Cashback", enabled: false },
] satisfies NotificationSetting[];

export const profileMock: ProfileMockItem[] = profileMenuItems.map((item) => ({
  id: item.id,
  label: item.label,
}));
