import { Link, type Href } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const quickLinks: { href: Href; label: string }[] = [
  { href: "/launch-1", label: "Open Splash Route" },
  { href: "/launch-2", label: "Open Welcome Route" },
  { href: "/onboarding", label: "Open Onboarding Route" },
  { href: "/(auth)", label: "Open Auth Route" },
];

export default function StarterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Expo Ready</Text>
      <Text style={styles.title}>Cravyo starter app is initialized.</Text>
      <Text style={styles.body}>
        This is a minimal launch screen so you can confirm Expo Router, TypeScript,
        and the current project structure are wired correctly before building the
        real UI.
      </Text>

      <View style={styles.linkStack}>
        {quickLinks.map((item) => (
          <Link asChild href={item.href} key={item.label}>
            <Pressable style={styles.linkButton}>
              <Text style={styles.linkLabel}>{item.label}</Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#FFFBF5",
  },
  eyebrow: {
    color: "#F97316",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    marginTop: 12,
    color: "#0F172A",
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "700",
  },
  body: {
    marginTop: 12,
    color: "#475569",
    fontSize: 16,
    lineHeight: 24,
  },
  linkStack: {
    marginTop: 28,
    gap: 12,
  },
  linkButton: {
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  linkLabel: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "600",
  },
});
