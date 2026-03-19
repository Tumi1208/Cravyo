import { Stack } from "expo-router";

export default function RootLayout() {
  return (
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
  );
}
