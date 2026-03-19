import { StyleSheet, Text, TextInput, View } from "react-native";

import { colors, radius, spacing, typography } from "../../theme";

export type ReviewFormProps = {
  prompt?: string;
};

export function ReviewForm({ prompt = "Share your delivery experience" }: ReviewFormProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{prompt}</Text>
      <TextInput
        multiline
        placeholder="Write a short review"
        placeholderTextColor={colors.text.muted}
        style={styles.input}
      />
      <Text style={styles.helper}>Hook this up to React Hook Form and Zod during implementation.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.surface.card,
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.heading.md.fontSize,
    lineHeight: typography.heading.md.lineHeight,
    fontWeight: typography.heading.md.fontWeight,
  },
  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: radius.lg,
    padding: spacing.md,
    textAlignVertical: "top",
    color: colors.text.primary,
    fontSize: typography.body.lg.fontSize,
    lineHeight: typography.body.lg.lineHeight,
  },
  helper: {
    color: colors.text.secondary,
    fontSize: typography.body.sm.fontSize,
    lineHeight: typography.body.sm.lineHeight,
  },
});
