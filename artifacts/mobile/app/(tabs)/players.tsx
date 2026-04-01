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
import PlayerCard from "@/components/PlayerCard";
import Colors from "@/constants/colors";
import { useApp } from "@/context/AppContext";
import { PLAYERS, type Discipline } from "@/constants/data";
import {
  VolleyballSvg,
  SpikeIcon,
  MensIcon,
  WomensIcon,
  BeachIcon,
  SittingIcon,
  CollegeIcon,
  NetCourtIcon,
  PlayerStatsIcon,
} from "@/components/VolleyballIcons";

const C = Colors.light;
const WEB_TOP_INSET = 67;

type StatType = "points" | "aces" | "blocks" | "digs";

const STAT_TABS: { key: StatType; label: string; SvgIcon: React.ComponentType<{ size?: number; color?: string }> }[] = [
  { key: "points", label: "Points", SvgIcon: SpikeIcon },
  { key: "aces",   label: "Aces",   SvgIcon: VolleyballSvg },
  { key: "blocks", label: "Blocks", SvgIcon: NetCourtIcon },
  { key: "digs",   label: "Digs",   SvgIcon: PlayerStatsIcon },
];

const DISCIPLINE_TABS: { key: Discipline | "all"; label: string; SvgIcon: React.ComponentType<{ size?: number; color?: string }> }[] = [
  { key: "all",         label: "All",       SvgIcon: VolleyballSvg },
  { key: "mens",        label: "Men's",     SvgIcon: MensIcon },
  { key: "womens",      label: "Women's",   SvgIcon: WomensIcon },
  { key: "beach",       label: "Beach",     SvgIcon: BeachIcon },
  { key: "sitting",     label: "Sitting",   SvgIcon: SittingIcon },
  { key: "ncaa_womens", label: "NCAA ♀",   SvgIcon: CollegeIcon },
  { key: "ncaa_mens",   label: "NCAA ♂",   SvgIcon: CollegeIcon },
];

const DISC_COLORS: Record<string, string> = {
  all:         "#BF0D3E",
  mens:        "#3A7BF5",
  womens:      "#E04E8A",
  beach:       "#F5A623",
  sitting:     "#44C98E",
  ncaa_womens: "#E04E8A",
  ncaa_mens:   "#3A7BF5",
};

const STAT_LABELS: Record<StatType, string> = {
  points: "Season Points",
  aces:   "Service Aces",
  blocks: "Total Blocks",
  digs:   "Defensive Digs",
};

export default function PlayersScreen() {
  const { preferences } = useApp();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? WEB_TOP_INSET : insets.top + 16;
  const [activeStat, setActiveStat] = useState<StatType>("points");
  const [activeDiscipline, setActiveDiscipline] = useState<Discipline | "all">(
    preferences.disciplines.length > 0 ? preferences.disciplines[0] : "all"
  );

  const disciplinePlayers = activeDiscipline === "all"
    ? PLAYERS
    : PLAYERS.filter((p) => p.discipline === activeDiscipline);

  const sorted = [...disciplinePlayers].sort(
    (a, b) => b.stats[activeStat] - a.stats[activeStat]
  );

  const discColor = DISC_COLORS[activeDiscipline] ?? C.accent;
  const leader = sorted[0];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: topPad, paddingBottom: isWeb ? 34 : insets.bottom + 90 }]}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient colors={["#002080", "#001F5B"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.headerGradient} />
      <LinearGradient colors={[`${discColor}30`, "transparent"]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={[styles.headerGradient, { opacity: 1 }]} />

      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Text style={styles.heading}>Players</Text>
          <Text style={styles.subheading}>{STAT_LABELS[activeStat]}</Text>
        </View>
        <View style={[styles.headerIcon, { backgroundColor: `${discColor}20`, borderColor: `${discColor}40` }]}>
          <PlayerStatsIcon size={20} color={discColor} />
        </View>
      </View>

      <View style={styles.usavBar}>
        <VolleyballSvg size={11} color={C.accent} />
        <Text style={styles.usavText}>Powered by USA Volleyball</Text>
      </View>

      {/* Leader spotlight */}
      {leader && (
        <View style={styles.leaderCard}>
          <LinearGradient
            colors={[`${discColor}30`, "#001F5B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.leaderBgIcon}>
            <VolleyballSvg size={90} color="rgba(255,255,255,0.04)" />
          </View>
          <View style={styles.leaderContent}>
            <View style={styles.leaderLeft}>
              <Text style={styles.leaderLabel}>LEADER · {activeStat.toUpperCase()}</Text>
              <Text style={styles.leaderName}>{leader.name}</Text>
              <Text style={styles.leaderTeam}>{leader.team} · {leader.country}</Text>
            </View>
            <View style={styles.leaderStatBox}>
              <Text style={[styles.leaderStatVal, { color: discColor }]}>
                {leader.stats[activeStat]}
              </Text>
              <Text style={styles.leaderStatLbl}>{activeStat.toUpperCase()}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Discipline filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll} contentContainerStyle={styles.tabsContent}>
        {DISCIPLINE_TABS.map((tab) => {
          const isActive = activeDiscipline === tab.key;
          const dc = DISC_COLORS[tab.key] ?? C.accent;
          return (
            <Pressable
              key={tab.key}
              style={[styles.tab, isActive && { backgroundColor: dc, borderColor: dc }]}
              onPress={() => setActiveDiscipline(tab.key)}
            >
              <tab.SvgIcon size={12} color={isActive ? "#fff" : C.textSecondary} />
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Stat filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll} contentContainerStyle={styles.tabsContent}>
        {STAT_TABS.map((tab) => {
          const isActive = activeStat === tab.key;
          return (
            <Pressable
              key={tab.key}
              style={[styles.statTab, isActive && styles.statTabActive]}
              onPress={() => setActiveStat(tab.key)}
            >
              <tab.SvgIcon size={13} color={isActive ? "#fff" : C.textSecondary} />
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.leaderSection}>
        {sorted.map((player, idx) => (
          <PlayerCard key={player.id} player={player} rank={idx + 1} statType={activeStat} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.primary },
  headerGradient: { position: "absolute", top: 0, left: 0, right: 0, height: 220 },
  content: { paddingHorizontal: 16 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  headerLeft: { flex: 1 },
  headerIcon: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", borderWidth: 1 },
  usavBar: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start", backgroundColor: "rgba(191,13,62,0.07)", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, borderWidth: 1, borderColor: "rgba(191,13,62,0.18)", marginBottom: 16 },
  usavText: { fontSize: 11, color: C.accent, fontFamily: "Inter_600SemiBold", letterSpacing: 0.3 },
  heading: { fontSize: 28, color: C.text, fontFamily: "Inter_700Bold" },
  subheading: { fontSize: 13, color: C.textSecondary, fontFamily: "Inter_400Regular", marginTop: 2 },

  leaderCard: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  leaderBgIcon: {
    position: "absolute",
    right: -10,
    top: -10,
    opacity: 1,
  },
  leaderContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leaderLeft: {
    flex: 1,
    gap: 4,
  },
  leaderLabel: {
    fontSize: 9,
    color: C.accent,
    fontFamily: "Inter_700Bold",
    letterSpacing: 2,
  },
  leaderName: {
    fontSize: 20,
    color: C.text,
    fontFamily: "Inter_700Bold",
  },
  leaderTeam: {
    fontSize: 12,
    color: C.textSecondary,
    fontFamily: "Inter_400Regular",
  },
  leaderStatBox: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    minWidth: 72,
  },
  leaderStatVal: {
    fontSize: 30,
    fontFamily: "Inter_700Bold",
    lineHeight: 34,
  },
  leaderStatLbl: {
    fontSize: 9,
    color: C.textMuted,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1.5,
    marginTop: 2,
  },

  tabsScroll: { marginBottom: 10, marginHorizontal: -16 },
  tabsContent: { paddingHorizontal: 16, gap: 8 },
  tab: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 13, paddingVertical: 7, borderRadius: 20, backgroundColor: C.cardBg, borderWidth: 1, borderColor: C.separator },
  statTab: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 13, paddingVertical: 7, borderRadius: 20, backgroundColor: C.cardBg, borderWidth: 1, borderColor: C.separator },
  statTabActive: { backgroundColor: C.accent, borderColor: C.accent },
  tabText: { fontSize: 12, color: C.textSecondary, fontFamily: "Inter_600SemiBold" },
  tabTextActive: { color: "#fff" },

  leaderSection: { gap: 0, marginTop: 4 },
});
