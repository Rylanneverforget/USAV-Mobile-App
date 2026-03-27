import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/colors";
import type { Match } from "@/constants/data";

const C = Colors.light;

type Props = {
  match: Match;
  compact?: boolean;
};

function SetScores({ sets }: { sets: { home: number; away: number }[] }) {
  return (
    <View style={styles.setsRow}>
      {sets.map((s, i) => (
        <View key={i} style={styles.setBox}>
          <Text style={styles.setScore}>{s.home}-{s.away}</Text>
        </View>
      ))}
    </View>
  );
}

export default function MatchCard({ match, compact }: Props) {
  const isLive = match.status === "live";
  const isUpcoming = match.status === "upcoming";

  return (
    <View style={[styles.card, compact && styles.compactCard]}>
      <View style={styles.header}>
        <View style={styles.tournamentRow}>
          <Ionicons name="trophy-outline" size={11} color={C.accent} />
          <Text style={styles.tournament}>{match.tournament}</Text>
        </View>
        {isLive ? (
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        ) : (
          <Text style={styles.timeText}>{match.time}</Text>
        )}
      </View>

      <View style={styles.matchRow}>
        <Text style={styles.teamName}>{match.homeTeam}</Text>
        {isUpcoming ? (
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>VS</Text>
            <Text style={styles.dateText}>{match.date}</Text>
          </View>
        ) : (
          <View style={styles.scoreContainer}>
            <Text style={[styles.score, !isLive && match.homeScore > match.awayScore && styles.scoreWinner]}>
              {match.homeScore}
            </Text>
            <Text style={styles.scoreDash}>-</Text>
            <Text style={[styles.score, !isLive && match.awayScore > match.homeScore && styles.scoreWinner]}>
              {match.awayScore}
            </Text>
          </View>
        )}
        <Text style={styles.teamName}>{match.awayTeam}</Text>
      </View>

      {match.sets && match.sets.length > 0 && (
        <SetScores sets={match.sets} />
      )}

      {isLive && match.currentSet && (
        <Text style={styles.setLabel}>Set {match.currentSet} in progress</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: C.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: C.separator,
  },
  compactCard: {
    marginBottom: 0,
    borderRadius: 12,
    padding: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  tournamentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  tournament: {
    fontSize: 11,
    color: C.accent,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.5,
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(232,72,85,0.15)",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E84855",
  },
  liveText: {
    fontSize: 10,
    color: "#E84855",
    fontFamily: "Inter_700Bold",
    letterSpacing: 1,
  },
  timeText: {
    fontSize: 12,
    color: C.textSecondary,
    fontFamily: "Inter_500Medium",
  },
  matchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  teamName: {
    fontSize: 18,
    color: C.text,
    fontFamily: "Inter_700Bold",
    flex: 1,
    textAlign: "center",
  },
  vsContainer: {
    alignItems: "center",
    paddingHorizontal: 12,
  },
  vsText: {
    fontSize: 14,
    color: C.textMuted,
    fontFamily: "Inter_700Bold",
    letterSpacing: 2,
  },
  dateText: {
    fontSize: 10,
    color: C.textMuted,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 4,
  },
  score: {
    fontSize: 28,
    color: C.text,
    fontFamily: "Inter_700Bold",
  },
  scoreWinner: {
    color: C.accent,
  },
  scoreDash: {
    fontSize: 20,
    color: C.textMuted,
    fontFamily: "Inter_400Regular",
  },
  setsRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 12,
    justifyContent: "center",
  },
  setBox: {
    backgroundColor: C.surfaceElevated,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  setScore: {
    fontSize: 11,
    color: C.textSecondary,
    fontFamily: "Inter_500Medium",
  },
  setLabel: {
    fontSize: 11,
    color: C.accent,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
    marginTop: 8,
  },
});
