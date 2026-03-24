import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { Href } from "expo-router";

export type ProfileIconName = keyof typeof MaterialCommunityIcons.glyphMap;

export interface ProfileMockItem {
  id: string;
  label: string;
}

export interface ProfileUser {
  email: string;
  fullName: string;
}

export interface ProfileMenuItem {
  href: Href;
  iconName: ProfileIconName;
  id: string;
  label: string;
}

export interface ProfileField {
  id: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
  label: string;
  value: string;
}

export type ProfileFormValues = Record<string, string>;
export type NotificationSettingValues = Record<string, boolean>;
export type ProfileImageKey = "default" | "pizza" | "burger";

export interface DeliveryAddress {
  iconName: ProfileIconName;
  id: string;
  isSelected: boolean;
  label: string;
  line: string;
}

export interface PaymentMethod {
  iconName: ProfileIconName;
  id: string;
  isSelected: boolean;
  label: string;
}

export interface SettingsItem {
  href?: Href;
  iconName: ProfileIconName;
  id: string;
  label: string;
}

export interface NotificationSetting {
  enabled: boolean;
  id: string;
  label: string;
}

export interface StoredPaymentMethods {
  methods: PaymentMethod[];
  selectedId: string;
}

export interface StoredProfileDetails {
  fields: ProfileFormValues;
  imageKey: ProfileImageKey;
}

export interface ProfileStorageState {
  notifications: NotificationSettingValues;
  paymentMethods: StoredPaymentMethods;
  profile: StoredProfileDetails;
}
