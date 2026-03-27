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
import MatchCard from "@/components/MatchCard";
import NewsCard from "@/components/NewsCard";
import Colors from "@/constants/colors";
import { useApp } from "@/context/AppContext";

const C = Colors.light;

const WEB_TOP_INSET = 67;

export default function HomeScreen() {
  const { matches, favorites, teams, news } = useApp();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";

  const liveMatch = matches.find((m) => m.status === "live");
  const upcomingMatches = matches.filter((m) => m.status === "upcoming");
  const recentMatches = matches.filter((m) => m.status === "finished");
  const favoriteTeams = teams.filter((t) => favorites.includes(t.id));

  const topPad = isWeb
    ? WEB_TOP_INSET
    : insets.top + 16;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: topPad, paddingBottom: isWeb ? 34 : insets.bottom + 90 }]}
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
        style={[styles.headerGradient, { opacity: 0.25 }]}
      />

      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>USA Volleyball</Text>
          <Text style={styles.subtitle}>VNL 2026 · Go USA</Text>
        </View>
        <View style={styles.vnlBadge}>
          <Ionicons name="trophy" size={14} color={C.accent} />
          <Text style={styles.vnlText}>VNL</Text>
        </View>
      </View>

      {liveMatch && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.livePulse} />
            <Text style={styles.sectionTitle}>Live Now</Text>
          </View>
          <MatchCard match={liveMatch} />
        </View>
      )}

      {favoriteTeams.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="star" size={14} color={C.accent} />
            <Text style={styles.sectionTitle}>Your Teams</Text>
          </View>
          {favoriteTeams.map((team) => (
            <View key={team.id} style={styles.favTeamChip}>
              <Text style={styles.favTeamName}>{team.name}</Text>
              <View style={styles.favTeamStats}>
                <Text style={styles.favStat}>{team.wins}W</Text>
                <Text style={styles.favStatSep}>·</Text>
                <Text style={styles.favStat}>{team.losses}L</Text>
                <View style={styles.favPoints}>
                  <Text style={styles.favPointsText}>{team.points} pts</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      {upcomingMatches.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar-outline" size={14} color={C.accent} />
            <Text style={styles.sectionTitle}>Upcoming</Text>
          </View>
          {upcomingMatches.slice(0, 3).map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </View>
      )}

      {recentMatches.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="checkmark-circle-outline" size={14} color={C.textSecondary} />
            <Text style={styles.sectionTitle}>Recent Results</Text>
          </View>
          {recentMatches.slice(0, 2).map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </View>
      )}

      {news && news.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="newspaper-outline" size={14} color={C.accent} />
            <Text style={styles.sectionTitle}>Latest News</Text>
          </View>
          <NewsCard item={news[0]} featured />
          {news.slice(1, 3).map((n) => (
            <NewsCard key={n.id} item={n} />
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
    height: 250,
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
  greeting: {
    fontSize: 28,
    color: C.text,
    fontFamily: "Inter_700Bold",
  },
  subtitle: {
    fontSize: 13,
    color: C.textSecondary,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  vnlBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(191,13,62,0.15)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 5,
    borderWidth: 1,
    borderColor: "rgba(191,13,62,0.35)",
  },
  vnlText: {
    fontSize: 13,
    color: C.accent,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13,
    color: C.textSecondary,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  livePulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E84855",
  },
  favTeamChip: {
    backgroundColor: C.cardBg,
    borderRadius: 14,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: C.separator,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  favTeamName: {
    fontSize: 15,
    color: C.text,
    fontFamily: "Inter_600SemiBold",
  },
  favTeamStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  favStat: {
    fontSize: 13,
    color: C.textSecondary,
    fontFamily: "Inter_500Medium",
  },
  favStatSep: {
    color: C.textMuted,
  },
  favPoints: {
    backgroundColor: "rgba(245,166,35,0.15)",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  favPointsText: {
    fontSize: 12,
    color: C.accent,
    fontFamily: "Inter_600SemiBold",
  },
});
