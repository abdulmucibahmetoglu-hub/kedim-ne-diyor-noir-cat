import { Audio } from "expo-av";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GoldButton } from "@/components/GoldButton";
import { Header } from "@/components/Header";
import { PremiumCard } from "@/components/PremiumCard";
import { Screen } from "@/components/Screen";
import { colors } from "@/constants/theme";
import { generateMockAnalysis } from "@/utils/analyzer";
import { useAppStore } from "@/store/appStore";
import { saveAnalysis } from "@/services/analysisService";

const contexts = ["Mama", "Oyun", "Gece", "Kapı önü", "İlgi", "Stres", "Bilmiyorum"];

export default function AnalysisScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [context, setContext] = useState("İlgi");
  const [seconds, setSeconds] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const addAnalysis = useAppStore((s) => s.addAnalysis);
  const cat = useAppStore((s) => s.cat);
  const isPremium = useAppStore((s) => s.isPremium);
  const remainingDailyAnalyses = useAppStore((s) => s.remainingDailyAnalyses);
  const refreshDailyAnalyses = useAppStore((s) => s.refreshDailyAnalyses);
  const consumeDailyAnalysis = useAppStore((s) => s.consumeDailyAnalysis);

  useEffect(() => {
    refreshDailyAnalyses();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [refreshDailyAnalyses]);

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Mikrofon izni gerekli", "Miyav kaydı için mikrofon izni vermen gerekiyor.");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      });

      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(recording);
      setRecordingUri(null);
      setSeconds(0);
      if (timer.current) clearInterval(timer.current);
      timer.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch (error) {
      Alert.alert("Kayıt başlatılamadı", "Mikrofon kaydı başlatılırken sorun oluştu.");
    }
  }

  async function stopRecording() {
    if (!recording) return;
    if (timer.current) clearInterval(timer.current);
    timer.current = null;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecordingUri(uri || null);
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false, playsInSilentModeIOS: true });
    } catch {
      Alert.alert("Kayıt durdurulamadı", "Ses kaydı kapatılırken bir sorun oluştu. Lütfen tekrar dene.");
    } finally {
      setRecording(null);
    }
  }

  async function analyze() {
    if (recording) {
      Alert.alert("Kayıt devam ediyor", "Analizden önce kaydı durdurmalısın.");
      return;
    }

    if (!isPremium && remainingDailyAnalyses !== null && remainingDailyAnalyses <= 0) {
      router.push("/premium");
      return;
    }

    const input = generateMockAnalysis(context, cat.id, recordingUri, seconds);
    const { data, error } = await saveAnalysis(input);
    if (error || !data) {
      Alert.alert("Kayıt hatası", error?.message || "Analiz Supabase’e kaydedilemedi.");
      return;
    }

    addAnalysis(data);
    await consumeDailyAnalysis();
    router.push({ pathname: "/analysis-result", params: { id: data.id } });
  }

  return (
    <Screen>
      <Header badge="Ses + DB" />
      <Text style={styles.title}>Miyav Analizi</Text>
      <Text style={styles.subtitle}>Gerçek ses kaydı al, sonucu Supabase’e kaydet.</Text>
      <PremiumCard style={styles.quotaCard}>
        <Ionicons name={isPremium ? "infinite" : "hourglass-outline"} size={21} color={colors.goldLight} />
        <Text style={styles.quotaText}>
          {isPremium ? "Premium: sınırsız miyav analizi" : `Bugünkü ücretsiz analiz hakkın: ${remainingDailyAnalyses ?? 3}/3`}
        </Text>
      </PremiumCard>

      <Pressable style={[styles.mic, recording && styles.micActive]} onPress={recording ? stopRecording : startRecording}>
        <Ionicons name={recording ? "stop" : "mic"} size={58} color={colors.goldLight} />
      </Pressable>
      <Text style={styles.tap}>{recording ? `Kaydediliyor: ${seconds} sn` : recordingUri ? "Kayıt hazır" : "Kaydetmek için dokun"}</Text>

      <PremiumCard>
        <Text style={styles.section}>Bağlam Seç</Text>
        <View style={styles.chips}>
          {contexts.map((item) => (
            <Pressable key={item} onPress={() => setContext(item)} style={[styles.chip, context === item && styles.activeChip]}>
              <Text style={[styles.chipText, context === item && styles.activeChipText]}>{item}</Text>
            </Pressable>
          ))}
        </View>
      </PremiumCard>

      <PremiumCard>
        <Text style={styles.section}>Dalga Formu</Text>
        <View style={styles.wave}>
          {Array.from({ length: 34 }).map((_, i) => (
            <View key={i} style={[styles.bar, { height: recording ? 12 + ((i * 13 + seconds * 4) % 46) : 14 + ((i * 5) % 34) }]} />
          ))}
        </View>
      </PremiumCard>

      <GoldButton
        title={!isPremium && remainingDailyAnalyses === 0 ? "Premium ile Sınırsız Analiz" : "Kaydı Analiz Et ve Veritabanına Kaydet"}
        onPress={analyze}
        disabled={Boolean(recording)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.cream, fontSize: 38, fontWeight: "900" },
  subtitle: { color: colors.gray, fontSize: 16, lineHeight: 24, marginBottom: 26 },
  mic: { width: 156, height: 156, borderRadius: 78, borderWidth: 1, borderColor: colors.border, alignSelf: "center", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(214,168,90,0.08)", marginBottom: 14 },
  micActive: { backgroundColor: "rgba(214,168,90,0.18)" },
  tap: { color: colors.goldLight, textAlign: "center", marginBottom: 22, fontSize: 16, fontWeight: "700" },
  quotaCard: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 14 },
  quotaText: { color: colors.cream, fontWeight: "800", flex: 1 },
  section: { color: colors.cream, fontSize: 18, fontWeight: "800", marginBottom: 16 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  chip: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 999, backgroundColor: colors.surface, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  activeChip: { borderColor: colors.gold, backgroundColor: "rgba(214,168,90,0.12)" },
  chipText: { color: colors.gray, fontWeight: "700" },
  activeChipText: { color: colors.goldLight },
  wave: { height: 72, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  bar: { width: 3, borderRadius: 3, backgroundColor: colors.gold }
});
