import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GoldButton } from "@/components/GoldButton";
import { PremiumCard } from "@/components/PremiumCard";
import { Screen } from "@/components/Screen";
import { colors } from "@/constants/theme";
import { useAppStore } from "@/store/appStore";

const features = ["Sınırsız miyav analizi", "Kediye özel AI hafıza", "30/90 gün geçmiş", "Foto/video analiz", "Reklamsız deneyim"];

export default function PremiumScreen() {
  const setPremium = useAppStore((s) => s.setPremium);

  return (
    <Screen>
      <Text style={styles.title}>Mia’yı gerçekten tanımaya başla</Text>
      <Text style={styles.subtitle}>Sınırsız analiz, AI hafıza, duygu haritası ve reklamsız Noir Cat deneyimi.</Text>
      <PremiumCard>
        {features.map((item) => (
          <View key={item} style={styles.feature}>
            <Ionicons name="checkmark-circle" size={19} color={colors.goldLight} />
            <Text style={styles.featureText}>{item}</Text>
          </View>
        ))}
      </PremiumCard>
      <PremiumCard>
        <Text style={styles.plan}>Yıllık Premium</Text>
        <Text style={styles.price}>999,00 TL</Text>
      </PremiumCard>
      <GoldButton title="3 Gün Ücretsiz Dene" onPress={() => setPremium(true)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.cream, fontSize: 34, fontWeight: "900", marginBottom: 10 },
  subtitle: { color: colors.gray, fontSize: 16, lineHeight: 24, marginBottom: 20 },
  feature: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 12 },
  featureText: { color: colors.cream, fontSize: 16 },
  plan: { color: colors.goldLight, fontSize: 22, fontWeight: "900", textAlign: "center" },
  price: { color: colors.cream, fontSize: 34, fontWeight: "900", textAlign: "center", marginTop: 8 }
});
