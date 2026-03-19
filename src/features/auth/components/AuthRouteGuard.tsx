import { useRootNavigationState, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

import { useMockAuth } from "../context/MockAuthContext";

const GUEST_ROOTS = new Set(["(auth)", "launch-1", "launch-2", "onboarding"]);
const PROTECTED_ROOTS = new Set(["(tabs)", "orders", "profile", "support", "modals"]);

export function AuthRouteGuard() {
  const { isAuthenticated } = useMockAuth();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const segments = useSegments();
  const segmentKey = segments.join("/");

  useEffect(() => {
    if (!rootNavigationState?.key) {
      return;
    }

    const rootSegment = segments[0];

    if (!rootSegment) {
      return;
    }

    if (!isAuthenticated && PROTECTED_ROOTS.has(rootSegment)) {
      router.replace("/launch-1");
      return;
    }

    if (isAuthenticated && GUEST_ROOTS.has(rootSegment)) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, rootNavigationState?.key, router, segmentKey, segments]);

  return null;
}
