import { Redirect } from "expo-router";

import { useMockAuth } from "../src/features/auth/context/MockAuthContext";

export default function IndexScreen() {
  const { isAuthenticated } = useMockAuth();

  return <Redirect href={isAuthenticated ? "/(tabs)" : "/launch-1"} />;
}
