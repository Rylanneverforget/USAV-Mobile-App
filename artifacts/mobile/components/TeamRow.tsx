import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/colors";
import type { Team } from "@/constants/data";

const C = Colors.light;

type Props = {
  team: Team;
  rank: number;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
};

const RANK_COLORS = ["#FFD700", "#C0C0C0", "#CD7F32"];
const DISC_COLORS: Record<string, string> = {
  mens:        "#3A7BF5",
  womens:      "#E04E8A",
  beach:       "#F5A623",
  sitting:     "#44C98E",
  ncaa_womens: "#E04E8A",
  ncaa_mens:   "#3A7BF5",
};

function FormPill({ result }: { result: "W" | "L" }) {
  const isWin = result === "W";
  return (
    <View style={[styles.formPill, { backgroundColor: isWin ? "rgba(45,197,121,0.2)" : "rgba(232,72,85,0.2)" }]}>
      <Text style={[styles.formText, { color: isWin ? C.success : C.danger }]}>{result}</Text>
    </View>
  );
}

function TeamAvatar({ team, rank }: { team: Team; rank: number }) {
  const discColor = DISC_COLORS[team.discipline] ?? "#3A7BF5";
  const rankColor = rank <= 3 ? RANK_COLORS[rank - 1] : discColor;
  const code = team.shortName.slice(0, 3).toUpperCase();

  return (
    <View style={[styles.avatar, { borderColor: `${rankColor}50` }]}>
      <LinearGradient
        colors={[`${rankColor}30`, `${rankColor}10`]}
        style={StyleSheet.absoluteFill}
      />
      <Text style={[styles.avatarText, { color: rankColor }]}>{code}</Text>
    </View>
  );
}

export default function TeamRow({ team, rank, isFavorite, onToggleFavorite }: Props) {
  const handleFavorite = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggleFavorite(team.id);
  };

  const isTop3 = rank <= 3;
  const rankColor = isTop3 ? RANK_COLORS[rank - 1] : undefined;

  return (
    <View style={[styles.row, isTop3 && styles.rowTop]}>
      {isTop3 && (
        <LinearGradient
          colors={[`${RANK_COLORS[rank - 1]}10`, "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      )}

      <View style={styles.rankWrap}>
        <Text style={[styles.rank, rankColor ? { color: rankColor } : {}]}>{rank}</Text>
      </View>

      <TeamAvatar team={team} rank={rank} />

      <View style={styles.teamInfo}>
        <Text style={styles.teamName}>{team.shortName}</Text>
        <Text style={styles.country} numberOfLines={1}>{team.country}</Text>
      </View>

      <View style={styles.formRow}>
        {team.form.map((f, i) => <FormPill key={i} result={f} />)}
      </View>

      <Text style={styles.stat}>{team.wins}-{team.losses}</Text>
      <Text style={[styles.stat, styles.points]}>{team.points}</Text>

      <Pressable onPress={handleFavorite} hitSlop={12} style={styles.favBtn}>
        <Ionicons
          name={isFavorite ? "star" : "star-outline"}
          size={18}
          color={isFavorite ? "#FFD700" : C.textMuted}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.separator,
    gap: 8,
    overflow: "hidden",
  },
  rowTop: {},
  rankWrap: {
    width: 20,
    alignItems: "center",
  },
  rank: {
    fontSize: 13,
    color: C.textMuted,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexShrink: 0,
  },
  avatarText: {
    fontSize: 10,
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.3,
  },
  teamInfo: {
    flex: 1,
    minWidth: 0,
  },
  teamName: {
    fontSize: 13,
    color: C.text,
    fontFamily: "Inter_700Bold",
  },
  country: {
    fontSize: 10,
    color: C.textMuted,
    fontFamily: "Inter_400Regular",
    marginTop: 1,
  },
  formRow: {
    flexDirection: "row",
    gap: 3,
    width: 75,
    justifyContent: "center",
  },
  formPill: {
    width: 18,
    height: 18,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  formText: {
    fontSize: 9,
    fontFamily: "Inter_700Bold",
  },
  stat: {
    width: 40,
    textAlign: "center",
    fontSize: 12,
    color: C.textSecondary,
    fontFamily: "Inter_500Medium",
  },
  points: {
    color: C.accent,
    fontFamily: "Inter_700Bold",
    fontSize: 13,
  },
  favBtn: {
    width: 28,
    alignItems: "center",
  },
});
