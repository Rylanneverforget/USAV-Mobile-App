import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useMemo } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NewsCard from "@/components/NewsCard";
import Colors from "@/constants/colors";
import { useApp } from "@/context/AppContext";
import { DISCIPLINE_LABELS, type Discipline } from "@/constants/data";
import {
  NewsScrollIcon,
  MensIcon,
  WomensIcon,
  BeachIcon,
  SittingIcon,
  CollegeIcon,
} from "@/components/VolleyballIcons";

const C = Colors.light;
const WEB_TOP_INSET = 67;

const DISC_ICON: Record<Discipline, React.ComponentType<{ size?: number; color?: string }>> = {
  mens:        MensIcon,
  womens:      WomensIcon,
  beach:       BeachIcon,
  sitting:     SittingIcon,
  ncaa_womens: CollegeIcon,
  ncaa_mens:   CollegeIcon,
};

const DISC_COLOR: Record<Discipline, string> = {
  mens:        "#3A7BF5",
  womens:      "#E04E8A",
  beach:       "#F5A623",
  sitting:     "#44C98E",
  ncaa_womens: "#E04E8A",
  ncaa_mens:   "#3A7BF5",
};

export default function NewsScreen() {
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? WEB_TOP_INSET : insets.top + 16;

  const { news, preferences } = useApp();

  const [activeDisc, setActiveDisc] = useState<Discipline | "all">("all");
  const [activeCategory, setActiveCategory] = useState("All");

  // Disciplines that have at least one news item
  const availableDiscs = useMemo(() => {
    const set = new Set(news.map((n) => n.discipline).filter(Boolean) as Discipline[]);
    return preferences.disciplines.filter((d) => set.has(d));
  }, [news, preferences.disciplines]);

  // Categories available after discipline filter
  const filteredByDisc = useMemo(() => {
    if (activeDisc === "all") return news;
    return news.filter((n) => n.discipline === activeDisc);
  }, [news, activeDisc]);

  const availableCategories = useMemo(() => {
    const cats = Array.from(new Set(filteredByDisc.map((n) => n.category)));
    return ["All", ...cats];
  }, [filteredByDisc]);

  // Reset category when discipline changes
  const handleDiscChange = (disc: Discipline | "all") => {
    setActiveDisc(disc);
    setActiveCategory("All");
  };

  const filtered = useMemo(() => {
    if (activeCategory === "All") return filteredByDisc;
    return filteredByDisc.filter((n) => n.category === activeCategory);
  }, [filteredByDisc, activeCategory]);

  const multipleDiscs = availableDiscs.length > 1;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: topPad, paddingBottom: isWeb ? 34 : insets.bottom + 90 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient colors={["#002080", "#001F5B"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.headerGradient} />
      <LinearGradient colors={["#BF0D3E", "transparent"]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={[styles.headerGradient, { opacity: 0.2 }]} />

      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Text style={styles.heading}>News</Text>
          <Text style={styles.subheading}>
            {preferences.disciplines.length === 1
              ? `${DISCIPLINE_LABELS[preferences.disciplines[0]]} Volleyball`
              : "Your volleyball news"}
          </Text>
        </View>
        <View style={styles.badgeGroup}>
          <View style={styles.badgeIcon}>
            <NewsScrollIcon size={18} color={C.accent} />
          </View>
        </View>
      </View>

      {/* USA Volleyball branding */}
      <View style={styles.usavBar}>
        <View style={styles.usavDot} />
        <Text style={styles.usavText}>Powered by USA Volleyball</Text>
        <View style={styles.usavDot} />
      </View>

      {/* Discipline filter pills — only if more than one discipline has news */}
      {multipleDiscs && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}
        >
          <Pressable
            style={[styles.discPill, activeDisc === "all" && styles.discPillAllActive]}
            onPress={() => handleDiscChange("all")}
          >
            <Text style={[styles.discPillText, activeDisc === "all" && styles.discPillTextActive]}>
              All
            </Text>
          </Pressable>
          {availableDiscs.map((disc) => {
            const isActive = activeDisc === disc;
            const Icon = DISC_ICON[disc];
            const color = DISC_COLOR[disc];
            return (
              <Pressable
                key={disc}
                style={[
                  styles.discPill,
                  isActive && { backgroundColor: color, borderColor: color },
                ]}
                onPress={() => handleDiscChange(disc)}
              >
                <Icon size={13} color={isActive ? "#fff" : C.textSecondary} />
                <Text style={[styles.discPillText, isActive && styles.discPillTextActive]}>
                  {DISCIPLINE_LABELS[disc]}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      )}

      {/* Category filter tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScroll}
        contentContainerStyle={styles.filtersContent}
      >
        {availableCategories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <Pressable
              key={cat}
              style={[styles.filterTab, isActive && styles.filterTabActive]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                {cat}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Article count */}
      {filtered.length > 0 && (
        <View style={styles.countRow}>
          <Text style={styles.countText}>
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            {activeDisc !== "all" ? ` · ${DISCIPLINE_LABELS[activeDisc]}` : ""}
            {activeCategory !== "All" ? ` · ${activeCategory}` : ""}
          </Text>
        </View>
      )}

      {/* Articles */}
      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <NewsScrollIcon size={44} color={C.textMuted} />
          <Text style={styles.emptyTitle}>No articles found</Text>
          <Text style={styles.emptyText}>
            {news.length === 0
              ? "Add disciplines in your preferences to see personalized news."
              : "Try selecting a different discipline or category."}
          </Text>
          {activeDisc !== "all" && (
            <Pressable style={styles.emptyReset} onPress={() => handleDiscChange("all")}>
              <Text style={styles.emptyResetText}>Show all disciplines</Text>
            </Pressable>
          )}
        </View>
      ) : (
        <>
          {filtered.slice(0, 1).map((n) => (
            <NewsCard key={n.id} item={n} featured />
          ))}
          {filtered.slice(1).map((n) => (
            <NewsCard key={n.id} item={n} />
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.primary },
  headerGradient: { position: "absolute", top: 0, left: 0, right: 0, height: 220 },
  content: { paddingHorizontal: 16 },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  headerLeft: { flex: 1 },
  heading: { fontSize: 28, color: C.text, fontFamily: "Inter_700Bold" },
  subheading: { fontSize: 13, color: C.textSecondary, fontFamily: "Inter_400Regular", marginTop: 2 },
  badgeGroup: { flexDirection: "row", gap: 8, alignItems: "center" },
  badgeIcon: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "rgba(191,13,62,0.15)",
    alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: "rgba(191,13,62,0.35)",
  },

  /* USA Volleyball branding bar */
  usavBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 16,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "rgba(191,13,62,0.07)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(191,13,62,0.18)",
    alignSelf: "flex-start",
  },
  usavDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: C.accent, opacity: 0.7 },
  usavText: { fontSize: 11, color: C.accent, fontFamily: "Inter_600SemiBold", letterSpacing: 0.3 },

  /* Discipline pills */
  discPill: {
    flexDirection: "row", alignItems: "center", gap: 5,
    paddingHorizontal: 13, paddingVertical: 7, borderRadius: 20,
    backgroundColor: C.cardBg, borderWidth: 1, borderColor: C.separator,
  },
  discPillAllActive: { backgroundColor: C.accent, borderColor: C.accent },
  discPillText: { fontSize: 12, color: C.textSecondary, fontFamily: "Inter_600SemiBold" },
  discPillTextActive: { color: "#fff" },

  /* Category tabs */
  filtersScroll: { marginBottom: 8, marginHorizontal: -16 },
  filtersContent: { paddingHorizontal: 16, gap: 8 },
  filterTab: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: C.cardBg, borderWidth: 1, borderColor: C.separator,
  },
  filterTabActive: { backgroundColor: C.accent, borderColor: C.accent },
  filterText: { fontSize: 13, color: C.textSecondary, fontFamily: "Inter_600SemiBold" },
  filterTextActive: { color: "#fff" },

  /* Count row */
  countRow: { marginBottom: 12 },
  countText: { fontSize: 12, color: C.textMuted, fontFamily: "Inter_400Regular" },

  /* Empty state */
  empty: { alignItems: "center", paddingVertical: 60, gap: 12 },
  emptyTitle: { fontSize: 17, color: C.text, fontFamily: "Inter_600SemiBold" },
  emptyText: {
    fontSize: 14, color: C.textMuted, fontFamily: "Inter_400Regular",
    textAlign: "center", lineHeight: 20, paddingHorizontal: 20,
  },
  emptyReset: {
    marginTop: 4, paddingHorizontal: 20, paddingVertical: 10,
    backgroundColor: "rgba(191,13,62,0.1)", borderRadius: 20,
    borderWidth: 1, borderColor: "rgba(191,13,62,0.25)",
  },
  emptyResetText: { fontSize: 13, color: C.accent, fontFamily: "Inter_600SemiBold" },
});
