import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/colors";
import type { Player } from "@/constants/data";
import { SpikeIcon, VolleyballSvg } from "@/components/VolleyballIcons";

const C = Colors.light;

type Props = {
  player: Player;
  rank: number;
  statType: "points" | "aces" | "blocks" | "digs";
};

const POSITION_ABBR: Record<string, string> = {
  "Outside Hitter":  "OH",
  "Opposite Hitter": "OPP",
  "Middle Blocker":  "MB",
  "Setter":          "S",
  "Libero":          "L",
};

const POSITION_COLORS: Record<string, string> = {
  "Outside Hitter":  "#3A7BF5",
  "Opposite Hitter": "#E04E8A",
  "Middle Blocker":  "#F5A623",
  "Setter":          "#44C98E",
  "Libero":          "#9B59B6",
};

const DISC_COLORS: Record<string, string> = {
  mens:        "#3A7BF5",
  womens:      "#E04E8A",
  beach:       "#F5A623",
  sitting:     "#44C98E",
  ncaa_womens: "#E04E8A",
  ncaa_mens:   "#3A7BF5",
};

const STAT_LABELS: Record<string, string> = {
  points: "PTS",
  aces:   "ACE",
  blocks: "BLK",
  digs:   "DIG",
};

const RANK_CONFIG = [
  { gradient: ["#FFD700", "#FFA500"] as [string, string], label: "1ST", glow: "#FFD70030" },
  { gradient: ["#C0C0C0", "#A0A0A0"] as [string, string], label: "2ND", glow: "#C0C0C020" },
  { gradient: ["#CD7F32", "#A0522D"] as [string, string], label: "3RD", glow: "#CD7F3220" },
];

function PlayerAvatar({ player, rank }: { player: Player; rank: number }) {
  const posColor = POSITION_COLORS[player.position] ?? "#3A7BF5";
  const discColor = DISC_COLORS[player.discipline] ?? "#3A7BF5";
  const initials = player.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <View style={styles.avatarWrap}>
      <View style={[styles.avatar, { borderColor: `${posColor}60` }]}>
        <LinearGradient
          colors={[`${discColor}45`, `${discColor}15`]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.avatarBgIcon}>
          <VolleyballSvg size={36} color={`${posColor}18`} />
        </View>
        <Text style={[styles.avatarInitials, { color: posColor }]}>{initials}</Text>
      </View>
      {rank <= 3 && (
        <View style={styles.medalBadge}>
          <LinearGradient
            colors={RANK_CONFIG[rank - 1].gradient}
            style={StyleSheet.absoluteFill}
          />
          <Text style={styles.medalText}>{rank}</Text>
        </View>
      )}
    </View>
  );
}

export default function PlayerCard({ player, rank, statType }: Props) {
  const value  = player.stats[statType];
  const maxVal = statType === "points" ? 320 : statType === "aces" ? 45 : statType === "blocks" ? 55 : 120;
  const pct    = Math.min(value / maxVal, 1);
  const posColor = POSITION_COLORS[player.position] ?? "#3A7BF5";
  const discColor = DISC_COLORS[player.discipline] ?? "#3A7BF5";
  const isTop3 = rank <= 3;

  return (
    <View style={[styles.card, isTop3 && styles.cardTop, isTop3 && { borderColor: `${RANK_CONFIG[rank - 1].gradient[0]}40` }]}>
      {isTop3 && (
        <LinearGradient
          colors={[`${RANK_CONFIG[rank - 1].gradient[0]}12`, "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      )}
      {!isTop3 && (
        <Text style={styles.rankNum}>{rank}</Text>
      )}

      <PlayerAvatar player={player} rank={rank} />

      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{player.name}</Text>
          <View style={[styles.posBadge, { backgroundColor: `${posColor}20`, borderColor: `${posColor}40` }]}>
            <Text style={[styles.posText, { color: posColor }]}>{POSITION_ABBR[player.position] ?? player.position}</Text>
          </View>
        </View>
        <Text style={styles.team}>{player.team} · {player.country}</Text>
        <View style={styles.barWrap}>
          <View style={styles.barTrack}>
            <LinearGradient
              colors={[discColor, `${discColor}60`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.barFill, { width: `${pct * 100}%` }]}
            />
          </View>
          <Text style={styles.barPct}>{Math.round(pct * 100)}%</Text>
        </View>
      </View>

      <View style={styles.statBlock}>
        <Text style={[styles.statValue, { color: isTop3 ? RANK_CONFIG[rank - 1].gradient[0] : C.accent }]}>
          {value}
        </Text>
        <Text style={styles.statLabel}>{STAT_LABELS[statType]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.cardBg,
    borderRadius: 16,
    padding: 13,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: C.separator,
    gap: 10,
    overflow: "hidden",
  },
  cardTop: {
    borderWidth: 1.5,
  },
  rankNum: {
    width: 20,
    fontSize: 13,
    color: C.textMuted,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
    flexShrink: 0,
  },
  avatarWrap: {
    position: "relative",
    flexShrink: 0,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarBgIcon: {
    position: "absolute",
    top: -4,
    left: -4,
  },
  avatarInitials: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
  },
  medalBadge: {
    position: "absolute",
    bottom: -3,
    right: -3,
    width: 18,
    height: 18,
    borderRadius: 9,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
  },
  medalText: {
    fontSize: 8,
    color: "#000",
    fontFamily: "Inter_700Bold",
  },
  info: {
    flex: 1,
    gap: 3,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  name: {
    fontSize: 14,
    color: C.text,
    fontFamily: "Inter_700Bold",
    flex: 1,
  },
  posBadge: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    flexShrink: 0,
  },
  posText: {
    fontSize: 9,
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.3,
  },
  team: {
    fontSize: 11,
    color: C.textMuted,
    fontFamily: "Inter_400Regular",
  },
  barWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  barTrack: {
    flex: 1,
    height: 4,
    backgroundColor: C.surfaceElevated,
    borderRadius: 2,
    overflow: "hidden",
  },
  barFill: {
    height: 4,
    borderRadius: 2,
  },
  barPct: {
    fontSize: 9,
    color: C.textMuted,
    fontFamily: "Inter_500Medium",
    width: 28,
    textAlign: "right",
  },
  statBlock: {
    alignItems: "center",
    flexShrink: 0,
    minWidth: 46,
  },
  statValue: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    lineHeight: 28,
  },
  statLabel: {
    fontSize: 9,
    color: C.textMuted,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1,
  },
});
