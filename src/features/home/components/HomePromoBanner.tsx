import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import type { HomePromoBanner as HomePromoBannerData } from "../types";

type HomePromoBannerProps = {
  banner: HomePromoBannerData;
  onPress: () => void;
};

export function HomePromoBanner({ banner, onPress }: HomePromoBannerProps) {
  return (
    <View style={styles.container}>
      <Pressable accessibilityRole="button" onPress={onPress} style={styles.card}>
        <View style={[styles.ring, styles.topRing]} />
        <View style={[styles.ring, styles.bottomRing]} />

        <View style={styles.copyBlock}>
          <Text style={styles.description}>{banner.description}</Text>
          <Text style={styles.title}>{banner.title}</Text>
        </View>

        <Image resizeMode="cover" source={banner.imageSource} style={styles.image} />
      </Pressable>

      <View style={styles.dots}>
        {Array.from({ length: banner.dotCount }).map((_, index) => (
          <View
            key={`promo-dot-${index}`}
            style={[styles.dot, index === banner.activeDotIndex ? styles.activeDot : null]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
  },
  card: {
    position: "relative",
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: 26,
    backgroundColor: "#EF5A22",
    minHeight: 118,
  },
  copyBlock: {
    width: "44%",
    justifyContent: "center",
    backgroundColor: "#EF5A22",
    paddingLeft: 24,
    paddingRight: 14,
    paddingVertical: 18,
  },
  title: {
    marginTop: 12,
    color: "#FFFFFF",
    fontSize: 28,
    lineHeight: 31,
    fontWeight: "900",
  },
  description: {
    color: "#FFF7F2",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
  },
  image: {
    flex: 1,
    minHeight: 118,
  },
  ring: {
    position: "absolute",
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 10,
    borderColor: "#16866C",
  },
  topRing: {
    top: -26,
    left: "35%",
  },
  bottomRing: {
    bottom: -24,
    left: -14,
  },
  dots: {
    marginTop: 8,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 28,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#F6E8DA",
  },
  activeDot: {
    width: 28,
    backgroundColor: "#EF6A30",
  },
});
