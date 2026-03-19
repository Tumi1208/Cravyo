import type { Href } from "expo-router";
import { StatusBar } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";

import { typography } from "../../../theme";
import { entryColors, entryLayout } from "../constants";
import type { LaunchScreenConfig } from "../types";
import { EntryStatusBar } from "./EntryStatusBar";
import { PrimaryCtaButton } from "./PrimaryCtaButton";

type LaunchScreenLayoutProps = {
  screen: LaunchScreenConfig;
  onPressAction?: (href: Href) => void;
};

export function LaunchScreenLayout({
  screen,
  onPressAction,
}: LaunchScreenLayoutProps) {
  return (
    <View style={[styles.container, { backgroundColor: screen.backgroundColor }]}>
      <StatusBar hidden />
      <View style={styles.statusBarWrap}>
        <EntryStatusBar color={entryColors.textPrimary} />
      </View>

      <View style={styles.content}>
        <Image source={screen.brandSource} style={styles.brand} resizeMode="contain" />

        {screen.tagline ? <Text style={styles.tagline}>{screen.tagline}</Text> : null}

        {screen.actions ? (
          <View style={styles.buttonStack}>
            {screen.actions.map((action) => (
              <PrimaryCtaButton
                backgroundColor={action.backgroundColor}
                key={action.label}
                label={action.label}
                onPress={() => onPressAction?.(action.href)}
                textColor={action.textColor}
                width={entryLayout.launchButtonWidth}
              />
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBarWrap: {
    paddingTop: 44,
    paddingHorizontal: 30,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  brand: {
    width: entryLayout.launchBrandWidth,
    height: entryLayout.launchBrandHeight,
  },
  tagline: {
    marginTop: 28,
    color: entryColors.textInverse,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
    fontFamily: typography.fontFamily.semibold,
    textAlign: "center",
  },
  buttonStack: {
    marginTop: 34,
    gap: 14,
  },
});
