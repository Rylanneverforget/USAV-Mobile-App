import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState, useRef } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";
import { useApp } from "@/context/AppContext";
import { ALL_TEAMS, type Discipline } from "@/constants/data";
import type { VolleyballRole, ExperienceLevel, ContentInterest, UserPreferences } from "@/context/AppContext";
import {
  VolleyballSvg,
  SpikeIcon,
  NetCourtIcon,
  JerseyIcon,
  OlympicsIcon,
} from "@/components/VolleyballIcons";

const C = Colors.light;

type RoleOption = { id: VolleyballRole; label: string; description: string; SvgIcon?: React.ComponentType<{ size?: number; color?: string }>; icon?: string };
type LevelOption = { id: ExperienceLevel; label: string; description: string; icon: string };
type InterestOption = { id: ContentInterest; label: string; SvgIcon?: React.ComponentType<{ size?: number; color?: string }>; icon?: string };
type DisciplineOption = { id: Discipline; label: string; description: string; icon: string; color: string };

const ROLES: RoleOption[] = [
  { id: "fan", label: "Fan", description: "I love watching volleyball", SvgIcon: VolleyballSvg },
  { id: "player", label: "Player", description: "I play volleyball", SvgIcon: SpikeIcon },
  { id: "coach", label: "Coach", description: "I coach a team", SvgIcon: NetCourtIcon },
  { id: "referee", label: "Referee", description: "I officiate matches", icon: "flag" },
  { id: "media", label: "Media", description: "I cover volleyball", icon: "mic" },
];

const LEVELS: LevelOption[] = [
  { id: "recreational", label: "Recreational", description: "Just for fun", icon: "happy-outline" },
  { id: "club", label: "Club", description: "Competitive club play", icon: "people-outline" },
  { id: "collegiate", label: "Collegiate", description: "College / university level", icon: "school-outline" },
  { id: "professional", label: "Professional", description: "Elite or pro level", icon: "star-outline" },
];

const DISCIPLINES: DisciplineOption[] = [
  { id: "mens", label: "Men's", description: "VNL · World Championship · LA28", icon: "male", color: "#3A7BF5" },
  { id: "womens", label: "Women's", description: "VNL · World Championship · LA28", icon: "female", color: "#E04E8A" },
  { id: "beach", label: "Beach", description: "FIVB Beach Pro Tour · Olympics", icon: "sunny", color: "#F5A623" },
  { id: "sitting", label: "Sitting", description: "World Para Volleyball · Paralympics", icon: "accessibility", color: "#44C98E" },
  { id: "ncaa_womens", label: "NCAA Women's", description: "College volleyball · Top programs", icon: "school", color: "#E04E8A" },
  { id: "ncaa_mens", label: "NCAA Men's", description: "College volleyball · Top programs", icon: "school-outline", color: "#3A7BF5" },
];

const INTERESTS: InterestOption[] = [
  { id: "live_scores", label: "Live Scores", SvgIcon: SpikeIcon },
  { id: "match_results", label: "Match Results", SvgIcon: NetCourtIcon },
  { id: "player_stats", label: "Player Stats", SvgIcon: JerseyIcon },
  { id: "team_news", label: "Team News", icon: "newspaper" },
  { id: "training_tips", label: "Training Tips", SvgIcon: VolleyballSvg },
  { id: "olympics", label: "Olympics", SvgIcon: OlympicsIcon },
];

const STEPS = ["role", "discipline", "level", "teams", "interests"] as const;
type Step = typeof STEPS[number];

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <View style={styles.stepIndicator}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={[styles.stepDot, i === current && styles.stepDotActive, i < current && styles.stepDotDone]} />
      ))}
    </View>
  );
}

function SelectionCard({ selected, onPress, children }: { selected: boolean; onPress: () => void; children: React.ReactNode }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.selectionCard, selected && styles.selectionCardSelected, pressed && styles.selectionCardPressed]}
    >
      {selected && (
        <View style={styles.checkmark}>
          <Ionicons name="checkmark" size={12} color="#fff" />
        </View>
      )}
      {children}
    </Pressable>
  );
}

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useApp();

  const [stepIndex, setStepIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [role, setRole] = useState<VolleyballRole | null>(null);
  const [disciplines, setDisciplines] = useState<Discipline[]>(["mens"]);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | null>(null);
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>([]);
  const [contentInterests, setContentInterests] = useState<ContentInterest[]>([]);

  const step = STEPS[stepIndex];
  const showLevelStep = role === "player" || role === "coach";

  const visibleSteps = STEPS.filter((s) => {
    if (s === "level" && !showLevelStep) return false;
    return true;
  });
  const visibleIndex = visibleSteps.indexOf(step);
  const totalSteps = visibleSteps.length;

  const canAdvance = () => {
    if (step === "role") return role !== null;
    if (step === "discipline") return disciplines.length > 0;
    if (step === "level") return experienceLevel !== null;
    if (step === "teams") return true;
    if (step === "interests") return contentInterests.length > 0;
    return false;
  };

  const animateTransition = (fn: () => void) => {
    Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }).start(() => {
      fn();
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    });
  };

  const advance = () => {
    const nextVisible = visibleSteps[visibleIndex + 1];
    if (!nextVisible) { finish(); return; }
    const nextIdx = STEPS.indexOf(nextVisible);
    animateTransition(() => setStepIndex(nextIdx));
  };

  const goBack = () => {
    if (visibleIndex === 0) return;
    const prevVisible = visibleSteps[visibleIndex - 1];
    const prevIdx = STEPS.indexOf(prevVisible);
    animateTransition(() => setStepIndex(prevIdx));
  };

  const finish = async () => {
    const prefs: UserPreferences = {
      role,
      disciplines,
      experienceLevel: showLevelStep ? experienceLevel : null,
      favoriteTeams,
      contentInterests,
    };
    await completeOnboarding(prefs);
    router.replace("/(tabs)");
  };

  const toggleDiscipline = (d: Discipline) => {
    setDisciplines((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);
  };

  const toggleTeam = (id: string) => {
    setFavoriteTeams((prev) => prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]);
  };

  const toggleInterest = (id: ContentInterest) => {
    setContentInterests((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const availableTeams = disciplines.length > 0
    ? ALL_TEAMS.filter((t) => disciplines.includes(t.discipline))
    : ALL_TEAMS;

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#001240", "#001F5B", "#002080"]} start={{ x: 0.3, y: 0 }} end={{ x: 0.7, y: 1 }} style={StyleSheet.absoluteFill} />
      <LinearGradient colors={["transparent", "rgba(191,13,62,0.12)", "transparent"]} start={{ x: 0, y: 0.4 }} end={{ x: 1, y: 0.6 }} style={StyleSheet.absoluteFill} />

      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Pressable onPress={goBack} style={[styles.backButton, visibleIndex === 0 && styles.backButtonHidden]} disabled={visibleIndex === 0}>
          <Ionicons name="chevron-back" size={22} color="rgba(255,255,255,0.7)" />
        </Pressable>
        <StepIndicator current={visibleIndex} total={totalSteps} />
        <Pressable onPress={finish} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>

      <Animated.View style={[styles.body, { opacity: fadeAnim }]}>
        <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]} showsVerticalScrollIndicator={false} bounces={false}>

          {step === "role" && (
            <View style={styles.stepContent}>
              <View style={styles.stepSvgHeader}><VolleyballSvg size={44} color={C.accent} /></View>
              <Text style={styles.stepTitle}>How do you participate?</Text>
              <Text style={styles.stepSubtitle}>We'll personalize your experience based on your role in volleyball.</Text>
              <View style={styles.optionList}>
                {ROLES.map((r) => {
                  const isSelected = role === r.id;
                  const iconColor = isSelected ? C.accent : C.textSecondary;
                  return (
                    <SelectionCard key={r.id} selected={isSelected} onPress={() => setRole(r.id)}>
                      <View style={styles.roleCardInner}>
                        <View style={[styles.roleIcon, isSelected && styles.roleIconSelected]}>
                          {r.SvgIcon ? <r.SvgIcon size={22} color={iconColor} /> : <Ionicons name={r.icon as any} size={22} color={iconColor} />}
                        </View>
                        <View style={styles.roleText}>
                          <Text style={[styles.roleLabel, isSelected && styles.roleLabelSelected]}>{r.label}</Text>
                          <Text style={styles.roleDescription}>{r.description}</Text>
                        </View>
                      </View>
                    </SelectionCard>
                  );
                })}
              </View>
            </View>
          )}

          {step === "discipline" && (
            <View style={styles.stepContent}>
              <View style={styles.stepSvgHeader}><NetCourtIcon size={44} color={C.accent} /></View>
              <Text style={styles.stepTitle}>Your volleyball universe</Text>
              <Text style={styles.stepSubtitle}>Which disciplines do you follow? Select all that apply — you can always change this later.</Text>
              <View style={styles.optionList}>
                {DISCIPLINES.map((d) => {
                  const isSelected = disciplines.includes(d.id);
                  return (
                    <SelectionCard key={d.id} selected={isSelected} onPress={() => toggleDiscipline(d.id)}>
                      <View style={styles.roleCardInner}>
                        <View style={[styles.disciplineIcon, { backgroundColor: isSelected ? `${d.color}25` : "rgba(255,255,255,0.06)" }]}>
                          <Ionicons name={d.icon as any} size={22} color={isSelected ? d.color : C.textSecondary} />
                        </View>
                        <View style={styles.roleText}>
                          <Text style={[styles.roleLabel, isSelected && styles.roleLabelSelected]}>{d.label}</Text>
                          <Text style={styles.roleDescription}>{d.description}</Text>
                        </View>
                        {isSelected && (
                          <View style={[styles.disciplineCheck, { backgroundColor: d.color }]}>
                            <Ionicons name="checkmark" size={11} color="#fff" />
                          </View>
                        )}
                      </View>
                    </SelectionCard>
                  );
                })}
              </View>
            </View>
          )}

          {step === "level" && (
            <View style={styles.stepContent}>
              <View style={styles.stepSvgHeader}><SpikeIcon size={44} color={C.accent} /></View>
              <Text style={styles.stepTitle}>What's your level?</Text>
              <Text style={styles.stepSubtitle}>Help us show you relevant drills, strategies, and content.</Text>
              <View style={styles.optionList}>
                {LEVELS.map((l) => {
                  const isSelected = experienceLevel === l.id;
                  return (
                    <SelectionCard key={l.id} selected={isSelected} onPress={() => setExperienceLevel(l.id)}>
                      <View style={styles.roleCardInner}>
                        <View style={[styles.roleIcon, isSelected && styles.roleIconSelected]}>
                          <Ionicons name={l.icon as any} size={20} color={isSelected ? C.accent : C.textSecondary} />
                        </View>
                        <View style={styles.roleText}>
                          <Text style={[styles.roleLabel, isSelected && styles.roleLabelSelected]}>{l.label}</Text>
                          <Text style={styles.roleDescription}>{l.description}</Text>
                        </View>
                      </View>
                    </SelectionCard>
                  );
                })}
              </View>
            </View>
          )}

          {step === "teams" && (
            <View style={styles.stepContent}>
              <View style={styles.stepSvgHeader}><JerseyIcon size={44} color={C.accent} /></View>
              <Text style={styles.stepTitle}>Favorite teams</Text>
              <Text style={styles.stepSubtitle}>
                {disciplines.includes("ncaa_womens") || disciplines.includes("ncaa_mens")
                  ? "Pick your squads across all your disciplines — international and college."
                  : "Select any teams you want to follow. You can change this later."}
              </Text>

              {disciplines.length > 1 && (
                <>
                  {["mens", "womens", "beach", "sitting", "ncaa_womens", "ncaa_mens"].filter((d) => disciplines.includes(d as Discipline)).map((disc) => {
                    const label = { mens: "Men's International", womens: "Women's International", beach: "Beach Volleyball", sitting: "Sitting Volleyball", ncaa_womens: "NCAA Women's", ncaa_mens: "NCAA Men's" }[disc] ?? disc;
                    const teamsForDisc = availableTeams.filter((t) => t.discipline === disc);
                    if (teamsForDisc.length === 0) return null;
                    return (
                      <View key={disc} style={styles.teamSection}>
                        <Text style={styles.teamSectionLabel}>{label}</Text>
                        <View style={styles.teamGrid}>
                          {teamsForDisc.map((team) => (
                            <SelectionCard key={team.id} selected={favoriteTeams.includes(team.id)} onPress={() => toggleTeam(team.id)}>
                              <View style={styles.teamCardInner}>
                                <Text style={styles.teamFlag}>{teamEmoji(team.discipline, team.country)}</Text>
                                <Text style={[styles.teamName, favoriteTeams.includes(team.id) && styles.roleLabelSelected]}>
                                  {team.shortName}
                                </Text>
                              </View>
                            </SelectionCard>
                          ))}
                        </View>
                      </View>
                    );
                  })}
                </>
              )}

              {disciplines.length === 1 && (
                <View style={styles.teamGrid}>
                  {availableTeams.map((team) => (
                    <SelectionCard key={team.id} selected={favoriteTeams.includes(team.id)} onPress={() => toggleTeam(team.id)}>
                      <View style={styles.teamCardInner}>
                        <Text style={styles.teamFlag}>{teamEmoji(team.discipline, team.country)}</Text>
                        <Text style={[styles.teamName, favoriteTeams.includes(team.id) && styles.roleLabelSelected]}>
                          {team.shortName}
                        </Text>
                      </View>
                    </SelectionCard>
                  ))}
                </View>
              )}
            </View>
          )}

          {step === "interests" && (
            <View style={styles.stepContent}>
              <View style={styles.stepSvgHeader}><OlympicsIcon size={44} color={C.accent} /></View>
              <Text style={styles.stepTitle}>What matters to you?</Text>
              <Text style={styles.stepSubtitle}>Choose the content you care about most. Pick as many as you like.</Text>
              <View style={styles.interestGrid}>
                {INTERESTS.map((interest) => {
                  const isSelected = contentInterests.includes(interest.id);
                  const iconColor = isSelected ? C.accent : C.textSecondary;
                  return (
                    <SelectionCard key={interest.id} selected={isSelected} onPress={() => toggleInterest(interest.id)}>
                      <View style={styles.interestCardInner}>
                        {interest.SvgIcon ? <interest.SvgIcon size={24} color={iconColor} /> : <Ionicons name={interest.icon as any} size={24} color={iconColor} />}
                        <Text style={[styles.interestLabel, isSelected && styles.interestLabelSelected]}>{interest.label}</Text>
                      </View>
                    </SelectionCard>
                  );
                })}
              </View>
            </View>
          )}

        </ScrollView>
      </Animated.View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
        <Pressable
          style={({ pressed }) => [styles.nextButton, !canAdvance() && styles.nextButtonDisabled, pressed && canAdvance() && styles.nextButtonPressed]}
          onPress={advance}
          disabled={!canAdvance()}
        >
          <Text style={styles.nextButtonText}>{step === "interests" ? "Get Started" : "Continue"}</Text>
          <Ionicons name={step === "interests" ? "checkmark" : "arrow-forward"} size={18} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

function teamEmoji(discipline: Discipline, country: string): string {
  if (discipline === "ncaa_womens" || discipline === "ncaa_mens") return "🎓";
  const flags: Record<string, string> = {
    "United States": "🇺🇸", "Brazil": "🇧🇷", "Poland": "🇵🇱", "France": "🇫🇷",
    "Italy": "🇮🇹", "Japan": "🇯🇵", "Argentina": "🇦🇷", "Canada": "🇨🇦",
    "Turkey": "🇹🇷", "Serbia": "🇷🇸", "China": "🇨🇳", "Switzerland": "🇨🇭",
    "Spain": "🇪🇸", "Norway": "🇳🇴", "Qatar": "🇶🇦", "Russia": "🇷🇺",
    "Sweden": "🇸🇪", "Iran": "🇮🇷", "Germany": "🇩🇪",
    "Bosnia & Herzegovina": "🇧🇦",
  };
  if (discipline === "beach") return "🏖️";
  if (discipline === "sitting") return "🦽";
  return flags[country] ?? "🏳️";
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.primary },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 8 },
  backButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  backButtonHidden: { opacity: 0 },
  skipButton: { width: 48, height: 36, alignItems: "flex-end", justifyContent: "center" },
  skipText: { fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: "Inter_400Regular" },
  stepIndicator: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6 },
  stepDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.2)" },
  stepDotActive: { width: 20, backgroundColor: C.accent },
  stepDotDone: { backgroundColor: "rgba(191,13,62,0.4)" },
  body: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 16 },
  stepContent: { gap: 6 },
  stepSvgHeader: { marginBottom: 8 },
  stepTitle: { fontSize: 28, color: "#fff", fontFamily: "Inter_700Bold", letterSpacing: -0.5, marginBottom: 4 },
  stepSubtitle: { fontSize: 15, color: "rgba(255,255,255,0.55)", fontFamily: "Inter_400Regular", lineHeight: 22, marginBottom: 24 },
  optionList: { gap: 10 },
  selectionCard: { backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 16, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.08)", padding: 16, position: "relative" },
  selectionCardSelected: { backgroundColor: "rgba(191,13,62,0.1)", borderColor: "rgba(191,13,62,0.5)" },
  selectionCardPressed: { opacity: 0.75 },
  checkmark: { position: "absolute", top: 12, right: 12, width: 20, height: 20, borderRadius: 10, backgroundColor: C.accent, alignItems: "center", justifyContent: "center", zIndex: 1 },
  roleCardInner: { flexDirection: "row", alignItems: "center", gap: 14 },
  roleIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  roleIconSelected: { backgroundColor: "rgba(191,13,62,0.25)" },
  disciplineIcon: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  disciplineCheck: { width: 22, height: 22, borderRadius: 11, alignItems: "center", justifyContent: "center" },
  roleText: { flex: 1, gap: 2 },
  roleLabel: { fontSize: 16, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_600SemiBold" },
  roleLabelSelected: { color: "#fff" },
  roleDescription: { fontSize: 13, color: "rgba(255,255,255,0.35)", fontFamily: "Inter_400Regular" },
  teamSection: { marginBottom: 20 },
  teamSectionLabel: { fontSize: 12, color: "rgba(255,255,255,0.45)", fontFamily: "Inter_600SemiBold", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 },
  teamGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  teamCardInner: { alignItems: "center", gap: 6, paddingVertical: 4, paddingHorizontal: 6, minWidth: 70 },
  teamFlag: { fontSize: 28 },
  teamName: { fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: "Inter_600SemiBold", textAlign: "center" },
  interestGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  interestCardInner: { alignItems: "center", gap: 8, paddingVertical: 8, paddingHorizontal: 4, minWidth: 90 },
  interestLabel: { fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "Inter_500Medium", textAlign: "center" },
  interestLabelSelected: { color: "#fff" },
  footer: { paddingHorizontal: 24, paddingTop: 12, backgroundColor: "transparent" },
  nextButton: { backgroundColor: C.accent, borderRadius: 16, height: 56, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, shadowColor: C.accent, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16, elevation: 8 },
  nextButtonDisabled: { backgroundColor: "rgba(191,13,62,0.25)", shadowOpacity: 0, elevation: 0 },
  nextButtonPressed: { opacity: 0.85 },
  nextButtonText: { fontSize: 17, color: "#fff", fontFamily: "Inter_600SemiBold" },
});
