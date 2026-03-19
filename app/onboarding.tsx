import { OnboardingPager } from "../src/features/entry/components/OnboardingPager";
import { onboardingSlides } from "../src/features/entry/mock";

export default function OnboardingScreen() {
  return <OnboardingPager slides={onboardingSlides} />;
}
