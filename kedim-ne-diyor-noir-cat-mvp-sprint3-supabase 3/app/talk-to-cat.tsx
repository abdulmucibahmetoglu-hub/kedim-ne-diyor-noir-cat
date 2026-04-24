import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { GoldButton } from "@/components/GoldButton";
import { PremiumCard } from "@/components/PremiumCard";
import { Screen } from "@/components/Screen";
import { colors } from "@/constants/theme";

const modes = ["Sevecen", "Oyun", "Mama Çağrısı", "Sakinleştirici"];

export default function TalkToCatScreen() {
  const [mode, setMode] = useState("Sevecen");
  const [text, setText] = useState("Seni seviyorum");
  const [generated, setGenerated] = useState(false);

  return (
    <Screen>
      <Text style={styles.title}>Kedime Söyle</Text>
      <Text style={styles.subtitle}>Yazını seçtiğin tona göre miyava çevir.</Text>

      <PremiumCard>
        <TextInput value={text} onChangeText={setText} style={styles.input} placeholderTextColor={colors.muted} />
        <View style={styles.modes}>
          {modes.map((item) => (
            <Pressable key={item} onPress={() => setMode(item)} style={[styles.mode, mode === item && styles.activeMode]}>
              <Text style={[styles.modeText, mode === item && styles.activeModeText]}>{item}</Text>
            </Pressable>
          ))}
        </View>
        <GoldButton title="Miyava Çevir" onPress={() => setGenerated(true)} />
      </PremiumCard>

      {generated && (
        <PremiumCard>
          <Text style={styles.section}>Oluşturulan Ses</Text>
          <Text style={styles.text}>“{text}” ifadesi {mode.toLowerCase()} modunda miyav formuna çevrildi.</Text>
        </PremiumCard>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.cream, fontSize: 38, fontWeight: "900" },
  subtitle: { color: colors.gray, fontSize: 16, marginBottom: 22 },
  input: { color: colors.white, backgroundColor: colors.surface2, borderRadius: 18, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  modes: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 18 },
  mode: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 16, backgroundColor: colors.surface2, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  activeMode: { borderColor: colors.gold, backgroundColor: "rgba(214,168,90,0.12)" },
  modeText: { color: colors.gray, fontWeight: "700" },
  activeModeText: { color: colors.goldLight },
  section: { color: colors.cream, fontSize: 20, fontWeight: "800", marginBottom: 10 },
  text: { color: colors.gray, fontSize: 16, lineHeight: 24 }
});
