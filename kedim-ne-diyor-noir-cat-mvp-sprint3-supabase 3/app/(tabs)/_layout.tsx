import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { colors } from "@/constants/theme";

const tabIcon = (name: keyof typeof Ionicons.glyphMap) => ({ color, size }: { color: string; size: number }) =>
  <Ionicons name={name} size={size} color={color} />;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.goldLight,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: {
          position: "absolute",
          margin: 16,
          height: 72,
          borderRadius: 28,
          backgroundColor: "rgba(17,17,17,0.96)",
          borderColor: colors.border,
          borderWidth: 1,
          paddingTop: 8
        },
        tabBarLabelStyle: { fontWeight: "700", fontSize: 12 }
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Ana Sayfa", tabBarIcon: tabIcon("home-outline") }} />
      <Tabs.Screen name="analysis" options={{ title: "Analiz", tabBarIcon: tabIcon("pulse-outline") }} />
      <Tabs.Screen name="sounds" options={{ title: "Sesler", tabBarIcon: tabIcon("musical-notes-outline") }} />
      <Tabs.Screen name="report" options={{ title: "Rapor", tabBarIcon: tabIcon("pie-chart-outline") }} />
      <Tabs.Screen name="profile" options={{ title: "Profil", tabBarIcon: tabIcon("person-outline") }} />
    </Tabs>
  );
}
