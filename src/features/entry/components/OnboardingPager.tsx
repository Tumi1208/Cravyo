import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ReferenceScreenShell } from "../../../components/layout/ReferenceScreenShell";
import { TrimmedReferenceArtwork } from "../../../components/layout/TrimmedReferenceArtwork";
import { typography } from "../../../theme";
import { entryColors, entryLayout } from "../constants";
import type { OnboardingSlide } from "../types";
import { PrimaryCtaButton } from "./PrimaryCtaButton";
import { RoundedContentPanel } from "./RoundedContentPanel";

type OnboardingPagerProps = {
  slides: OnboardingSlide[];
};

export function OnboardingPager({ slides }: OnboardingPagerProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const listRef = useRef<FlatList<OnboardingSlide>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSlide = slides[currentIndex];
  const contentHeight = height - insets.top;
  const heroTopGap = 8;
  const panelOverlap = 30;
  const panelBottomInset = Math.max(insets.bottom + 20, 28);
  const minHeroHeight = 230;
  const desiredPanelHeight = Math.round(contentHeight * 0.56);
  const maxPanelHeight = Math.max(
    contentHeight - panelBottomInset - minHeroHeight + panelOverlap,
    0,
  );
  const panelHeight = Math.min(Math.max(desiredPanelHeight, 340), maxPanelHeight);
  const heroHeight = contentHeight - panelBottomInset - panelHeight + panelOverlap;
  const artworkHeight = Math.max(heroHeight - heroTopGap, 0);
  const skipTop = heroTopGap + 10;
  const panelContentBottomPadding = panelBottomInset + 12;

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
    <ReferenceScreenShell backgroundColor={entryColors.brandOrange}>
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
            return (
              <View style={[styles.page, { width, height: contentHeight }]}>
                <View style={[styles.heroFrame, { height: heroHeight }]}>
                  <View style={[styles.heroTopArea, { height: heroTopGap }]} />
                  <TrimmedReferenceArtwork
                    backgroundColor={entryColors.brandOrange}
                    frameHeight={artworkHeight}
                    source={item.imageSource}
                    imageScale={item.imageScale}
                    imageTranslateX={item.imageTranslateX}
                    imageTranslateY={item.imageTranslateY}
                    width={width}
                  />
                </View>

                <RoundedContentPanel
                  style={[
                    styles.panel,
                    {
                      marginTop: -panelOverlap,
                    },
                  ]}
                  topOnly
                >
                  <View
                    style={[
                      styles.panelContent,
                      { paddingBottom: panelContentBottomPadding },
                    ]}
                  >
                    <MaterialCommunityIcons
                      color={entryColors.brandOrangeStrong}
                      name={item.iconName as never}
                      size={32}
                    />

                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>

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
                      label={item.buttonLabel}
                      onPress={handleNext}
                      style={styles.button}
                      width={item.id === slides[slides.length - 1]?.id ? 150 : 122}
                    />
                  </View>
                </RoundedContentPanel>
              </View>
            );
          }}
          showsHorizontalScrollIndicator={false}
        />

        {currentSlide.showSkip ? (
          <View
            pointerEvents="box-none"
            style={[styles.topOverlay, { top: skipTop }]}
          >
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

      </View>
    </ReferenceScreenShell>
  );
}

const styles = StyleSheet.create({
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
  heroTopArea: {
    backgroundColor: entryColors.brandOrange,
  },
  topOverlay: {
    position: "absolute",
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
    marginRight: 10,
  },
  panel: {
    flex: 1,
    backgroundColor: entryColors.panel,
    zIndex: 1,
  },
  panelContent: {
    alignItems: "center",
    paddingHorizontal: entryLayout.horizontalPadding,
    paddingTop: 28,
    paddingBottom: 24,
  },
  skipLabel: {
    color: entryColors.brandOrangeStrong,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
  },
  title: {
    marginTop: 16,
    color: entryColors.brandOrangeStrong,
    fontSize: 21,
    lineHeight: 28,
    fontWeight: "700",
    fontFamily: typography.fontFamily.bold,
    textAlign: "center",
  },
  description: {
    maxWidth: 276,
    marginTop: 14,
    color: entryColors.textPrimary,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    fontFamily: typography.fontFamily.semibold,
    textAlign: "center",
  },
  dots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 18,
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
    marginTop: 24,
  },
});
