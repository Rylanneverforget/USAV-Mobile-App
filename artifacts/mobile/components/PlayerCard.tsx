import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/colors";
import type { Player } from "@/constants/data";

const C = Colors.light;

type Props = {
  player: Player;
  rank: number;
  statType: "points" | "aces" | "blocks" | "digs";
};

const POSITION_ABBR: Record<string, string> = {
  "Outside Hitter": "OH",
  "Opposite Hitter": "OPP",
  "Middle Blocker": "MB",
  "Setter": "S",
  "Libero": "L",
};

export default function PlayerCard({ player, rank, statType }: Props) {
  const value = player.stats[statType];
  const maxVal = statType === "points" ? 320 : statType === "aces" ? 45 : statType === "blocks" ? 55 : 120;
  const pct = Math.min(value / maxVal, 1);

  return (
    <View style={styles.card}>
      <Text style={[styles.rank, rank === 1 && styles.goldRank, rank === 2 && styles.silverRank, rank === 3 && styles.bronzeRank]}>
        {rank}
      </Text>
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{player.name}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{POSITION_ABBR[player.position] ?? player.position}</Text>
          </View>
        </View>
        <Text style={styles.team}>{player.team} · {player.country}</Text>
        <View style={styles.barContainer}>
          <View style={[styles.bar, { width: `${pct * 100}%` }]} />
        </View>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.cardBg,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: C.separator,
    gap: 12,
  },
  rank: {
    width: 24,
    fontSize: 16,
    color: C.textMuted,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
  },
  goldRank: { color: "#FFD700" },
  silverRank: { color: "#C0C0C0" },
  bronzeRank: { color: "#CD7F32" },
  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {
    fontSize: 14,
    color: C.text,
    fontFamily: "Inter_700Bold",
  },
  badge: {
    backgroundColor: C.surfaceElevated,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 10,
    color: C.accent,
    fontFamily: "Inter_600SemiBold",
  },
  team: {
    fontSize: 11,
    color: C.textMuted,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
    marginBottom: 8,
  },
  barContainer: {
    height: 3,
    backgroundColor: C.surfaceElevated,
    borderRadius: 2,
    overflow: "hidden",
  },
  bar: {
    height: 3,
    backgroundColor: C.accent,
    borderRadius: 2,
  },
  value: {
    fontSize: 22,
    color: C.accent,
    fontFamily: "Inter_700Bold",
    minWidth: 40,
    textAlign: "right",
  },
});
