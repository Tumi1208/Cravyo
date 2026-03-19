import { Feather } from "@expo/vector-icons";
import { useRouter, type Href } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { typography } from "../../../theme";
import { entryColors, entryLayout } from "../constants";

type AuthHeaderProps = {
  title: string;
  backHref: Href;
};

export function AuthHeader({ title, backHref }: AuthHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Pressable
          accessibilityLabel="Go back"
          accessibilityRole="button"
          onPress={() => router.push(backHref)}
          style={styles.backButton}
        >
          <Feather color={entryColors.iconWarm} name="chevron-left" size={18} />
        </Pressable>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.spacer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: entryLayout.authHeaderContentHeight,
    paddingTop: 28,
    paddingHorizontal: entryLayout.horizontalPadding,
    backgroundColor: entryColors.brandOrange,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: entryColors.textInverse,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
  },
  spacer: {
    width: 28,
    height: 28,
  },
});
