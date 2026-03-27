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
import { OLYMPIC_PATHS, OLYMPIC_TEAMS, type OlympicTeam } from "@/constants/data";

const C = Colors.light;
const WEB_TOP_INSET = 67;

const TOTAL_SPOTS = 12;
const CONFIRMED_SPOTS = OLYMPIC_TEAMS.filter(
  (t) => t.qualificationStatus === "qualified"
).length;

type View = "rankings" | "pathways";

function StatusBadge({ status, isHost }: { status: OlympicTeam["qualificationStatus"]; isHost?: boolean }) {
  if (isHost) {
    return (
      <View style={[styles.statusBadge, { backgroundColor: "rgba(191,13,62,0.18)", borderColor: "rgba(191,13,62,0.4)" }]}>
        <Text style={[styles.statusText, { color: C.accent }]}>HOST</Text>
      </View>
    );
  }
  if (status === "qualified") {
    return (
      <View style={[styles.statusBadge, { backgroundColor: "rgba(45,197,121,0.15)", borderColor: "rgba(45,197,121,0.4)" }]}>
        <Text style={[styles.statusText, { color: "#2DC579" }]}>QUALIFIED</Text>
      </View>
    );
  }
  if (status === "contender") {
    return (
      <View style={[styles.statusBadge, { backgroundColor: "rgba(91,141,239,0.15)", borderColor: "rgba(91,141,239,0.4)" }]}>
        <Text style={[styles.statusText, { color: "#5B8DEF" }]}>CONTENDER</Text>
      </View>
    );
  }
  return (
    <View style={[styles.statusBadge, { backgroundColor: "rgba(232,72,85,0.12)", borderColor: "rgba(232,72,85,0.35)" }]}>
      <Text style={[styles.statusText, { color: C.danger }]}>AT RISK</Text>
    </View>
  );
}

function OlympicRankRow({ team, index }: { team: OlympicTeam; index: number }) {
  const isUSA = team.shortName === "USA";
  const maxPts = OLYMPIC_TEAMS[0].rankingPoints;
  const pct = team.rankingPoints / maxPts;

  return (
    <View style={[styles.rankRow, isUSA && styles.rankRowUSA]}>
      {isUSA && (
        <LinearGradient
          colors={["rgba(191,13,62,0.12)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      )}
      <Text style={[styles.rankNum, index < 3 && styles.rankNumTop]}>
        {index + 1}
      </Text>
      <View style={styles.rankTeamInfo}>
        <View style={styles.rankNameRow}>
          <Text style={[styles.rankTeamName, isUSA && styles.rankTeamNameUSA]}>
            {team.shortName}
          </Text>
          {isUSA && (
            <Ionicons name="star" size={11} color={C.accent} />
          )}
        </View>
        <Text style={styles.rankCountry}>{team.country}</Text>
        <View style={styles.miniBar}>
          <View style={[styles.miniBarFill, { width: `${pct * 100}%`, backgroundColor: isUSA ? C.accent : "#5B8DEF" }]} />
        </View>
      </View>
      <View style={styles.rankRight}>
        <Text style={styles.rankPoints}>{team.rankingPoints}</Text>
        <Text style={styles.rankPtsLabel}>pts</Text>
      </View>
      <StatusBadge status={team.qualificationStatus} isHost={team.isHost} />
    </View>
  );
}

function PathwayCard({ path }: { path: typeof OLYMPIC_PATHS[0] }) {
  const spotsLeft = path.spots - path.teamsQualified.length;
  const progressPct = path.teamsQualified.length / path.spots;

  return (
    <View style={styles.pathCard}>
      <View style={styles.pathHeader}>
        <View style={styles.pathTitleRow}>
          <View style={[styles.pathDot, { backgroundColor: path.isComplete ? "#2DC579" : spotsLeft === 0 ? "#2DC579" : "#5B8DEF" }]} />
          <Text style={styles.pathName}>{path.name}</Text>
        </View>
        <View style={styles.pathSpotsChip}>
          <Text style={styles.pathSpotsText}>{path.spots} spot{path.spots > 1 ? "s" : ""}</Text>
        </View>
      </View>
      <Text style={styles.pathDesc}>{path.description}</Text>
      <View style={styles.pathProgressRow}>
        <View style={styles.pathProgressBar}>
          <View style={[styles.pathProgressFill, { width: `${progressPct * 100}%` }]} />
        </View>
        <Text style={styles.pathProgressText}>{path.teamsQualified.length}/{path.spots}</Text>
      </View>
      {path.teamsQualified.length > 0 && (
        <View style={styles.pathQualRow}>
          {path.teamsQualified.map((t) => (
            <View key={t} style={[styles.pathTeamChip, t === "USA" && styles.pathTeamChipUSA]}>
              <Text style={[styles.pathTeamText, t === "USA" && styles.pathTeamTextUSA]}>{t}</Text>
            </View>
          ))}
        </View>
      )}
      <View style={styles.pathFooter}>
        <Ionicons name="calendar-outline" size={11} color={C.textMuted} />
        <Text style={styles.pathDeadline}>{path.deadline}</Text>
      </View>
    </View>
  );
}

export default function OlympicsScreen() {
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? WEB_TOP_INSET : insets.top + 16;
  const [activeView, setActiveView] = useState<View>("rankings");

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: topPad, paddingBottom: isWeb ? 34 : insets.bottom + 90 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={["#002080", "#001F5B"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      />
      <LinearGradient
        colors={["#BF0D3E", "transparent"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.headerGradient, { opacity: 0.2 }]}
      />

      <View style={styles.headerRow}>
        <View>
          <Text style={styles.heading}>LA28 Olympics</Text>
          <Text style={styles.subheading}>Volleyball Qualification</Text>
        </View>
        <View style={styles.olympicBadge}>
          <Ionicons name="medal" size={18} color={C.accent} />
        </View>
      </View>

      {/* USA Hero */}
      <View style={styles.heroCard}>
        <LinearGradient
          colors={["#002080", "#001A50"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          colors={["rgba(191,13,62,0.25)", "transparent"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.heroTop}>
          <View>
            <Text style={styles.heroLabel}>USA STATUS</Text>
            <Text style={styles.heroTitle}>Qualified</Text>
            <Text style={styles.heroSub}>Host Nation · FIVB Rank #1</Text>
          </View>
          <View style={styles.heroIconCircle}>
            <Ionicons name="checkmark-circle" size={40} color="#2DC579" />
          </View>
        </View>
        <View style={styles.heroStats}>
          <View style={styles.heroStat}>
            <Text style={styles.heroStatValue}>1st</Text>
            <Text style={styles.heroStatLabel}>FIVB Rank</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStat}>
            <Text style={styles.heroStatValue}>412</Text>
            <Text style={styles.heroStatLabel}>Ranking Pts</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStat}>
            <Text style={[styles.heroStatValue, { color: "#2DC579" }]}>
              {CONFIRMED_SPOTS}/{TOTAL_SPOTS}
            </Text>
            <Text style={styles.heroStatLabel}>Spots Filled</Text>
          </View>
        </View>
        <View style={styles.spotBar}>
          {Array.from({ length: TOTAL_SPOTS }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.spotDot,
                i < CONFIRMED_SPOTS && styles.spotDotFilled,
                i === 0 && styles.spotDotUSA,
              ]}
            />
          ))}
        </View>
        <Text style={styles.spotBarLabel}>{TOTAL_SPOTS - CONFIRMED_SPOTS} berths remaining · LA 2028</Text>
      </View>

      {/* View Toggle */}
      <View style={styles.toggle}>
        <Pressable
          style={[styles.toggleBtn, activeView === "rankings" && styles.toggleBtnActive]}
          onPress={() => setActiveView("rankings")}
        >
          <Ionicons name="podium-outline" size={14} color={activeView === "rankings" ? C.primary : C.textSecondary} />
          <Text style={[styles.toggleText, activeView === "rankings" && styles.toggleTextActive]}>
            Rankings
          </Text>
        </Pressable>
        <Pressable
          style={[styles.toggleBtn, activeView === "pathways" && styles.toggleBtnActive]}
          onPress={() => setActiveView("pathways")}
        >
          <Ionicons name="git-branch-outline" size={14} color={activeView === "pathways" ? C.primary : C.textSecondary} />
          <Text style={[styles.toggleText, activeView === "pathways" && styles.toggleTextActive]}>
            Pathways
          </Text>
        </Pressable>
      </View>

      {activeView === "rankings" && (
        <View style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={styles.thRank}>#</Text>
            <Text style={styles.thTeam}>Team</Text>
            <Text style={styles.thPts}>Pts</Text>
            <Text style={styles.thStatus}>Status</Text>
          </View>
          {OLYMPIC_TEAMS.map((team, i) => (
            <OlympicRankRow key={team.id} team={team} index={i} />
          ))}
        </View>
      )}

      {activeView === "pathways" && (
        <View>
          <Text style={styles.pathwayNote}>
            12 teams qualify for the LA28 volleyball tournament through four pathways.
          </Text>
          {OLYMPIC_PATHS.map((path) => (
            <PathwayCard key={path.id} path={path} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.primary,
  },
  headerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 220,
  },
  content: {
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    color: C.text,
    fontFamily: "Inter_700Bold",
  },
  subheading: {
    fontSize: 13,
    color: C.textSecondary,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  olympicBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(191,13,62,0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(191,13,62,0.35)",
  },

  // Hero card
  heroCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(191,13,62,0.3)",
  },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  heroLabel: {
    fontSize: 10,
    color: C.accent,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 26,
    color: "#2DC579",
    fontFamily: "Inter_700Bold",
  },
  heroSub: {
    fontSize: 12,
    color: C.textSecondary,
    fontFamily: "Inter_400Regular",
    marginTop: 3,
  },
  heroIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(45,197,121,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroStats: {
    flexDirection: "row",
    marginBottom: 16,
  },
  heroStat: {
    flex: 1,
    alignItems: "center",
  },
  heroStatValue: {
    fontSize: 20,
    color: C.text,
    fontFamily: "Inter_700Bold",
  },
  heroStatLabel: {
    fontSize: 10,
    color: C.textMuted,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
    letterSpacing: 0.3,
  },
  heroStatDivider: {
    width: 1,
    backgroundColor: C.separator,
    marginVertical: 4,
  },
  spotBar: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 8,
  },
  spotDot: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: C.surfaceElevated,
  },
  spotDotFilled: {
    backgroundColor: "#2DC579",
  },
  spotDotUSA: {
    backgroundColor: C.accent,
  },
  spotBarLabel: {
    fontSize: 10,
    color: C.textMuted,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
  },

  // Toggle
  toggle: {
    flexDirection: "row",
    backgroundColor: C.cardBg,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: C.separator,
  },
  toggleBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 9,
    borderRadius: 9,
    gap: 6,
  },
  toggleBtnActive: {
    backgroundColor: C.accent,
  },
  toggleText: {
    fontSize: 13,
    color: C.textSecondary,
    fontFamily: "Inter_600SemiBold",
  },
  toggleTextActive: {
    color: C.primary,
  },

  // Rankings table
  tableCard: {
    backgroundColor: C.cardBg,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: C.separator,
  },
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: C.surfaceElevated,
  },
  thRank: {
    width: 28,
    fontSize: 10,
    color: C.textMuted,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
  thTeam: {
    flex: 1,
    fontSize: 10,
    color: C.textMuted,
    fontFamily: "Inter_600SemiBold",
  },
  thPts: {
    width: 44,
    fontSize: 10,
    color: C.textMuted,
    fontFamily: "Inter_600SemiBold",
    textAlign: "right",
    marginRight: 10,
  },
  thStatus: {
    width: 80,
    fontSize: 10,
    color: C.textMuted,
    fontFamily: "Inter_600SemiBold",
    textAlign: "right",
  },

  // Rank row
  rankRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: C.separator,
    gap: 8,
    overflow: "hidden",
  },
  rankRowUSA: {
    borderLeftWidth: 3,
    borderLeftColor: C.accent,
  },
  rankNum: {
    width: 20,
    fontSize: 13,
    color: C.textMuted,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
  rankNumTop: {
    color: C.text,
  },
  rankTeamInfo: {
    flex: 1,
  },
  rankNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  rankTeamName: {
    fontSize: 14,
    color: C.text,
    fontFamily: "Inter_700Bold",
  },
  rankTeamNameUSA: {
    color: C.text,
  },
  rankCountry: {
    fontSize: 10,
    color: C.textMuted,
    fontFamily: "Inter_400Regular",
    marginTop: 1,
    marginBottom: 5,
  },
  miniBar: {
    height: 3,
    backgroundColor: C.surfaceElevated,
    borderRadius: 2,
    overflow: "hidden",
    width: "85%",
  },
  miniBarFill: {
    height: 3,
    borderRadius: 2,
  },
  rankRight: {
    alignItems: "flex-end",
    marginRight: 8,
  },
  rankPoints: {
    fontSize: 15,
    color: C.text,
    fontFamily: "Inter_700Bold",
  },
  rankPtsLabel: {
    fontSize: 9,
    color: C.textMuted,
    fontFamily: "Inter_400Regular",
  },
  statusBadge: {
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderWidth: 1,
    width: 80,
    alignItems: "center",
  },
  statusText: {
    fontSize: 9,
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.5,
  },

  // Pathways
  pathwayNote: {
    fontSize: 13,
    color: C.textSecondary,
    fontFamily: "Inter_400Regular",
    lineHeight: 19,
    marginBottom: 14,
  },
  pathCard: {
    backgroundColor: C.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: C.separator,
  },
  pathHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  pathTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  pathDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  pathName: {
    fontSize: 15,
    color: C.text,
    fontFamily: "Inter_700Bold",
  },
  pathSpotsChip: {
    backgroundColor: C.surfaceElevated,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pathSpotsText: {
    fontSize: 11,
    color: C.textSecondary,
    fontFamily: "Inter_600SemiBold",
  },
  pathDesc: {
    fontSize: 12,
    color: C.textSecondary,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
    marginBottom: 12,
  },
  pathProgressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  pathProgressBar: {
    flex: 1,
    height: 5,
    backgroundColor: C.surfaceElevated,
    borderRadius: 3,
    overflow: "hidden",
  },
  pathProgressFill: {
    height: 5,
    backgroundColor: "#2DC579",
    borderRadius: 3,
  },
  pathProgressText: {
    fontSize: 11,
    color: C.textSecondary,
    fontFamily: "Inter_600SemiBold",
    width: 28,
    textAlign: "right",
  },
  pathQualRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 10,
    flexWrap: "wrap",
  },
  pathTeamChip: {
    backgroundColor: C.surfaceElevated,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pathTeamChipUSA: {
    backgroundColor: "rgba(191,13,62,0.2)",
    borderWidth: 1,
    borderColor: "rgba(191,13,62,0.4)",
  },
  pathTeamText: {
    fontSize: 12,
    color: C.textSecondary,
    fontFamily: "Inter_700Bold",
  },
  pathTeamTextUSA: {
    color: C.accent,
  },
  pathFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  pathDeadline: {
    fontSize: 11,
    color: C.textMuted,
    fontFamily: "Inter_400Regular",
  },
});
