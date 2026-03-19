import type { ReactNode } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

import { typography } from "../../../theme";
import { entryColors } from "../constants";

type EntryTextInputProps = TextInputProps & {
  label: string;
  trailing?: ReactNode;
};

export function EntryTextInput({
  label,
  trailing,
  ...props
}: EntryTextInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputShell}>
        <TextInput
          placeholderTextColor={entryColors.textMuted}
          selectionColor={entryColors.brandOrangeStrong}
          style={styles.input}
          {...props}
        />
        {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    color: entryColors.textPrimary,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
  },
  inputShell: {
    minHeight: 38,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: entryColors.field,
    paddingLeft: 16,
    paddingRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 9,
    color: entryColors.textPrimary,
    fontSize: 15,
    lineHeight: 19,
    fontWeight: "400",
    fontFamily: typography.fontFamily.medium,
  },
  trailing: {
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
