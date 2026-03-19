import { StyleSheet, Text, View } from "react-native";

export default function ModalsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Modals</Text>
      <Text style={styles.title}>Modal placeholder</Text>
      <Text style={styles.body}>
        Keep bottom sheets, confirmation dialogs, and product customization overlays
        under this route group.
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
