import { Feather } from "@expo/vector-icons";
import { useRouter, type Href } from "expo-router";
import { type ReactNode } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { CravyoBottomNav, type CravyoBottomNavKey } from "../navigation/CravyoBottomNav";
import { ReferenceScreenShell } from "./ReferenceScreenShell";

type CravyoSheetScreenProps = {
  activeNavKey?: CravyoBottomNavKey;
  backHref?: Href;
  children: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollable?: boolean;
  sheetStyle?: StyleProp<ViewStyle>;
  showBackButton?: boolean;
  showBottomNav?: boolean;
  subtitle?: string;
  title: string;
};

export function CravyoSheetScreen({
  activeNavKey = "",
  backHref,
  children,
  contentContainerStyle,
  scrollable = true,
  sheetStyle,
  showBackButton = true,
  showBottomNav = true,
  subtitle,
  title,
}: CravyoSheetScreenProps) {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    if (backHref) {
      router.replace(backHref);
      return;
    }

    router.push("/(tabs)");
  };

  const content = (
    <>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {children}
    </>
  );

  return (
    <ReferenceScreenShell backgroundColor="#F6B97E">
      <View style={styles.header}>
        {showBackButton ? (
          <Pressable
            accessibilityLabel="Go back"
            accessibilityRole="button"
            hitSlop={10}
            onPress={handleBack}
            style={styles.backButton}
          >
            <Feather color="#D2783B" name="chevron-left" size={20} />
          </Pressable>
        ) : (
          <View style={styles.headerSpacer} />
        )}

        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      <View style={[styles.sheet, sheetStyle]}>
        {scrollable ? (
          <ScrollView
            bounces={false}
            contentContainerStyle={[
              styles.contentContainer,
              showBottomNav ? styles.bottomNavPadding : styles.modalPadding,
              contentContainerStyle,
            ]}
            showsVerticalScrollIndicator={false}
          >
            {content}
          </ScrollView>
        ) : (
          <View
            style={[
              styles.contentContainer,
              showBottomNav ? styles.bottomNavPadding : styles.modalPadding,
              contentContainerStyle,
            ]}
          >
            {content}
          </View>
        )}
      </View>

      {showBottomNav ? (
        <CravyoBottomNav activeKey={activeNavKey} onNavigate={(href) => router.push(href)} />
      ) : null}
    </ReferenceScreenShell>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  backButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
  },
  headerSpacer: {
    width: 34,
  },
  title: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "800",
    textAlign: "center",
  },
  sheet: {
    flex: 1,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    backgroundColor: "#FFFDFC",
    overflow: "hidden",
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 30,
  },
  bottomNavPadding: {
    paddingBottom: 138,
  },
  modalPadding: {
    paddingBottom: 40,
  },
  subtitle: {
    marginBottom: 18,
    color: "#D39968",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    textAlign: "center",
  },
});
