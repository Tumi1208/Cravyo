import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Profile</Text>
      <Text style={styles.title}>Profile placeholder</Text>
      <Text style={styles.body}>
        This stack is ready for account settings, saved addresses, payment methods,
        and app preferences.
      </Text>
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
});
