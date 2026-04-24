import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { Header } from "@/components/Header";
import { PremiumCard } from "@/components/PremiumCard";
import { Screen } from "@/components/Screen";
import { moodDistribution } from "@/data/mock";
import { colors } from "@/constants/theme";
import { getAnalyses } from "@/services/analysisService";
import { useAppStore } from "@/store/appStore";

export default function ReportScreen() {
  const [loading, setLoading] = useState(false);
  const setAnalyses = useAppStore((s) => s.setAnalyses);
  const isPremium = useAppStore((s) => s.isPremium);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data } = await getAnalyses();
      if (data.length) setAnalyses(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <Screen>
      <Header badge="DB Rapor" />
      <Text style={styles.title}>Duygu Haritası</Text>
      {loading && <ActivityIndicator color={colors.gold} />}
      <PremiumCard>
        {moodDistribution.map((item) => (
          <View key={item.label} style={styles.row}>
            <Text style={styles.label}>{item.label}</Text>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${item.value}%` }]} />
            </View>
            <Text style={styles.value}>%{item.value}</Text>
          </View>
        ))}
      </PremiumCard>
      <PremiumCard>
        <Text style={styles.section}>Supabase Geçmiş</Text>
        <Text style={styles.text}>Bu ekran açıldığında meow_analyses tablosundan kayıtlar çekilir ve global state güncellenir.</Text>
      </PremiumCard>
      <Pressable onPress={() => !isPremium && router.push("/premium")}>
        <PremiumCard style={styles.lockedHistory}>
          <View style={{ flex: 1 }}>
            <Text style={styles.section}>7 günden uzun analiz geçmişi</Text>
            <Text style={styles.text}>{isPremium ? "Tüm geçmiş kayıtlarına erişim açık." : "Uzun dönem duygu haritası Premium ile açılır."}</Text>
          </View>
          <Ionicons name={isPremium ? "checkmark-circle" : "lock-closed"} size={24} color={isPremium ? colors.success : colors.gold} />
        </PremiumCard>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.cream, fontSize: 34, fontWeight: "900", marginBottom: 18 },
  row: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 13 },
  label: { color: colors.cream, width: 96, fontWeight: "700" },
  track: { flex: 1, height: 8, backgroundColor: colors.surface2, borderRadius: 10, overflow: "hidden" },
  fill: { height: 8, backgroundColor: colors.gold, borderRadius: 10 },
  value: { color: colors.goldLight, width: 40, textAlign: "right" },
  section: { color: colors.cream, fontSize: 20, fontWeight: "800", marginBottom: 10 },
  text: { color: colors.gray, fontSize: 16, lineHeight: 24 },
  lockedHistory: { flexDirection: "row", alignItems: "center", gap: 12 }
});
