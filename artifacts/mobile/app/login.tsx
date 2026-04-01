import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/lib/auth";
import Colors from "@/constants/colors";

const C = Colors.light;

const VOLLEYBALL_POSITIONS = [
  { top: "12%", left: "8%", size: 18, opacity: 0.06 },
  { top: "20%", right: "6%", size: 28, opacity: 0.08 },
  { top: "38%", left: "4%", size: 22, opacity: 0.05 },
  { top: "55%", right: "10%", size: 16, opacity: 0.07 },
  { top: "70%", left: "14%", size: 24, opacity: 0.06 },
  { top: "80%", right: "4%", size: 20, opacity: 0.05 },
];

function VolleyballDecor({ style }: { style: object }) {
  return (
    <View style={[styles.decorBall, style]}>
      <Ionicons name="ellipse" size={(style as any).width} color="white" />
    </View>
  );
}

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
        colors={["transparent", "rgba(191,13,62,0.18)", "transparent"]}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 1, y: 0.7 }}
        style={StyleSheet.absoluteFill}
      />

      {VOLLEYBALL_POSITIONS.map((pos, i) => (
        <View
          key={i}
          style={[
            styles.decorOrb,
            {
              top: pos.top as any,
              left: (pos as any).left,
              right: (pos as any).right,
              width: pos.size * 4,
              height: pos.size * 4,
              borderRadius: pos.size * 2,
              opacity: pos.opacity,
            },
          ]}
        />
      ))}

      <View style={[styles.content, { paddingTop: insets.top + 60, paddingBottom: insets.bottom + 40 }]}>
        <View style={styles.logoSection}>
          <View style={styles.logoRing}>
            <View style={styles.logoInner}>
              <Text style={styles.logoEmoji}>🏐</Text>
            </View>
          </View>
          <Text style={styles.appName}>Spike</Text>
          <Text style={styles.appTagline}>Your volleyball universe</Text>
        </View>

        <View style={styles.featureList}>
          {[
            { icon: "flash", text: "Live match scores & play-by-play" },
            { icon: "trophy", text: "VNL 2026 standings & results" },
            { icon: "person", text: "Player stats & team rosters" },
            { icon: "medal", text: "LA28 Olympics coverage" },
          ].map((item) => (
            <View key={item.icon} style={styles.featureItem}>
              <View style={styles.featureIconWrap}>
                <Ionicons name={item.icon as any} size={16} color={C.accent} />
              </View>
              <Text style={styles.featureText}>{item.text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.authSection}>
          <Pressable
            style={({ pressed }) => [styles.loginButton, pressed && styles.loginButtonPressed]}
            onPress={login}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Ionicons name="log-in-outline" size={20} color="#fff" />
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
  decorOrb: {
    position: "absolute",
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "space-between",
  },
  logoSection: {
    alignItems: "center",
    gap: 12,
  },
  logoRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: "rgba(191,13,62,0.4)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(191,13,62,0.1)",
  },
  logoInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(191,13,62,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoEmoji: {
    fontSize: 36,
  },
  appName: {
    fontSize: 42,
    color: "#fff",
    fontFamily: "Inter_700Bold",
    letterSpacing: -1,
  },
  appTagline: {
    fontSize: 16,
    color: "rgba(255,255,255,0.55)",
    fontFamily: "Inter_400Regular",
    letterSpacing: 0.3,
  },
  featureList: {
    gap: 14,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  featureIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(191,13,62,0.12)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(191,13,62,0.2)",
  },
  featureText: {
    fontSize: 15,
    color: "rgba(255,255,255,0.8)",
    fontFamily: "Inter_400Regular",
  },
  authSection: {
    gap: 16,
  },
  loginButton: {
    backgroundColor: C.accent,
    borderRadius: 16,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: C.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
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
