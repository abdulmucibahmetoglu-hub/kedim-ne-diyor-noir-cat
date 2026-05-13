import { useEffect, useState } from "react";
import { Alert, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { GoldButton } from "@/components/GoldButton";
import { PremiumCard } from "@/components/PremiumCard";
import { Screen } from "@/components/Screen";
import { colors } from "@/constants/theme";
import { getPremiumPlans, isDeveloperPremiumDemoAvailable } from "@/services/premiumService";
import type { PremiumPlan, PremiumPlanId } from "@/services/premiumService";
import { useAppStore } from "@/store/appStore";

const privacyUrl =
  "https://raw.githubusercontent.com/abdulmucibahmetoglu-hub/kedim-ne-diyor-noir-cat/main/kedim-ne-diyor-noir-cat-mvp-sprint3-supabase%203/store/app-store-ready/privacy-policy-tr.html";
const termsUrl =
  "https://raw.githubusercontent.com/abdulmucibahmetoglu-hub/kedim-ne-diyor-noir-cat/main/kedim-ne-diyor-noir-cat-mvp-sprint3-supabase%203/store/app-store-ready/terms-of-use-tr.html";

const features = ["Sınırsız miyav analizi", "Kediye özel AI hafıza", "7+ gün analiz geçmişi", "Foto/video analiz", "Reklamsız Noir Cat deneyimi"];

type LoadingKey = PremiumPlanId | "trial" | "restore" | "demo" | null;

export default function PremiumScreen() {
  const purchasePremium = useAppStore((s) => s.purchasePremium);
  const restorePremium = useAppStore((s) => s.restorePremium);
  const activateDeveloperPremium = useAppStore((s) => s.activateDeveloperPremium);
  const isPremium = useAppStore((s) => s.isPremium);
  const [plans, setPlans] = useState<PremiumPlan[]>([]);
  const [loadingKey, setLoadingKey] = useState<LoadingKey>(null);
  const [showDeveloperDemo, setShowDeveloperDemo] = useState(false);

  useEffect(() => {
    setShowDeveloperDemo(isDeveloperPremiumDemoAvailable());
    getPremiumPlans().then(setPlans).catch(() => setPlans([]));
  }, []);

  async function buy(planId: PremiumPlanId, source: LoadingKey = planId) {
    setLoadingKey(source);
    const result = await purchasePremium(planId);
    setLoadingKey(null);

    if (result.status === "cancelled") return;

    if (result.isPremium) {
      Alert.alert("Premium aktif", result.message);
      return;
    }

    Alert.alert("Satın alma tamamlanamadı", result.message);
  }

  async function restore() {
    setLoadingKey("restore");
    const result = await restorePremium();
    setLoadingKey(null);

    if (result.isPremium) {
      Alert.alert("Satın alma geri yüklendi", result.message);
      return;
    }

    Alert.alert("Geri yükleme tamamlanamadı", result.message);
  }

  async function activateDemo() {
    setLoadingKey("demo");
    const result = await activateDeveloperPremium();
    setLoadingKey(null);
    Alert.alert(result.isPremium ? "Demo premium aktif" : "Demo premium kullanılamıyor", result.message);
  }

  function openUrl(url: string) {
    Linking.openURL(url).catch(() => Alert.alert("Bağlantı açılamadı", "Lütfen daha sonra tekrar dene."));
  }

  const yearlyPlan = plans.find((plan) => plan.id === "yearly");

  return (
    <Screen>
      <View style={styles.topBar}>
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color={colors.goldLight} />
        </Pressable>
        <Text style={styles.topLabel}>Premium Noir Cat</Text>
      </View>

      <Text style={styles.title}>Mia’yı gerçekten tanımaya başla</Text>
      <Text style={styles.subtitle}>Sınırsız miyav analizi, kediye özel AI hafıza, duygu haritası ve reklamsız Noir Cat deneyimi.</Text>

      {isPremium && (
        <PremiumCard style={styles.activeCard}>
          <Ionicons name="checkmark-circle" size={24} color={colors.success} />
          <Text style={styles.activeText}>Premium şu anda aktif.</Text>
        </PremiumCard>
      )}

      <PremiumCard>
        {features.map((item) => (
          <View key={item} style={styles.feature}>
            <Ionicons name="checkmark-circle" size={19} color={colors.goldLight} />
            <Text style={styles.featureText}>{item}</Text>
          </View>
        ))}
      </PremiumCard>

      {plans.map((plan) => (
        <Pressable key={plan.id} disabled={Boolean(loadingKey) || isPremium} onPress={() => buy(plan.id)} style={({ pressed }) => pressed && styles.pressed}>
          <PremiumCard style={[styles.planCard, plan.badge && styles.popularPlan]}>
            <View style={styles.planCopy}>
              <View style={styles.planHeader}>
                <Text style={styles.plan}>{plan.title}</Text>
                {plan.badge && <Text style={styles.badge}>{plan.badge}</Text>}
              </View>
              <Text style={styles.period}>{plan.period}</Text>
            </View>
            <View style={styles.priceBlock}>
              <Text style={styles.price}>{plan.price}</Text>
              <Text style={styles.purchaseState}>{loadingKey === plan.id ? "Hazırlanıyor..." : "Satın al"}</Text>
            </View>
          </PremiumCard>
        </Pressable>
      ))}

      <GoldButton title={loadingKey === "trial" ? "App Store hazırlanıyor..." : "3 Gün Ücretsiz Dene"} disabled={Boolean(loadingKey) || isPremium} onPress={() => buy(yearlyPlan?.id ?? "yearly", "trial")} />
      <GoldButton title={loadingKey === "restore" ? "Geri yükleniyor..." : "Satın almayı geri yükle"} variant="outline" disabled={Boolean(loadingKey)} onPress={restore} />

      <Text style={styles.legalText}>
        Satın alma App Store hesabın üzerinden güvenli şekilde yapılır. Abonelikler App Store ayarlarından yönetilir; iptal ve geri ödeme App Store kurallarına tabidir.
      </Text>

      <View style={styles.legalLinks}>
        <Pressable onPress={() => openUrl(privacyUrl)}>
          <Text style={styles.link}>Gizlilik Politikası</Text>
        </Pressable>
        <Text style={styles.dot}>•</Text>
        <Pressable onPress={() => openUrl(termsUrl)}>
          <Text style={styles.link}>Kullanım Şartları</Text>
        </Pressable>
      </View>

      {showDeveloperDemo && (
        <PremiumCard style={styles.demoCard}>
          <Text style={styles.demoTitle}>Development demo modu</Text>
          <Text style={styles.demoText}>RevenueCat API key yoksa bu buton yalnızca geliştirme sırasında premium kilitlerini test etmek içindir. App Store build’inde görünmez.</Text>
          <GoldButton title={loadingKey === "demo" ? "Demo açılıyor..." : "Demo premiumu aç"} variant="outline" disabled={Boolean(loadingKey)} onPress={activateDemo} />
        </PremiumCard>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 18 },
  backButton: { width: 42, height: 42, borderRadius: 21, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.04)" },
  topLabel: { color: colors.goldLight, fontSize: 15, fontWeight: "800" },
  title: { color: colors.cream, fontSize: 34, fontWeight: "900", marginBottom: 10 },
  subtitle: { color: colors.gray, fontSize: 16, lineHeight: 24, marginBottom: 20 },
  activeCard: { flexDirection: "row", alignItems: "center", gap: 10 },
  activeText: { color: colors.cream, fontSize: 16, fontWeight: "800" },
  feature: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 12 },
  featureText: { color: colors.cream, fontSize: 16, flex: 1 },
  pressed: { opacity: 0.78 },
  planCard: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 14 },
  popularPlan: { borderColor: colors.gold },
  planCopy: { flex: 1 },
  planHeader: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 8 },
  plan: { color: colors.goldLight, fontSize: 22, fontWeight: "900" },
  period: { color: colors.gray, fontSize: 13, marginTop: 5 },
  priceBlock: { alignItems: "flex-end" },
  price: { color: colors.cream, fontSize: 24, fontWeight: "900", textAlign: "right" },
  purchaseState: { color: colors.goldLight, fontSize: 12, fontWeight: "800", marginTop: 8 },
  badge: { color: "#1A1207", backgroundColor: colors.goldLight, borderRadius: 999, overflow: "hidden", paddingHorizontal: 10, paddingVertical: 5, fontSize: 12, fontWeight: "900" },
  legalText: { color: colors.muted, fontSize: 12, lineHeight: 18, textAlign: "center", marginTop: 16, marginBottom: 12 },
  legalLinks: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 18 },
  link: { color: colors.goldLight, fontSize: 13, fontWeight: "800" },
  dot: { color: colors.border },
  demoCard: { marginTop: 4 },
  demoTitle: { color: colors.goldLight, fontSize: 16, fontWeight: "900", marginBottom: 8 },
  demoText: { color: colors.gray, fontSize: 13, lineHeight: 19, marginBottom: 14 }
});
