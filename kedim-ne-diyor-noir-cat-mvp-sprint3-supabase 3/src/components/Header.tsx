import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/theme";

export function Header({ badge = "Noir Cat" }: { badge?: string }) {
  return (
    <View style={styles.row}>
      <View style={styles.brandRow}>
        <Ionicons name="sparkles" size={20} color={colors.gold} />
        <Text style={styles.logo}>Kedim Ne Diyor?</Text>
      </View>
      <View style={styles.badge}>
        <Ionicons name="server" size={15} color={colors.goldLight} />
        <Text style={styles.badgeText}>{badge}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 22 },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 8, flex: 1 },
  logo: { color: colors.goldLight, fontSize: 24, fontWeight: "800", letterSpacing: -0.5 },
  badge: { flexDirection: "row", alignItems: "center", gap: 6, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: "rgba(214,168,90,0.08)" },
  badgeText: { color: colors.goldLight, fontWeight: "700" }
});
