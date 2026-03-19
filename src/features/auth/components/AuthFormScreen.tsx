import { useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { ReferenceScreenShell } from "../../../components/layout/ReferenceScreenShell";
import { typography } from "../../../theme";
import { entryColors, entryLayout } from "../../entry/constants";
import { AuthHeader } from "../../entry/components/AuthHeader";
import { EntryPasswordInput } from "../../entry/components/EntryPasswordInput";
import { EntryTextInput } from "../../entry/components/EntryTextInput";
import { HelperFooterText } from "../../entry/components/HelperFooterText";
import { PrimaryCtaButton } from "../../entry/components/PrimaryCtaButton";
import { RoundedContentPanel } from "../../entry/components/RoundedContentPanel";
import { SocialAuthRow } from "../../entry/components/SocialAuthRow";
import type { AuthFieldConfig, AuthScreenConfig } from "../types";
import { AuthBottomNav } from "./AuthBottomNav";

type AuthFormScreenProps = {
  screen: AuthScreenConfig;
};

function renderField(field: AuthFieldConfig) {
  if (field.type === "password") {
    return (
      <EntryPasswordInput
        autoCapitalize={field.autoCapitalize}
        autoComplete={field.autoComplete}
        key={field.id}
        label={field.label}
        placeholder={field.placeholder}
      />
    );
  }

  return (
    <EntryTextInput
      autoCapitalize={field.autoCapitalize}
      autoComplete={field.autoComplete}
      keyboardType={field.keyboardType}
      key={field.id}
      label={field.label}
      placeholder={field.placeholder}
    />
  );
}

export function AuthFormScreen({ screen }: AuthFormScreenProps) {
  const router = useRouter();

  return (
    <ReferenceScreenShell backgroundColor={entryColors.brandOrange}>
      <View style={styles.root}>
        <AuthHeader backHref={screen.backHref ?? "/launch-2"} title={screen.title} />

        <RoundedContentPanel style={styles.panel} topOnly>
          <ScrollView
            bounces={false}
            contentContainerStyle={[
              styles.panelContent,
              { paddingTop: screen.contentTopSpacing ?? 28 },
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {screen.intro?.title ? (
              <Text style={styles.introTitle}>{screen.intro.title}</Text>
            ) : null}
            {screen.intro?.description ? (
              <Text
                style={[
                  styles.introDescription,
                  screen.intro.title ? styles.introDescriptionWithTitle : null,
                ]}
              >
                {screen.intro.description}
              </Text>
            ) : null}

            <View style={styles.fieldStack}>{screen.fields.map(renderField)}</View>

            {screen.forgotPassword ? (
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push(screen.forgotPassword?.href ?? "/(auth)")}
                style={styles.inlineLinkButton}
              >
                <Text style={styles.inlineLink}>{screen.forgotPassword.label}</Text>
              </Pressable>
            ) : null}

            {screen.disclaimer ? (
              <View style={styles.disclaimerBlock}>
                <Text style={styles.disclaimerLine}>{screen.disclaimer.lineOne}</Text>
                <Text style={styles.disclaimerAccent}>{screen.disclaimer.lineTwo}</Text>
              </View>
            ) : null}

            <View style={{ marginTop: screen.primaryTopSpacing ?? 24 }}>
              <PrimaryCtaButton
                backgroundColor={entryColors.brandOrange}
                frameColor={entryColors.brandOrangeFrame}
                framed={screen.primaryAction.framed}
                label={screen.primaryAction.label}
                onPress={() => {
                  if (screen.primaryAction.href) {
                    router.push(screen.primaryAction.href);
                  }
                }}
                width={screen.primaryAction.framed ? entryLayout.framedButtonWidth : 192}
              />
            </View>

            {screen.social ? <SocialAuthRow label={screen.social.label} /> : null}

            {screen.footerLink ? (
              <HelperFooterText
                actionLabel={screen.footerLink.actionLabel}
                onPress={() => router.push(screen.footerLink?.href ?? "/(auth)")}
                prompt={screen.footerLink.prompt}
              />
            ) : null}
          </ScrollView>
        </RoundedContentPanel>

        <AuthBottomNav />
      </View>
    </ReferenceScreenShell>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: entryColors.brandOrange,
  },
  panel: {
    position: "absolute",
    top: entryLayout.authHeaderContentHeight,
    right: 0,
    bottom: entryLayout.authBottomNavHeight - 4,
    left: 0,
  },
  panelContent: {
    paddingHorizontal: entryLayout.horizontalPadding,
    paddingBottom: 44,
  },
  introTitle: {
    color: entryColors.textPrimary,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
  },
  introDescription: {
    color: entryColors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    fontFamily: typography.fontFamily.regular,
  },
  introDescriptionWithTitle: {
    marginTop: 10,
  },
  fieldStack: {
    marginTop: 30,
    gap: 16,
  },
  inlineLinkButton: {
    alignSelf: "flex-end",
    marginTop: 14,
  },
  inlineLink: {
    color: entryColors.brandOrangeStrong,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    fontFamily: typography.fontFamily.medium,
  },
  disclaimerBlock: {
    marginTop: 18,
    alignItems: "center",
  },
  disclaimerLine: {
    color: entryColors.textSecondary,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "400",
    fontFamily: typography.fontFamily.regular,
  },
  disclaimerAccent: {
    color: entryColors.brandOrangeStrong,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "500",
    fontFamily: typography.fontFamily.medium,
  },
});
