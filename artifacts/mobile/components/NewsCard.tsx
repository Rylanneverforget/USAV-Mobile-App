import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/colors";
import type { NewsItem } from "@/constants/data";

const C = Colors.light;

const CATEGORY_COLORS: Record<string, string> = {
  "VNL 2026": "#2DC579",
  "Awards": "#F5A623",
  "Analysis": "#5B8DEF",
  "Injury": "#E84855",
  "Feature": "#9B59B6",
};

type Props = {
  item: NewsItem;
  featured?: boolean;
};

export default function NewsCard({ item, featured }: Props) {
  const categoryColor = CATEGORY_COLORS[item.category] ?? C.accent;

  if (featured) {
    return (
      <Pressable style={styles.featuredCard} android_ripple={{ color: "rgba(255,255,255,0.05)" }}>
        <View style={[styles.featuredCategory, { backgroundColor: categoryColor + "25" }]}>
          <Text style={[styles.categoryText, { color: categoryColor }]}>{item.category}</Text>
        </View>
        <Text style={styles.featuredTitle}>{item.title}</Text>
        <Text style={styles.summary} numberOfLines={2}>{item.summary}</Text>
        <View style={styles.meta}>
          <Text style={styles.metaText}>{item.date}</Text>
          <View style={styles.dot} />
          <Ionicons name="time-outline" size={11} color={C.textMuted} />
          <Text style={styles.metaText}>{item.readTime} min</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable style={styles.card} android_ripple={{ color: "rgba(255,255,255,0.05)" }}>
      <View style={styles.cardLeft}>
        <View style={[styles.category, { backgroundColor: categoryColor + "20" }]}>
          <Text style={[styles.categoryText, { color: categoryColor }]}>{item.category}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <View style={styles.meta}>
          <Text style={styles.metaText}>{item.date}</Text>
          <View style={styles.dot} />
          <Text style={styles.metaText}>{item.readTime} min read</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  featuredCard: {
    backgroundColor: C.cardBg,
    borderRadius: 20,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: C.separator,
  },
  featuredCategory: {
    alignSelf: "flex-start",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 12,
  },
  featuredTitle: {
    fontSize: 18,
    color: C.text,
    fontFamily: "Inter_700Bold",
    lineHeight: 25,
    marginBottom: 8,
  },
  summary: {
    fontSize: 14,
    color: C.textSecondary,
    fontFamily: "Inter_400Regular",
    lineHeight: 21,
    marginBottom: 14,
  },
  card: {
    backgroundColor: C.cardBg,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: C.separator,
  },
  cardLeft: {
    flex: 1,
  },
  category: {
    alignSelf: "flex-start",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 10,
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 15,
    color: C.text,
    fontFamily: "Inter_600SemiBold",
    lineHeight: 21,
    marginBottom: 10,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  metaText: {
    fontSize: 11,
    color: C.textMuted,
    fontFamily: "Inter_400Regular",
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: C.textMuted,
  },
});
