import type { ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { entryColors, entryLayout } from "../constants";

type RoundedContentPanelProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  topOnly?: boolean;
  backgroundColor?: string;
};

export function RoundedContentPanel({
  children,
  style,
  topOnly = false,
  backgroundColor = entryColors.panel,
}: RoundedContentPanelProps) {
  return (
    <View
      style={[
        styles.base,
        topOnly ? styles.topOnly : styles.allSides,
        { backgroundColor },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: "hidden",
  },
  topOnly: {
    borderTopLeftRadius: entryLayout.panelRadius,
    borderTopRightRadius: entryLayout.panelRadius,
  },
  allSides: {
    borderRadius: entryLayout.panelRadius,
  },
});
