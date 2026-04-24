import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GoldButton } from "@/components/GoldButton";
import { Header } from "@/components/Header";
import { PremiumCard } from "@/components/PremiumCard";
import { Screen } from "@/components/Screen";
import { careTasks } from "@/data/mock";
import { colors } from "@/constants/theme";
import { useAppStore } from "@/store/appStore";

export default function ProfileScreen() {
  const cat = useAppStore((s) => s.cat);
  const isPremium = useAppStore((s) => s.isPremium);

  return (
    <Screen>
      <Header />
      <PremiumCard style={styles.profile}>
        <View style={styles.avatar}>
          <Ionicons name="paw" size={46} color={colors.goldLight} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{cat.name}</Text>
          <Text style={styles.meta}>{cat.breed || "Kedi"}</Text>
          <Text style={styles.meta}>{cat.age || 2} yaş • {cat.weight || 4.8} kg</Text>
        </View>
      </PremiumCard>

      <Text style={styles.title}>Bakım Takvimi</Text>
      <Pressable onPress={() => !isPremium && router.push("/premium")}>
        <PremiumCard style={styles.lockedFeature}>
          <View>
            <Text style={styles.taskTitle}>Çoklu kedi profili</Text>
            <Text style={styles.meta}>{isPremium ? "Premium ile açık" : "Premium kilitli"}</Text>
          </View>
          <Ionicons name={isPremium ? "checkmark-circle" : "lock-closed"} size={24} color={isPremium ? colors.success : colors.gold} />
        </PremiumCard>
      </Pressable>
      <Pressable onPress={() => !isPremium && router.push("/premium")}>
        <PremiumCard style={styles.lockedFeature}>
          <View>
            <Text style={styles.taskTitle}>Kediye özel AI hafıza</Text>
            <Text style={styles.meta}>{isPremium ? "Mia için kişiselleştirme açık" : "Premium kilitli"}</Text>
          </View>
          <Ionicons name={isPremium ? "checkmark-circle" : "lock-closed"} size={24} color={isPremium ? colors.success : colors.gold} />
        </PremiumCard>
      </Pressable>
      {careTasks.map((task) => (
        <PremiumCard key={task.id} style={styles.task}>
          <View>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <Text style={styles.meta}>{task.type}</Text>
          </View>
          <Ionicons name={task.status === "completed" ? "checkmark-circle" : task.status === "premium" ? "lock-closed" : "ellipse-outline"} size={24} color={task.status === "completed" ? colors.success : colors.gold} />
        </PremiumCard>
      ))}

      <GoldButton title="Premium’a Geç" onPress={() => router.push("/premium")} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  profile: { flexDirection: "row", alignItems: "center", gap: 16 },
  avatar: { width: 86, height: 86, borderRadius: 43, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(214,168,90,0.08)" },
  name: { color: colors.cream, fontSize: 34, fontWeight: "900" },
  meta: { color: colors.gray, marginTop: 4 },
  title: { color: colors.cream, fontSize: 26, fontWeight: "900", marginVertical: 14 },
  task: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 9 },
  lockedFeature: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 9 },
  taskTitle: { color: colors.cream, fontSize: 17, fontWeight: "800" }
});
