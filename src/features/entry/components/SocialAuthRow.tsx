import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { typography } from "../../../theme";
import { entryColors } from "../constants";

type SocialAuthRowProps = {
  label: string;
};

export function SocialAuthRow({ label }: SocialAuthRowProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.iconRow}>
        {/*
          TODO: Replace these temporary vector icons with the exported
          Google and Facebook assets from design once they are available.
        */}
        <View style={styles.provider}>
          <View style={styles.iconButton}>
            <AntDesign color={entryColors.brandOrange} name="google" size={24} />
          </View>
          <Text style={styles.providerLabel}>Google</Text>
        </View>
        <View style={styles.provider}>
          <View style={styles.iconButton}>
            <MaterialCommunityIcons
              color={entryColors.iconWarm}
              name="facebook"
              size={24}
            />
          </View>
          <Text style={styles.providerLabel}>Facebook</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 18,
    paddingBottom: 4,
    gap: 14,
  },
  label: {
    color: entryColors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
    fontFamily: typography.fontFamily.regular,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  provider: {
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  providerLabel: {
    color: entryColors.textSecondary,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "400",
    fontFamily: typography.fontFamily.regular,
  },
});
