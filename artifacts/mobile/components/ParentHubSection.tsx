import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/colors";
import { type JuniorClubPrefs } from "@/context/AppContext";
import {
  JUNIOR_CLUBS,
  CLUB_TOURNAMENTS,
  CLUB_TICKETS,
  type ClubTournament,
  type ClubTicket,
} from "@/constants/data";
import { VolleyballSvg, NetCourtIcon } from "@/components/VolleyballIcons";

const C = Colors.light;
const GREEN  = "#2DC579";
const PURPLE = "#9B59B6";

const STATUS_COLORS: Record<ClubTournament["status"], { label: string; color: string; bg: string }> = {
  qualified:  { label: "Qualified",  color: "#44C98E", bg: "rgba(68,201,142,0.12)" },
  registered: { label: "Registered", color: "#3A7BF5", bg: "rgba(58,123,245,0.12)" },
  upcoming:   { label: "Upcoming",   color: "#F5A623", bg: "rgba(245,166,35,0.12)" },
  completed:  { label: "Completed",  color: "#7B8CAA", bg: "rgba(123,140,170,0.1)" },
};

/* ── Purchased ticket banner ─────────────────────────────────────────────── */
function PurchasedBanner({ ticket }: { ticket: ClubTicket }) {
  return (
    <View style={styles.bannerCard}>
      <LinearGradient
        colors={["#001A10", "#001240"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={[`${GREEN}18`, "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.bannerBgIcon}>
        <VolleyballSvg size={120} color={`${GREEN}12`} />
      </View>

      <View style={styles.bannerHeader}>
        <View style={styles.bannerIconWrap}>
          <Ionicons name="ticket-outline" size={15} color={GREEN} />
        </View>
        <Text style={styles.bannerLabel}>YOUR TICKET</Text>
        <View style={styles.purchasedBadge}>
          <Ionicons name="checkmark-circle" size={11} color={GREEN} />
          <Text style={styles.purchasedBadgeText}>Purchased</Text>
        </View>
      </View>

      <Text style={styles.bannerEventName}>{ticket.shortName}</Text>
      <View style={styles.bannerMeta}>
        <Ionicons name="calendar-outline" size={11} color={C.textMuted} />
        <Text style={styles.bannerMetaText}>{ticket.date}</Text>
        <Text style={styles.bannerDot}>·</Text>
        <Ionicons name="location-outline" size={11} color={C.textMuted} />
        <Text style={styles.bannerMetaText}>{ticket.city}</Text>
      </View>
      {ticket.section && (
        <View style={styles.sectionTag}>
          <Text style={styles.sectionTagText}>{ticket.section}</Text>
        </View>
      )}

      <Pressable style={styles.viewTicketBtn}>
        <Ionicons name="qr-code-outline" size={14} color="#fff" />
        <Text style={styles.viewTicketText}>View &amp; Download Ticket</Text>
        <Ionicons name="chevron-forward" size={14} color="#fff" />
      </Pressable>
    </View>
  );
}

/* ── Club overview card ─────────────────────────────────────────────────── */
function ClubCard({ prefs, club }: { prefs: JuniorClubPrefs; club?: { name: string; code: string; city: string; state: string; region: string } }) {
  return (
    <View style={styles.clubCard}>
      <LinearGradient
        colors={[`${PURPLE}14`, "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.clubRow}>
        <View style={styles.clubAvatar}>
          <Text style={styles.clubCode}>{club?.code ?? prefs.clubName.slice(0, 3).toUpperCase()}</Text>
        </View>
        <View style={styles.clubInfo}>
          <Text style={styles.clubName}>{prefs.clubName}</Text>
          <Text style={styles.clubSub}>{prefs.ageGroup} · {club ? `${club.city}, ${club.state}` : "Junior Club"}</Text>
        </View>
        <View style={styles.usavBadge}>
          <VolleyballSvg size={10} color={C.accent} />
          <Text style={styles.usavBadgeText}>USAV</Text>
        </View>
      </View>
      {club && (
        <View style={styles.clubRegionRow}>
          <Ionicons name="location-outline" size={11} color={C.textMuted} />
          <Text style={styles.clubRegionText}>{club.region} Region</Text>
        </View>
      )}
    </View>
  );
}

/* ── Tournament schedule row ─────────────────────────────────────────────── */
function TournamentRow({ t }: { t: ClubTournament }) {
  const cfg = STATUS_COLORS[t.status];
  const isPurchased = CLUB_TICKETS.some(
    (tk) => tk.ticketStatus === "purchased" && tk.eventName.toLowerCase().includes(t.shortName.toLowerCase().slice(0, 8))
  );
  return (
    <View style={[styles.tourRow, isPurchased && styles.tourRowPurchased]}>
      {isPurchased && <View style={styles.tourPurchasedBar} />}
      <View style={styles.tourMain}>
        <View style={styles.tourTop}>
          <Text style={styles.tourName} numberOfLines={1}>{t.shortName}</Text>
          <View style={[styles.statusPill, { backgroundColor: cfg.bg }]}>
            <Text style={[styles.statusText, { color: cfg.color }]}>{cfg.label}</Text>
          </View>
        </View>
        <View style={styles.tourMeta}>
          <Ionicons name="calendar-outline" size={10} color={C.textMuted} />
          <Text style={styles.tourMetaText}>{t.date}{t.endDate ? `–${t.endDate.split(",")[0]}` : ""}</Text>
          <Text style={styles.tourDot}>·</Text>
          <Ionicons name="location-outline" size={10} color={C.textMuted} />
          <Text style={styles.tourMetaText}>{t.location}</Text>
        </View>
      </View>
      {isPurchased ? (
        <View style={styles.ticketedBadge}>
          <Ionicons name="ticket-outline" size={12} color={GREEN} />
        </View>
      ) : t.status === "upcoming" || t.status === "registered" ? (
        <Pressable style={styles.buyBtn}>
          <Text style={styles.buyBtnText}>Tickets</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

/* ── Quick action buttons ────────────────────────────────────────────────── */
function QuickActions() {
  const actions = [
    { icon: "calendar-outline",  label: "Schedule",  color: PURPLE,    bg: `${PURPLE}12` as const },
    { icon: "people-outline",    label: "Roster",    color: "#3A7BF5", bg: "rgba(58,123,245,0.1)" as const },
    { icon: "ticket-outline",    label: "Tickets",   color: GREEN,     bg: `${GREEN}12` as const },
    { icon: "navigate-outline",  label: "Venue",     color: "#F5A623", bg: "rgba(245,166,35,0.1)" as const },
  ] as const;

  return (
    <View style={styles.quickRow}>
      {actions.map((a) => (
        <Pressable key={a.label} style={[styles.quickBtn, { backgroundColor: a.bg, borderColor: `${a.color}30` }]}>
          <Ionicons name={a.icon as any} size={18} color={a.color} />
          <Text style={[styles.quickLabel, { color: a.color }]}>{a.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

/* ── Main component ─────────────────────────────────────────────────────── */
export default function ParentHubSection({ juniorClub }: { juniorClub: JuniorClubPrefs }) {
  const club = JUNIOR_CLUBS.find((c) => c.id === juniorClub.clubId);
  const purchasedTicket = CLUB_TICKETS.find((t) => t.ticketStatus === "purchased");
  const tours = CLUB_TOURNAMENTS.slice(0, 4);

  return (
    <View style={styles.container}>
      {/* Purchased ticket banner — always at top */}
      {purchasedTicket && <PurchasedBanner ticket={purchasedTicket} />}

      {/* Club overview */}
      <ClubCard prefs={juniorClub} club={club ? { ...club, city: club.city, state: club.state } : undefined} />

      {/* Quick actions */}
      <QuickActions />

      {/* Season schedule */}
      <View style={styles.scheduleSection}>
        <View style={styles.scheduleSectionHeader}>
          <NetCourtIcon size={14} color={PURPLE} />
          <Text style={styles.scheduleSectionTitle}>Season Schedule</Text>
          <Pressable style={styles.seeAllBtn}>
            <Text style={styles.seeAllText}>Full schedule</Text>
            <Ionicons name="chevron-forward" size={12} color={C.accent} />
          </Pressable>
        </View>
        <View style={styles.tourList}>
          {tours.map((t) => (
            <TournamentRow key={t.id} t={t} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 14 },

  /* Purchased banner */
  bannerCard: {
    borderRadius: 20,
    padding: 16,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: `${GREEN}45`,
    gap: 8,
  },
  bannerBgIcon: { position: "absolute", right: -20, bottom: -20 },
  bannerHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  bannerIconWrap: {
    width: 28, height: 28, borderRadius: 8,
    backgroundColor: `${GREEN}22`,
    borderWidth: 1, borderColor: `${GREEN}45`,
    alignItems: "center", justifyContent: "center",
  },
  bannerLabel: { fontSize: 11, color: GREEN, fontFamily: "Inter_700Bold", letterSpacing: 0.5, flex: 1 },
  purchasedBadge: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: `${GREEN}18`, borderRadius: 10,
    paddingHorizontal: 8, paddingVertical: 3,
    borderWidth: 1, borderColor: `${GREEN}35`,
  },
  purchasedBadgeText: { fontSize: 10, color: GREEN, fontFamily: "Inter_600SemiBold" },
  bannerEventName: { fontSize: 15, color: C.text, fontFamily: "Inter_700Bold", lineHeight: 20 },
  bannerMeta: { flexDirection: "row", alignItems: "center", gap: 5 },
  bannerMetaText: { fontSize: 11, color: C.textSecondary, fontFamily: "Inter_400Regular" },
  bannerDot: { fontSize: 11, color: C.textMuted },
  sectionTag: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.1)",
  },
  sectionTagText: { fontSize: 11, color: C.textSecondary, fontFamily: "Inter_500Medium" },
  viewTicketBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 6, backgroundColor: GREEN, borderRadius: 12, paddingVertical: 11,
    marginTop: 4,
  },
  viewTicketText: { fontSize: 13, color: "#fff", fontFamily: "Inter_700Bold" },

  /* Club card */
  clubCard: {
    borderRadius: 18, padding: 14, overflow: "hidden",
    backgroundColor: C.cardBg, borderWidth: 1, borderColor: `${PURPLE}30`, gap: 8,
  },
  clubRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  clubAvatar: {
    width: 50, height: 50, borderRadius: 14,
    backgroundColor: `${PURPLE}22`,
    borderWidth: 2, borderColor: `${PURPLE}50`,
    alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  clubCode: { fontSize: 12, color: PURPLE, fontFamily: "Inter_700Bold" },
  clubInfo: { flex: 1 },
  clubName: { fontSize: 15, color: C.text, fontFamily: "Inter_700Bold", lineHeight: 20 },
  clubSub: { fontSize: 12, color: PURPLE, fontFamily: "Inter_600SemiBold", marginTop: 2 },
  usavBadge: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: "rgba(191,13,62,0.1)", borderRadius: 10,
    paddingHorizontal: 8, paddingVertical: 4,
    borderWidth: 1, borderColor: "rgba(191,13,62,0.25)",
  },
  usavBadgeText: { fontSize: 10, color: C.accent, fontFamily: "Inter_700Bold" },
  clubRegionRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  clubRegionText: { fontSize: 12, color: C.textMuted, fontFamily: "Inter_400Regular" },

  /* Quick actions */
  quickRow: { flexDirection: "row", gap: 8 },
  quickBtn: {
    flex: 1, alignItems: "center", paddingVertical: 12,
    borderRadius: 14, borderWidth: 1, gap: 6,
  },
  quickLabel: { fontSize: 10, fontFamily: "Inter_600SemiBold" },

  /* Schedule */
  scheduleSection: {
    backgroundColor: C.cardBg, borderRadius: 18,
    overflow: "hidden", borderWidth: 1, borderColor: C.separator,
  },
  scheduleSectionHeader: {
    flexDirection: "row", alignItems: "center", gap: 7,
    paddingHorizontal: 14, paddingTop: 14, paddingBottom: 10,
    borderBottomWidth: 1, borderBottomColor: C.separator,
  },
  scheduleSectionTitle: { flex: 1, fontSize: 13, color: C.text, fontFamily: "Inter_700Bold" },
  seeAllBtn: { flexDirection: "row", alignItems: "center", gap: 2 },
  seeAllText: { fontSize: 12, color: C.accent, fontFamily: "Inter_600SemiBold" },
  tourList: { gap: 0 },
  tourRow: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 14, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: C.separator, gap: 10,
    position: "relative",
  },
  tourRowPurchased: { borderLeftWidth: 0 },
  tourPurchasedBar: {
    position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
    backgroundColor: GREEN, borderRadius: 2,
  },
  tourMain: { flex: 1, gap: 4 },
  tourTop: { flexDirection: "row", alignItems: "center", gap: 8 },
  tourName: { flex: 1, fontSize: 13, color: C.text, fontFamily: "Inter_600SemiBold" },
  statusPill: { borderRadius: 8, paddingHorizontal: 7, paddingVertical: 3, flexShrink: 0 },
  statusText: { fontSize: 10, fontFamily: "Inter_600SemiBold" },
  tourMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  tourMetaText: { fontSize: 11, color: C.textMuted, fontFamily: "Inter_400Regular" },
  tourDot: { fontSize: 11, color: C.textMuted },
  ticketedBadge: {
    width: 32, height: 32, borderRadius: 10,
    backgroundColor: `${GREEN}18`, borderWidth: 1, borderColor: `${GREEN}35`,
    alignItems: "center", justifyContent: "center",
  },
  buyBtn: {
    backgroundColor: C.accent, borderRadius: 10,
    paddingHorizontal: 11, paddingVertical: 6,
  },
  buyBtnText: { fontSize: 11, color: "#fff", fontFamily: "Inter_700Bold" },
});
