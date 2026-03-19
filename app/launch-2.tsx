import { useRouter } from "expo-router";

import { LaunchScreenLayout } from "../src/features/entry/components/LaunchScreenLayout";
import { launchScreens } from "../src/features/entry/mock";

export default function LaunchWelcomeScreen() {
  const router = useRouter();

  return (
    <LaunchScreenLayout
      onPressAction={(href) => router.push(href)}
      screen={launchScreens.welcome}
    />
  );
}
