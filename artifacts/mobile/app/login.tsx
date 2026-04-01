import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/lib/auth";
import Colors from "@/constants/colors";
import {
  VolleyballSvg,
  NetCourtIcon,
  JerseyIcon,
  OlympicsIcon,
  NewsScrollIcon,
  VolleyballBgDecor,
} from "@/components/VolleyballIcons";

const C = Colors.light;

const DISC_COLORS = {
  mens:    "#3A7BF5",
  womens:  "#E04E8A",
  beach:   "#F5A623",
  sitting: "#44C98E",
  ncaa_w:  "#9B59B6",
  ncaa_m:  "#3A7BF5",
};

const DISCIPLINES = [
  { key: "mens",    label: "Men's",    color: DISC_COLORS.mens },
  { key: "womens",  label: "Women's",  color: DISC_COLORS.womens },
  { key: "beach",   label: "Beach",    color: DISC_COLORS.beach },
  { key: "sitting", label: "Sitting",  color: DISC_COLORS.sitting },
  { key: "ncaa_w",  label: "NCAA ♀",   color: DISC_COLORS.ncaa_w },
  { key: "ncaa_m",  label: "NCAA ♂",   color: DISC_COLORS.ncaa_m },
];

const STATUS_LABEL: Record<string, string> = {
  idle:       "Sign in to continue",
  opening:    "Opening sign-in…",
  exchanging: "Completing sign-in…",
  error:      "Try again",
};

// ── Animated pulsing dot ───────────────────────────────────────────────────────
function PulsingDot() {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale,   { toValue: 1.8, duration: 700, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0,   duration: 700, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(scale,   { toValue: 1,   duration: 0,   useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.6, duration: 0,   useNativeDriver: true }),
        ]),
      ])
    ).start();
  }, []);

  return (
    <View style={{ width: 10, height: 10, alignItems: "center", justifyContent: "center" }}>
      <Animated.View style={[styles.pulseDot, { transform: [{ scale }], opacity }]} />
      <View style={styles.pulseDotCore} />
    </View>
  );
}

// ── Live match preview ─────────────────────────────────────────────────────────
function LiveMatchPreview() {
  const color = DISC_COLORS.mens;
  return (
    <View style={styles.liveCard}>
      <LinearGradient
        colors={["#0A2E80", "#001840"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={[`${color}30`, "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.liveCardBg}>
        <VolleyballBgDecor size={130} opacity={0.04} />
      </View>

      {/* Header row */}
      <View style={styles.liveCardHeader}>
        <View style={[styles.discPill, { backgroundColor: `${color}20`, borderColor: `${color}40` }]}>
          <View style={[styles.discDot, { backgroundColor: color }]} />
          <Text style={[styles.discPillText, { color }]}>Men's VNL 2026</Text>
        </View>
        <View style={styles.liveBadge}>
          <PulsingDot />
          <Text style={styles.liveBadgeText}>LIVE</Text>
        </View>
      </View>

      {/* Scoreboard */}
      <View style={styles.scoreRow}>
        <View style={styles.teamCol}>
          <View style={[styles.teamAvatar, { borderColor: `${color}50`, backgroundColor: `${color}22` }]}>
            <Text style={[styles.teamCode, { color }]}>BRA</Text>
          </View>
          <Text style={styles.teamName}>Brazil</Text>
        </View>

        <View style={styles.scoreCenter}>
          <View style={styles.scoreNumbers}>
            <Text style={styles.scoreWin}>2</Text>
            <Text style={styles.scoreSep}>:</Text>
            <Text style={styles.scoreLose}>1</Text>
          </View>
          <View style={styles.setScorePill}>
            <Text style={styles.setScoreText}>Set 4 · 19–16</Text>
          </View>
        </View>

        <View style={styles.teamCol}>
          <View style={[styles.teamAvatar, { borderColor: `${color}50`, backgroundColor: `${color}22` }]}>
            <Text style={[styles.teamCode, { color }]}>ITA</Text>
          </View>
          <Text style={styles.teamName}>Italy</Text>
        </View>
      </View>

      <Text style={styles.liveCaption}>Live scores across all 6 disciplines</Text>
    </View>
  );
}

// ── Feature preview cards ──────────────────────────────────────────────────────
function StandingsPreviewCard() {
  const rows = [
    { code: "BRA", pts: 30, color: "#FFD700" },
    { code: "POL", pts: 26, color: "#C0C0C0" },
    { code: "ITA", pts: 23, color: "#CD7F32" },
  ];
  return (
    <View style={styles.featureCard}>
      <LinearGradient colors={["#0A1535", "#060E2C"]} style={StyleSheet.absoluteFill} />
      <View style={[styles.featureCardAccent, { backgroundColor: "#FFD70025", borderBottomColor: "#FFD70030" }]}>
        <NetCourtIcon size={16} color="#FFD700" opacity={1} />
        <Text style={[styles.featureCardTitle, { color: "#FFD700" }]}>Standings</Text>
      </View>
      {rows.map((r, i) => (
        <View key={i} style={styles.featureRow}>
          <Text style={[styles.featureRank, { color: r.color }]}>{i + 1}</Text>
          <View style={[styles.featureDot, { backgroundColor: DISC_COLORS.mens }]}>
            <Text style={styles.featureDotText}>{r.code}</Text>
          </View>
          <View style={styles.featureRowBar}>
            <View style={[styles.featureBar, { width: `${100 - i * 18}%` as any, backgroundColor: `${r.color}40` }]} />
          </View>
          <Text style={[styles.featurePts, { color: r.color }]}>{r.pts}</Text>
        </View>
      ))}
    </View>
  );
}

function NewsPreviewCard() {
  const headlines = [
    { cat: "VNL",      color: "#2DC579", title: "Brazil's perfect VNL run continues" },
    { cat: "Awards",   color: "#BF0D3E", title: "Egonu wins Best Scorer again" },
  ];
  return (
    <View style={styles.featureCard}>
      <LinearGradient colors={["#0A1535", "#060E2C"]} style={StyleSheet.absoluteFill} />
      <View style={[styles.featureCardAccent, { backgroundColor: "#BF0D3E25", borderBottomColor: "#BF0D3E30" }]}>
        <NewsScrollIcon size={16} color={C.accent} opacity={1} />
        <Text style={[styles.featureCardTitle, { color: C.accent }]}>Breaking News</Text>
      </View>
      {headlines.map((h, i) => (
        <View key={i} style={[styles.newsRow, i > 0 && { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.06)", paddingTop: 8, marginTop: 4 }]}>
          <View style={[styles.newsCatBadge, { backgroundColor: `${h.color}20` }]}>
            <Text style={[styles.newsCatText, { color: h.color }]}>{h.cat}</Text>
          </View>
          <Text style={styles.newsHeadline} numberOfLines={2}>{h.title}</Text>
        </View>
      ))}
    </View>
  );
}

function PlayersPreviewCard() {
  const players = [
    { code: "EGN", name: "Egonu",    pts: 31, color: DISC_COLORS.womens },
    { code: "MSS", name: "Michał",   pts: 28, color: DISC_COLORS.mens },
    { code: "LAV", name: "Lavia",    pts: 25, color: DISC_COLORS.mens },
  ];
  return (
    <View style={styles.featureCard}>
      <LinearGradient colors={["#0A1535", "#060E2C"]} style={StyleSheet.absoluteFill} />
      <View style={[styles.featureCardAccent, { backgroundColor: `${DISC_COLORS.womens}22`, borderBottomColor: `${DISC_COLORS.womens}30` }]}>
        <JerseyIcon size={16} color={DISC_COLORS.womens} opacity={1} />
        <Text style={[styles.featureCardTitle, { color: DISC_COLORS.womens }]}>Top Players</Text>
      </View>
      {players.map((p, i) => (
        <View key={i} style={styles.featureRow}>
          <Text style={[styles.featureRank, { color: MUTED }]}>{i + 1}</Text>
          <View style={[styles.featureDot, { backgroundColor: `${p.color}22`, borderColor: `${p.color}40`, borderWidth: 1 }]}>
            <Text style={[styles.featureDotText, { color: p.color }]}>{p.code.slice(0,2)}</Text>
          </View>
          <Text style={styles.featurePlayerName}>{p.name}</Text>
          <Text style={[styles.featurePts, { color: p.color }]}>{p.pts}</Text>
        </View>
      ))}
    </View>
  );
}

const MUTED = "#6B7A9F";

// ── Main ───────────────────────────────────────────────────────────────────────
export default function LoginScreen() {
  const { login, isLoading, isSigningIn, loginStatus, loginError, clearLoginError } = useAuth();
  const insets = useSafeAreaInsets();
  const busy = isLoading || isSigningIn;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1,  duration: 700, delay: 100, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0,  duration: 600, delay: 100, useNativeDriver: true }),
    ]).start();
  }, []);

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

      {/* Background volleyball decors */}
      <View style={{ position: "absolute", top: "5%",  left: "-5%"  }}><VolleyballBgDecor size={110} opacity={0.055} /></View>
      <View style={{ position: "absolute", top: "28%", right: "-8%" }}><VolleyballBgDecor size={90}  opacity={0.04}  /></View>
      <View style={{ position: "absolute", top: "65%", left: "-4%"  }}><VolleyballBgDecor size={80}  opacity={0.04}  /></View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 36, paddingBottom: insets.bottom + 28 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── App identity ────────────────────────────────── */}
        <Animated.View style={[styles.logoSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          {/* Logo mark */}
          <View style={styles.logoMark}>
            <LinearGradient
              colors={["rgba(0,32,128,0.9)", "rgba(0,20,80,0.9)"]}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.logoRing}>
              <VolleyballSvg size={44} color="#fff" />
            </View>
          </View>

          <Text style={styles.appName}>Spike</Text>
          <Text style={styles.appTagline}>The ultimate volleyball fan app</Text>

          {/* Discipline strip */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.discStrip}
          >
            {DISCIPLINES.map(d => (
              <View key={d.key} style={[styles.discChip, { backgroundColor: `${d.color}18`, borderColor: `${d.color}40` }]}>
                <View style={[styles.discDot, { backgroundColor: d.color }]} />
                <Text style={[styles.discChipText, { color: d.color }]}>{d.label}</Text>
              </View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* ── Live match preview ──────────────────────────── */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }], marginBottom: 14 }}>
          <LiveMatchPreview />
        </Animated.View>

        {/* ── Feature preview cards ───────────────────────── */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.sectionLabel}>WHAT'S INSIDE</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featureScroll}
          >
            <StandingsPreviewCard />
            <NewsPreviewCard />
            <PlayersPreviewCard />
          </ScrollView>
        </Animated.View>

        {/* ── Stats strip ─────────────────────────────────── */}
        <View style={styles.statsStrip}>
          {[
            { val: "6",       label: "Disciplines" },
            { val: "2",       label: "Live Now" },
            { val: "VNL",     label: "2026" },
            { val: "LA28",    label: "Olympics" },
          ].map((s, i) => (
            <View key={i} style={[styles.statItem, i < 3 && styles.statDivider]}>
              <Text style={styles.statVal}>{s.val}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* ── Auth section ────────────────────────────────── */}
        <View style={styles.authSection}>
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

          {isSigningIn && (
            <View style={styles.statusRow}>
              <ActivityIndicator size="small" color={C.accent} />
              <Text style={styles.statusText}>{STATUS_LABEL[loginStatus]}</Text>
            </View>
          )}

          {/* Primary CTA: Create account */}
          <Pressable
            style={({ pressed }) => [
              styles.createButton,
              busy && styles.buttonBusy,
              pressed && !busy && styles.buttonPressed,
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
                <VolleyballSvg size={20} color="#fff" />
                <Text style={styles.createButtonText}>
                  {loginStatus === "error" ? "Try Again" : "Create my free account"}
                </Text>
              </>
            )}
          </Pressable>

          {/* Secondary CTA: Sign in */}
          <Pressable
            style={({ pressed }) => [styles.signinButton, pressed && { opacity: 0.7 }]}
            onPress={() => {
              if (loginError) clearLoginError();
              login();
            }}
            disabled={busy}
          >
            <Text style={styles.signinButtonText}>Already a fan?{" "}</Text>
            <Text style={styles.signinButtonLink}>Sign in</Text>
          </Pressable>

          <Text style={styles.disclaimer}>
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>

        {/* ── Footer ──────────────────────────────────────── */}
        <View style={styles.footer}>
          <View style={styles.usavBadge}>
            <VolleyballSvg size={13} color={C.accent} />
            <Text style={styles.usavText}>Powered by USA Volleyball</Text>
          </View>
          <Text style={styles.footerText}>
            <Text style={styles.footerBrand}>FIVB</Text>
            {"  ·  "}
            <Text style={styles.footerBrand}>VNL 2026</Text>
            {"  ·  "}
            <Text style={styles.footerBrand}>LA28</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.primary },
  scroll:    { paddingHorizontal: 20, gap: 0 },

  /* ── Logo section ── */
  logoSection: {
    alignItems: "center",
    gap: 8,
    marginBottom: 22,
  },
  logoMark: {
    width: 88,
    height: 88,
    borderRadius: 24,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "rgba(191,13,62,0.4)",
  },
  logoRing: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: "rgba(191,13,62,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  appName: {
    fontSize: 44,
    color: "#fff",
    fontFamily: "Inter_700Bold",
    letterSpacing: -1.5,
    lineHeight: 50,
  },
  appTagline: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "Inter_400Regular",
    letterSpacing: 0.2,
    marginBottom: 6,
  },
  discStrip: {
    flexDirection: "row",
    gap: 7,
    paddingHorizontal: 4,
  },
  discChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 11,
    borderWidth: 1,
  },
  discDot: { width: 6, height: 6, borderRadius: 3 },
  discPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  discPillText: { fontSize: 11, fontFamily: "Inter_600SemiBold" },
  discChipText: { fontSize: 11, fontFamily: "Inter_600SemiBold" },

  /* ── Live card ── */
  liveCard: {
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(232,72,85,0.32)",
    padding: 16,
    marginBottom: 0,
  },
  liveCardBg: {
    position: "absolute",
    right: -20,
    top: -20,
  },
  liveCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(232,72,85,0.18)",
    borderWidth: 1,
    borderColor: "rgba(232,72,85,0.45)",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 11,
  },
  liveBadgeText: {
    fontSize: 11,
    color: "#E84855",
    fontFamily: "Inter_700Bold",
    letterSpacing: 1,
  },
  pulseDot: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E84855",
  },
  pulseDotCore: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#E84855",
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  teamCol: { flex: 1, alignItems: "center", gap: 8 },
  teamAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  teamCode: { fontSize: 13, fontFamily: "Inter_700Bold", letterSpacing: 0.3 },
  teamName: { fontSize: 14, color: "#E8ECF5", fontFamily: "Inter_700Bold" },
  scoreCenter: { alignItems: "center", gap: 8, width: 110 },
  scoreNumbers: { flexDirection: "row", alignItems: "center", gap: 10 },
  scoreWin:  { fontSize: 44, fontFamily: "Inter_700Bold", color: "#E8ECF5", lineHeight: 50 },
  scoreSep:  { fontSize: 26, color: MUTED, lineHeight: 50 },
  scoreLose: { fontSize: 44, fontFamily: "Inter_700Bold", color: "rgba(232,245,255,0.35)", lineHeight: 50 },
  setScorePill: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  setScoreText: { fontSize: 12, color: MUTED, fontFamily: "Inter_500Medium" },
  liveCaption: {
    fontSize: 11,
    color: "rgba(255,255,255,0.35)",
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.07)",
  },

  /* ── Feature preview cards ── */
  sectionLabel: {
    fontSize: 10,
    color: MUTED,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 1.5,
    marginBottom: 10,
    marginTop: 20,
  },
  featureScroll: {
    gap: 10,
    paddingBottom: 4,
  },
  featureCard: {
    width: 170,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    padding: 0,
    paddingBottom: 14,
  },
  featureCardAccent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 13,
    paddingVertical: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  featureCardTitle: {
    fontSize: 12,
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.2,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 13,
    marginBottom: 6,
  },
  featureRank: { fontSize: 11, fontFamily: "Inter_700Bold", width: 12 },
  featureDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  featureDotText: { fontSize: 8, fontFamily: "Inter_700Bold", color: "#fff", letterSpacing: 0.2 },
  featurePlayerName: {
    flex: 1,
    fontSize: 11,
    color: "#E8ECF5",
    fontFamily: "Inter_500Medium",
  },
  featureRowBar: {
    flex: 1,
    height: 5,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 3,
    overflow: "hidden",
  },
  featureBar: { height: 5, borderRadius: 3 },
  featurePts: { fontSize: 11, fontFamily: "Inter_700Bold", width: 22, textAlign: "right" },
  newsRow:   { paddingHorizontal: 13 },
  newsCatBadge: { borderRadius: 4, paddingVertical: 2, paddingHorizontal: 6, alignSelf: "flex-start", marginBottom: 4 },
  newsCatText:  { fontSize: 8, fontFamily: "Inter_700Bold", letterSpacing: 0.4 },
  newsHeadline: { fontSize: 11, color: "#E8ECF5", fontFamily: "Inter_500Medium", lineHeight: 16 },

  /* ── Stats strip ── */
  statsStrip: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    marginTop: 16,
    marginBottom: 22,
  },
  statItem:    { flex: 1, alignItems: "center", gap: 3 },
  statDivider: { borderRightWidth: 1, borderRightColor: "rgba(255,255,255,0.07)" },
  statVal:     { fontSize: 18, fontFamily: "Inter_700Bold", color: "#E8ECF5" },
  statLabel:   { fontSize: 9,  fontFamily: "Inter_400Regular", color: MUTED },

  /* ── Auth section ── */
  authSection: { gap: 12, marginBottom: 18 },
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
  errorBannerLeft: { flexDirection: "row", alignItems: "center", gap: 8, flex: 1 },
  errorIcon:    { fontSize: 14, color: "#E84855" },
  errorText:    { flex: 1, fontSize: 13, color: "#E84855", fontFamily: "Inter_400Regular", lineHeight: 18 },
  errorDismiss: { fontSize: 12, color: "rgba(232,72,85,0.6)", paddingHorizontal: 2 },
  statusRow:    { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, paddingVertical: 4 },
  statusText:   { fontSize: 14, color: "rgba(255,255,255,0.55)", fontFamily: "Inter_400Regular" },

  createButton: {
    backgroundColor: C.accent,
    borderRadius: 16,
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 11,
    shadowColor: C.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 8,
  },
  createButtonText: { fontSize: 17, color: "#fff", fontFamily: "Inter_600SemiBold" },
  buttonBusy:    { opacity: 0.7, shadowOpacity: 0.15 },
  buttonPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },

  signinButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },
  signinButtonText: { fontSize: 14, color: "rgba(255,255,255,0.45)", fontFamily: "Inter_400Regular" },
  signinButtonLink: { fontSize: 14, color: C.accent, fontFamily: "Inter_600SemiBold" },

  disclaimer: {
    fontSize: 11,
    color: "rgba(255,255,255,0.28)",
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 17,
    marginTop: 2,
  },

  /* ── Footer ── */
  footer: { alignItems: "center", gap: 8, marginTop: 4 },
  usavBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(191,13,62,0.1)",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: "rgba(191,13,62,0.28)",
  },
  usavText:    { fontSize: 12, color: C.accent, fontFamily: "Inter_600SemiBold", letterSpacing: 0.2 },
  footerText:  { fontSize: 11, color: "rgba(255,255,255,0.22)", fontFamily: "Inter_400Regular" },
  footerBrand: { color: "rgba(255,255,255,0.38)", fontFamily: "Inter_500Medium" },
});
