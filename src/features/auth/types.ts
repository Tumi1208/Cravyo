import type { Href } from "expo-router";
import type {
  TextInputProps,
} from "react-native";

export type AuthFieldType = "text" | "password";

export interface AuthFieldConfig {
  id: string;
  label: string;
  type: AuthFieldType;
  placeholder: string;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  autoComplete?: TextInputProps["autoComplete"];
}

export interface AuthLinkActionConfig {
  label: string;
  href: Href;
}

export interface AuthPrimaryActionConfig {
  label: string;
  href?: Href;
  framed?: boolean;
}

export interface AuthDisclaimerConfig {
  lineOne: string;
  lineTwo: string;
}

export interface AuthSocialConfig {
  label: string;
}

export interface AuthFooterLinkConfig {
  prompt: string;
  actionLabel: string;
  href: Href;
}

export interface AuthIntroConfig {
  title?: string;
  description?: string;
}

export interface AuthScreenConfig {
  title: string;
  backHref?: Href;
  intro?: AuthIntroConfig;
  fields: AuthFieldConfig[];
  forgotPassword?: AuthLinkActionConfig;
  disclaimer?: AuthDisclaimerConfig;
  primaryAction: AuthPrimaryActionConfig;
  social?: AuthSocialConfig;
  footerLink?: AuthFooterLinkConfig;
  contentTopSpacing?: number;
  primaryTopSpacing?: number;
}
