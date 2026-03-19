import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { Href } from "expo-router";

export type SupportIconName = keyof typeof MaterialCommunityIcons.glyphMap;
export type SupportTopTabKey = "contact-us" | "faq";
export type HelpCategoryKey = "account" | "general" | "services";

export interface SupportMockItem {
  id: string;
  label: string;
}

export interface HelpOption {
  description: string;
  href: Href;
  iconName: SupportIconName;
  id: string;
  label: string;
}

export interface FaqEntry {
  answer: string;
  id: string;
  question: string;
}

export interface ContactMethod {
  detail: string;
  iconName: SupportIconName;
  id: string;
  label: string;
}

export interface SupportChoice {
  id: string;
  label: string;
}

export interface SupportCurrentOrder {
  issueLabel: string;
  orderNumber: string;
  placedAt: string;
  title: string;
}
