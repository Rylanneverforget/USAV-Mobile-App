import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PlayerCard from "@/components/PlayerCard";
import Colors from "@/constants/colors";
import { useApp } from "@/context/AppContext";
import { PLAYERS, type Discipline } from "@/constants/data";
import { VolleyballSvg } from "@/components/VolleyballIcons";

const C = Colors.light;
const WEB_TOP_INSET = 67;

type StatType = "points" | "aces" | "blocks" | "digs";

const STAT_TABS: { key: StatType; label: string; icon: string }[] = [
  { key: "points", label: "Points", icon: "flash" },
  { key: "aces", label: "Aces", icon: "tennisball" },
  { key: "blocks", label: "Blocks", icon: "shield" },
  { key: "digs", label: "Digs", icon: "trending-down" },
];

const DISCIPLINE_TABS: { key: Discipline | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "mens", label: "Men's" },
  { key: "womens", label: "Women's" },
  { key: "beach", label: "Beach" },
  { key: "sitting", label: "Sitting" },
  { key: "ncaa_womens", label: "NCAA ♀" },
  { key: "ncaa_mens", label: "NCAA ♂" },
];

const DISCIPLINE_SUBTITLES: Record<Discipline | "all", string> = {
  all: "All Disciplines",
  mens: "VNL 2026 Men's",
  womens: "VNL 2026 Women's",
  beach: "FIVB Beach Pro Tour",
  sitting: "World Para Volleyball",
  ncaa_womens: "NCAA Women's",
  ncaa_mens: "NCAA Men's",
};

export default function PlayersScreen() {
  const { preferences } = useApp();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? WEB_TOP_INSET : insets.top + 16;
  const [activeStat, setActiveStat] = useState<StatType>("points");
  const [activeDiscipline, setActiveDiscipline] = useState<Discipline | "all">(
    preferences.disciplines.length > 0 ? preferences.disciplines[0] : "all"
  );

  const disciplinePlayers = activeDiscipline === "all"
    ? PLAYERS
    : PLAYERS.filter((p) => p.discipline === activeDiscipline);

  const sorted = [...disciplinePlayers].sort(
    (a, b) => b.stats[activeStat] - a.stats[activeStat]
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: topPad, paddingBottom: isWeb ? 34 : insets.bottom + 90 }]}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient colors={["#002080", "#001F5B"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.headerGradient} />
      <LinearGradient colors={["#BF0D3E", "transparent"]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={[styles.headerGradient, { opacity: 0.2 }]} />

      <View style={styles.headerRow}>
        <View>
          <Text style={styles.heading}>Players</Text>
          <Text style={styles.subheading}>{DISCIPLINE_SUBTITLES[activeDiscipline]}</Text>
        </View>
        <View style={styles.badge}>
          <Ionicons name="person" size={14} color={C.accent} />
        </View>
      </View>

      <View style={styles.usavBar}>
        <VolleyballSvg size={12} color={C.accent} />
        <Text style={styles.usavText}>Powered by USA Volleyball</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll} contentContainerStyle={styles.tabsContent}>
        {DISCIPLINE_TABS.map((tab) => {
          const isActive = activeDiscipline === tab.key;
          return (
            <Pressable
              key={tab.key}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => setActiveDiscipline(tab.key)}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll} contentContainerStyle={styles.tabsContent}>
        {STAT_TABS.map((tab) => {
          const isActive = activeStat === tab.key;
          return (
            <Pressable
              key={tab.key}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => setActiveStat(tab.key)}
            >
              <Ionicons name={tab.icon as any} size={14} color={isActive ? "#fff" : C.textSecondary} />
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.leaderSection}>
        {sorted.map((player, idx) => (
          <PlayerCard key={player.id} player={player} rank={idx + 1} statType={activeStat} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.primary },
  headerGradient: { position: "absolute", top: 0, left: 0, right: 0, height: 200 },
  content: { paddingHorizontal: 16 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  usavBar: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start", backgroundColor: "rgba(191,13,62,0.07)", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, borderWidth: 1, borderColor: "rgba(191,13,62,0.18)", marginBottom: 14 },
  usavText: { fontSize: 11, color: C.accent, fontFamily: "Inter_600SemiBold", letterSpacing: 0.3 },
  heading: { fontSize: 28, color: C.text, fontFamily: "Inter_700Bold" },
  subheading: { fontSize: 13, color: C.textSecondary, fontFamily: "Inter_400Regular", marginTop: 2 },
  badge: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(191,13,62,0.15)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(191,13,62,0.35)" },
  tabsScroll: { marginBottom: 12, marginHorizontal: -16 },
  tabsContent: { paddingHorizontal: 16, gap: 8 },
  tab: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: C.cardBg, borderWidth: 1, borderColor: C.separator },
  tabActive: { backgroundColor: C.accent, borderColor: C.accent },
  tabText: { fontSize: 13, color: C.textSecondary, fontFamily: "Inter_600SemiBold" },
  tabTextActive: { color: "#fff" },
  leaderSection: { gap: 2 },
});
