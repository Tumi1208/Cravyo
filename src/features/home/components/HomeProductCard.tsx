import { Feather } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import type { HomeProductItem } from "../types";

type HomeProductCardProps = {
  item: HomeProductItem;
  onPress: () => void;
  variant: "compact" | "featured";
  width: number;
};

export function HomeProductCard({
  item,
  onPress,
  variant,
  width,
}: HomeProductCardProps) {
  const isBestSeller = variant === "compact";
  const imageHeight = isBestSeller ? Math.round(width * 1.52) : Math.round(width * 0.68);

  return (
    <Pressable
      accessibilityLabel={item.title}
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.card, { width }]}
    >
      <View style={[styles.imageWrap, { height: imageHeight }]}>
        <Image resizeMode="cover" source={item.imageSource} style={styles.image} />

        {!isBestSeller ? (
          <View style={styles.topRow}>
            <View style={styles.ratingBadge}>
              <Feather color="#F2AA1D" name="star" size={11} />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>

            <View style={styles.favoriteBadge}>
              <Feather color="#F2AA1D" name="heart" size={10} />
            </View>
          </View>
        ) : null}

        <View style={[styles.priceBadge, isBestSeller ? styles.bestSellerPriceBadge : null]}>
          <Text style={[styles.priceText, isBestSeller ? styles.bestSellerPriceText : null]}>
            {item.price}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    borderRadius: 24,
    shadowColor: "#C47A35",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  imageWrap: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#F7E9DC",
    borderRadius: 24,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  topRow: {
    position: "absolute",
    top: 8,
    right: 8,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  favoriteBadge: {
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    backgroundColor: "rgba(255,255,255,0.95)",
  },
  ratingText: {
    color: "#3C2C22",
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "700",
  },
  priceBadge: {
    position: "absolute",
    right: 8,
    bottom: 8,
    borderRadius: 999,
    backgroundColor: "#EF6A30",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  bestSellerPriceBadge: {
    right: 6,
    bottom: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  priceText: {
    color: "#FFFFFF",
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "700",
  },
  bestSellerPriceText: {
    fontSize: 10,
    lineHeight: 11,
  },
});
