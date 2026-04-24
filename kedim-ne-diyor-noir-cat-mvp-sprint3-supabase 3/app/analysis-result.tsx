import { router, useLocalSearchParams } from "expo-router";
import { Alert, StyleSheet, Text, View } from "react-native";
import { GoldButton } from "@/components/GoldButton";
import { PremiumCard } from "@/components/PremiumCard";
import { Screen } from "@/components/Screen";
import { colors } from "@/constants/theme";
import { useAppStore } from "@/store/appStore";
import { updateAnalysisFeedback } from "@/services/analysisService";

export default function AnalysisResultScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const analysis = useAppStore((s) => s.analyses.find((item) => item.id === id) ?? s.analyses[0]);
  const setFeedback = useAppStore((s) => s.setFeedback);

  async function feedback(value: "correct" | "wrong") {
    setFeedback(analysis.id, value);
    const { error } = await updateAnalysisFeedback(analysis.id, value);
    if (error) Alert.alert("Geri bildirim kaydedilemedi", error.message);
  }

  return (
    <Screen>
      <Text style={styles.title}>Analiz Sonucu</Text>
      <PremiumCard>
        <Text style={styles.label}>Tahmin</Text>
        <Text style={styles.prediction}>{analysis.prediction}</Text>
        <Text style={styles.green}>%{analysis.confidence} güven</Text>
        <Text style={styles.meta}>Bağlam: {analysis.context}</Text>
        <Text style={styles.meta}>Kayıt süresi: {analysis.duration || 0} sn</Text>
      </PremiumCard>

      <PremiumCard>
        <Text style={styles.section}>Açıklama</Text>
        <Text style={styles.text}>{analysis.explanation}</Text>
      </PremiumCard>

      <PremiumCard>
        <Text style={styles.section}>Önerimiz</Text>
        <Text style={styles.text}>{analysis.suggestion}</Text>
      </PremiumCard>

      <View style={styles.row}>
        <GoldButton title="Doğruydu" onPress={() => feedback("correct")} />
        <GoldButton title="Değildi" variant="outline" onPress={() => feedback("wrong")} />
      </View>

      <GoldButton title="Ana Sayfaya Dön" onPress={() => router.replace("/(tabs)/home")} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.cream, fontSize: 38, fontWeight: "900", marginBottom: 22 },
  label: { color: colors.gray, fontSize: 15 },
  prediction: { color: colors.goldLight, fontSize: 34, fontWeight: "900", marginVertical: 4 },
  green: { color: colors.success, fontWeight: "800", marginBottom: 6 },
  meta: { color: colors.gray, marginTop: 4 },
  section: { color: colors.cream, fontSize: 19, fontWeight: "800", marginBottom: 10 },
  text: { color: colors.gray, fontSize: 16, lineHeight: 24 },
  row: { flexDirection: "row", gap: 12, marginVertical: 8 }
});
