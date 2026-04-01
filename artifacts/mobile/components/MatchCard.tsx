import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/colors";
import type { Match } from "@/constants/data";
import { VolleyballSvg, NetCourtIcon } from "@/components/VolleyballIcons";

const C = Colors.light;

type Props = {
  match: Match;
  compact?: boolean;
};

function PulsingDot() {
  const anim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 0.3, duration: 700, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return (
    <View style={styles.liveDotWrap}>
      <Animated.View style={[styles.livePulse, { opacity: anim }]} />
      <View style={styles.liveDot} />
    </View>
  );
}

function TeamAvatar({ name, color }: { name: string; color: string }) {
  const initials = name.slice(0, 3).toUpperCase();
  return (
    <View style={[styles.teamAvatar, { borderColor: `${color}40` }]}>
      <LinearGradient
        colors={[`${color}30`, `${color}10`]}
        style={StyleSheet.absoluteFill}
      />
      <Text style={[styles.teamAvatarText, { color }]}>{initials}</Text>
    </View>
  );
}

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
  const isLive    = match.status === "live";
  const isUpcoming = match.status === "upcoming";
  const teamColor = isLive ? "#E84855" : isUpcoming ? "#5B8DEF" : C.textMuted;

  return (
    <View style={[styles.card, compact && styles.compactCard, isLive && styles.cardLive]}>
      {isLive && (
        <LinearGradient
          colors={["rgba(232,72,85,0.08)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      )}

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.tournamentRow}>
          <Ionicons name="trophy-outline" size={10} color={C.accent} />
          <Text style={styles.tournament}>{match.tournament}</Text>
        </View>
        {isLive ? (
          <View style={styles.liveBadge}>
            <PulsingDot />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        ) : isUpcoming ? (
          <View style={styles.timeBadge}>
            <Ionicons name="calendar-outline" size={10} color="#5B8DEF" />
            <Text style={styles.timeUpcomingText}>{match.date}</Text>
          </View>
        ) : (
          <View style={styles.finishedBadge}>
            <Text style={styles.finishedText}>FINAL</Text>
          </View>
        )}
      </View>

      {/* Court */}
      <View style={styles.courtRow}>
        {/* Home team */}
        <View style={styles.teamSide}>
          <TeamAvatar name={match.homeTeam} color={teamColor} />
          <Text style={styles.teamName} numberOfLines={1}>{match.homeTeam}</Text>
        </View>

        {/* Score / VS */}
        <View style={styles.centerBlock}>
          {isUpcoming ? (
            <View style={styles.vsBlock}>
              <View style={styles.netIconWrap}>
                <NetCourtIcon size={22} color="rgba(255,255,255,0.08)" />
              </View>
              <Text style={styles.vsText}>VS</Text>
              <Text style={styles.vsTime}>{match.time}</Text>
            </View>
          ) : (
            <View style={styles.scoreBlock}>
              <Text style={[
                styles.score,
                !isLive && match.homeScore > match.awayScore && styles.scoreWin,
              ]}>
                {match.homeScore}
              </Text>
              <View style={styles.scoreDivider}>
                <VolleyballSvg size={14} color="rgba(255,255,255,0.12)" />
              </View>
              <Text style={[
                styles.score,
                !isLive && match.awayScore > match.homeScore && styles.scoreWin,
              ]}>
                {match.awayScore}
              </Text>
            </View>
          )}
        </View>

        {/* Away team */}
        <View style={[styles.teamSide, styles.teamSideRight]}>
          <TeamAvatar name={match.awayTeam} color={teamColor} />
          <Text style={styles.teamName} numberOfLines={1}>{match.awayTeam}</Text>
        </View>
      </View>

      {match.sets && match.sets.length > 0 && <SetScores sets={match.sets} />}
      {isLive && match.currentSet && (
        <View style={styles.setProgressRow}>
          <View style={styles.setProgressDot} />
          <Text style={styles.setLabel}>Set {match.currentSet} in progress</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: C.cardBg,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: C.separator,
    overflow: "hidden",
  },
  compactCard: {
    marginBottom: 0,
    borderRadius: 14,
    padding: 12,
  },
  cardLive: {
    borderColor: "rgba(232,72,85,0.35)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  tournamentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  tournament: {
    fontSize: 10,
    color: C.accent,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(232,72,85,0.18)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(232,72,85,0.4)",
  },
  liveDotWrap: {
    width: 8,
    height: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  livePulse: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E84855",
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#E84855",
  },
  liveText: {
    fontSize: 10,
    color: "#E84855",
    fontFamily: "Inter_700Bold",
    letterSpacing: 1.5,
  },
  timeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(91,141,239,0.12)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "rgba(91,141,239,0.3)",
  },
  timeUpcomingText: {
    fontSize: 10,
    color: "#5B8DEF",
    fontFamily: "Inter_600SemiBold",
  },
  finishedBadge: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  finishedText: {
    fontSize: 9,
    color: C.textMuted,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1,
  },

  courtRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  teamSide: {
    flex: 1,
    alignItems: "center",
    gap: 8,
  },
  teamSideRight: {},
  teamAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  teamAvatarText: {
    fontSize: 12,
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.5,
  },
  teamName: {
    fontSize: 14,
    color: C.text,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
  },

  centerBlock: {
    width: 90,
    alignItems: "center",
  },
  vsBlock: {
    alignItems: "center",
    gap: 2,
  },
  netIconWrap: {
    marginBottom: 2,
  },
  vsText: {
    fontSize: 14,
    color: C.textSecondary,
    fontFamily: "Inter_700Bold",
    letterSpacing: 2,
  },
  vsTime: {
    fontSize: 10,
    color: C.textMuted,
    fontFamily: "Inter_400Regular",
  },
  scoreBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  score: {
    fontSize: 32,
    color: C.textSecondary,
    fontFamily: "Inter_700Bold",
    lineHeight: 38,
  },
  scoreWin: {
    color: C.text,
  },
  scoreDivider: {
    alignItems: "center",
    justifyContent: "center",
  },

  setsRow: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    marginTop: 4,
  },
  setBox: {
    backgroundColor: C.surfaceElevated,
    borderRadius: 6,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  setScore: {
    fontSize: 11,
    color: C.textSecondary,
    fontFamily: "Inter_600SemiBold",
  },
  setProgressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 10,
  },
  setProgressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.accent,
  },
  setLabel: {
    fontSize: 11,
    color: C.accent,
    fontFamily: "Inter_500Medium",
  },
});
