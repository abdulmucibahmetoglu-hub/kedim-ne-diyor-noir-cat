import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { GoldButton } from "@/components/GoldButton";
import { Screen } from "@/components/Screen";
import { colors } from "@/constants/theme";

export default function SplashScreen() {
  return (
    <Screen scroll={false} style={styles.root}>
      <View style={styles.center}>
        <View style={styles.logoCircle}>
          <Ionicons name="paw" size={52} color={colors.gold} />
        </View>
        <Text style={styles.title}>Kedim Ne Diyor?</Text>
        <Text style={styles.subtitle}>Supabase bağlantılı Noir Cat MVP.</Text>
        <GoldButton title="Başla" onPress={() => router.replace("/create-cat")} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 24 },
  center: { flex: 1, justifyContent: "center", gap: 22 },
  logoCircle: { width: 118, height: 118, borderRadius: 59, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center", alignSelf: "center", backgroundColor: "rgba(214,168,90,0.08)" },
  title: { color: colors.goldLight, fontSize: 42, fontWeight: "900", textAlign: "center" },
  subtitle: { color: colors.cream, fontSize: 17, lineHeight: 26, textAlign: "center", marginBottom: 20 }
});
