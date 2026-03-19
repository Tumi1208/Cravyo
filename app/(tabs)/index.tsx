import { Tabs } from "expo-router";

import { HomeScreen } from "../../src/features/home/components/HomeScreen";

export default function HomeRoute() {
  return (
    <>
      <Tabs.Screen
        options={{
          tabBarStyle: {
            display: "none",
          },
        }}
      />
      <HomeScreen />
    </>
  );
}
