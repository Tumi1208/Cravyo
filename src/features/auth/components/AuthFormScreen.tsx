import { useRouter } from "expo-router";
import { useState } from "react";
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
import { useMockAuth } from "../context/MockAuthContext";
import type { AuthFieldConfig, AuthScreenConfig } from "../types";
import {
  validateAuthForm,
  type AuthFieldErrors,
  type AuthFieldValues,
} from "../validation";
import { AuthBottomNav } from "./AuthBottomNav";

type AuthFormScreenProps = {
  screen: AuthScreenConfig;
};

function createInitialValues(fields: AuthFieldConfig[]) {
  return fields.reduce<AuthFieldValues>((currentValues, field) => {
    currentValues[field.id] = "";
    return currentValues;
  }, {});
}

function hasValidationErrors(errors: AuthFieldErrors) {
  return Object.keys(errors).length > 0;
}

export function AuthFormScreen({ screen }: AuthFormScreenProps) {
  const router = useRouter();
  const { clearSignUpDraft, saveSignUpDraft, signIn, signUpDraft } = useMockAuth();
  const [fieldValues, setFieldValues] = useState(() => createInitialValues(screen.fields));
  const [fieldErrors, setFieldErrors] = useState<AuthFieldErrors>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const updateFieldValue = (fieldId: string, nextValue: string) => {
    const nextValues = {
      ...fieldValues,
      [fieldId]: nextValue,
    };

    setFieldValues(nextValues);

    if (hasSubmitted || touchedFields[fieldId]) {
      setFieldErrors(validateAuthForm(screen.formId, nextValues));
    }
  };

  const handleFieldBlur = (fieldId: string) => {
    setTouchedFields((currentTouchedFields) => ({
      ...currentTouchedFields,
      [fieldId]: true,
    }));
    setFieldErrors(validateAuthForm(screen.formId, fieldValues));
  };

  const handleSubmit = () => {
    const nextErrors = validateAuthForm(screen.formId, fieldValues);

    setHasSubmitted(true);
    setFieldErrors(nextErrors);

    if (hasValidationErrors(nextErrors)) {
      return;
    }

    if (screen.formId === "sign-up") {
      saveSignUpDraft(fieldValues);

      if (screen.primaryAction.href) {
        router.push(screen.primaryAction.href);
      }

      return;
    }

    const identifier =
      screen.formId === "set-password"
        ? signUpDraft?.email || signUpDraft?.mobileNumber || "mock-user@cravyo.dev"
        : fieldValues.email?.trim() || "mock-user@cravyo.dev";
    const fullName = signUpDraft?.fullName;

    signIn({
      identifier,
      fullName,
    });

    clearSignUpDraft();

    if (screen.primaryAction.href) {
      router.replace(screen.primaryAction.href);
    }
  };

  const renderField = (field: AuthFieldConfig) => {
    const shouldShowError = hasSubmitted || touchedFields[field.id];
    const errorMessage = shouldShowError ? fieldErrors[field.id] : undefined;
    const fieldKey = field.id;
    const sharedProps = {
      autoCapitalize: field.autoCapitalize,
      autoComplete: field.autoComplete,
      label: field.label,
      onBlur: () => handleFieldBlur(field.id),
      onChangeText: (nextValue: string) => updateFieldValue(field.id, nextValue),
      placeholder: field.placeholder,
      value: fieldValues[field.id],
      errorMessage,
      isInvalid: Boolean(errorMessage),
    };

    if (field.type === "password") {
      return <EntryPasswordInput key={fieldKey} {...sharedProps} />;
    }

    return (
      <EntryTextInput
        key={fieldKey}
        keyboardType={field.keyboardType}
        {...sharedProps}
      />
    );
  };

  return (
    <ReferenceScreenShell backgroundColor={entryColors.brandOrange}>
      <View style={styles.root}>
        <AuthHeader backHref={screen.backHref ?? "/launch-2"} title={screen.title} />

        <RoundedContentPanel style={styles.panel} topOnly>
          <ScrollView
            bounces={false}
            contentContainerStyle={[
              styles.panelContent,
              {
                paddingTop: screen.contentTopSpacing ?? 28,
                paddingBottom: screen.footerLink ? 72 : 44,
              },
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
                label={screen.primaryAction.label}
                onPress={handleSubmit}
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
