import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/colors";
import type { NewsItem, Discipline } from "@/constants/data";
import {
  VolleyballSvg,
  MensIcon,
  WomensIcon,
  BeachIcon,
  SittingIcon,
  CollegeIcon,
  SpikeIcon,
  NetCourtIcon,
  NewsScrollIcon,
} from "@/components/VolleyballIcons";

const C = Colors.light;

const CATEGORY_COLORS: Record<string, string> = {
  "VNL 2026":  "#2DC579",
  "Awards":    "#BF0D3E",
  "Analysis":  "#5B8DEF",
  "Injury":    "#E84855",
  "Feature":   "#9B59B6",
  "Interview": "#F5A623",
  "Results":   "#2DC579",
  "Transfer":  "#F5A623",
};

const DISC_COLORS: Record<string, string> = {
  mens:        "#3A7BF5",
  womens:      "#E04E8A",
  beach:       "#F5A623",
  sitting:     "#44C98E",
  ncaa_womens: "#E04E8A",
  ncaa_mens:   "#3A7BF5",
};

const DISC_ICON: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  mens:        MensIcon,
  womens:      WomensIcon,
  beach:       BeachIcon,
  sitting:     SittingIcon,
  ncaa_womens: CollegeIcon,
  ncaa_mens:   CollegeIcon,
};

const CATEGORY_ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  "VNL 2026":  NetCourtIcon,
  "Awards":    SpikeIcon,
  "Analysis":  VolleyballSvg,
  "Interview": SpikeIcon,
  "Feature":   NewsScrollIcon,
};

type Props = {
  item: NewsItem;
  featured?: boolean;
};

function ImagePlaceholder({ item, height = 160 }: { item: NewsItem; height?: number }) {
  const discColor = item.discipline ? DISC_COLORS[item.discipline] ?? "#3A7BF5" : "#3A7BF5";
  const DiscIcon = item.discipline ? DISC_ICON[item.discipline] ?? VolleyballSvg : VolleyballSvg;
  const catColor = CATEGORY_COLORS[item.category] ?? C.accent;

  return (
    <View style={[styles.imagePlaceholder, { height }]}>
      <LinearGradient
        colors={[`${discColor}40`, "#001F5B", "#000D2E"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.6)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.imageBgIcon}>
        <DiscIcon size={90} color={`${discColor}22`} />
      </View>
      <View style={styles.imageBgIconRight}>
        <VolleyballSvg size={50} color="rgba(255,255,255,0.04)" />
      </View>
      <View style={[styles.imageCategoryBadge, { backgroundColor: `${catColor}CC` }]}>
        <Text style={styles.imageCategoryText}>{item.category}</Text>
      </View>
      {item.discipline && (
        <View style={styles.imageDiscBadge}>
          <DiscIcon size={11} color="#fff" />
        </View>
      )}
    </View>
  );
}

function SmallThumb({ item }: { item: NewsItem }) {
  const discColor = item.discipline ? DISC_COLORS[item.discipline] ?? "#3A7BF5" : "#3A7BF5";
  const DiscIcon = item.discipline ? DISC_ICON[item.discipline] ?? VolleyballSvg : VolleyballSvg;

  return (
    <View style={styles.thumb}>
      <LinearGradient
        colors={[`${discColor}50`, "#001F5B"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.thumbIconBg}>
        <DiscIcon size={40} color={`${discColor}35`} />
      </View>
      <DiscIcon size={22} color="rgba(255,255,255,0.85)" />
    </View>
  );
}

export default function NewsCard({ item, featured }: Props) {
  const categoryColor = CATEGORY_COLORS[item.category] ?? C.accent;

  if (featured) {
    return (
      <Pressable
        style={styles.featuredCard}
        android_ripple={{ color: "rgba(255,255,255,0.05)" }}
      >
        <ImagePlaceholder item={item} height={180} />
        <View style={styles.featuredBody}>
          <View style={styles.featuredMeta}>
            <View style={[styles.categoryPill, { backgroundColor: `${categoryColor}22`, borderColor: `${categoryColor}50` }]}>
              <Text style={[styles.categoryPillText, { color: categoryColor }]}>{item.category}</Text>
            </View>
            <View style={styles.readTimePill}>
              <Ionicons name="time-outline" size={10} color={C.textMuted} />
              <Text style={styles.readTimeText}>{item.readTime} min</Text>
            </View>
          </View>
          <Text style={styles.featuredTitle}>{item.title}</Text>
          <Text style={styles.summary} numberOfLines={2}>{item.summary}</Text>
          <View style={styles.featuredFooter}>
            <Text style={styles.dateText}>{item.date}</Text>
            <View style={styles.readMorePill}>
              <Text style={styles.readMoreText}>Read more</Text>
              <Ionicons name="arrow-forward" size={11} color={C.accent} />
            </View>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={styles.card}
      android_ripple={{ color: "rgba(255,255,255,0.04)" }}
    >
      <SmallThumb item={item} />
      <View style={styles.cardBody}>
        <View style={[styles.categoryTag, { backgroundColor: `${categoryColor}18` }]}>
          <Text style={[styles.categoryTagText, { color: categoryColor }]}>{item.category}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.dateText}>{item.date}</Text>
          <View style={styles.dot} />
          <Ionicons name="time-outline" size={10} color={C.textMuted} />
          <Text style={styles.dateText}>{item.readTime} min</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  featuredCard: {
    backgroundColor: C.cardBg,
    borderRadius: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: C.separator,
    overflow: "hidden",
  },
  imagePlaceholder: {
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  imageBgIcon: {
    position: "absolute",
    left: -10,
    top: -10,
    opacity: 1,
  },
  imageBgIconRight: {
    position: "absolute",
    right: 20,
    bottom: 10,
    opacity: 1,
  },
  imageCategoryBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  imageCategoryText: {
    fontSize: 10,
    color: "#fff",
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.5,
  },
  imageDiscBadge: {
    position: "absolute",
    bottom: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  featuredBody: {
    padding: 18,
    gap: 10,
  },
  featuredMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoryPill: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
  },
  categoryPillText: {
    fontSize: 10,
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.5,
  },
  readTimePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  readTimeText: {
    fontSize: 11,
    color: C.textMuted,
    fontFamily: "Inter_400Regular",
  },
  featuredTitle: {
    fontSize: 19,
    color: C.text,
    fontFamily: "Inter_700Bold",
    lineHeight: 26,
  },
  summary: {
    fontSize: 13,
    color: C.textSecondary,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
  },
  featuredFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2,
  },
  dateText: {
    fontSize: 11,
    color: C.textMuted,
    fontFamily: "Inter_400Regular",
  },
  readMorePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  readMoreText: {
    fontSize: 12,
    color: C.accent,
    fontFamily: "Inter_600SemiBold",
  },

  card: {
    backgroundColor: C.cardBg,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: C.separator,
    flexDirection: "row",
    overflow: "hidden",
  },
  thumb: {
    width: 88,
    alignSelf: "stretch",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  thumbIconBg: {
    position: "absolute",
    top: -4,
    left: -8,
    opacity: 1,
  },
  cardBody: {
    flex: 1,
    padding: 14,
    gap: 7,
    justifyContent: "center",
  },
  categoryTag: {
    alignSelf: "flex-start",
    borderRadius: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  categoryTagText: {
    fontSize: 9,
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 14,
    color: C.text,
    fontFamily: "Inter_600SemiBold",
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: C.textMuted,
  },
});
