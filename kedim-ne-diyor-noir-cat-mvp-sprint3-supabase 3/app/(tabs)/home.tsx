import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Header } from "@/components/Header";
import { PremiumCard } from "@/components/PremiumCard";
import { Screen } from "@/components/Screen";
import { useAppStore } from "@/store/appStore";
import { colors } from "@/constants/theme";
import { testSupabaseConnection } from "@/lib/supabase";

function Action({ icon, title, route, locked }: { icon: keyof typeof Ionicons.glyphMap; title: string; route: string; locked?: boolean }) {
  return (
    <Pressable style={[styles.action, locked && styles.lockedAction]} onPress={() => router.push((locked ? "/premium" : route) as never)}>
      <View style={styles.actionTop}>
        <Ionicons name={icon} size={27} color={colors.goldLight} />
        {locked && <Ionicons name="lock-closed" size={17} color={colors.gold} />}
      </View>
      <Text style={styles.actionTitle}>{title}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const cat = useAppStore((s) => s.cat);
  const analyses = useAppStore((s) => s.analyses);
  const backendStatus = useAppStore((s) => s.backendStatus);
  const setBackendStatus = useAppStore((s) => s.setBackendStatus);
  const isPremium = useAppStore((s) => s.isPremium);
  const remainingDailyAnalyses = useAppStore((s) => s.remainingDailyAnalyses);
  const refreshDailyAnalyses = useAppStore((s) => s.refreshDailyAnalyses);
  const last = analyses[0];

  useEffect(() => {
    refreshDailyAnalyses();
  }, [refreshDailyAnalyses]);

  async function checkBackend() {
    const result = await testSupabaseConnection();
    setBackendStatus(result.message);
    Alert.alert(result.ok ? "Başarılı" : "Bağlantı sorunu", result.message);
  }

  return (
    <Screen>
      <Header badge="Sprint 3" />
      <PremiumCard style={styles.hero}>
        <View style={styles.avatar}>
          <Ionicons name="paw" size={42} color={colors.goldLight} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.catName}>{cat.name}</Text>
          <Text style={styles.meta}>{cat.age || 2} yaş • {cat.breed || "Kedi"}</Text>
          <Text style={styles.mood}>Backend: <Text style={{ color: colors.goldLight }}>{backendStatus}</Text></Text>
        </View>
      </PremiumCard>

      <Pressable onPress={checkBackend}>
        <PremiumCard>
          <Text style={styles.section}>Supabase Bağlantı Testi</Text>
          <Text style={styles.description}>Buraya dokunarak .env ve tablo bağlantısını kontrol et.</Text>
        </PremiumCard>
      </Pressable>

      <PremiumCard>
        <Text style={styles.section}>Son AI Analizi</Text>
        <Text style={styles.prediction}>{last.prediction}</Text>
        <Text style={styles.description}>{last.explanation}</Text>
      </PremiumCard>

      <PremiumCard style={styles.quotaCard}>
        <Ionicons name={isPremium ? "sparkles" : "hourglass-outline"} size={22} color={colors.goldLight} />
        <View style={{ flex: 1 }}>
          <Text style={styles.section}>{isPremium ? "Premium Aktif" : "Günlük Analiz Hakkı"}</Text>
          <Text style={styles.description}>
            {isPremium ? "Sınırsız miyav analizi ve Noir Cat premium özellikleri açık." : `Bugün kalan ücretsiz hakkın: ${remainingDailyAnalyses ?? 3}/3`}
          </Text>
        </View>
      </PremiumCard>

      <View style={styles.grid}>
        <Action icon="mic" title="Miyav Analizi" route="/(tabs)/analysis" />
        <Action icon="chatbubble-ellipses" title="Kedime Söyle" route="/talk-to-cat" />
        <Action icon="musical-note" title="Sesler" route="/(tabs)/sounds" />
        <Action icon="camera" title="Foto Analizi" route="/photo-analysis" locked={!isPremium} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { flexDirection: "row", alignItems: "center", gap: 16 },
  avatar: { width: 84, height: 84, borderRadius: 42, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(214,168,90,0.08)" },
  catName: { color: colors.cream, fontSize: 34, fontWeight: "900" },
  meta: { color: colors.gray, fontSize: 14 },
  mood: { color: colors.cream, marginTop: 8, fontSize: 14 },
  section: { color: colors.cream, fontSize: 20, fontWeight: "800", marginBottom: 10 },
  prediction: { color: colors.goldLight, fontSize: 36, fontWeight: "900", marginBottom: 8 },
  description: { color: colors.gray, fontSize: 15, lineHeight: 23 },
  quotaCard: { flexDirection: "row", alignItems: "center", gap: 12 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 14 },
  action: { width: "48%", minHeight: 108, borderRadius: 24, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, padding: 16, justifyContent: "space-between" },
  lockedAction: { opacity: 0.72 },
  actionTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  actionTitle: { color: colors.cream, fontSize: 15, fontWeight: "800" }
});
