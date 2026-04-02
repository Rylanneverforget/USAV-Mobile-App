import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/colors";
import { MATCHES, type Match, type Discipline } from "@/constants/data";
import {
  VolleyballSvg,
  NetCourtIcon,
  MensIcon,
  WomensIcon,
  BeachIcon,
  SittingIcon,
  CollegeIcon,
} from "@/components/VolleyballIcons";

const C = Colors.light;
const WEB_TOP_INSET = 67;
const LIVE_RED = "#E84855";

const DISC_COLORS: Record<Discipline, string> = {
  mens:        "#3A7BF5",
  womens:      "#E04E8A",
  beach:       "#F5A623",
  sitting:     "#44C98E",
  ncaa_womens: "#9B59B6",
  ncaa_mens:   "#9B59B6",
};

const DISC_LABELS: Record<Discipline, string> = {
  mens:        "Men's",
  womens:      "Women's",
  beach:       "Beach",
  sitting:     "Sitting",
  ncaa_womens: "NCAA ♀",
  ncaa_mens:   "NCAA ♂",
};

const DISC_ICONS: Record<Discipline, React.ComponentType<{ size?: number; color?: string }>> = {
  mens:        MensIcon,
  womens:      WomensIcon,
  beach:       BeachIcon,
  sitting:     SittingIcon,
  ncaa_womens: CollegeIcon,
  ncaa_mens:   CollegeIcon,
};

type FilterTab = "all" | "live" | "upcoming" | "results";

/* ── USA team codes ── */
const USA_NAMES = new Set(["USA", "Ross / Klineman", "April Ross / Alix Klineman"]);
const isUSA = (name: string) => USA_NAMES.has(name) || name.startsWith("USA");

/* ── Discipline filter strip ── */
const DISC_ORDER: Discipline[] = ["mens", "womens", "beach", "sitting", "ncaa_womens", "ncaa_mens"];

/* ── USA next match hero ── */
function UsaNextHero() {
  const [reminded, setReminded] = useState(false);
  const next = MATCHES.find(
    (m) => m.status === "upcoming" && (isUSA(m.homeTeam) || isUSA(m.awayTeam))
  );
  if (!next) return null;

  const usaHome   = isUSA(next.homeTeam);
  const opponent  = usaHome ? next.awayTeam : next.homeTeam;
  const oppCode   = opponent.length <= 3 ? opponent : opponent.slice(0, 3).toUpperCase();
  const discColor = DISC_COLORS[next.discipline];

  return (
    <View style={hero.card}>
      <LinearGradient
        colors={["#200010", "#001240"]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={[`${C.accent}30`, "transparent"]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {/* Volleyball watermark */}
      <View style={hero.watermark} pointerEvents="none">
        <VolleyballSvg size={160} color={`${C.accent}12`} />
      </View>

      {/* Header row */}
      <View style={hero.headerRow}>
        <View style={hero.usaBadge}>
          <Text style={hero.usaBadgeText}>🇺🇸 USA'S NEXT MATCH</Text>
        </View>
        <View style={[hero.discPill, { backgroundColor: `${discColor}20`, borderColor: `${discColor}45` }]}>
          <View style={[hero.discDot, { backgroundColor: discColor }]} />
          <Text style={[hero.discLabel, { color: discColor }]}>{DISC_LABELS[next.discipline]}</Text>
        </View>
      </View>

      {/* Teams */}
      <View style={hero.teamsRow}>
        {/* USA side */}
        <View style={hero.teamCol}>
          <View style={[hero.teamBadge, { backgroundColor: `${C.accent}28`, borderColor: `${C.accent}55` }]}>
            <Text style={[hero.teamCode, { color: C.accent }]}>USA</Text>
          </View>
          <Text style={hero.teamName}>United States</Text>
        </View>

        {/* Center */}
        <View style={hero.center}>
          <Text style={hero.vs}>VS</Text>
          <View style={hero.timeRow}>
            <Ionicons name="time-outline" size={11} color={C.accent} />
            <Text style={hero.timeText}>{next.time}</Text>
          </View>
          <Text style={hero.dateText}>{next.date}</Text>
        </View>

        {/* Opponent side */}
        <View style={hero.teamCol}>
          <View style={[hero.teamBadge, { backgroundColor: `${discColor}18`, borderColor: `${discColor}38` }]}>
            <Text style={[hero.teamCode, { color: discColor }]}>{oppCode}</Text>
          </View>
          <Text style={hero.teamName}>{opponent}</Text>
        </View>
      </View>

      {/* Tournament row */}
      <View style={hero.tournRow}>
        <NetCourtIcon size={13} color={C.textMuted} />
        <Text style={hero.tournText} numberOfLines={1}>{next.tournament}</Text>
      </View>

      {/* Reminder button */}
      <Pressable
        onPress={() => setReminded((v) => !v)}
        style={[hero.btn, reminded && hero.btnReminded]}
      >
        <Ionicons
          name={reminded ? "notifications" : "notifications-outline"}
          size={15}
          color={reminded ? "#2DC579" : "#fff"}
        />
        <Text style={[hero.btnText, reminded && hero.btnTextReminded]}>
          {reminded ? "Reminder set ✓" : "Set match reminder"}
        </Text>
      </Pressable>
    </View>
  );
}

const hero = StyleSheet.create({
  card:          { borderRadius: 22, marginBottom: 20, overflow: "hidden", borderWidth: 1.5, borderColor: `${Colors.light.accent}45`, position: "relative" },
  watermark:     { position: "absolute", right: -30, bottom: -20 },
  headerRow:     { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, paddingBottom: 12 },
  usaBadge:      { backgroundColor: `${Colors.light.accent}22`, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, borderWidth: 1, borderColor: `${Colors.light.accent}40` },
  usaBadgeText:  { fontSize: 10, color: "#fff", fontFamily: "Inter_800ExtraBold", letterSpacing: 0.3 },
  discPill:      { flexDirection: "row", alignItems: "center", gap: 5, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1 },
  discDot:       { width: 6, height: 6, borderRadius: 3 },
  discLabel:     { fontSize: 11, fontFamily: "Inter_600SemiBold" },
  teamsRow:      { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 14, gap: 10 },
  teamCol:       { flex: 1, alignItems: "center", gap: 6 },
  teamBadge:     { width: 52, height: 52, borderRadius: 14, borderWidth: 2, alignItems: "center", justifyContent: "center" },
  teamCode:      { fontSize: 11, fontFamily: "Inter_800ExtraBold" },
  teamName:      { fontSize: 13, color: Colors.light.text, fontFamily: "Inter_700Bold", textAlign: "center" },
  center:        { alignItems: "center", gap: 3 },
  vs:            { fontSize: 20, color: "rgba(232,236,245,0.45)", fontFamily: "Inter_700Bold", letterSpacing: 3 },
  timeRow:       { flexDirection: "row", alignItems: "center", gap: 3 },
  timeText:      { fontSize: 12, color: Colors.light.accent, fontFamily: "Inter_600SemiBold" },
  dateText:      { fontSize: 11, color: Colors.light.textMuted, fontFamily: "Inter_400Regular" },
  tournRow:      { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(0,0,0,0.3)", marginHorizontal: 16, marginBottom: 14, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 9, borderWidth: 1, borderColor: "rgba(255,255,255,0.06)" },
  tournText:     { flex: 1, fontSize: 13, color: Colors.light.text, fontFamily: "Inter_600SemiBold" },
  btn:           { marginHorizontal: 16, marginBottom: 16, paddingVertical: 13, borderRadius: 14, backgroundColor: Colors.light.accent, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 },
  btnReminded:   { backgroundColor: "rgba(45,197,121,0.15)" },
  btnText:       { fontSize: 14, color: "#fff", fontFamily: "Inter_700Bold" },
  btnTextReminded: { color: "#2DC579" },
});

/* ── Match row ── */
function MatchRow({ match }: { match: Match }) {
  const live     = match.status === "live";
  const upcoming = match.status === "upcoming";
  const usa      = isUSA(match.homeTeam) || isUSA(match.awayTeam);
  const discColor = DISC_COLORS[match.discipline];

  const homeCode = match.homeTeam.length <= 3 ? match.homeTeam : match.homeTeam.slice(0, 3).toUpperCase();
  const awayCode = match.awayTeam.length <= 3 ? match.awayTeam : match.awayTeam.slice(0, 3).toUpperCase();

  const setsSummary = match.sets
    ? match.sets.map((s) => `${s.home}-${s.away}`).join(", ")
    : null;

  return (
    <View style={[
      row.card,
      usa && upcoming && { borderColor: `${C.accent}38` },
      live && { borderColor: `${LIVE_RED}30` },
    ]}>
      {/* USA accent bar */}
      {usa && <View style={[row.accentBar, { backgroundColor: C.accent }]} />}

      {/* Background tints */}
      {usa && upcoming && (
        <LinearGradient
          colors={[`${C.accent}0A`, "transparent"]}
          start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      )}
      {live && (
        <LinearGradient
          colors={["rgba(232,72,85,0.06)", "transparent"]}
          start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      )}

      <View style={row.inner}>
        {/* Meta row */}
        <View style={row.meta}>
          <View style={row.metaLeft}>
            <View style={[row.discDot, { backgroundColor: discColor }]} />
            <Text style={[row.discText, { color: discColor }]} numberOfLines={1}>
              {match.tournament}
            </Text>
          </View>
          {live ? (
            <View style={row.liveBadge}>
              <View style={row.liveDot} />
              <Text style={row.liveText}>LIVE</Text>
            </View>
          ) : upcoming ? (
            <View style={row.upcomingBadge}>
              <Text style={row.upcomingText}>{match.date}</Text>
            </View>
          ) : (
            <View style={row.finalBadge}>
              <Text style={row.finalText}>FINAL</Text>
            </View>
          )}
        </View>

        {/* Teams + score */}
        <View style={row.teamsRow}>
          {/* Home */}
          <View style={row.teamSide}>
            <View style={[row.codeBox, {
              backgroundColor: isUSA(match.homeTeam) ? `${C.accent}22` : `${discColor}14`,
              borderColor: isUSA(match.homeTeam) ? `${C.accent}48` : `${discColor}28`,
            }]}>
              <Text style={[row.code, { color: isUSA(match.homeTeam) ? C.accent : discColor }]}>{homeCode}</Text>
            </View>
            <Text style={[row.teamName, isUSA(match.homeTeam) && row.teamNameUSA]} numberOfLines={1}>
              {match.homeTeam}
            </Text>
          </View>

          {/* Score / VS */}
          <View style={row.scoreCol}>
            {upcoming ? (
              <>
                <Text style={row.vs}>VS</Text>
                <Text style={[row.timeText, { color: live ? LIVE_RED : C.accent }]}>{match.time}</Text>
              </>
            ) : (
              <View style={row.scoreRow}>
                <Text style={[
                  row.score,
                  !live && match.homeScore > match.awayScore && row.scoreWin,
                ]}>{match.homeScore}</Text>
                <Text style={row.scoreSep}>–</Text>
                <Text style={[
                  row.score,
                  !live && match.awayScore > match.homeScore && row.scoreWin,
                ]}>{match.awayScore}</Text>
              </View>
            )}
          </View>

          {/* Away */}
          <View style={[row.teamSide, row.teamSideAway]}>
            <Text style={[row.teamName, isUSA(match.awayTeam) && row.teamNameUSA]} numberOfLines={1}>
              {match.awayTeam}
            </Text>
            <View style={[row.codeBox, {
              backgroundColor: isUSA(match.awayTeam) ? `${C.accent}22` : `${discColor}14`,
              borderColor: isUSA(match.awayTeam) ? `${C.accent}48` : `${discColor}28`,
            }]}>
              <Text style={[row.code, { color: isUSA(match.awayTeam) ? C.accent : discColor }]}>{awayCode}</Text>
            </View>
          </View>
        </View>

        {/* Live set info */}
        {live && setsSummary && (
          <View style={row.setsBar}>
            <View style={row.setsLiveDot} />
            <Text style={row.setLabel}>Set {match.currentSet}</Text>
            <Text style={row.setsScores}>· {setsSummary}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const row = StyleSheet.create({
  card:        { backgroundColor: C.cardBg, borderRadius: 18, marginBottom: 10, borderWidth: 1, borderColor: C.separator, overflow: "hidden", position: "relative" },
  accentBar:   { position: "absolute", left: 0, top: 0, bottom: 0, width: 3, borderTopRightRadius: 2, borderBottomRightRadius: 2, zIndex: 1 },
  inner:       { padding: 13, paddingLeft: 16 },
  meta:        { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  metaLeft:    { flexDirection: "row", alignItems: "center", gap: 5, flex: 1 },
  discDot:     { width: 7, height: 7, borderRadius: 3.5, flexShrink: 0 },
  discText:    { fontSize: 10, fontFamily: "Inter_600SemiBold", flex: 1 },
  liveBadge:   { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(232,72,85,0.15)", borderWidth: 1, borderColor: "rgba(232,72,85,0.35)", borderRadius: 20, paddingHorizontal: 9, paddingVertical: 3, flexShrink: 0 },
  liveDot:     { width: 5, height: 5, borderRadius: 2.5, backgroundColor: LIVE_RED },
  liveText:    { fontSize: 9, color: LIVE_RED, fontFamily: "Inter_700Bold", letterSpacing: 1 },
  upcomingBadge: { backgroundColor: "rgba(91,141,239,0.1)", borderWidth: 1, borderColor: "rgba(91,141,239,0.25)", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3, flexShrink: 0 },
  upcomingText:  { fontSize: 10, color: "#5B8DEF", fontFamily: "Inter_600SemiBold" },
  finalBadge:  { backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, flexShrink: 0 },
  finalText:   { fontSize: 9, color: C.textMuted, fontFamily: "Inter_700Bold", letterSpacing: 1 },

  teamsRow:    { flexDirection: "row", alignItems: "center", gap: 8 },
  teamSide:    { flex: 1, flexDirection: "row", alignItems: "center", gap: 8, overflow: "hidden" },
  teamSideAway:{ justifyContent: "flex-end" },
  codeBox:     { width: 36, height: 36, borderRadius: 10, borderWidth: 1.5, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  code:        { fontSize: 9, fontFamily: "Inter_700Bold" },
  teamName:    { fontSize: 13, color: "rgba(232,236,245,0.85)", fontFamily: "Inter_600SemiBold", flexShrink: 1 },
  teamNameUSA: { color: C.text, fontFamily: "Inter_700Bold" },

  scoreCol:    { width: 70, alignItems: "center", gap: 2, flexShrink: 0 },
  scoreRow:    { flexDirection: "row", alignItems: "center", gap: 4 },
  score:       { fontSize: 22, color: "rgba(232,236,245,0.55)", fontFamily: "Inter_700Bold" },
  scoreWin:    { color: C.text },
  scoreSep:    { fontSize: 11, color: C.textMuted, fontFamily: "Inter_400Regular" },
  vs:          { fontSize: 12, color: "rgba(232,236,245,0.4)", fontFamily: "Inter_600SemiBold", letterSpacing: 2 },
  timeText:    { fontSize: 11, fontFamily: "Inter_600SemiBold" },

  setsBar:     { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 8, backgroundColor: "rgba(232,72,85,0.08)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: "rgba(232,72,85,0.15)" },
  setsLiveDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: LIVE_RED, flexShrink: 0 },
  setLabel:    { fontSize: 11, color: LIVE_RED, fontFamily: "Inter_600SemiBold" },
  setsScores:  { fontSize: 11, color: C.textMuted, fontFamily: "Inter_400Regular", flex: 1 },
});

/* ── Section header ── */
function SectionHeader({ color, label }: { color: string; label: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 12 }}>
      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: color }} />
      <Text style={{ fontSize: 12, color, fontFamily: "Inter_700Bold", letterSpacing: 0.8, textTransform: "uppercase" }}>
        {label}
      </Text>
    </View>
  );
}

/* ── Main screen ── */
export default function MatchesScreen() {
  const insets = useSafeAreaInsets();
  const isWeb  = Platform.OS === "web";
  const topPad = isWeb ? WEB_TOP_INSET : insets.top;

  const [filterTab, setFilterTab] = useState<FilterTab>("all");
  const [discFilter, setDiscFilter] = useState<Discipline | "all">("all");

  const allDiscs: Discipline[] = DISC_ORDER.filter((d) =>
    MATCHES.some((m) => m.discipline === d)
  );

  const filtered = MATCHES.filter((m) => {
    const tabOk =
      filterTab === "all"      ? true :
      filterTab === "live"     ? m.status === "live" :
      filterTab === "upcoming" ? m.status === "upcoming" :
      m.status === "finished";
    const discOk = discFilter === "all" || m.discipline === discFilter;
    return tabOk && discOk;
  });

  const liveCount    = MATCHES.filter((m) => m.status === "live").length;
  const liveSec      = filtered.filter((m) => m.status === "live");
  const upcomingSec  = filtered.filter((m) => m.status === "upcoming");
  const finishedSec  = filtered.filter((m) => m.status === "finished");

  const FILTER_TABS: { key: FilterTab; label: string }[] = [
    { key: "all",      label: "All" },
    { key: "live",     label: `Live (${liveCount})` },
    { key: "upcoming", label: "Upcoming" },
    { key: "results",  label: "Results" },
  ];

  return (
    <>
      {/* Header gradient */}
      <LinearGradient
        colors={["#1A000A", "#001240", C.primary]}
        locations={[0, 0.45, 1]}
        style={[styles.headerGradient, { height: topPad + 200 }]}
        pointerEvents="none"
      />
      <LinearGradient
        colors={["rgba(191,13,62,0.3)", "transparent"]}
        start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
        style={[styles.headerGradient, { height: topPad + 200 }]}
        pointerEvents="none"
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingTop: topPad + 20, paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Matches</Text>
            <Text style={styles.subtitle}>International competitions · Live & Upcoming</Text>
          </View>
          {liveCount > 0 && (
            <View style={styles.livePill}>
              <View style={styles.livePillDot} />
              <Text style={styles.livePillText}>{liveCount} LIVE</Text>
            </View>
          )}
        </View>

        {/* ── Filter tabs ── */}
        <View style={styles.filterBar}>
          {FILTER_TABS.map(({ key, label }) => {
            const active = filterTab === key;
            const isLiveTab = key === "live";
            return (
              <Pressable
                key={key}
                onPress={() => setFilterTab(key)}
                style={[
                  styles.filterTab,
                  active && (isLiveTab
                    ? styles.filterTabLiveActive
                    : styles.filterTabActive),
                ]}
              >
                <Text style={[
                  styles.filterTabText,
                  active && (isLiveTab ? styles.filterTabTextLive : styles.filterTabTextActive),
                ]}>{label}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* ── Discipline filter ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.discScroll}
          contentContainerStyle={styles.discScrollContent}
        >
          <Pressable
            onPress={() => setDiscFilter("all")}
            style={[styles.discChip, discFilter === "all" && { backgroundColor: `${C.accent}20`, borderColor: `${C.accent}50` }]}
          >
            <NetCourtIcon size={13} color={discFilter === "all" ? C.accent : C.textMuted} />
            <Text style={[styles.discChipText, discFilter === "all" && { color: C.accent }]}>All</Text>
          </Pressable>
          {allDiscs.map((d) => {
            const DiscIcon = DISC_ICONS[d];
            const active   = discFilter === d;
            const col      = DISC_COLORS[d];
            return (
              <Pressable
                key={d}
                onPress={() => setDiscFilter(d)}
                style={[styles.discChip, active && { backgroundColor: `${col}20`, borderColor: `${col}50` }]}
              >
                <DiscIcon size={13} color={active ? col : C.textMuted} />
                <Text style={[styles.discChipText, active && { color: col }]}>{DISC_LABELS[d]}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* ── USA next match hero ── */}
        {(filterTab === "all" || filterTab === "upcoming") && discFilter === "all" && (
          <UsaNextHero />
        )}

        {/* ── Live section ── */}
        {liveSec.length > 0 && (
          <View style={styles.section}>
            <SectionHeader color={LIVE_RED} label="Live Now" />
            {liveSec.map((m) => <MatchRow key={m.id} match={m} />)}
          </View>
        )}

        {/* ── Upcoming section ── */}
        {upcomingSec.length > 0 && (
          <View style={styles.section}>
            <SectionHeader color="#5B8DEF" label="Upcoming" />
            {upcomingSec.map((m) => <MatchRow key={m.id} match={m} />)}
          </View>
        )}

        {/* ── Results section ── */}
        {finishedSec.length > 0 && (
          <View style={styles.section}>
            <SectionHeader color={C.textMuted} label="Results" />
            {finishedSec.map((m) => <MatchRow key={m.id} match={m} />)}
          </View>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <View style={styles.empty}>
            <NetCourtIcon size={40} color={C.textMuted} opacity={0.4} />
            <Text style={styles.emptyText}>No matches found</Text>
            <Text style={styles.emptySubtext}>Try changing your filter</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: C.primary },
  headerGradient: { position: "absolute", top: 0, left: 0, right: 0, zIndex: 0 },
  content:      { paddingHorizontal: 16 },

  header:       { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 },
  title:        { fontSize: 30, color: C.text, fontFamily: "Inter_700Bold", letterSpacing: -0.5 },
  subtitle:     { fontSize: 13, color: C.textMuted, fontFamily: "Inter_400Regular", marginTop: 3 },
  livePill:     { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(232,72,85,0.15)", borderWidth: 1, borderColor: "rgba(232,72,85,0.35)", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, flexShrink: 0 },
  livePillDot:  { width: 6, height: 6, borderRadius: 3, backgroundColor: LIVE_RED },
  livePillText: { fontSize: 11, color: LIVE_RED, fontFamily: "Inter_700Bold" },

  filterBar:    { flexDirection: "row", backgroundColor: C.cardBg, borderRadius: 14, padding: 3, marginBottom: 14, borderWidth: 1, borderColor: C.separator, gap: 2 },
  filterTab:    { flex: 1, paddingVertical: 8, borderRadius: 11, alignItems: "center" },
  filterTabActive:     { backgroundColor: C.accent },
  filterTabLiveActive: { backgroundColor: "rgba(232,72,85,0.25)" },
  filterTabText:       { fontSize: 11, color: C.textMuted, fontFamily: "Inter_700Bold" },
  filterTabTextActive: { color: "#fff" },
  filterTabTextLive:   { color: LIVE_RED },

  discScroll:        { marginBottom: 18, marginHorizontal: -16 },
  discScrollContent: { paddingHorizontal: 16, gap: 8, flexDirection: "row" },
  discChip:          { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: C.cardBg, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 7, borderWidth: 1, borderColor: C.separator },
  discChipText:      { fontSize: 12, color: C.textMuted, fontFamily: "Inter_600SemiBold" },

  section:      { marginBottom: 8 },
  empty:        { alignItems: "center", paddingTop: 60, gap: 10 },
  emptyText:    { fontSize: 16, color: C.textMuted, fontFamily: "Inter_600SemiBold" },
  emptySubtext: { fontSize: 13, color: C.textMuted, fontFamily: "Inter_400Regular", opacity: 0.7 },
});
