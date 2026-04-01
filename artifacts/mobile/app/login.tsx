import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, {
  Circle,
  Ellipse,
  Line,
  Path,
  Defs,
  RadialGradient,
  Stop,
  G,
  Rect,
} from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/lib/auth";
import Colors from "@/constants/colors";

const C = Colors.light;
const ACCENT = "#BF0D3E";

// ── Hero illustration: volleyball in flight over a net ─────────────────────────
function HeroIllustration({ width = 360 }: { width?: number }) {
  const h = 280;
  const cx = width / 2;

  return (
    <Svg width={width} height={h} viewBox={`0 0 ${width} ${h}`}>
      <Defs>
        {/* Ambient court glow */}
        <RadialGradient id="glow" cx="50%" cy="60%" r="50%">
          <Stop offset="0%"  stopColor="#3A7BF5" stopOpacity="0.22" />
          <Stop offset="100%" stopColor="#001240" stopOpacity="0" />
        </RadialGradient>
        {/* Ball gradient */}
        <RadialGradient id="ballFill" cx="38%" cy="32%" r="60%">
          <Stop offset="0%"  stopColor="#ffffff" stopOpacity="0.95" />
          <Stop offset="60%" stopColor="#E8ECF5" stopOpacity="0.9" />
          <Stop offset="100%" stopColor="#B0BAD4" stopOpacity="0.85" />
        </RadialGradient>
        {/* Ball glow */}
        <RadialGradient id="ballGlow" cx="50%" cy="50%" r="50%">
          <Stop offset="0%"  stopColor="#FFFFFF" stopOpacity="0.18" />
          <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      {/* Court ambient glow */}
      <Ellipse cx={cx} cy={h * 0.72} rx={width * 0.55} ry={70} fill="url(#glow)" />

      {/* Court floor line */}
      <Line
        x1={cx - 155} y1={h * 0.78}
        x2={cx + 155} y2={h * 0.78}
        stroke="rgba(58,123,245,0.25)" strokeWidth="1" strokeDasharray="6,4"
      />

      {/* ── Net ── */}
      {/* Left post */}
      <Rect x={cx - 4} y={h * 0.36} width={4} height={h * 0.42} rx={2}
        fill="rgba(255,255,255,0.18)" />
      {/* Right post */}
      <Rect x={cx + 0} y={h * 0.36} width={4} height={h * 0.42} rx={2}
        fill="rgba(255,255,255,0.18)" />
      {/* Top tape */}
      <Rect x={cx - 80} y={h * 0.34} width={160} height={7} rx={3.5}
        fill="rgba(255,255,255,0.28)" />
      {/* Net mesh lines - horizontal */}
      {[0, 1, 2, 3, 4].map(i => (
        <Line key={`h${i}`}
          x1={cx - 79} y1={h * 0.34 + 7 + i * 18}
          x2={cx + 79} y2={h * 0.34 + 7 + i * 18}
          stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"
        />
      ))}
      {/* Net mesh lines - vertical */}
      {[-60, -40, -20, 0, 20, 40, 60].map(x => (
        <Line key={`v${x}`}
          x1={cx + x} y1={h * 0.34 + 7}
          x2={cx + x} y2={h * 0.34 + 7 + 4 * 18}
          stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"
        />
      ))}

      {/* ── Ball motion trail ── */}
      {[
        { bx: cx - 115, by: h * 0.62, r: 18, op: 0.06 },
        { bx: cx - 88,  by: h * 0.54, r: 20, op: 0.09 },
        { bx: cx - 60,  by: h * 0.44, r: 22, op: 0.13 },
        { bx: cx - 30,  by: h * 0.32, r: 24, op: 0.18 },
      ].map((t, i) => (
        <G key={i}>
          <Circle cx={t.bx} cy={t.by} r={t.r + 10} fill={`rgba(255,255,255,${t.op * 0.4})`} />
          <Circle cx={t.bx} cy={t.by} r={t.r} fill={`rgba(232,236,245,${t.op * 2.5})`} />
        </G>
      ))}

      {/* ── Main ball (glow halo) ── */}
      <Circle cx={cx + 10} cy={h * 0.18} r={54} fill="url(#ballGlow)" />

      {/* ── Main ball ── */}
      <Circle cx={cx + 10} cy={h * 0.18} r={38} fill="url(#ballFill)" />

      {/* Ball seam lines */}
      <Path
        d={`M ${cx + 10 - 38} ${h * 0.18} 
            C ${cx + 10 - 20} ${h * 0.18 - 30} 
              ${cx + 10 + 20} ${h * 0.18 - 30} 
              ${cx + 10 + 38} ${h * 0.18}`}
        stroke="rgba(0,31,91,0.35)" strokeWidth="1.4" fill="none"
      />
      <Path
        d={`M ${cx + 10 - 38} ${h * 0.18} 
            C ${cx + 10 - 20} ${h * 0.18 + 30} 
              ${cx + 10 + 20} ${h * 0.18 + 30} 
              ${cx + 10 + 38} ${h * 0.18}`}
        stroke="rgba(0,31,91,0.35)" strokeWidth="1.4" fill="none"
      />
      <Path
        d={`M ${cx + 10} ${h * 0.18 - 38} 
            C ${cx + 10 - 30} ${h * 0.18 - 20} 
              ${cx + 10 - 30} ${h * 0.18 + 20} 
              ${cx + 10} ${h * 0.18 + 38}`}
        stroke="rgba(0,31,91,0.35)" strokeWidth="1.4" fill="none"
      />
      <Path
        d={`M ${cx + 10} ${h * 0.18 - 38} 
            C ${cx + 10 + 30} ${h * 0.18 - 20} 
              ${cx + 10 + 30} ${h * 0.18 + 20} 
              ${cx + 10} ${h * 0.18 + 38}`}
        stroke="rgba(0,31,91,0.35)" strokeWidth="1.4" fill="none"
      />

      {/* Ball highlight */}
      <Circle cx={cx + 2} cy={h * 0.18 - 14} r={10} fill="rgba(255,255,255,0.45)" />

      {/* ── Discipline color stripe under net ── */}
      {[
        { color: "#3A7BF5", x: cx - 75 },
        { color: "#E04E8A", x: cx - 51 },
        { color: "#F5A623", x: cx - 27 },
        { color: "#44C98E", x: cx - 3  },
        { color: "#9B59B6", x: cx + 21 },
        { color: "#3A7BF5", x: cx + 45 },
      ].map((d, i) => (
        <Rect key={i} x={d.x} y={h * 0.79} width={20} height={3} rx={1.5}
          fill={d.color} opacity={0.55}
        />
      ))}
    </Svg>
  );
}

// ── Discipline dots (second "image") ──────────────────────────────────────────
function DisciplineDots() {
  const items = [
    { label: "Men's",    color: "#3A7BF5" },
    { label: "Women's",  color: "#E04E8A" },
    { label: "Beach",    color: "#F5A623" },
    { label: "Sitting",  color: "#44C98E" },
    { label: "NCAA ♀",   color: "#9B59B6" },
    { label: "NCAA ♂",   color: "#3A7BF5" },
  ];
  return (
    <View style={styles.dotsRow}>
      {items.map((d, i) => (
        <View key={i} style={styles.dotItem}>
          <View style={[styles.dot, { backgroundColor: d.color, shadowColor: d.color }]} />
          <Text style={styles.dotLabel}>{d.label}</Text>
        </View>
      ))}
    </View>
  );
}

const STATUS_LABEL: Record<string, string> = {
  idle:       "Create my free account",
  opening:    "Opening sign-in…",
  exchanging: "Completing sign-in…",
  error:      "Try again",
};

// ── Main ───────────────────────────────────────────────────────────────────────
export default function LoginScreen() {
  const { login, isLoading, isSigningIn, loginStatus, loginError, clearLoginError } = useAuth();
  const insets = useSafeAreaInsets();
  const busy = isLoading || isSigningIn;

  const fade = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 800, useNativeDriver: false }),
      Animated.timing(rise, { toValue: 0, duration: 700, useNativeDriver: false }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background */}
      <LinearGradient
        colors={["#000D2E", "#001550", "#001F5B"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.6, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={["transparent", "rgba(191,13,62,0.13)", "transparent"]}
        start={{ x: 0, y: 0.4 }}
        end={{ x: 1, y: 0.9 }}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View style={[styles.inner, { paddingTop: insets.top + 28, paddingBottom: insets.bottom + 28, opacity: fade }]}>

        {/* ── Identity ─────────────────────────────────────── */}
        <View style={styles.identity}>
          <Text style={styles.appName}>Spike</Text>
          <Text style={styles.tagline}>Every serve. Every set. Every spike.</Text>
        </View>

        {/* ── Image 1: Hero illustration ───────────────────── */}
        <Animated.View style={[styles.heroWrap, { transform: [{ translateY: rise }] }]}>
          <HeroIllustration width={340} />
        </Animated.View>

        {/* ── Image 2: Discipline dots ─────────────────────── */}
        <DisciplineDots />

        {/* ── CTAs ─────────────────────────────────────────── */}
        <View style={styles.ctas}>
          {loginError && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>⚠  {loginError}</Text>
              <Pressable onPress={clearLoginError} hitSlop={10}>
                <Text style={styles.errorDismiss}>✕</Text>
              </Pressable>
            </View>
          )}

          {isSigningIn && (
            <View style={styles.signingInRow}>
              <ActivityIndicator size="small" color={ACCENT} />
              <Text style={styles.signingInText}>{STATUS_LABEL[loginStatus]}</Text>
            </View>
          )}

          <Pressable
            style={({ pressed }) => [styles.createBtn, busy && styles.btnBusy, pressed && !busy && styles.btnPressed]}
            onPress={() => { if (loginError) clearLoginError(); login(); }}
            disabled={isLoading}
          >
            {busy
              ? <ActivityIndicator color="#fff" size="small" />
              : <Text style={styles.createBtnText}>{STATUS_LABEL[loginStatus]}</Text>
            }
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.signinRow, pressed && { opacity: 0.7 }]}
            onPress={() => { if (loginError) clearLoginError(); login(); }}
            disabled={busy}
          >
            <Text style={styles.signinText}>Already have an account?  </Text>
            <Text style={styles.signinLink}>Sign in</Text>
          </Pressable>
        </View>

        {/* ── Footer ───────────────────────────────────────── */}
        <View style={styles.footer}>
          <View style={styles.usavPill}>
            <View style={[styles.dot, { width: 6, height: 6, borderRadius: 3, backgroundColor: ACCENT, shadowColor: undefined }]} />
            <Text style={styles.usavText}>Powered by USA Volleyball</Text>
          </View>
          <Text style={styles.footerMeta}>FIVB  ·  VNL 2026  ·  LA28</Text>
        </View>

      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "space-between",
  },

  /* Identity */
  identity: { alignItems: "center", gap: 8 },
  appName: {
    fontSize: 52,
    color: "#fff",
    fontFamily: "Inter_700Bold",
    letterSpacing: -2,
    lineHeight: 56,
  },
  tagline: {
    fontSize: 15,
    color: "rgba(255,255,255,0.42)",
    fontFamily: "Inter_400Regular",
    letterSpacing: 0.1,
    textAlign: "center",
  },

  /* Hero */
  heroWrap: { alignItems: "center" },

  /* Discipline dots */
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
    flexWrap: "wrap",
  },
  dotItem: { alignItems: "center", gap: 5 },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
  },
  dotLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.38)",
    fontFamily: "Inter_500Medium",
  },

  /* CTAs */
  ctas: { gap: 14 },
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
  },
  errorText:    { flex: 1, fontSize: 13, color: "#E84855", fontFamily: "Inter_400Regular" },
  errorDismiss: { fontSize: 12, color: "rgba(232,72,85,0.6)", paddingHorizontal: 4 },
  signingInRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 },
  signingInText: { fontSize: 14, color: "rgba(255,255,255,0.5)", fontFamily: "Inter_400Regular" },

  createBtn: {
    backgroundColor: ACCENT,
    borderRadius: 18,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
  createBtnText: { fontSize: 17, color: "#fff", fontFamily: "Inter_600SemiBold" },
  btnBusy:    { opacity: 0.65 },
  btnPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },

  signinRow: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  signinText: { fontSize: 14, color: "rgba(255,255,255,0.38)", fontFamily: "Inter_400Regular" },
  signinLink: { fontSize: 14, color: ACCENT, fontFamily: "Inter_600SemiBold" },

  /* Footer */
  footer: { alignItems: "center", gap: 7 },
  usavPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(191,13,62,0.09)",
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(191,13,62,0.22)",
  },
  usavText:   { fontSize: 11, color: ACCENT, fontFamily: "Inter_600SemiBold" },
  footerMeta: { fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: "Inter_400Regular" },
});
