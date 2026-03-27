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
import NewsCard from "@/components/NewsCard";
import Colors from "@/constants/colors";
import { NEWS } from "@/constants/data";

const C = Colors.light;
const WEB_TOP_INSET = 67;

const CATEGORIES = ["All", "VNL 2026", "Awards", "Analysis", "Feature", "Injury"];

export default function NewsScreen() {
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? WEB_TOP_INSET : insets.top + 16;
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? NEWS
      : NEWS.filter((n) => n.category === activeCategory);

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
          <Text style={styles.heading}>News</Text>
          <Text style={styles.subheading}>Latest from the volleyball world</Text>
        </View>
        <View style={styles.badge}>
          <Ionicons name="newspaper" size={14} color={C.accent} />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScroll}
        contentContainerStyle={styles.filtersContent}
      >
        {CATEGORIES.map((cat) => {
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

      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="newspaper-outline" size={44} color={C.textMuted} />
          <Text style={styles.emptyText}>No articles in this category</Text>
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
  filtersScroll: {
    marginBottom: 20,
    marginHorizontal: -16,
  },
  filtersContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: C.cardBg,
    borderWidth: 1,
    borderColor: C.separator,
  },
  filterTabActive: {
    backgroundColor: C.accent,
    borderColor: C.accent,
  },
  filterText: {
    fontSize: 13,
    color: C.textSecondary,
    fontFamily: "Inter_600SemiBold",
  },
  filterTextActive: {
    color: C.primary,
  },
  empty: {
    alignItems: "center",
    paddingVertical: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: C.textMuted,
    fontFamily: "Inter_400Regular",
  },
});
