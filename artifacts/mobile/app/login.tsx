import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  Animated,
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
  NewsScrollIcon,
  VolleyballBgDecor,
} from "@/components/VolleyballIcons";

const C = Colors.light;

const BG_DECORS = [
  { top: "5%",  left: "-4%",  size: 110 },
  { top: "18%", right: "-8%", size: 90 },
  { top: "42%", left: "-6%",  size: 70 },
  { top: "60%", right: "-2%", size: 80 },
  { top: "78%", left: "8%",   size: 60 },
];

const FEATURES = [
  { Icon: SpikeIcon,    label: "Live",      text: "Live match scores & play-by-play" },
  { Icon: NetCourtIcon, label: "Standings", text: "VNL 2026 standings & results" },
  { Icon: JerseyIcon,   label: "Players",   text: "Player stats & team rosters" },
  { Icon: OlympicsIcon, label: "Olympics",  text: "LA28 Olympics coverage" },
  { Icon: NewsScrollIcon, label: "News",    text: "Breaking volleyball news" },
];

const STATUS_LABEL: Record<string, string> = {
  idle:       "Sign in to continue",
  opening:    "Opening sign-in…",
  exchanging: "Completing sign-in…",
  error:      "Sign in to continue",
};

export default function LoginScreen() {
  const { login, isLoading, isSigningIn, loginStatus, loginError, clearLoginError } = useAuth();
  const insets = useSafeAreaInsets();

  const busy = isLoading || isSigningIn;

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
            { top: d.top as any, left: (d as any).left, right: (d as any).right },
          ]}
        >
          <VolleyballBgDecor size={d.size} opacity={0.07} />
        </View>
      ))}

      <View
        style={[
          styles.content,
          { paddingTop: insets.top + 48, paddingBottom: insets.bottom + 32 },
        ]}
      >
        {/* Logo */}
        <View style={styles.logoSection}>
          <View style={styles.logoRing}>
            <View style={styles.logoInner}>
              <VolleyballSvg size={52} color="#fff" />
            </View>
          </View>
          <Text style={styles.appName}>Spike</Text>
          <Text style={styles.appTagline}>Your volleyball universe</Text>
        </View>

        {/* Feature list */}
        <View style={styles.featureGrid}>
          {FEATURES.map(({ Icon, label, text }) => (
            <View key={label} style={styles.featureTile}>
              <View style={styles.featureTileIcon}>
                <Icon size={26} color={C.accent} opacity={1} />
              </View>
              <Text style={styles.featureTileText}>{text}</Text>
            </View>
          ))}
        </View>

        {/* Auth section */}
        <View style={styles.authSection}>
          {/* Error banner */}
          {loginError && (
            <View style={styles.errorBanner}>
              <View style={styles.errorBannerLeft}>
                <Text style={styles.errorIcon}>⚠</Text>
                <Text style={styles.errorText}>{loginError}</Text>
              </View>
              <Pressable onPress={clearLoginError} hitSlop={10}>
                <Text style={styles.errorDismiss}>✕</Text>
              </Pressable>
            </View>
          )}

          {/* Status row — shown while in-progress */}
          {isSigningIn && (
            <View style={styles.statusRow}>
              <ActivityIndicator size="small" color={C.accent} />
              <Text style={styles.statusText}>{STATUS_LABEL[loginStatus]}</Text>
            </View>
          )}

          {/* Sign-in button */}
          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              loginStatus === "error" && styles.loginButtonRetry,
              busy && styles.loginButtonBusy,
              pressed && !busy && styles.loginButtonPressed,
            ]}
            onPress={() => {
              if (loginError) clearLoginError();
              login();
            }}
            disabled={isLoading}
          >
            {busy ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <VolleyballSvg size={22} color="#fff" />
                <Text style={styles.loginButtonText}>
                  {loginStatus === "error" ? "Try Again" : "Sign in to continue"}
                </Text>
              </>
            )}
          </Pressable>

          <Text style={styles.disclaimer}>
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>

        {/* Footer */}
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

  /* Logo */
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

  /* Feature tiles */
  featureGrid: {
    gap: 8,
  },
  featureTile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "rgba(191,13,62,0.16)",
  },
  featureTileIcon: {
    width: 42,
    height: 42,
    borderRadius: 11,
    backgroundColor: "rgba(191,13,62,0.1)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(191,13,62,0.22)",
    flexShrink: 0,
  },
  featureTileText: {
    flex: 1,
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
  },

  /* Auth */
  authSection: {
    gap: 12,
  },
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(232,72,85,0.12)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(232,72,85,0.35)",
    paddingHorizontal: 14,
    paddingVertical: 11,
    gap: 10,
  },
  errorBannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  errorIcon: {
    fontSize: 14,
    color: "#E84855",
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    color: "#E84855",
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },
  errorDismiss: {
    fontSize: 12,
    color: "rgba(232,72,85,0.6)",
    paddingHorizontal: 2,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.55)",
    fontFamily: "Inter_400Regular",
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
  loginButtonRetry: {
    backgroundColor: "#c41040",
  },
  loginButtonBusy: {
    opacity: 0.7,
    shadowOpacity: 0.15,
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

  /* Footer */
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
