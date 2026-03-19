import { StyleSheet, Text, View } from "react-native";

export default function MenuScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Tabs</Text>
      <Text style={styles.title}>Menu and restaurant detail placeholder</Text>
      <Text style={styles.body}>
        This route group is ready for restaurant detail, category tabs, product
        cards, and add-to-cart actions.
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
