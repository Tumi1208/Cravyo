import { StatusBar, type StatusBarStyle } from "expo-status-bar";
import { type ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";

type ReferenceScreenShellProps = {
  backgroundColor: string;
  children: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  edges?: Edge[];
  statusBarStyle?: StatusBarStyle;
  style?: StyleProp<ViewStyle>;
};

export function ReferenceScreenShell({
  backgroundColor,
  children,
  contentStyle,
  edges = ["top"],
  statusBarStyle = "dark",
  style,
}: ReferenceScreenShellProps) {
  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <StatusBar backgroundColor={backgroundColor} style={statusBarStyle} />
      <SafeAreaView edges={edges} style={[styles.container, { backgroundColor }]}>
        <View style={[styles.content, contentStyle]}>{children}</View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
