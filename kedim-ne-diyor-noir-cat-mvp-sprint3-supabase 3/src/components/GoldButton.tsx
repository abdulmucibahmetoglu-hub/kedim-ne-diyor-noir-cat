import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "@/constants/theme";

type Props = { title: string; onPress?: () => void; variant?: "gold" | "outline" };

export function GoldButton({ title, onPress, variant = "gold" }: Props) {
  if (variant === "outline") {
    return (
      <Pressable onPress={onPress} style={styles.outline}>
        <Text style={styles.outlineText}>{title}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress}>
      <LinearGradient colors={[colors.goldLight, colors.gold]} style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 52, borderRadius: 999, alignItems: "center", justifyContent: "center", paddingHorizontal: 22 },
  text: { color: "#1A1207", fontSize: 16, fontWeight: "800" },
  outline: { minHeight: 48, borderRadius: 999, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center", paddingHorizontal: 22 },
  outlineText: { color: colors.goldLight, fontSize: 15, fontWeight: "700" }
});
