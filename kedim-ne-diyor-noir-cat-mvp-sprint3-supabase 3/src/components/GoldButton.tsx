import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "@/constants/theme";

type Props = { title: string; onPress?: () => void; variant?: "gold" | "outline"; disabled?: boolean };

export function GoldButton({ title, onPress, variant = "gold", disabled = false }: Props) {
  if (variant === "outline") {
    return (
      <Pressable disabled={disabled} onPress={onPress} style={[styles.outline, disabled && styles.disabled]}>
        <Text style={[styles.outlineText, disabled && styles.disabledText]}>{title}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable disabled={disabled} onPress={onPress}>
      <LinearGradient colors={[colors.goldLight, colors.gold]} style={[styles.button, disabled && styles.disabled]}>
        <Text style={[styles.text, disabled && styles.disabledText]}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 52, borderRadius: 999, alignItems: "center", justifyContent: "center", paddingHorizontal: 22 },
  text: { color: "#1A1207", fontSize: 16, fontWeight: "800" },
  outline: { minHeight: 48, borderRadius: 999, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center", paddingHorizontal: 22 },
  outlineText: { color: colors.goldLight, fontSize: 15, fontWeight: "700" },
  disabled: { opacity: 0.45 },
  disabledText: { color: colors.muted }
});
