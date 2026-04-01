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
import TeamRow from "@/components/TeamRow";
import Colors from "@/constants/colors";
import { useApp } from "@/context/AppContext";
import { ALL_TEAMS, type Discipline, DISCIPLINE_LABELS } from "@/constants/data";
import {
  VolleyballSvg,
  MensIcon,
  WomensIcon,
  BeachIcon,
  SittingIcon,
  CollegeIcon,
} from "@/components/VolleyballIcons";

const C = Colors.light;
const WEB_TOP_INSET = 67;

const DISCIPLINE_TABS: { key: Discipline; label: string; SvgIcon: React.ComponentType<{ size?: number; color?: string }> }[] = [
  { key: "mens",        label: "Men's",     SvgIcon: MensIcon },
  { key: "womens",      label: "Women's",   SvgIcon: WomensIcon },
  { key: "beach",       label: "Beach",     SvgIcon: BeachIcon },
  { key: "sitting",     label: "Sitting",   SvgIcon: SittingIcon },
  { key: "ncaa_womens", label: "NCAA ♀",   SvgIcon: CollegeIcon },
  { key: "ncaa_mens",   label: "NCAA ♂",   SvgIcon: CollegeIcon },
];

const TOURNAMENT_LABELS: Record<Discipline, string> = {
  mens:        "VNL 2026 Men's",
  womens:      "VNL 2026 Women's",
  beach:       "FIVB Beach Pro Tour",
  sitting:     "World Para Volleyball",
  ncaa_womens: "NCAA Women's",
  ncaa_mens:   "NCAA Men's",
};

const DISC_COLORS: Record<Discipline, string> = {
  mens:        "#3A7BF5",
  womens:      "#E04E8A",
  beach:       "#F5A623",
  sitting:     "#44C98E",
  ncaa_womens: "#E04E8A",
  ncaa_mens:   "#3A7BF5",
};

const PODIUM_MEDALS = ["#FFD700", "#C0C0C0", "#CD7F32"];

function PodiumCard({ teams, discColor }: { teams: { shortName: string; country: string; points: number }[]; discColor: string }) {
  const top3 = teams.slice(0, 3);
  const order = [1, 0, 2]; // display order: 2nd, 1st, 3rd
  const heights = [72, 96, 56];
  const labels = ["2ND", "1ST", "3RD"];
  const medals = [PODIUM_MEDALS[1], PODIUM_MEDALS[0], PODIUM_MEDALS[2]];

  return (
    <View style={styles.podiumCard}>
      <LinearGradient
        colors={["#001A50", "#000D30"]}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={[`${discColor}25`, "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.podiumBgIcon}>
        <VolleyballSvg size={120} color="rgba(255,255,255,0.03)" />
      </View>

      <View style={styles.podiumRow}>
        {order.map((teamIdx, displayPos) => {
          const team = top3[teamIdx];
          if (!team) return null;
          const medal = medals[displayPos];
          const h = heights[displayPos];
          const lbl = labels[displayPos];
          return (
            <View key={teamIdx} style={styles.podiumColumn}>
              <View style={[styles.podiumAvatar, { borderColor: `${medal}60` }]}>
                <LinearGradient colors={[`${medal}35`, `${medal}12`]} style={StyleSheet.absoluteFill} />
                <Text style={[styles.podiumAvatarText, { color: medal }]}>
                  {team.shortName.slice(0, 3).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.podiumTeamName}>{team.shortName}</Text>
              <Text style={styles.podiumCountry} numberOfLines={1}>{team.country}</Text>
              <Text style={styles.podiumPts}>{team.points} pts</Text>
              <View style={[styles.podiumBlock, { height: h, backgroundColor: `${medal}22`, borderColor: `${medal}40` }]}>
                <Text style={[styles.podiumLabel, { color: medal }]}>{lbl}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default function StandingsScreen() {
  const { isFavorite, toggleFavorite, preferences } = useApp();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? WEB_TOP_INSET : insets.top + 16;

  const defaultDiscipline: Discipline =
    preferences.disciplines.length > 0 ? preferences.disciplines[0] : "mens";
  const [activeDiscipline, setActiveDiscipline] = useState<Discipline>(defaultDiscipline);

  const disciplineTeams = ALL_TEAMS.filter((t) => t.discipline === activeDiscipline);
  const sorted = [...disciplineTeams].sort((a, b) => b.points - a.points);
  const discColor = DISC_COLORS[activeDiscipline];
  const DisciplineIcon = DISCIPLINE_TABS.find((t) => t.key === activeDiscipline)?.SvgIcon ?? VolleyballSvg;
  const showConference = activeDiscipline === "ncaa_womens" || activeDiscipline === "ncaa_mens";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: topPad, paddingBottom: isWeb ? 34 : insets.bottom + 90 }]}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient colors={["#002080", "#001F5B"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.headerGradient} />
      <LinearGradient colors={[`${discColor}35`, "transparent"]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={[styles.headerGradient, { opacity: 1 }]} />

      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Text style={styles.heading}>Standings</Text>
          <Text style={styles.subheading}>{TOURNAMENT_LABELS[activeDiscipline]}</Text>
        </View>
        <View style={[styles.headerIcon, { backgroundColor: `${discColor}20`, borderColor: `${discColor}40` }]}>
          <DisciplineIcon size={20} color={discColor} />
        </View>
      </View>

      <View style={styles.usavBar}>
        <VolleyballSvg size={11} color={C.accent} />
        <Text style={styles.usavText}>Powered by USA Volleyball</Text>
      </View>

      {/* Discipline tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsScroll}
        contentContainerStyle={styles.tabsContent}
      >
        {DISCIPLINE_TABS.map((tab) => {
          const isActive = activeDiscipline === tab.key;
          const dc = DISC_COLORS[tab.key];
          return (
            <Pressable
              key={tab.key}
              style={[styles.tab, isActive && { backgroundColor: dc, borderColor: dc }]}
              onPress={() => setActiveDiscipline(tab.key)}
            >
              <tab.SvgIcon size={13} color={isActive ? "#fff" : C.textSecondary} />
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Podium top 3 */}
      {sorted.length >= 3 && (
        <PodiumCard teams={sorted} discColor={discColor} />
      )}

      {showConference && (
        <View style={styles.conferenceNote}>
          <Ionicons name="information-circle-outline" size={13} color={C.textMuted} />
          <Text style={styles.conferenceNoteText}>Sorted by overall win % across all conferences</Text>
        </View>
      )}

      {/* Full standings table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.colRank}>#</Text>
          <View style={{ width: 34 }} />
          <Text style={styles.colTeam}>Team</Text>
          <Text style={styles.colForm}>Form</Text>
          <Text style={styles.colStat}>W-L</Text>
          <Text style={styles.colPts}>Pts</Text>
          <View style={{ width: 28 }} />
        </View>
        {sorted.map((team, idx) => (
          <TeamRow
            key={team.id}
            team={team}
            rank={idx + 1}
            isFavorite={isFavorite(team.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </View>

      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: C.success }]} />
          <Text style={styles.legendText}>Win</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: C.danger }]} />
          <Text style={styles.legendText}>Loss</Text>
        </View>
        <View style={styles.legendItem}>
          <Ionicons name="star" size={11} color="#FFD700" />
          <Text style={styles.legendText}>Favorite</Text>
        </View>
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

  tabsScroll: { marginBottom: 16, marginHorizontal: -16 },
  tabsContent: { paddingHorizontal: 16, gap: 8 },
  tab: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: C.cardBg, borderWidth: 1, borderColor: C.separator },
  tabText: { fontSize: 12, color: C.textSecondary, fontFamily: "Inter_600SemiBold" },
  tabTextActive: { color: "#fff" },

  podiumCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  podiumBgIcon: {
    position: "absolute",
    right: -20,
    top: -20,
  },
  podiumRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 8,
    paddingTop: 8,
  },
  podiumColumn: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  podiumAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 4,
  },
  podiumAvatarText: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.3,
  },
  podiumTeamName: {
    fontSize: 12,
    color: C.text,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
  },
  podiumCountry: {
    fontSize: 9,
    color: C.textMuted,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
  },
  podiumPts: {
    fontSize: 10,
    color: C.textSecondary,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 4,
  },
  podiumBlock: {
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  podiumLabel: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1,
    paddingVertical: 6,
  },

  conferenceNote: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 12, paddingHorizontal: 4 },
  conferenceNoteText: { fontSize: 12, color: C.textMuted, fontFamily: "Inter_400Regular", flex: 1 },

  table: { backgroundColor: C.cardBg, borderRadius: 18, overflow: "hidden", borderWidth: 1, borderColor: C.separator, marginBottom: 16 },
  tableHeader: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 10, backgroundColor: C.surfaceElevated, gap: 8 },
  colRank: { width: 20, fontSize: 10, color: C.textMuted, fontFamily: "Inter_600SemiBold", textAlign: "center" },
  colTeam: { flex: 1, fontSize: 10, color: C.textMuted, fontFamily: "Inter_600SemiBold" },
  colForm: { width: 75, fontSize: 10, color: C.textMuted, fontFamily: "Inter_600SemiBold", textAlign: "center" },
  colStat: { width: 40, fontSize: 10, color: C.textMuted, fontFamily: "Inter_600SemiBold", textAlign: "center" },
  colPts: { width: 40, fontSize: 10, color: C.accent, fontFamily: "Inter_600SemiBold", textAlign: "center" },

  legendRow: { flexDirection: "row", gap: 20, paddingHorizontal: 4, marginBottom: 8 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 11, color: C.textMuted, fontFamily: "Inter_400Regular" },
});
