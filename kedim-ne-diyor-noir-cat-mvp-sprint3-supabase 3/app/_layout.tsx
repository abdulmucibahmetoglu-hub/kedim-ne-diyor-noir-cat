import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { colors } from "@/constants/theme";
import { useAppStore } from "@/store/appStore";

export default function RootLayout() {
  const loadPremiumState = useAppStore((s) => s.loadPremiumState);

  useEffect(() => {
    loadPremiumState();
  }, [loadPremiumState]);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} />
    </GestureHandlerRootView>
  );
}
