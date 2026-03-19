import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { typography } from "../../../theme";
import { entryColors, entryLayout } from "../constants";
import type { OnboardingSlide } from "../types";
import { PrimaryCtaButton } from "./PrimaryCtaButton";
import { RoundedContentPanel } from "./RoundedContentPanel";

type OnboardingPagerProps = {
  slides: OnboardingSlide[];
};

const artworkTopTrimSource = 64;
const artworkTopTrimFallbackRatio = 0.1;

function getArtworkTopTrim(imageSource: OnboardingSlide["imageSource"], width: number) {
  const asset = Image.resolveAssetSource(imageSource);

  if (!asset.width) {
    return Math.round(width * artworkTopTrimFallbackRatio);
  }

  return Math.round((width / asset.width) * artworkTopTrimSource);
}

export function OnboardingPager({ slides }: OnboardingPagerProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const listRef = useRef<FlatList<OnboardingSlide>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSlide = slides[currentIndex];
  const heroAsset = Image.resolveAssetSource(slides[0]?.imageSource);
  const naturalHeroHeight =
    heroAsset.width > 0
      ? Math.round(width * (heroAsset.height / heroAsset.width))
      : Math.round(width * 1.3);
  const availableHeight = height - insets.top;
  const panelMinHeight = entryLayout.onboardingPanelHeight;
  const panelInset = 10;
  const panelOverlap = 22;
  const heroHeight = Math.min(
    naturalHeroHeight,
    availableHeight - panelMinHeight - panelInset + panelOverlap,
  );
  const panelTop = heroHeight - panelOverlap;

  const handleFinish = () => {
    router.replace("/(auth)/sign-up");
  };

  const handleSkip = () => {
    router.replace("/(auth)");
  };

  const handleNext = () => {
    if (currentIndex === slides.length - 1) {
      handleFinish();
      return;
    }

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    listRef.current?.scrollToIndex({ animated: true, index: nextIndex });
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(nextIndex);
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <StatusBar backgroundColor={entryColors.brandOrange} style="dark" />

      <View style={styles.content}>
        <FlatList
          data={slides}
          bounces={false}
          horizontal
          keyExtractor={(item) => item.id}
          onMomentumScrollEnd={handleScrollEnd}
          pagingEnabled
          ref={listRef}
          renderItem={({ item }) => {
            const artworkTopTrim = getArtworkTopTrim(item.imageSource, width);

            return (
              <View style={[styles.page, { width }]}>
                <View style={[styles.heroFrame, { height: heroHeight }]}>
                  <Image
                    resizeMode="cover"
                    source={item.imageSource}
                    style={[
                      styles.heroImage,
                      {
                        width,
                        height: heroHeight + artworkTopTrim,
                        marginTop: -artworkTopTrim,
                      },
                    ]}
                  />
                </View>
              </View>
            );
          }}
          showsHorizontalScrollIndicator={false}
        />

        {currentSlide.showSkip ? (
          <View pointerEvents="box-none" style={styles.topOverlay}>
            <Pressable
              accessibilityLabel="Skip onboarding"
              accessibilityRole="button"
              hitSlop={10}
              onPress={handleSkip}
              style={styles.skipButton}
            >
              <Text style={styles.skipLabel}>Skip</Text>
              <Feather
                color={entryColors.brandOrangeStrong}
                name="chevron-right"
                size={18}
              />
            </Pressable>
          </View>
        ) : null}

        <RoundedContentPanel
          style={[
            styles.panel,
            {
              top: panelTop,
              bottom: panelInset,
            },
          ]}
        >
          <View style={styles.panelContent}>
            <MaterialCommunityIcons
              color={entryColors.brandOrangeStrong}
              name={currentSlide.iconName as never}
              size={32}
            />

            <Text style={styles.title}>{currentSlide.title}</Text>
            <Text style={styles.description}>{currentSlide.description}</Text>

            <View style={styles.dots}>
              {slides.map((slide, index) => (
                <View
                  key={slide.id}
                  style={[
                    styles.dot,
                    index === currentIndex ? styles.dotActive : null,
                  ]}
                />
              ))}
            </View>

            <PrimaryCtaButton
              label={currentSlide.buttonLabel}
              onPress={handleNext}
              style={styles.button}
              width={currentIndex === slides.length - 1 ? 150 : 122}
            />
          </View>
        </RoundedContentPanel>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: entryColors.brandOrange,
  },
  content: {
    flex: 1,
  },
  page: {
    flex: 1,
    backgroundColor: entryColors.brandOrange,
  },
  heroFrame: {
    overflow: "hidden",
    backgroundColor: entryColors.brandOrange,
  },
  heroImage: {
    width: "100%",
  },
  topOverlay: {
    position: "absolute",
    top: 4,
    right: 0,
    left: 0,
    zIndex: 2,
  },
  skipButton: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    minHeight: 44,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  panel: {
    position: "absolute",
    right: 10,
    left: 10,
    backgroundColor: entryColors.panel,
    zIndex: 1,
  },
  panelContent: {
    alignItems: "center",
    paddingHorizontal: 28,
    paddingTop: 18,
    paddingBottom: 24,
  },
  skipLabel: {
    color: entryColors.brandOrangeStrong,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
  },
  title: {
    marginTop: 12,
    color: entryColors.brandOrangeStrong,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    textAlign: "center",
  },
  description: {
    maxWidth: 264,
    marginTop: 12,
    color: entryColors.textPrimary,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "600",
    fontFamily: typography.fontFamily.semibold,
    textAlign: "center",
  },
  dots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 20,
  },
  dot: {
    width: 18,
    height: 4,
    borderRadius: 999,
    backgroundColor: entryColors.dotInactive,
  },
  dotActive: {
    backgroundColor: entryColors.brandOrangeStrong,
  },
  button: {
    marginTop: 20,
  },
});
