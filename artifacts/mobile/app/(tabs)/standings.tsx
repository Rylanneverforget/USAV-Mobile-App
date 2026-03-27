import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TeamRow from "@/components/TeamRow";
import Colors from "@/constants/colors";
import { useApp } from "@/context/AppContext";

const C = Colors.light;
const WEB_TOP_INSET = 67;

export default function StandingsScreen() {
  const { teams, isFavorite, toggleFavorite } = useApp();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? WEB_TOP_INSET : insets.top + 16;

  const sorted = [...teams].sort((a, b) => b.points - a.points);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: topPad, paddingBottom: isWeb ? 34 : insets.bottom + 90 }]}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={["#0B3060", C.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      />

      <View style={styles.headerRow}>
        <View>
          <Text style={styles.heading}>Standings</Text>
          <Text style={styles.subheading}>VNL 2026 World League</Text>
        </View>
        <View style={styles.badge}>
          <Ionicons name="podium" size={14} color={C.accent} />
        </View>
      </View>

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
  container: {
    flex: 1,
    backgroundColor: C.primary,
  },
  headerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  content: {
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
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
  badge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(245,166,35,0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(245,166,35,0.3)",
  },
  table: {
    backgroundColor: C.cardBg,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: C.separator,
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: C.surfaceElevated,
    gap: 10,
  },
  colRank: {
    width: 22,
    fontSize: 11,
    color: C.textMuted,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
  colTeam: {
    flex: 1,
    fontSize: 11,
    color: C.textMuted,
    fontFamily: "Inter_600SemiBold",
  },
  colForm: {
    width: 70,
    fontSize: 11,
    color: C.textMuted,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
  colStat: {
    width: 44,
    fontSize: 11,
    color: C.textMuted,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
  colPts: {
    width: 44,
    fontSize: 11,
    color: C.accent,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
  legendRow: {
    flexDirection: "row",
    gap: 20,
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    color: C.textMuted,
    fontFamily: "Inter_400Regular",
  },
});
