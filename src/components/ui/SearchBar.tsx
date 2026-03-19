import { StyleSheet, Text, TextInput, View, type TextInputProps } from "react-native";

import { colors, radius, spacing, typography } from "../../theme";

export type SearchBarProps = TextInputProps & {
  label?: string;
};

export function SearchBar({ label, placeholder = "Search restaurants or dishes", ...props }: SearchBarProps) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.inputShell}>
        <Text style={styles.icon}>Search</Text>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.text.muted}
          style={styles.input}
          {...props}
        />
      </View>
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
  inputShell: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: radius.pill,
    backgroundColor: colors.surface.card,
    paddingHorizontal: spacing.md,
  },
  icon: {
    color: colors.text.muted,
    fontSize: typography.body.md.fontSize,
    lineHeight: typography.body.md.lineHeight,
    fontWeight: "600",
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    color: colors.text.primary,
    fontSize: typography.body.lg.fontSize,
    lineHeight: typography.body.lg.lineHeight,
  },
});
