import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  Modal,
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
import JuniorClubSection from "@/components/JuniorClubSection";
import Colors from "@/constants/colors";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/lib/auth";
import { MATCHES, NEWS, ALL_TEAMS, type Discipline } from "@/constants/data";
import type { VolleyballRole, ContentInterest } from "@/context/AppContext";
import {
  MensIcon,
  WomensIcon,
  BeachIcon,
  SittingIcon,
  CollegeIcon,
  SpikeIcon,
  NetCourtIcon,
  OlympicsIcon,
  NewsScrollIcon,
  VolleyballSvg,
  JerseyIcon,
} from "@/components/VolleyballIcons";

const C = Colors.light;
const WEB_TOP_INSET = 67;

const ROLE_GREETINGS: Record<VolleyballRole, string> = {
  fan:     "Ready for game day?",
  player:  "Train hard, play harder.",
  coach:   "Lead your team to glory.",
  referee: "Keep the game fair.",
  media:   "Stay on top of the action.",
};

const ROLE_LABELS: Record<VolleyballRole, string> = {
  fan: "Fan", player: "Player", coach: "Coach", referee: "Referee", media: "Media",
};

type SvgIconComponent = React.ComponentType<{ size?: number; color?: string }>;

const INTEREST_SVG_ICONS: Record<ContentInterest, SvgIconComponent> = {
  live_scores:   SpikeIcon,
  match_results: NetCourtIcon,
  player_stats:  JerseyIcon,
  team_news:     NewsScrollIcon,
  training_tips: VolleyballSvg,
  olympics:      OlympicsIcon,
};

const INTEREST_LABELS: Record<ContentInterest, string> = {
  live_scores: "Live", match_results: "Results", player_stats: "Stats",
  team_news: "News", training_tips: "Training", olympics: "Olympics",
};

const DISCIPLINE_CONFIG: Record<Discipline, {
  label: string; SvgIcon: SvgIconComponent; color: string; bg: string; tournament: string
}> = {
  mens:        { label: "Men's",        SvgIcon: MensIcon,    color: "#3A7BF5", bg: "rgba(58,123,245,0.10)",  tournament: "VNL 2026" },
  womens:      { label: "Women's",      SvgIcon: WomensIcon,  color: "#E04E8A", bg: "rgba(224,78,138,0.10)",  tournament: "VNL 2026" },
  beach:       { label: "Beach",        SvgIcon: BeachIcon,   color: "#F5A623", bg: "rgba(245,166,35,0.10)",  tournament: "Beach Pro Tour" },
  sitting:     { label: "Sitting",      SvgIcon: SittingIcon, color: "#44C98E", bg: "rgba(68,201,142,0.10)",  tournament: "World Para VB" },
  ncaa_womens: { label: "NCAA Women's", SvgIcon: CollegeIcon, color: "#E04E8A", bg: "rgba(224,78,138,0.10)",  tournament: "NCAA 2025-26" },
  ncaa_mens:   { label: "NCAA Men's",   SvgIcon: CollegeIcon, color: "#3A7BF5", bg: "rgba(58,123,245,0.10)",  tournament: "NCAA 2025-26" },
};

const ALL_DISCIPLINES: Discipline[] = ["mens", "womens", "beach", "sitting", "ncaa_womens", "ncaa_mens"];

const TRAINING_TIPS = [
  { id: "1", icon: "repeat", title: "Serve Consistency", body: "Focus on tossing the ball to the same spot every time. Consistency in your toss leads to consistent serves." },
  { id: "2", icon: "trending-up", title: "Vertical Jump Training", body: "Box jumps and depth jumps 3x/week can add 2-4 inches to your vertical in 8 weeks." },
];

/* ── Profile badge ── */
function ProfileBadge({ onPress }: { onPress: () => void }) {
  const { user } = useAuth();
  const { preferences } = useApp();
  const initials = user?.firstName ? user.firstName[0] + (user.lastName?.[0] ?? "") : "?";
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

/* ── Profile menu ── */
function ProfileMenu({
  visible, onClose, onUpdatePreferences, onSignOut,
}: {
  visible: boolean; onClose: () => void; onUpdatePreferences: () => void; onSignOut: () => void;
}) {
  const { user } = useAuth();
  const { preferences } = useApp();
  const insets = useSafeAreaInsets();
  const initials = user?.firstName ? user.firstName[0] + (user.lastName?.[0] ?? "") : "?";
  const displayName = user?.firstName ? `${user.firstName} ${user.lastName ?? ""}`.trim() : "Guest";
  const disciplineCount = preferences.disciplines.length;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.menuOverlay} onPress={onClose}>
        <Pressable
          style={[styles.menuSheet, { paddingBottom: insets.bottom + 16 }]}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.menuHandle} />
          <View style={styles.menuProfile}>
            <View style={styles.menuAvatar}>
              <Text style={styles.menuAvatarText}>{initials}</Text>
            </View>
            <View style={styles.menuProfileInfo}>
              <Text style={styles.menuDisplayName}>{displayName}</Text>
              {preferences.role && (
                <Text style={styles.menuRole}>{ROLE_LABELS[preferences.role]} · {disciplineCount} discipline{disciplineCount !== 1 ? "s" : ""}</Text>
              )}
            </View>
          </View>
          <View style={styles.menuDivider} />
          <Pressable
            style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
            onPress={() => { onClose(); onUpdatePreferences(); }}
          >
            <View style={styles.menuItemIcon}>
              <Ionicons name="options-outline" size={18} color={C.accent} />
            </View>
            <View style={styles.menuItemText}>
              <Text style={styles.menuItemLabel}>Update Preferences</Text>
              <Text style={styles.menuItemSub}>Change disciplines, teams & interests</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={C.textMuted} />
          </Pressable>
          <View style={styles.menuDivider} />
          <Pressable
            style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
            onPress={() => { onClose(); onSignOut(); }}
          >
            <View style={[styles.menuItemIcon, styles.menuItemIconDanger]}>
              <Ionicons name="log-out-outline" size={18} color="#E84855" />
            </View>
            <View style={styles.menuItemText}>
              <Text style={[styles.menuItemLabel, styles.menuItemLabelDanger]}>Sign Out</Text>
              <Text style={styles.menuItemSub}>Log out of your Spike account</Text>
            </View>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

/* ── Discipline pill ── */
function DisciplinePill({ disc, active, onPress }: { disc: Discipline; active: boolean; onPress: () => void }) {
  const cfg = DISCIPLINE_CONFIG[disc];
  return (
    <Pressable
      onPress={onPress}
      style={[styles.discPill, active && { backgroundColor: cfg.color, borderColor: cfg.color }]}
    >
      <cfg.SvgIcon size={13} color={active ? "#fff" : C.textSecondary} />
      <Text style={[styles.discPillText, active && { color: "#fff" }]}>{cfg.label}</Text>
    </Pressable>
  );
}

/* ── Hero spotlight card ── */
function SpotlightCard({ disciplines }: { disciplines: Discipline[] }) {
  const liveMatch = MATCHES.find((m) => m.status === "live" && disciplines.includes(m.discipline));
  const upcomingMatch = MATCHES.find((m) => m.status === "upcoming" && disciplines.includes(m.discipline));
  const spotMatch = liveMatch ?? upcomingMatch;

  const pulseAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (!liveMatch) return;
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.5, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [liveMatch]);

  if (!spotMatch) {
    return (
      <View style={styles.spotlightCard}>
        <LinearGradient colors={["#0A2E80", "#001A50"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
        <LinearGradient colors={["rgba(191,13,62,0.15)", "transparent"]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={StyleSheet.absoluteFill} />
        <View style={styles.spotlightBgLeft}>
          <VolleyballSvg size={110} color="rgba(255,255,255,0.04)" />
        </View>
        <View style={styles.spotlightBgRight}>
          <NetCourtIcon size={80} color="rgba(255,255,255,0.03)" />
        </View>
        <View style={styles.spotlightEmpty}>
          <VolleyballSvg size={36} color={C.accent} />
          <Text style={styles.spotlightEmptyTitle}>Game Day Ready</Text>
          <Text style={styles.spotlightEmptySub}>Check back for live scores & upcoming matches</Text>
        </View>
      </View>
    );
  }

  const isLive = spotMatch.status === "live";
  const disc = DISCIPLINE_CONFIG[spotMatch.discipline];

  return (
    <View style={[styles.spotlightCard, isLive && { borderColor: "rgba(232,72,85,0.4)" }]}>
      <LinearGradient colors={["#0A2E80", "#001A50"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
      <LinearGradient colors={[`${disc.color}25`, "transparent"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
      {isLive && (
        <LinearGradient colors={["rgba(232,72,85,0.15)", "transparent"]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={StyleSheet.absoluteFill} />
      )}

      <View style={styles.spotlightBgLeft}>
        <NetCourtIcon size={130} color="rgba(255,255,255,0.03)" />
      </View>
      <View style={styles.spotlightBgRight}>
        <VolleyballSvg size={70} color="rgba(255,255,255,0.04)" />
      </View>

      <View style={styles.spotlightHeader}>
        <View style={styles.spotlightDiscBadge}>
          <disc.SvgIcon size={11} color={disc.color} />
          <Text style={[styles.spotlightDiscText, { color: disc.color }]}>{disc.label}</Text>
        </View>
        {isLive ? (
          <View style={styles.spotlightLiveBadge}>
            <Animated.View style={[styles.spotlightLiveDotPulse, { opacity: pulseAnim }]} />
            <View style={styles.spotlightLiveDot} />
            <Text style={styles.spotlightLiveText}>LIVE NOW</Text>
          </View>
        ) : (
          <View style={styles.spotlightUpcomingBadge}>
            <Ionicons name="calendar-outline" size={10} color="#5B8DEF" />
            <Text style={styles.spotlightUpcomingText}>{spotMatch.date}</Text>
          </View>
        )}
      </View>

      <View style={styles.spotlightMatch}>
        <View style={styles.spotlightTeam}>
          <View style={[styles.spotlightTeamBadge, { borderColor: `${disc.color}50` }]}>
            <LinearGradient colors={[`${disc.color}30`, "transparent"]} style={StyleSheet.absoluteFill} />
            <Text style={[styles.spotlightTeamCode, { color: disc.color }]}>
              {spotMatch.homeTeam.slice(0, 3).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.spotlightTeamName}>{spotMatch.homeTeam}</Text>
        </View>

        <View style={styles.spotlightCenter}>
          {isLive ? (
            <View style={styles.spotlightScoreBox}>
              <Text style={[styles.spotlightScore, spotMatch.homeScore > spotMatch.awayScore && styles.spotlightScoreWin]}>
                {spotMatch.homeScore}
              </Text>
              <Text style={styles.spotlightScoreDash}>:</Text>
              <Text style={[styles.spotlightScore, spotMatch.awayScore > spotMatch.homeScore && styles.spotlightScoreWin]}>
                {spotMatch.awayScore}
              </Text>
            </View>
          ) : (
            <View style={styles.spotlightVsBox}>
              <Text style={styles.spotlightVs}>VS</Text>
              <Text style={styles.spotlightTime}>{spotMatch.time}</Text>
            </View>
          )}
          <Text style={styles.spotlightTournament}>{spotMatch.tournament}</Text>
        </View>

        <View style={[styles.spotlightTeam, styles.spotlightTeamRight]}>
          <View style={[styles.spotlightTeamBadge, { borderColor: `${disc.color}50` }]}>
            <LinearGradient colors={[`${disc.color}30`, "transparent"]} style={StyleSheet.absoluteFill} />
            <Text style={[styles.spotlightTeamCode, { color: disc.color }]}>
              {spotMatch.awayTeam.slice(0, 3).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.spotlightTeamName}>{spotMatch.awayTeam}</Text>
        </View>
      </View>
    </View>
  );
}

/* ── Discipline content section ── */
function DisciplineSection({ disc, favoriteTeamIds }: { disc: Discipline; favoriteTeamIds: string[] }) {
  const cfg = DISCIPLINE_CONFIG[disc];
  const discMatches  = MATCHES.filter((m) => m.discipline === disc);
  const liveMatch    = discMatches.find((m) => m.status === "live");
  const upcomingMatches = discMatches.filter((m) => m.status === "upcoming").slice(0, 2);
  const recentMatch  = discMatches.find((m) => m.status === "finished");
  const discNews     = NEWS.filter((n) => n.discipline === disc).slice(0, 1);
  const discTeams    = ALL_TEAMS.filter((t) => t.discipline === disc && favoriteTeamIds.includes(t.id));

  const hasContent = liveMatch || upcomingMatches.length > 0 || recentMatch || discNews.length > 0 || discTeams.length > 0;
  if (!hasContent) return null;

  return (
    <View style={styles.disciplineSection}>
      {/* Section header */}
      <View style={[styles.disciplineHeader, { borderLeftColor: cfg.color }]}>
        <LinearGradient
          colors={[`${cfg.color}15`, "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={[styles.disciplineIconBox, { backgroundColor: cfg.color }]}>
          <cfg.SvgIcon size={14} color="#fff" />
        </View>
        <View style={styles.disciplineHeaderText}>
          <Text style={[styles.disciplineLabel, { color: cfg.color }]}>{cfg.label}</Text>
          <Text style={styles.disciplineTournament}>{cfg.tournament}</Text>
        </View>
        {liveMatch && (
          <View style={styles.livePill}>
            <View style={styles.livePillDot} />
            <Text style={styles.livePillText}>LIVE</Text>
          </View>
        )}
        {discTeams.length > 0 && (
          <View style={styles.favCountPill}>
            <Ionicons name="star" size={9} color="#FFD700" />
            <Text style={styles.favCountText}>{discTeams.length}</Text>
          </View>
        )}
      </View>

      {discTeams.length > 0 && (
        <View style={styles.favTeamsRow}>
          {discTeams.map((team) => (
            <View key={team.id} style={[styles.miniTeamChip, { borderColor: `${cfg.color}30` }]}>
              <View style={[styles.miniTeamDot, { backgroundColor: cfg.color }]} />
              <Text style={styles.miniTeamName}>{team.shortName}</Text>
              <Text style={styles.miniTeamRecord}>{team.wins}W-{team.losses}L</Text>
            </View>
          ))}
        </View>
      )}

      {liveMatch && <MatchCard match={liveMatch} />}
      {!liveMatch && upcomingMatches.map((m) => <MatchCard key={m.id} match={m} />)}
      {!liveMatch && upcomingMatches.length === 0 && recentMatch && <MatchCard match={recentMatch} />}
      {discNews.map((n) => <NewsCard key={n.id} item={n} />)}
    </View>
  );
}

/* ── Home screen ── */
export default function HomeScreen() {
  const { preferences, resetOnboarding } = useApp();
  const { logout } = useAuth();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";

  const [menuVisible, setMenuVisible] = useState(false);

  const activeDisciplines = preferences.disciplines.length > 0 ? preferences.disciplines : ALL_DISCIPLINES;
  const [activeFilter, setActiveFilter] = useState<Discipline | "all">("all");

  const displayDisciplines = activeFilter === "all" ? activeDisciplines : activeDisciplines.filter((d) => d === activeFilter);

  const liveCount = MATCHES.filter((m) => m.status === "live" && activeDisciplines.includes(m.discipline)).length;
  const upcomingCount = MATCHES.filter((m) => m.status === "upcoming" && activeDisciplines.includes(m.discipline)).length;

  const showTrainingTips = preferences.contentInterests.includes("training_tips") && (preferences.role === "player" || preferences.role === "coach");
  const showOlympics = preferences.contentInterests.includes("olympics");

  const topPad = isWeb ? WEB_TOP_INSET : insets.top + 16;
  const greeting = preferences.role ? ROLE_GREETINGS[preferences.role] : "Your volleyball universe";
  const favoriteTeamIds = preferences.favoriteTeams;
  const allNews = NEWS.filter((n) => !n.discipline || activeDisciplines.includes(n.discipline));

  return (
    <>
      <ProfileMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onUpdatePreferences={resetOnboarding}
        onSignOut={async () => logout()}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingTop: topPad, paddingBottom: isWeb ? 34 : insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header gradients */}
        <LinearGradient colors={["#002080", "#001F5B"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.headerGradient} />
        <LinearGradient colors={["#BF0D3E", "transparent"]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={[styles.headerGradient, { opacity: 0.22 }]} />

        {/* Top row */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Spike</Text>
            <Text style={styles.subtitle}>{greeting}</Text>
          </View>
          <View style={styles.headerRight}>
            {liveCount > 0 && (
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveBadgeText}>{liveCount} LIVE</Text>
              </View>
            )}
            <ProfileBadge onPress={() => setMenuVisible(true)} />
          </View>
        </View>

        {/* USAV bar */}
        <View style={styles.usavBar}>
          <VolleyballSvg size={11} color={C.accent} />
          <Text style={styles.usavBarText}>Powered by USA Volleyball</Text>
        </View>

        {/* Quick stats strip */}
        <View style={styles.statsStrip}>
          <View style={styles.statStripItem}>
            <Text style={styles.statStripValue}>{liveCount}</Text>
            <Text style={styles.statStripLabel}>Live Now</Text>
          </View>
          <View style={styles.statStripDivider} />
          <View style={styles.statStripItem}>
            <Text style={styles.statStripValue}>{upcomingCount}</Text>
            <Text style={styles.statStripLabel}>Upcoming</Text>
          </View>
          <View style={styles.statStripDivider} />
          <View style={styles.statStripItem}>
            <Text style={styles.statStripValue}>{activeDisciplines.length}</Text>
            <Text style={styles.statStripLabel}>Disciplines</Text>
          </View>
          <View style={styles.statStripDivider} />
          <View style={styles.statStripItem}>
            <Text style={styles.statStripValue}>{favoriteTeamIds.length}</Text>
            <Text style={styles.statStripLabel}>Favorites</Text>
          </View>
        </View>

        {/* Spotlight hero card */}
        <SpotlightCard disciplines={activeDisciplines} />

        {/* Junior Club Hub */}
        {preferences.juniorClub && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <NetCourtIcon size={16} color={C.accent} />
              <Text style={styles.sectionTitle}>My Club Hub</Text>
              <View style={styles.juniorBadge}>
                <Text style={styles.juniorBadgeText}>Junior Club</Text>
              </View>
            </View>
            <JuniorClubSection juniorClub={preferences.juniorClub} />
          </View>
        )}

        {/* Interest chips */}
        {preferences.contentInterests.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.interestBar} contentContainerStyle={styles.interestBarContent}>
            {preferences.contentInterests.map((interest) => {
              const InterestIcon = INTEREST_SVG_ICONS[interest];
              return (
                <View key={interest} style={styles.interestChip}>
                  <InterestIcon size={13} color={C.accent} />
                  <Text style={styles.interestChipText}>{INTEREST_LABELS[interest]}</Text>
                </View>
              );
            })}
          </ScrollView>
        )}

        {/* Discipline filter */}
        {activeDisciplines.length > 1 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.discFilterBar} contentContainerStyle={styles.discFilterContent}>
            <Pressable
              style={[styles.discPill, activeFilter === "all" && styles.discPillAll]}
              onPress={() => setActiveFilter("all")}
            >
              <Text style={[styles.discPillText, activeFilter === "all" && { color: "#fff" }]}>All</Text>
            </Pressable>
            {activeDisciplines.map((d) => (
              <DisciplinePill key={d} disc={d} active={activeFilter === d} onPress={() => setActiveFilter(d === activeFilter ? "all" : d)} />
            ))}
          </ScrollView>
        )}

        {/* Training tips */}
        {showTrainingTips && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <VolleyballSvg size={15} color={C.accent} />
              <Text style={styles.sectionTitle}>Training Tips</Text>
            </View>
            {TRAINING_TIPS.map((tip) => (
              <View key={tip.id} style={styles.tipCard}>
                <LinearGradient
                  colors={["rgba(191,13,62,0.08)", "transparent"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={StyleSheet.absoluteFill}
                />
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

        {/* Discipline sections */}
        <View style={styles.section}>
          {displayDisciplines.map((disc) => (
            <DisciplineSection key={disc} disc={disc} favoriteTeamIds={favoriteTeamIds} />
          ))}
        </View>

        {/* Olympics promo */}
        {showOlympics && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <OlympicsIcon size={15} color="#F5A623" />
              <Text style={styles.sectionTitle}>LA28 Olympics</Text>
            </View>
            <View style={styles.olympicsCard}>
              <LinearGradient
                colors={["rgba(245,166,35,0.12)", "rgba(245,166,35,0.04)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.olympicsBgIcon}>
                <OlympicsIcon size={80} color="rgba(245,166,35,0.07)" />
              </View>
              <View style={styles.olympicsRow}>
                <View style={styles.olympicsTextBlock}>
                  <Text style={styles.olympicsTitle}>Los Angeles 2028</Text>
                  <Text style={styles.olympicsBody}>
                    Volleyball, Beach Volleyball, and Sitting Volleyball all featured at LA28. The USA Men's and Women's squads are among the gold medal favorites.
                  </Text>
                </View>
                <View style={styles.olympicsCountdown}>
                  <Text style={styles.olympicsCountdownNumber}>2</Text>
                  <Text style={styles.olympicsCountdownLabel}>Years{"\n"}Away</Text>
                </View>
              </View>
              <View style={styles.olympicsTagRow}>
                {["Men's VB", "Women's VB", "Beach VB", "Sitting VB"].map((tag) => (
                  <View key={tag} style={styles.olympicsTag}>
                    <Text style={styles.olympicsTagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Latest news */}
        {allNews.length > 0 && (preferences.contentInterests.length === 0 || preferences.contentInterests.includes("team_news")) && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <NewsScrollIcon size={15} color={C.accent} />
              <Text style={styles.sectionTitle}>Latest News</Text>
            </View>
            <NewsCard item={allNews[0]} featured />
            {allNews.slice(1, 4).map((n) => <NewsCard key={n.id} item={n} />)}
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.primary },
  headerGradient: { position: "absolute", top: 0, left: 0, right: 0, height: 280 },
  content: { paddingHorizontal: 16 },

  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  headerLeft: { flex: 1 },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  greeting: { fontSize: 30, color: C.text, fontFamily: "Inter_700Bold", letterSpacing: -0.5 },
  subtitle: { fontSize: 13, color: C.textSecondary, fontFamily: "Inter_400Regular", marginTop: 2 },

  liveBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(232,72,85,0.18)", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, gap: 5, borderWidth: 1, borderColor: "rgba(232,72,85,0.4)" },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#E84855" },
  liveBadgeText: { fontSize: 11, color: "#E84855", fontFamily: "Inter_700Bold", letterSpacing: 0.5 },

  profileBadge: { flexDirection: "row", alignItems: "center", gap: 6 },
  profileAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(191,13,62,0.2)", borderWidth: 1.5, borderColor: "rgba(191,13,62,0.4)", alignItems: "center", justifyContent: "center" },
  profileInitials: { fontSize: 13, color: C.accent, fontFamily: "Inter_700Bold" },
  rolePill: { backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 },
  roleText: { fontSize: 11, color: C.textSecondary, fontFamily: "Inter_500Medium" },

  usavBar: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start", backgroundColor: "rgba(191,13,62,0.08)", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, borderWidth: 1, borderColor: "rgba(191,13,62,0.2)", marginBottom: 14 },
  usavBarText: { fontSize: 11, color: C.accent, fontFamily: "Inter_600SemiBold", letterSpacing: 0.3 },

  /* Stats strip */
  statsStrip: { flexDirection: "row", backgroundColor: C.cardBg, borderRadius: 16, padding: 14, marginBottom: 14, borderWidth: 1, borderColor: C.separator, overflow: "hidden" },
  statStripItem: { flex: 1, alignItems: "center", gap: 2 },
  statStripValue: { fontSize: 20, color: C.text, fontFamily: "Inter_700Bold" },
  statStripLabel: { fontSize: 10, color: C.textMuted, fontFamily: "Inter_500Medium", letterSpacing: 0.3 },
  statStripDivider: { width: 1, backgroundColor: C.separator, marginVertical: 2 },

  /* Spotlight card */
  spotlightCard: { borderRadius: 20, marginBottom: 16, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", padding: 16 },
  spotlightBgLeft: { position: "absolute", left: -15, top: -15 },
  spotlightBgRight: { position: "absolute", right: -10, bottom: -10 },
  spotlightEmpty: { alignItems: "center", gap: 8, paddingVertical: 20 },
  spotlightEmptyTitle: { fontSize: 16, color: C.text, fontFamily: "Inter_700Bold" },
  spotlightEmptySub: { fontSize: 13, color: C.textSecondary, fontFamily: "Inter_400Regular", textAlign: "center" },
  spotlightHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  spotlightDiscBadge: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  spotlightDiscText: { fontSize: 11, fontFamily: "Inter_600SemiBold" },
  spotlightLiveBadge: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(232,72,85,0.2)", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: "rgba(232,72,85,0.5)" },
  spotlightLiveDotPulse: { position: "absolute", width: 12, height: 12, borderRadius: 6, backgroundColor: "#E84855" },
  spotlightLiveDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: "#E84855" },
  spotlightLiveText: { fontSize: 11, color: "#E84855", fontFamily: "Inter_700Bold", letterSpacing: 1 },
  spotlightUpcomingBadge: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(91,141,239,0.15)", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
  spotlightUpcomingText: { fontSize: 11, color: "#5B8DEF", fontFamily: "Inter_600SemiBold" },
  spotlightMatch: { flexDirection: "row", alignItems: "center", gap: 6 },
  spotlightTeam: { flex: 1, alignItems: "center", gap: 8 },
  spotlightTeamRight: {},
  spotlightTeamBadge: { width: 52, height: 52, borderRadius: 26, borderWidth: 1.5, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  spotlightTeamCode: { fontSize: 13, fontFamily: "Inter_700Bold", letterSpacing: 0.5 },
  spotlightTeamName: { fontSize: 13, color: C.text, fontFamily: "Inter_700Bold", textAlign: "center" },
  spotlightCenter: { alignItems: "center", gap: 4, width: 100 },
  spotlightScoreBox: { flexDirection: "row", alignItems: "center", gap: 8 },
  spotlightScore: { fontSize: 36, color: C.textSecondary, fontFamily: "Inter_700Bold" },
  spotlightScoreWin: { color: C.text },
  spotlightScoreDash: { fontSize: 24, color: C.textMuted, fontFamily: "Inter_400Regular" },
  spotlightVsBox: { alignItems: "center" },
  spotlightVs: { fontSize: 18, color: C.textSecondary, fontFamily: "Inter_700Bold", letterSpacing: 3 },
  spotlightTime: { fontSize: 11, color: C.textMuted, fontFamily: "Inter_400Regular" },
  spotlightTournament: { fontSize: 9, color: C.textMuted, fontFamily: "Inter_500Medium", letterSpacing: 0.5, textTransform: "uppercase", textAlign: "center" },

  /* Sections */
  section: { marginBottom: 8 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 7, marginBottom: 12 },
  sectionTitle: { fontSize: 12, color: C.textSecondary, fontFamily: "Inter_700Bold", letterSpacing: 0.8, textTransform: "uppercase" },

  juniorBadge: { backgroundColor: "rgba(58,123,245,0.12)", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1, borderColor: "rgba(58,123,245,0.25)", marginLeft: 6 },
  juniorBadgeText: { fontSize: 11, color: "#3A7BF5", fontFamily: "Inter_600SemiBold" },

  interestBar: { marginBottom: 12, marginHorizontal: -16 },
  interestBarContent: { paddingHorizontal: 16, gap: 8, flexDirection: "row" },
  interestChip: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(191,13,62,0.1)", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: "rgba(191,13,62,0.22)" },
  interestChipText: { fontSize: 12, color: C.accent, fontFamily: "Inter_500Medium" },

  discFilterBar: { marginBottom: 18, marginHorizontal: -16 },
  discFilterContent: { paddingHorizontal: 16, gap: 8 },
  discPill: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 13, paddingVertical: 7, borderRadius: 20, backgroundColor: C.cardBg, borderWidth: 1, borderColor: C.separator },
  discPillAll: { backgroundColor: C.accent, borderColor: C.accent },
  discPillText: { fontSize: 12, color: C.textSecondary, fontFamily: "Inter_600SemiBold" },

  /* Discipline section */
  disciplineSection: { marginBottom: 22 },
  disciplineHeader: { flexDirection: "row", alignItems: "center", borderLeftWidth: 3, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 11, marginBottom: 12, gap: 10, overflow: "hidden", borderColor: "rgba(255,255,255,0.06)", borderWidth: 1 },
  disciplineIconBox: { width: 28, height: 28, borderRadius: 8, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  disciplineHeaderText: { flex: 1 },
  disciplineLabel: { fontSize: 14, fontFamily: "Inter_700Bold" },
  disciplineTournament: { fontSize: 10, color: C.textMuted, fontFamily: "Inter_400Regular", marginTop: 1 },
  livePill: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "rgba(232,72,85,0.18)", borderRadius: 12, paddingHorizontal: 8, paddingVertical: 3 },
  livePillDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: "#E84855" },
  livePillText: { fontSize: 9, color: "#E84855", fontFamily: "Inter_700Bold", letterSpacing: 1 },
  favCountPill: { flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: "rgba(255,215,0,0.1)", borderRadius: 10, paddingHorizontal: 7, paddingVertical: 3 },
  favCountText: { fontSize: 10, color: "#FFD700", fontFamily: "Inter_700Bold" },

  favTeamsRow: { flexDirection: "row", gap: 8, marginBottom: 10, flexWrap: "wrap" },
  miniTeamChip: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: C.cardBg, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1 },
  miniTeamDot: { width: 5, height: 5, borderRadius: 2.5 },
  miniTeamName: { fontSize: 12, color: C.text, fontFamily: "Inter_700Bold" },
  miniTeamRecord: { fontSize: 11, color: C.textMuted, fontFamily: "Inter_400Regular" },

  /* Tips */
  tipCard: { flexDirection: "row", backgroundColor: C.cardBg, borderRadius: 14, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: C.separator, gap: 12, alignItems: "flex-start", overflow: "hidden" },
  tipIconWrap: { width: 38, height: 38, borderRadius: 10, backgroundColor: "rgba(191,13,62,0.12)", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  tipText: { flex: 1, gap: 4 },
  tipTitle: { fontSize: 14, color: C.text, fontFamily: "Inter_600SemiBold" },
  tipBody: { fontSize: 13, color: C.textSecondary, fontFamily: "Inter_400Regular", lineHeight: 19 },

  /* Olympics */
  olympicsCard: { borderRadius: 18, padding: 18, borderWidth: 1, borderColor: "rgba(245,166,35,0.25)", gap: 12, overflow: "hidden" },
  olympicsBgIcon: { position: "absolute", right: -10, top: -10 },
  olympicsRow: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  olympicsTextBlock: { flex: 1, gap: 6 },
  olympicsTitle: { fontSize: 17, color: C.text, fontFamily: "Inter_700Bold" },
  olympicsBody: { fontSize: 13, color: C.textSecondary, fontFamily: "Inter_400Regular", lineHeight: 19 },
  olympicsCountdown: { alignItems: "center", backgroundColor: "rgba(245,166,35,0.15)", borderRadius: 14, padding: 12, minWidth: 64, borderWidth: 1, borderColor: "rgba(245,166,35,0.3)" },
  olympicsCountdownNumber: { fontSize: 28, color: "#F5A623", fontFamily: "Inter_700Bold" },
  olympicsCountdownLabel: { fontSize: 10, color: "#F5A623", fontFamily: "Inter_500Medium", textAlign: "center", marginTop: 2, lineHeight: 14 },
  olympicsTagRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  olympicsTag: { backgroundColor: "rgba(245,166,35,0.15)", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  olympicsTagText: { fontSize: 11, color: "#F5A623", fontFamily: "Inter_600SemiBold" },

  /* Profile menu */
  menuOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.65)", justifyContent: "flex-end" },
  menuSheet: { backgroundColor: "#0D1B3E", borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingTop: 12, paddingHorizontal: 20, borderTopWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  menuHandle: { width: 36, height: 4, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.15)", alignSelf: "center", marginBottom: 20 },
  menuProfile: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 20 },
  menuAvatar: { width: 54, height: 54, borderRadius: 27, backgroundColor: "rgba(191,13,62,0.2)", borderWidth: 2, borderColor: "rgba(191,13,62,0.4)", alignItems: "center", justifyContent: "center" },
  menuAvatarText: { fontSize: 18, color: C.accent, fontFamily: "Inter_700Bold" },
  menuProfileInfo: { flex: 1, gap: 3 },
  menuDisplayName: { fontSize: 17, color: C.text, fontFamily: "Inter_700Bold" },
  menuRole: { fontSize: 13, color: C.textSecondary, fontFamily: "Inter_400Regular" },
  menuDivider: { height: 1, backgroundColor: "rgba(255,255,255,0.07)", marginVertical: 4 },
  menuItem: { flexDirection: "row", alignItems: "center", gap: 14, paddingVertical: 16, borderRadius: 12 },
  menuItemPressed: { opacity: 0.65 },
  menuItemIcon: { width: 38, height: 38, borderRadius: 10, backgroundColor: "rgba(191,13,62,0.12)", alignItems: "center", justifyContent: "center" },
  menuItemIconDanger: { backgroundColor: "rgba(232,72,85,0.12)" },
  menuItemText: { flex: 1, gap: 2 },
  menuItemLabel: { fontSize: 15, color: C.text, fontFamily: "Inter_600SemiBold" },
  menuItemLabelDanger: { color: "#E84855" },
  menuItemSub: { fontSize: 12, color: C.textMuted, fontFamily: "Inter_400Regular" },
});
