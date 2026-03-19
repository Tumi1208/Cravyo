import type {
  ContactMethod,
  FaqEntry,
  HelpOption,
  SupportChoice,
  SupportCurrentOrder,
  SupportMockItem,
} from "./types";

export const helpOptions: HelpOption[] = [
  {
    id: "help-with-order",
    label: "Help with the order",
    description: "Check order history, live status, and common order actions.",
    iconName: "truck-delivery-outline",
    href: "/orders",
  },
  {
    id: "support",
    label: "Support",
    description: "Open the quick support assistant for common delivery issues.",
    iconName: "message-text-outline",
    href: "/support/support",
  },
  {
    id: "help-center",
    label: "Help Center",
    description: "Browse FAQs and support topics by category.",
    iconName: "chat-question-outline",
    href: "/support/help-center",
  },
  {
    id: "general-information",
    label: "General Information",
    description: "Find account, address, payment, and service guidance.",
    iconName: "information-outline",
    href: "/support/help-faqs",
  },
] satisfies HelpOption[];

export const generalFaqs: FaqEntry[] = [
  {
    id: "place-order",
    question: "How do I place an order?",
    answer:
      "Browse your favorite meals, add items to your cart, and complete your order in just a few simple steps.",
  },
  {
    id: "track-order",
    question: "How can I track my order?",
    answer:
      "Open My Orders, select your active order, and use the tracking screen to check the latest delivery status in real time.",
  },
  {
    id: "payment-methods",
    question: "What payment methods are available?",
    answer:
      "You can pay using saved cards and other payment methods shown in the Payment Methods section of the app.",
  },
  {
    id: "cancel-order",
    question: "How do I cancel an order?",
    answer:
      "Open My Orders, choose the active order, tap Cancel Order, and select a reason before submitting your request.",
  },
  {
    id: "delivery-address",
    question: "Can I update my delivery address?",
    answer:
      "You can manage saved addresses from Delivery Address. For active orders, address changes depend on the current order status.",
  },
  {
    id: "contact-support",
    question: "How do I contact support?",
    answer:
      "Go to Contact Us or Support to reach us through customer service, website, WhatsApp, Facebook, or Instagram.",
  },
] satisfies FaqEntry[];

export const accountFaqs: FaqEntry[] = [
  {
    id: "update-profile",
    question: "How do I update my profile information?",
    answer:
      "Open My Profile to review your saved personal details and update your name, email, phone number, or birth date.",
  },
  {
    id: "change-password",
    question: "How do I change my password?",
    answer:
      "Go to Settings, open Password Setting, and enter your current password together with your new password to save the change.",
  },
  {
    id: "notification-settings",
    question: "How do I manage notifications?",
    answer:
      "Open Settings and choose Notification Setting to turn alerts on or off for sound, payments, cashback, and promotions.",
  },
] satisfies FaqEntry[];

export const serviceFaqs: FaqEntry[] = [
  {
    id: "saved-addresses",
    question: "Where can I see my saved addresses?",
    answer:
      "Open Delivery Address to review, choose, and update the locations you use for home, office, or family deliveries.",
  },
  {
    id: "saved-payments",
    question: "How do I manage payment methods?",
    answer:
      "Open Payment Methods to select a preferred payment option and review the saved cards or digital wallets on your account.",
  },
  {
    id: "contact-channels",
    question: "Where can I find support contact channels?",
    answer:
      "Go to Contact Us to view customer service, website, WhatsApp, Facebook, and Instagram contact options in one place.",
  },
] satisfies FaqEntry[];

export const contactMethods: ContactMethod[] = [
  {
    id: "customer-service",
    label: "Customer Service",
    detail: "Reach our customer service team any time for urgent order and account support.",
    iconName: "headset",
  },
  {
    id: "website",
    label: "Website",
    detail: "Visit our website for updates, service details, and support resources.",
    iconName: "web",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    detail: "Message us on WhatsApp for fast help with active delivery questions.",
    iconName: "whatsapp",
  },
  {
    id: "facebook",
    label: "Facebook",
    detail: "Contact us on Facebook for announcements and general assistance.",
    iconName: "facebook",
  },
  {
    id: "instagram",
    label: "Instagram",
    detail: "Send us a message on Instagram for quick social support.",
    iconName: "instagram",
  },
] satisfies ContactMethod[];

export const supportChoices: SupportChoice[] = [
  { id: "1", label: "1. Order Management" },
  { id: "2", label: "2. Payments Management" },
  { id: "3", label: "3. Account Management and Profile" },
  { id: "4", label: "4. Order Tracking" },
  { id: "5", label: "5. Safety" },
] satisfies SupportChoice[];

export const supportCurrentOrder: SupportCurrentOrder = {
  title: "Strawberry Shake and Broccoli Lasagna",
  orderNumber: "Order No. 0054752",
  placedAt: "29 Nov, 01:20 pm",
  issueLabel: "Order issue: Order not received",
};

export const supportMock: SupportMockItem[] = [
  ...helpOptions.map((option) => ({ id: option.id, label: option.label })),
  ...generalFaqs.map((faq) => ({ id: faq.id, label: faq.question })),
];
