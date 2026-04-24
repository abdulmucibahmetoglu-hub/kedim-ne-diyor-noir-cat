import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text } from "react-native";
import { GoldButton } from "@/components/GoldButton";
import { PremiumCard } from "@/components/PremiumCard";
import { Screen } from "@/components/Screen";
import { colors } from "@/constants/theme";

export default function PhotoAnalysisScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Foto / Video Analizi</Text>
      <Text style={styles.subtitle}>Kedinin vücut dili, kulak ve göz pozisyonuna göre yorumlanır.</Text>
      <PremiumCard style={styles.preview}>
        <Ionicons name="camera" size={64} color={colors.goldLight} />
        <Text style={styles.previewText}>Fotoğraf yükle veya kamera aç</Text>
      </PremiumCard>
      <PremiumCard>
        <Text style={styles.result}>Rahat & Meraklı</Text>
        <Text style={styles.text}>Kulaklar öne dönük, göz bebekleri normal, vücut dili rahat görünüyor. Oyun veya keşif modunda olabilir.</Text>
      </PremiumCard>
      <GoldButton title="Raporu Kaydet" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.cream, fontSize: 34, fontWeight: "900" },
  subtitle: { color: colors.gray, fontSize: 16, lineHeight: 24, marginBottom: 22 },
  preview: { minHeight: 260, alignItems: "center", justifyContent: "center" },
  previewText: { color: colors.goldLight, marginTop: 14, fontWeight: "800" },
  result: { color: colors.goldLight, fontSize: 28, fontWeight: "900", marginBottom: 10 },
  text: { color: colors.gray, fontSize: 16, lineHeight: 24 }
});
