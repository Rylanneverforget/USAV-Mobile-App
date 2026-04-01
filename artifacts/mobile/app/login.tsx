import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/lib/auth";
import Colors from "@/constants/colors";
import {
  VolleyballSvg,
  SpikeIcon,
  NetCourtIcon,
  JerseyIcon,
  OlympicsIcon,
  VolleyballBgDecor,
} from "@/components/VolleyballIcons";

const C = Colors.light;

const BG_DECORS = [
  { top: "5%", left: "-4%", size: 110 },
  { top: "18%", right: "-8%", size: 90 },
  { top: "42%", left: "-6%", size: 70 },
  { top: "60%", right: "-2%", size: 80 },
  { top: "78%", left: "8%", size: 60 },
];

const FEATURES = [
  {
    Icon: SpikeIcon,
    label: "Spike",
    text: "Live match scores & play-by-play",
    accent: C.accent,
  },
  {
    Icon: NetCourtIcon,
    label: "Court",
    text: "VNL 2026 standings & results",
    accent: C.accent,
  },
  {
    Icon: JerseyIcon,
    label: "Jersey",
    text: "Player stats & team rosters",
    accent: C.accent,
  },
  {
    Icon: OlympicsIcon,
    label: "Olympics",
    text: "LA28 Olympics coverage",
    accent: C.accent,
  },
];

export default function LoginScreen() {
  const { login, isLoading } = useAuth();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#001240", "#001F5B", "#002080"]}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.7, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={["transparent", "rgba(191,13,62,0.16)", "transparent"]}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 1, y: 0.7 }}
        style={StyleSheet.absoluteFill}
      />

      {BG_DECORS.map((d, i) => (
        <View
          key={i}
          style={[
            styles.bgDecor,
            {
              top: d.top as any,
              left: (d as any).left,
              right: (d as any).right,
            },
          ]}
        >
          <VolleyballBgDecor size={d.size} opacity={0.07} />
        </View>
      ))}

      <View
        style={[
          styles.content,
          { paddingTop: insets.top + 52, paddingBottom: insets.bottom + 36 },
        ]}
      >
        <View style={styles.logoSection}>
          <View style={styles.logoRing}>
            <View style={styles.logoInner}>
              <VolleyballSvg size={52} color="#fff" />
            </View>
          </View>
          <Text style={styles.appName}>Spike</Text>
          <Text style={styles.appTagline}>Your volleyball universe</Text>
        </View>

        <View style={styles.featureGrid}>
          {FEATURES.map(({ Icon, label, text, accent }) => (
            <View key={label} style={styles.featureTile}>
              <View style={styles.featureTileIcon}>
                <Icon size={28} color={accent} opacity={1} />
              </View>
              <Text style={styles.featureTileText}>{text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.authSection}>
          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.loginButtonPressed,
            ]}
            onPress={login}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <VolleyballSvg size={22} color="#fff" />
                <Text style={styles.loginButtonText}>Sign in to continue</Text>
              </>
            )}
          </Pressable>

          <Text style={styles.disclaimer}>
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Powered by{" "}
            <Text style={styles.footerBrand}>FIVB</Text>
            {"  ·  "}
            <Text style={styles.footerBrand}>VNL 2026</Text>
            {"  ·  "}
            <Text style={styles.footerBrand}>LA28</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.primary,
  },
  bgDecor: {
    position: "absolute",
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "space-between",
  },
  logoSection: {
    alignItems: "center",
    gap: 10,
  },
  logoRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "rgba(191,13,62,0.45)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,32,128,0.5)",
  },
  logoInner: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "rgba(191,13,62,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  appName: {
    fontSize: 42,
    color: "#fff",
    fontFamily: "Inter_700Bold",
    letterSpacing: -1,
  },
  appTagline: {
    fontSize: 15,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "Inter_400Regular",
    letterSpacing: 0.3,
  },
  featureGrid: {
    gap: 10,
  },
  featureTile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(191,13,62,0.18)",
  },
  featureTileIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(191,13,62,0.1)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(191,13,62,0.25)",
    flexShrink: 0,
  },
  featureTileText: {
    flex: 1,
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
  },
  authSection: {
    gap: 14,
  },
  loginButton: {
    backgroundColor: C.accent,
    borderRadius: 16,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    shadowColor: C.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 8,
  },
  loginButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  loginButtonText: {
    fontSize: 17,
    color: "#fff",
    fontFamily: "Inter_600SemiBold",
  },
  disclaimer: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 18,
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.25)",
    fontFamily: "Inter_400Regular",
  },
  footerBrand: {
    color: "rgba(255,255,255,0.4)",
    fontFamily: "Inter_500Medium",
  },
});
