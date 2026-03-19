import { StyleSheet, Text, TextInput, View, type TextInputProps } from "react-native";

import { colors, radius, spacing, typography } from "../../theme";

export type TextInputFieldProps = TextInputProps & {
  label?: string;
  error?: string;
};

export function TextInputField({
  label,
  error,
  placeholder = "Type here",
  ...props
}: TextInputFieldProps) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput placeholder={placeholder} placeholderTextColor={colors.text.muted} style={styles.input} {...props} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  label: {
    color: colors.text.primary,
    fontSize: typography.label.md.fontSize,
    lineHeight: typography.label.md.lineHeight,
    fontWeight: typography.label.md.fontWeight,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: radius.lg,
    backgroundColor: colors.surface.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.text.primary,
    fontSize: typography.body.lg.fontSize,
    lineHeight: typography.body.lg.lineHeight,
  },
  error: {
    color: colors.state.error,
    fontSize: typography.body.sm.fontSize,
    lineHeight: typography.body.sm.lineHeight,
  },
});
