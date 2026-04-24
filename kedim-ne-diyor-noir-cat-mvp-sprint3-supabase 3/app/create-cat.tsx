import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput } from "react-native";
import { GoldButton } from "@/components/GoldButton";
import { PremiumCard } from "@/components/PremiumCard";
import { Screen } from "@/components/Screen";
import { colors } from "@/constants/theme";
import { createCatProfile } from "@/services/catService";
import { useAppStore } from "@/store/appStore";

export default function CreateCatProfileScreen() {
  const [name, setName] = useState("Mia");
  const [breed, setBreed] = useState("British Shorthair");
  const [loading, setLoading] = useState(false);
  const setCat = useAppStore((s) => s.setCat);

  async function submit() {
    setLoading(true);
    const { data, error, demo } = await createCatProfile({
      name,
      breed,
      age: 2,
      weight: 4.8,
      food_type: "Kuru mama",
      notes: demo ? "Demo mod" : "Supabase kaydı"
    });

    setLoading(false);

    if (error || !data) {
      Alert.alert("Kayıt hatası", error?.message || "Kedi profili kaydedilemedi.");
      return;
    }

    setCat(data);
    router.replace("/(tabs)/home");
  }

  return (
    <Screen>
      <Text style={styles.title}>Kedini tanıyalım</Text>
      <Text style={styles.subtitle}>Bu profil Supabase veritabanına kaydedilecek. .env yoksa demo modda çalışır.</Text>

      <PremiumCard>
        <Text style={styles.label}>Kedi adı</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} placeholderTextColor={colors.muted} />
        <Text style={styles.label}>Cins</Text>
        <TextInput value={breed} onChangeText={setBreed} style={styles.input} placeholderTextColor={colors.muted} />
        {loading ? <ActivityIndicator color={colors.gold} /> : <GoldButton title="Profili Kaydet" onPress={submit} />}
      </PremiumCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.cream, fontSize: 36, fontWeight: "900", marginBottom: 8 },
  subtitle: { color: colors.gray, fontSize: 16, lineHeight: 24, marginBottom: 24 },
  label: { color: colors.goldLight, fontWeight: "800", marginBottom: 8 },
  input: { height: 54, borderRadius: 18, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", color: colors.white, paddingHorizontal: 16, marginBottom: 16, backgroundColor: colors.surface2 }
});
