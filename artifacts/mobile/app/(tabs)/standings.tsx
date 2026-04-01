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

const C = Colors.light;
const WEB_TOP_INSET = 67;

const DISCIPLINE_TABS: { key: Discipline; label: string; icon: string }[] = [
  { key: "mens", label: "Men's", icon: "male" },
  { key: "womens", label: "Women's", icon: "female" },
  { key: "beach", label: "Beach", icon: "sunny" },
  { key: "sitting", label: "Sitting", icon: "accessibility" },
  { key: "ncaa_womens", label: "NCAA ♀", icon: "school" },
  { key: "ncaa_mens", label: "NCAA ♂", icon: "school-outline" },
];

const TOURNAMENT_LABELS: Record<Discipline, string> = {
  mens: "VNL 2026 Men's",
  womens: "VNL 2026 Women's",
  beach: "FIVB Beach Pro Tour",
  sitting: "World Para Volleyball",
  ncaa_womens: "NCAA Women's",
  ncaa_mens: "NCAA Men's",
};

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
  const leader = sorted[0];

  const showConference = activeDiscipline === "ncaa_womens" || activeDiscipline === "ncaa_mens";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: topPad, paddingBottom: isWeb ? 34 : insets.bottom + 90 }]}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient colors={["#002080", "#001F5B"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.headerGradient} />
      <LinearGradient colors={["#BF0D3E", "transparent"]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={[styles.headerGradient, { opacity: 0.2 }]} />

      <View style={styles.headerRow}>
        <View>
          <Text style={styles.heading}>Standings</Text>
          <Text style={styles.subheading}>
            {TOURNAMENT_LABELS[activeDiscipline]}
            {leader ? ` · ${leader.shortName} #1` : ""}
          </Text>
        </View>
        <View style={styles.badge}>
          <Ionicons name="podium" size={14} color={C.accent} />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.disciplineScroll}
        contentContainerStyle={styles.disciplineContent}
      >
        {DISCIPLINE_TABS.map((tab) => {
          const isActive = activeDiscipline === tab.key;
          return (
            <Pressable
              key={tab.key}
              style={[styles.disciplineTab, isActive && styles.disciplineTabActive]}
              onPress={() => setActiveDiscipline(tab.key)}
            >
              <Ionicons
                name={tab.icon as any}
                size={13}
                color={isActive ? "#fff" : C.textSecondary}
              />
              <Text style={[styles.disciplineTabText, isActive && styles.disciplineTabTextActive]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {showConference && (
        <View style={styles.conferenceNote}>
          <Ionicons name="information-circle-outline" size={14} color={C.textMuted} />
          <Text style={styles.conferenceNoteText}>Sorted by overall win percentage across all conferences</Text>
        </View>
      )}

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.colRank}>#</Text>
          <Text style={styles.colTeam}>Team</Text>
          <Text style={styles.colForm}>Form</Text>
          <Text style={styles.colStat}>W-L</Text>
          <Text style={styles.colPts}>Pts</Text>
          <View style={{ width: 24 }} />
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
          <Ionicons name="star" size={12} color={C.accent} />
          <Text style={styles.legendText}>Favorite</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.primary },
  headerGradient: { position: "absolute", top: 0, left: 0, right: 0, height: 200 },
  content: { paddingHorizontal: 16 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  heading: { fontSize: 28, color: C.text, fontFamily: "Inter_700Bold" },
  subheading: { fontSize: 13, color: C.textSecondary, fontFamily: "Inter_400Regular", marginTop: 2 },
  badge: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(191,13,62,0.15)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(191,13,62,0.35)" },
  disciplineScroll: { marginBottom: 12, marginHorizontal: -16 },
  disciplineContent: { paddingHorizontal: 16, gap: 8 },
  disciplineTab: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: C.cardBg, borderWidth: 1, borderColor: C.separator },
  disciplineTabActive: { backgroundColor: C.accent, borderColor: C.accent },
  disciplineTabText: { fontSize: 13, color: C.textSecondary, fontFamily: "Inter_600SemiBold" },
  disciplineTabTextActive: { color: "#fff" },
  conferenceNote: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 12, paddingHorizontal: 4 },
  conferenceNoteText: { fontSize: 12, color: C.textMuted, fontFamily: "Inter_400Regular", flex: 1 },
  table: { backgroundColor: C.cardBg, borderRadius: 18, overflow: "hidden", borderWidth: 1, borderColor: C.separator, marginBottom: 16 },
  tableHeader: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 10, backgroundColor: C.surfaceElevated, gap: 10 },
  colRank: { width: 22, fontSize: 11, color: C.textMuted, fontFamily: "Inter_600SemiBold", textAlign: "center" },
  colTeam: { flex: 1, fontSize: 11, color: C.textMuted, fontFamily: "Inter_600SemiBold" },
  colForm: { width: 70, fontSize: 11, color: C.textMuted, fontFamily: "Inter_600SemiBold", textAlign: "center" },
  colStat: { width: 44, fontSize: 11, color: C.textMuted, fontFamily: "Inter_600SemiBold", textAlign: "center" },
  colPts: { width: 44, fontSize: 11, color: C.accent, fontFamily: "Inter_600SemiBold", textAlign: "center" },
  legendRow: { flexDirection: "row", gap: 20, paddingHorizontal: 4, marginBottom: 8 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 11, color: C.textMuted, fontFamily: "Inter_400Regular" },
});
