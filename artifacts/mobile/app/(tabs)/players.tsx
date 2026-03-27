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

const C = Colors.light;
const WEB_TOP_INSET = 67;

type StatType = "points" | "aces" | "blocks" | "digs";

const STAT_TABS: { key: StatType; label: string; icon: string }[] = [
  { key: "points", label: "Points", icon: "flash" },
  { key: "aces", label: "Aces", icon: "tennisball" },
  { key: "blocks", label: "Blocks", icon: "shield" },
  { key: "digs", label: "Digs", icon: "trending-down" },
];

export default function PlayersScreen() {
  const { players } = useApp();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? WEB_TOP_INSET : insets.top + 16;
  const [activeStat, setActiveStat] = useState<StatType>("points");

  const sorted = [...players].sort(
    (a, b) => b.stats[activeStat] - a.stats[activeStat]
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: topPad, paddingBottom: isWeb ? 34 : insets.bottom + 90 }]}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={["#0B3060", C.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      />

      <View style={styles.headerRow}>
        <View>
          <Text style={styles.heading}>Players</Text>
          <Text style={styles.subheading}>Season Leaders</Text>
        </View>
        <View style={styles.badge}>
          <Ionicons name="person" size={14} color={C.accent} />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsScroll}
        contentContainerStyle={styles.tabsContent}
      >
        {STAT_TABS.map((tab) => {
          const isActive = activeStat === tab.key;
          return (
            <Pressable
              key={tab.key}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => setActiveStat(tab.key)}
            >
              <Ionicons
                name={tab.icon as any}
                size={14}
                color={isActive ? C.primary : C.textSecondary}
              />
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.leaderSection}>
        {sorted.map((player, idx) => (
          <PlayerCard
            key={player.id}
            player={player}
            rank={idx + 1}
            statType={activeStat}
          />
        ))}
      </View>
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
    height: 200,
  },
  content: {
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    color: C.text,
    fontFamily: "Inter_700Bold",
  },
  subheading: {
    fontSize: 13,
    color: C.textSecondary,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(245,166,35,0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(245,166,35,0.3)",
  },
  tabsScroll: {
    marginBottom: 20,
    marginHorizontal: -16,
  },
  tabsContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: C.cardBg,
    borderWidth: 1,
    borderColor: C.separator,
  },
  tabActive: {
    backgroundColor: C.accent,
    borderColor: C.accent,
  },
  tabText: {
    fontSize: 13,
    color: C.textSecondary,
    fontFamily: "Inter_600SemiBold",
  },
  tabTextActive: {
    color: C.primary,
  },
  leaderSection: {
    gap: 2,
  },
});
