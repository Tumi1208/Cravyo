import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { typography } from "../../../theme";
import { entryColors } from "../constants";

type PrimaryCtaButtonProps = Omit<PressableProps, "style"> & {
  label: string;
  width?: number | `${number}%`;
  backgroundColor?: string;
  textColor?: string;
  framed?: boolean;
  frameColor?: string;
  style?: StyleProp<ViewStyle>;
};

export function PrimaryCtaButton({
  label,
  width,
  backgroundColor = entryColors.brandOrange,
  textColor = entryColors.textInverse,
  framed = false,
  frameColor = entryColors.brandOrangeFrame,
  style,
  ...props
}: PrimaryCtaButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      style={[
        styles.wrapper,
        width !== undefined ? { width } : null,
        framed ? styles.frame : null,
        framed ? { borderColor: frameColor } : null,
        style,
      ]}
      {...props}
    >
      <View style={[styles.button, { backgroundColor }]}>
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "center",
  },
  frame: {
    borderWidth: 1,
    padding: 1,
  },
  button: {
    minWidth: 120,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 999,
  },
  label: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
  },
});
