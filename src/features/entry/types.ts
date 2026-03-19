import type { Href } from "expo-router";
import type { ImageSourcePropType, TextInputProps } from "react-native";

export interface LaunchActionConfig {
  label: string;
  href: Href;
  backgroundColor: string;
  textColor: string;
}

export interface LaunchScreenConfig {
  backgroundColor: string;
  brandSource: ImageSourcePropType;
  tagline?: string;
  actions?: LaunchActionConfig[];
}

export interface OnboardingSlide {
  id: string;
  imageSource: ImageSourcePropType;
  iconName: string;
  title: string;
  description: string;
  buttonLabel: string;
  showSkip?: boolean;
}

export type EntryFieldType = "text" | "password";

export interface EntryFieldConfig {
  id: string;
  label: string;
  type: EntryFieldType;
  placeholder: string;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  autoComplete?: TextInputProps["autoComplete"];
}
