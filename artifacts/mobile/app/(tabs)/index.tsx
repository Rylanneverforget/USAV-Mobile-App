import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
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
import { useAuth } from "@/lib/auth";
import type { VolleyballRole, ContentInterest } from "@/context/AppContext";

const C = Colors.light;
const WEB_TOP_INSET = 67;

const ROLE_LABELS: Record<VolleyballRole, string> = {
  fan: "Fan",
  player: "Player",
  coach: "Coach",
  referee: "Referee",
  media: "Media",
};

const ROLE_GREETINGS: Record<VolleyballRole, string> = {
  fan: "Ready for game day?",
  player: "Train hard, play harder.",
  coach: "Lead your team to glory.",
  referee: "Keep the game fair.",
  media: "Stay on top of the action.",
};

const INTEREST_ICONS: Record<ContentInterest, string> = {
  live_scores: "flash",
  match_results: "trophy",
  player_stats: "bar-chart",
  team_news: "newspaper",
  training_tips: "fitness",
  olympics: "medal",
};

const INTEREST_LABELS: Record<ContentInterest, string> = {
  live_scores: "Live Scores",
  match_results: "Results",
  player_stats: "Stats",
  team_news: "Team News",
  training_tips: "Training",
  olympics: "Olympics",
};

function ProfileBadge({ onPress }: { onPress: () => void }) {
  const { user } = useAuth();
  const { preferences } = useApp();
  const initials = user?.firstName
    ? user.firstName[0] + (user.lastName?.[0] ?? "")
    : "?";

  return (
    <Pressable onPress={onPress} style={styles.profileBadge}>
      <View style={styles.profileAvatar}>
        <Text style={styles.profileInitials}>{initials}</Text>
      </View>
      {preferences.role && (
        <View style={styles.rolePill}>
          <Text style={styles.roleText}>{ROLE_LABELS[preferences.role]}</Text>
        </View>
      )}
    </Pressable>
  );
}

function QuickAccessBar({ interests }: { interests: ContentInterest[] }) {
  if (interests.length === 0) return null;
  const shown = interests.slice(0, 5);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.quickBar}
      contentContainerStyle={styles.quickBarContent}
    >
      {shown.map((interest) => (
        <View key={interest} style={styles.quickChip}>
          <Ionicons name={INTEREST_ICONS[interest] as any} size={13} color={C.accent} />
          <Text style={styles.quickChipText}>{INTEREST_LABELS[interest]}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

export default function HomeScreen() {
  const { matches, favorites, teams, news, preferences, resetOnboarding } = useApp();
  const { logout } = useAuth();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";

  const liveMatch = matches.find((m) => m.status === "live");
  const upcomingMatches = matches.filter((m) => m.status === "upcoming");
  const recentMatches = matches.filter((m) => m.status === "finished");
  const favoriteTeams = teams.filter((t) =>
    (preferences.favoriteTeams.length > 0 ? preferences.favoriteTeams : favorites).includes(t.id)
  );

  const showTrainingTips =
    preferences.contentInterests.includes("training_tips") &&
    (preferences.role === "player" || preferences.role === "coach");

  const showOlympics = preferences.contentInterests.includes("olympics");

  const topPad = isWeb ? WEB_TOP_INSET : insets.top + 16;
  const greeting = preferences.role ? ROLE_GREETINGS[preferences.role] : "Go USA";

  const handleProfilePress = () => {
    resetOnboarding();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: topPad, paddingBottom: isWeb ? 34 : insets.bottom + 90 },
      ]}
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
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>USA Volleyball</Text>
          <Text style={styles.subtitle}>VNL 2026 · {greeting}</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.vnlBadge}>
            <Ionicons name="trophy" size={14} color={C.accent} />
            <Text style={styles.vnlText}>VNL</Text>
          </View>
          <ProfileBadge onPress={handleProfilePress} />
        </View>
      </View>

      {preferences.contentInterests.length > 0 && (
        <QuickAccessBar interests={preferences.contentInterests} />
      )}

      {liveMatch &&
        (preferences.contentInterests.length === 0 ||
          preferences.contentInterests.includes("live_scores")) && (
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

      {showTrainingTips && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="fitness" size={14} color={C.accent} />
            <Text style={styles.sectionTitle}>Training Tips</Text>
          </View>
          {TRAINING_TIPS.map((tip) => (
            <View key={tip.id} style={styles.tipCard}>
              <View style={styles.tipIconWrap}>
                <Ionicons name={tip.icon as any} size={18} color={C.accent} />
              </View>
              <View style={styles.tipText}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipBody}>{tip.body}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {upcomingMatches.length > 0 &&
        (preferences.contentInterests.length === 0 ||
          preferences.contentInterests.includes("live_scores") ||
          preferences.contentInterests.includes("match_results")) && (
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

      {recentMatches.length > 0 &&
        (preferences.contentInterests.length === 0 ||
          preferences.contentInterests.includes("match_results")) && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="checkmark-circle-outline"
                size={14}
                color={C.textSecondary}
              />
              <Text style={styles.sectionTitle}>Recent Results</Text>
            </View>
            {recentMatches.slice(0, 2).map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </View>
        )}

      {showOlympics && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="medal" size={14} color="#F5A623" />
            <Text style={styles.sectionTitle}>LA28 Olympics</Text>
          </View>
          <View style={styles.olympicsCard}>
            <Text style={styles.olympicsTitle}>Los Angeles 2028</Text>
            <Text style={styles.olympicsBody}>
              Volleyball at the LA28 Olympics runs July 26 – August 10, 2028.
              The USA Men's and Women's teams are among the favorites.
            </Text>
            <View style={styles.olympicsTag}>
              <Text style={styles.olympicsTagText}>1Y 117D to go</Text>
            </View>
          </View>
        </View>
      )}

      {news && news.length > 0 &&
        (preferences.contentInterests.length === 0 ||
          preferences.contentInterests.includes("team_news")) && (
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

const TRAINING_TIPS = [
  {
    id: "1",
    icon: "repeat",
    title: "Serve Consistency",
    body: "Focus on tossing the ball to the same spot every time. Consistency in your toss leads to consistent serves.",
  },
  {
    id: "2",
    icon: "trending-up",
    title: "Vertical Jump Training",
    body: "Box jumps and depth jumps 3x/week can add 2-4 inches to your vertical in 8 weeks.",
  },
];

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
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
  profileBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  profileAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(191,13,62,0.2)",
    borderWidth: 1.5,
    borderColor: "rgba(191,13,62,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  profileInitials: {
    fontSize: 13,
    color: C.accent,
    fontFamily: "Inter_700Bold",
  },
  rolePill: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  roleText: {
    fontSize: 11,
    color: C.textSecondary,
    fontFamily: "Inter_500Medium",
  },
  quickBar: {
    marginBottom: 20,
    marginHorizontal: -16,
  },
  quickBarContent: {
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: "row",
  },
  quickChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(191,13,62,0.1)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(191,13,62,0.2)",
  },
  quickChipText: {
    fontSize: 12,
    color: C.accent,
    fontFamily: "Inter_500Medium",
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
  tipCard: {
    flexDirection: "row",
    backgroundColor: C.cardBg,
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: C.separator,
    gap: 12,
    alignItems: "flex-start",
  },
  tipIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(191,13,62,0.12)",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  tipText: {
    flex: 1,
    gap: 3,
  },
  tipTitle: {
    fontSize: 14,
    color: C.text,
    fontFamily: "Inter_600SemiBold",
  },
  tipBody: {
    fontSize: 13,
    color: C.textSecondary,
    fontFamily: "Inter_400Regular",
    lineHeight: 19,
  },
  olympicsCard: {
    backgroundColor: "rgba(245,166,35,0.06)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(245,166,35,0.2)",
    gap: 8,
  },
  olympicsTitle: {
    fontSize: 16,
    color: C.text,
    fontFamily: "Inter_700Bold",
  },
  olympicsBody: {
    fontSize: 13,
    color: C.textSecondary,
    fontFamily: "Inter_400Regular",
    lineHeight: 19,
  },
  olympicsTag: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(245,166,35,0.15)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  olympicsTagText: {
    fontSize: 12,
    color: "#F5A623",
    fontFamily: "Inter_600SemiBold",
  },
});
