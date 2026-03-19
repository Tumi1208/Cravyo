import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type HomeHeaderProps = {
  greeting: string;
  subtitle: string;
  onPressAvatar: () => void;
  onPressCart: () => void;
  onPressNotifications: () => void;
  onPressSearch: () => void;
  searchPlaceholder: string;
};

export function HomeHeader({
  greeting,
  subtitle,
  onPressAvatar,
  onPressCart,
  onPressNotifications,
  onPressSearch,
  searchPlaceholder,
}: HomeHeaderProps) {
  const actions = [
    {
      accessibilityLabel: "Open cart",
      iconName: "cart-outline" as const,
      onPress: onPressCart,
    },
    {
      accessibilityLabel: "Open notifications",
      iconName: "bell-outline" as const,
      onPress: onPressNotifications,
    },
    {
      accessibilityLabel: "Open profile",
      iconName: "account-outline" as const,
      onPress: onPressAvatar,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Pressable
          accessibilityLabel="Search menu"
          accessibilityRole="button"
          onPress={onPressSearch}
          style={styles.searchBar}
        >
          <Text numberOfLines={1} style={styles.searchPlaceholder}>
            {searchPlaceholder}
          </Text>
          <View style={styles.searchAction}>
            <Feather color="#FFFFFF" name="search" size={12} />
          </View>
        </Pressable>

        <View style={styles.actionRow}>
          {actions.map((action) => (
            <Pressable
              accessibilityLabel={action.accessibilityLabel}
              accessibilityRole="button"
              key={action.accessibilityLabel}
              onPress={action.onPress}
              style={styles.actionButton}
            >
              <MaterialCommunityIcons color="#E97734" name={action.iconName} size={19} />
            </Pressable>
          ))}
        </View>
      </View>

      <Text style={styles.greeting}>{greeting}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 8,
    paddingBottom: 18,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 34,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    paddingLeft: 14,
    paddingRight: 6,
    shadowColor: "#CB7E38",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  searchPlaceholder: {
    flex: 1,
    color: "#B7AB9C",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
  },
  searchAction: {
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11,
    backgroundColor: "#F36F2D",
  },
  actionRow: {
    marginLeft: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  actionButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    shadowColor: "#CB7E38",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  greeting: {
    marginTop: 14,
    color: "#FFFFFF",
    fontSize: 25,
    lineHeight: 29,
    fontWeight: "800",
  },
  subtitle: {
    marginTop: 2,
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "500",
  },
});
