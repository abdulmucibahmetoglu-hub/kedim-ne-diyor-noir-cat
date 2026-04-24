import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { GoldButton } from "@/components/GoldButton";
import { PremiumCard } from "@/components/PremiumCard";
import { Screen } from "@/components/Screen";
import { colors } from "@/constants/theme";
import { useAppStore } from "@/store/appStore";

const features = ["Sınırsız miyav analizi", "Kediye özel AI hafıza", "7+ gün analiz geçmişi", "Foto/video analiz", "Reklamsız Noir Cat deneyimi"];

const plans = [
  { title: "Aylık", price: "149,99 TL" },
  { title: "Yıllık", price: "999,00 TL", badge: "En Popüler" },
  { title: "Ömür Boyu", price: "1.999,00 TL" }
];

export default function PremiumScreen() {
  const setPremium = useAppStore((s) => s.setPremium);
  const restorePremium = useAppStore((s) => s.restorePremium);
  const isPremium = useAppStore((s) => s.isPremium);

  async function activatePremium() {
    await setPremium(true);
    Alert.alert("Premium aktif", "Mock ödeme tamamlandı. Noir Cat Premium özellikleri açıldı.");
    router.back();
  }

  async function restore() {
    await restorePremium();
    Alert.alert("Satın alma geri yüklendi", "Mock restore tamamlandı. Premium özellikler açık.");
    router.back();
  }

  return (
    <Screen>
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
        <Pressable key={plan.title} onPress={activatePremium}>
          <PremiumCard style={[styles.planCard, plan.badge && styles.popularPlan]}>
            <View>
              <Text style={styles.plan}>{plan.title}</Text>
              <Text style={styles.price}>{plan.price}</Text>
            </View>
            {plan.badge && <Text style={styles.badge}>{plan.badge}</Text>}
          </PremiumCard>
        </Pressable>
      ))}
      <GoldButton title="3 Gün Ücretsiz Dene" onPress={activatePremium} />
      <GoldButton title="Satın almayı geri yükle" variant="outline" onPress={restore} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.cream, fontSize: 34, fontWeight: "900", marginBottom: 10 },
  subtitle: { color: colors.gray, fontSize: 16, lineHeight: 24, marginBottom: 20 },
  activeCard: { flexDirection: "row", alignItems: "center", gap: 10 },
  activeText: { color: colors.cream, fontSize: 16, fontWeight: "800" },
  feature: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 12 },
  featureText: { color: colors.cream, fontSize: 16 },
  planCard: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  popularPlan: { borderColor: colors.gold },
  plan: { color: colors.goldLight, fontSize: 22, fontWeight: "900" },
  price: { color: colors.cream, fontSize: 30, fontWeight: "900", marginTop: 8 },
  badge: { color: "#1A1207", backgroundColor: colors.goldLight, borderRadius: 999, overflow: "hidden", paddingHorizontal: 12, paddingVertical: 6, fontWeight: "900" }
});
