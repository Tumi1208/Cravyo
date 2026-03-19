import { entryColors } from "./constants";
import type { LaunchScreenConfig, OnboardingSlide } from "./types";

export const launchScreens = {
  splash: {
    backgroundColor: entryColors.brandGreen,
    brandSource: require("../../../assets/entry/launch-brand-green.png"),
  },
  welcome: {
    backgroundColor: entryColors.brandOrange,
    brandSource: require("../../../assets/entry/launch-brand-orange.png"),
    tagline: "Where taste meets craving,\nCravyo begins.",
    actions: [
      {
        label: "Log In",
        href: "/(auth)",
        backgroundColor: entryColors.brandGreen,
        textColor: entryColors.textInverse,
      },
      {
        label: "Sign Up",
        href: "/onboarding",
        backgroundColor: entryColors.surfaceSoft,
        textColor: entryColors.brandOrangeStrong,
      },
    ],
  },
} satisfies Record<string, LaunchScreenConfig>;

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: "food",
    imageSource: require("../../../assets/entry/onboarding-1-hero.png"),
    iconName: "shopping-outline",
    title: "Order For Food",
    description:
      "Choose your favorite meals and get them delivered fresh, fast, and right to your door anytime.",
    buttonLabel: "Next",
    imageScale: 1.16,
    imageTranslateX: 12,
    imageTranslateY: -132,
    showSkip: true,
  },
  {
    id: "payment",
    imageSource: require("../../../assets/entry/onboarding-2-hero.png"),
    iconName: "credit-card-outline",
    title: "Easy Payment",
    description:
      "Pay quickly and securely with simple checkout options designed to make every order smooth.",
    buttonLabel: "Next",
    imageScale: 1.12,
    imageTranslateX: -6,
    imageTranslateY: -106,
    showSkip: true,
  },
  {
    id: "delivery",
    imageSource: require("../../../assets/entry/onboarding-3-hero.png"),
    iconName: "motorbike",
    title: "Fast Delivery",
    description:
      "Track your order in real time and enjoy quick delivery from nearby restaurants you love.",
    buttonLabel: "Get Started",
    imageScale: 1.15,
    imageTranslateX: 4,
    imageTranslateY: -72,
  },
];
