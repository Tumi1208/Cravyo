import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { SecondaryButton } from "../../src/components/ui/SecondaryButton";
import { useMockAuth } from "../../src/features/auth/context/MockAuthContext";

export default function HomeScreen() {
  const router = useRouter();
  const { session, signOut } = useMockAuth();

  const handleLogout = () => {
    signOut();
    router.replace("/launch-1");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Tabs</Text>
      <Text style={styles.title}>Home feed placeholder</Text>
      <Text style={styles.body}>
        Use this route for the first production slice: browse categories, featured
        restaurants, and search entry points.
      </Text>
      <Text style={styles.sessionLabel}>
        Mock session active for {session?.fullName ?? session?.identifier ?? "guest"}.
      </Text>
      <View style={styles.actions}>
        <SecondaryButton label="Log Out" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#FFFBF5",
  },
  eyebrow: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#F97316",
  },
  title: {
    marginTop: 12,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
    color: "#0F172A",
  },
  body: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 24,
    color: "#475569",
  },
  sessionLabel: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 20,
    color: "#64748B",
  },
  actions: {
    marginTop: 24,
    alignSelf: "flex-start",
  },
});
