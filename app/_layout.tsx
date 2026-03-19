import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthRouteGuard } from "../src/features/auth/components/AuthRouteGuard";
import { MockAuthProvider } from "../src/features/auth/context/MockAuthContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <MockAuthProvider>
        <AuthRouteGuard />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="launch-1" />
          <Stack.Screen name="launch-2" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="orders" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="support" />
          <Stack.Screen
            name="modals"
            options={{
              presentation: "modal",
            }}
          />
        </Stack>
      </MockAuthProvider>
    </SafeAreaProvider>
  );
}
