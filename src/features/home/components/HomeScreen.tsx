import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, type Href } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { ReferenceScreenShell } from "../../../components/layout/ReferenceScreenShell";
import { homeMock } from "../mock";
import { HomeBottomNav } from "./HomeBottomNav";
import { HomeHeader } from "./HomeHeader";
import { HomeProductCard } from "./HomeProductCard";
import { HomePromoBanner } from "./HomePromoBanner";

const SCREEN_HORIZONTAL_PADDING = 30;
const BEST_SELLER_GAP = 12;
const RECOMMEND_GAP = 14;
const BOTTOM_NAV_HEIGHT = 104;

const homeBottomNavItems = [
  { key: "home", iconName: "home-outline", href: "/(tabs)" },
  { key: "menu", iconName: "silverware-fork-knife", href: "/(tabs)/menu" },
  { key: "favorites", iconName: "heart-outline", href: "/(tabs)/favorites" },
  { key: "orders", iconName: "clipboard-text-outline", href: "/orders" },
  { key: "support", iconName: "headset", href: "/support" },
] as const;

export function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const bestSellerCardWidth = Math.floor(
    (width - SCREEN_HORIZONTAL_PADDING * 2 - BEST_SELLER_GAP * 3) / 4,
  );
  const recommendCardWidth = Math.floor(
    (width - SCREEN_HORIZONTAL_PADDING * 2 - RECOMMEND_GAP) / 2,
  );

  const openRoute = (href: Href) => {
    router.push(href);
  };

  return (
    <ReferenceScreenShell backgroundColor="#F7BB7A">
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader
          greeting={homeMock.header.greeting}
          onPressAvatar={() => openRoute("/profile")}
          onPressCart={() => openRoute("/(tabs)/cart")}
          onPressNotifications={() => openRoute("/orders")}
          onPressSearch={() => openRoute("/(tabs)/menu")}
          searchPlaceholder={homeMock.searchPlaceholder}
          subtitle={homeMock.header.subtitle}
        />

        <View style={styles.contentSheet}>
          <View style={styles.categoryRow}>
            {homeMock.categories.map((category) => {
              return (
                <Pressable
                  key={category.id}
                  accessibilityLabel={category.label}
                  accessibilityRole="button"
                  onPress={() => openRoute("/(tabs)/menu")}
                  style={styles.categoryItem}
                >
                  <View style={styles.categoryIconWrap}>
                    <MaterialCommunityIcons
                      color="#E38A47"
                      name={category.iconName}
                      size={34}
                    />
                  </View>
                  <Text style={styles.categoryLabel}>{category.label}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.categoryDivider} />

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Best Seller</Text>
            <Pressable
              accessibilityLabel="View all best sellers"
              accessibilityRole="button"
              onPress={() => openRoute("/(tabs)/menu")}
              style={styles.sectionAction}
            >
              <Text style={styles.sectionActionLabel}>View All</Text>
              <Feather color="#F07C36" name="chevron-right" size={16} />
            </Pressable>
          </View>

          <View style={styles.bestSellerRow}>
            {homeMock.bestSeller.map((item) => (
              <HomeProductCard
                item={item}
                key={item.id}
                onPress={() => openRoute(item.href)}
                variant="compact"
                width={bestSellerCardWidth}
              />
            ))}
          </View>

          <HomePromoBanner
            banner={homeMock.promoBanner}
            onPress={() => openRoute(homeMock.promoBanner.href)}
          />

          <Text style={[styles.sectionTitle, styles.recommendTitle]}>Recommend</Text>

          <View style={styles.recommendRow}>
            {homeMock.recommend.map((item) => (
              <HomeProductCard
                item={item}
                key={item.id}
                onPress={() => openRoute(item.href)}
                variant="featured"
                width={recommendCardWidth}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <HomeBottomNav activeKey="home" items={homeBottomNavItems} onNavigate={openRoute} />
    </ReferenceScreenShell>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: BOTTOM_NAV_HEIGHT + 28,
  },
  contentSheet: {
    marginTop: 14,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    backgroundColor: "#FFFDFC",
    paddingTop: 24,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingBottom: 34,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  categoryItem: {
    alignItems: "center",
    width: 54,
    gap: 8,
  },
  categoryIconWrap: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 26,
    backgroundColor: "#FFF7DB",
  },
  categoryLabel: {
    color: "#2F2119",
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  categoryDivider: {
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F7DCD2",
  },
  sectionHeader: {
    marginTop: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: "#2F2119",
    fontSize: 19,
    lineHeight: 23,
    fontWeight: "800",
  },
  sectionAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sectionActionLabel: {
    color: "#F07A38",
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "700",
  },
  bestSellerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: BEST_SELLER_GAP,
  },
  recommendTitle: {
    marginTop: 14,
  },
  recommendRow: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: RECOMMEND_GAP,
  },
});
