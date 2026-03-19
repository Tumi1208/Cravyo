import { useRouter } from "expo-router";
import { useEffect } from "react";

import { LaunchScreenLayout } from "../src/features/entry/components/LaunchScreenLayout";
import { launchScreens } from "../src/features/entry/mock";

export default function LaunchSplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/launch-2");
    }, 1200);

    return () => clearTimeout(timeout);
  }, [router]);

  return <LaunchScreenLayout screen={launchScreens.splash} />;
}
