import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Header } from "@/components/Header";
import { PremiumCard } from "@/components/PremiumCard";
import { Screen } from "@/components/Screen";
import { sounds } from "@/data/mock";
import { colors } from "@/constants/theme";

export default function SoundLibraryScreen() {
  return (
    <Screen>
      <Header />
      <Text style={styles.title}>Kedi Ses Kütüphanesi</Text>
      <FlatList
        data={sounds}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PremiumCard style={styles.item}>
            <View>
              <Text style={styles.soundTitle}>{item.title}</Text>
              <Text style={styles.meta}>{item.category} • {item.duration}</Text>
            </View>
            <View style={styles.play}>
              {item.premium && <Ionicons name="lock-closed" size={15} color={colors.gold} />}
              <Ionicons name="play" size={22} color={colors.goldLight} />
            </View>
          </PremiumCard>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.cream, fontSize: 34, fontWeight: "900", marginBottom: 18 },
  item: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  soundTitle: { color: colors.cream, fontSize: 18, fontWeight: "800" },
  meta: { color: colors.gray, marginTop: 4 },
  play: { flexDirection: "row", gap: 8, alignItems: "center" }
});
