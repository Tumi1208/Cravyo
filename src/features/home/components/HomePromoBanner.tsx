import { useRef, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";

import type { HomePromoBanner as HomePromoBannerData } from "../types";

const PROMO_BANNER_HEIGHT = 118;

type HomePromoBannerProps = {
  banners: HomePromoBannerData[];
  onPressBanner: (href: HomePromoBannerData["href"]) => void;
  width: number;
};

export function HomePromoBanner({
  banners,
  onPressBanner,
  width,
}: HomePromoBannerProps) {
  const carouselRef = useRef<FlatList<HomePromoBannerData>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);

    setActiveIndex(nextIndex);
  };

  const handlePressDot = (index: number) => {
    carouselRef.current?.scrollToIndex({ index, animated: true });
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        bounces={false}
        data={banners}
        decelerationRate="fast"
        getItemLayout={(_, index) => ({
          index,
          length: width,
          offset: width * index,
        })}
        horizontal
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        pagingEnabled
        ref={carouselRef}
        renderItem={({ item }) => (
          <Pressable
            accessibilityLabel={item.title}
            accessibilityRole="button"
            onPress={() => onPressBanner(item.href)}
            style={[styles.card, { width }]}
          >
            <View style={[styles.ring, styles.topRing]} />
            <View style={[styles.ring, styles.bottomRing]} />

            <View style={styles.copyBlock}>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>

            <Image resizeMode="cover" source={item.imageSource} style={styles.image} />
          </Pressable>
        )}
        scrollEnabled={banners.length > 1}
        showsHorizontalScrollIndicator={false}
      />

      <View style={styles.dots}>
        {banners.map((banner, index) => (
          <Pressable
            accessibilityLabel={`Show promo banner ${index + 1}`}
            accessibilityRole="button"
            hitSlop={6}
            key={`promo-dot-${index}`}
            onPress={() => handlePressDot(index)}
          >
            <View
              style={[styles.dot, index === activeIndex ? styles.activeDot : null]}
            />
          </Pressable>
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
    height: PROMO_BANNER_HEIGHT,
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
    height: "100%",
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
