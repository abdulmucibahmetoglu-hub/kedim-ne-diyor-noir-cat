import { LinearGradient } from "expo-linear-gradient";
import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { colors, radius, shadow } from "@/constants/theme";

type Props = PropsWithChildren<{ style?: StyleProp<ViewStyle> }>;

export function PremiumCard({ children, style }: Props) {
  return (
    <LinearGradient
      colors={["rgba(255,255,255,0.055)", "rgba(214,168,90,0.075)", "rgba(255,255,255,0.025)"]}
      style={[styles.card, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginBottom: 14,
    ...shadow
  }
});
