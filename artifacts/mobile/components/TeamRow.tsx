import { Ionicons } from "@expo/vector-icons";
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

function FormDot({ result }: { result: "W" | "L" }) {
  return (
    <View
      style={[
        styles.formDot,
        { backgroundColor: result === "W" ? C.success : C.danger },
      ]}
    />
  );
}

export default function TeamRow({ team, rank, isFavorite, onToggleFavorite }: Props) {
  const handleFavorite = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggleFavorite(team.id);
  };

  return (
    <View style={styles.row}>
      <Text style={[styles.rank, rank <= 3 && styles.rankTop]}>{rank}</Text>
      <View style={styles.teamInfo}>
        <Text style={styles.teamName}>{team.shortName}</Text>
        <Text style={styles.country}>{team.country}</Text>
      </View>
      <View style={styles.formRow}>
        {team.form.map((f, i) => (
          <FormDot key={i} result={f} />
        ))}
      </View>
      <Text style={styles.stat}>{team.wins}-{team.losses}</Text>
      <Text style={[styles.stat, styles.points]}>{team.points}</Text>
      <Pressable onPress={handleFavorite} hitSlop={10}>
        <Ionicons
          name={isFavorite ? "star" : "star-outline"}
          size={18}
          color={isFavorite ? C.accent : C.textMuted}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.separator,
    gap: 10,
  },
  rank: {
    width: 22,
    fontSize: 13,
    color: C.textSecondary,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
  rankTop: {
    color: C.accent,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 14,
    color: C.text,
    fontFamily: "Inter_700Bold",
  },
  country: {
    fontSize: 11,
    color: C.textMuted,
    fontFamily: "Inter_400Regular",
    marginTop: 1,
  },
  formRow: {
    flexDirection: "row",
    gap: 4,
    width: 70,
    justifyContent: "center",
  },
  formDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stat: {
    width: 44,
    textAlign: "center",
    fontSize: 13,
    color: C.textSecondary,
    fontFamily: "Inter_500Medium",
  },
  points: {
    color: C.accent,
    fontFamily: "Inter_700Bold",
  },
});
