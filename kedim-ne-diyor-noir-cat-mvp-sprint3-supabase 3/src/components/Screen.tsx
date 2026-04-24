import { LinearGradient } from "expo-linear-gradient";
import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";

type Props = PropsWithChildren<{ scroll?: boolean; style?: ViewStyle }>;

export function Screen({ children, scroll = true, style }: Props) {
  const content = scroll ? (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.content, style]}>
      {children}
    </ScrollView>
  ) : (
    <>{children}</>
  );

  return (
    <LinearGradient colors={[colors.background, "#090705", "#020202"]} style={styles.root}>
      <SafeAreaView style={styles.safe}>{content}</SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  content: { padding: 18, paddingBottom: 110 }
});
