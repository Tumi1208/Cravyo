import { Feather } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

import { colors, radius, spacing, typography } from "../../theme";

export type SearchBarProps = TextInputProps & {
  label?: string;
  onPress?: () => void;
  onPressAction?: () => void;
};

export function SearchBar({
  label,
  onPress,
  onPressAction,
  placeholder = "Search restaurants or dishes",
  ...props
}: SearchBarProps) {
  const shellContent = (
    <>
      <Feather color={colors.text.muted} name="search" size={18} />
      {onPress ? (
        <Text style={[styles.input, styles.placeholderText]}>{placeholder}</Text>
      ) : (
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.text.muted}
          style={styles.input}
          {...props}
        />
      )}
      {onPressAction ? (
        <Pressable
          accessibilityLabel="Open search filters"
          accessibilityRole="button"
          hitSlop={10}
          onPress={onPressAction}
          style={styles.actionButton}
        >
          <Feather color={colors.text.secondary} name="sliders" size={18} />
        </Pressable>
      ) : null}
    </>
  );

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      {onPress ? (
        <Pressable accessibilityRole="button" onPress={onPress} style={styles.inputShell}>
          {shellContent}
        </Pressable>
      ) : (
        <View style={styles.inputShell}>{shellContent}</View>
      )}
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
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    color: colors.text.primary,
    fontSize: typography.body.lg.fontSize,
    lineHeight: typography.body.lg.lineHeight,
  },
  placeholderText: {
    color: colors.text.muted,
  },
  actionButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.pill,
    backgroundColor: colors.surface.muted,
  },
});
