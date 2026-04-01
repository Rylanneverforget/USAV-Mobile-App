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
import { VolleyballSvg, NetCourtIcon, SpikeIcon, CollegeIcon } from "@/components/VolleyballIcons";

const C = Colors.light;

const ROLE_LABELS: Record<string, string> = {
  junior_player: "Junior Player",
  parent: "Parent / Guardian",
  club_coach: "Club Coach",
};

const STATUS_CONFIG: Record<ClubTournament["status"], { label: string; color: string; bg: string }> = {
  qualified:  { label: "Qualified",  color: "#44C98E", bg: "rgba(68,201,142,0.12)" },
  registered: { label: "Registered", color: "#3A7BF5", bg: "rgba(58,123,245,0.12)" },
  upcoming:   { label: "Upcoming",   color: "#F5A623", bg: "rgba(245,166,35,0.12)" },
  completed:  { label: "Completed",  color: "#7B8CAA", bg: "rgba(123,140,170,0.1)" },
};

const TICKET_STATUS_CONFIG: Record<ClubTicket["ticketStatus"], { label: string; color: string; bg: string }> = {
  purchased: { label: "Purchased", color: "#44C98E", bg: "rgba(68,201,142,0.12)" },
  available: { label: "Available", color: "#3A7BF5", bg: "rgba(58,123,245,0.12)" },
  soldout:   { label: "Sold Out",  color: "#E84855", bg: "rgba(232,72,85,0.12)" },
};

const CATEGORY_ICON: Record<ClubTicket["category"], React.ComponentType<{ size?: number; color?: string }>> = {
  national_championship: VolleyballSvg,
  regional_qualifier:    NetCourtIcon,
  all_star:              SpikeIcon,
  pro_match:             SpikeIcon,
  college_match:         CollegeIcon,
};

function SectionHeader({ icon, title, count }: { icon: React.ReactNode; title: string; count?: number }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionHeaderLeft}>
        {icon}
        <Text style={styles.sectionHeaderTitle}>{title}</Text>
      </View>
      {count !== undefined && (
        <View style={styles.countPill}>
          <Text style={styles.countPillText}>{count}</Text>
        </View>
      )}
    </View>
  );
}

function TournamentCard({ t }: { t: ClubTournament }) {
  const cfg = STATUS_CONFIG[t.status];
  return (
    <View style={styles.tournamentCard}>
      <View style={styles.tournamentTop}>
        <View style={styles.tournamentInfo}>
          <Text style={styles.tournamentName}>{t.shortName}</Text>
          <Text style={styles.tournamentDivision}>{t.division}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: cfg.bg }]}>
          <Text style={[styles.statusText, { color: cfg.color }]}>{cfg.label}</Text>
        </View>
      </View>
      <View style={styles.tournamentMeta}>
        <Text style={styles.metaText}>{t.date}{t.endDate ? ` – ${t.endDate}` : ""}</Text>
        <Text style={styles.metaDot}>·</Text>
        <Text style={styles.metaText}>{t.location}</Text>
      </View>
      {t.isUSAVSanctioned && (
        <View style={styles.usavTag}>
          <VolleyballSvg size={10} color={C.accent} />
          <Text style={styles.usavTagText}>USAV Sanctioned{t.usavEventCode ? `  ·  ${t.usavEventCode}` : ""}</Text>
        </View>
      )}
      {t.status === "completed" && t.teamResult && (
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Result</Text>
          <Text style={styles.resultValue}>{t.teamResult}</Text>
          {t.pointsEarned !== undefined && (
            <Text style={styles.resultPoints}>{t.pointsEarned} pts</Text>
          )}
        </View>
      )}
      {t.status === "qualified" && t.teamResult && (
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Qualifier result</Text>
          <Text style={styles.resultValue}>{t.teamResult}</Text>
          {t.pointsEarned !== undefined && (
            <Text style={styles.resultPoints}>{t.pointsEarned}/{t.pointsPossible} pts</Text>
          )}
        </View>
      )}
    </View>
  );
}

function TicketCard({ tk }: { tk: ClubTicket }) {
  const cfg = TICKET_STATUS_CONFIG[tk.ticketStatus];
  const IconComp = CATEGORY_ICON[tk.category];
  return (
    <Pressable style={({ pressed }) => [styles.ticketCard, pressed && { opacity: 0.8 }]}>
      <View style={styles.ticketLeft}>
        <View style={styles.ticketIconWrap}>
          <IconComp size={18} color={C.accent} />
        </View>
        <View style={styles.ticketInfo}>
          <Text style={styles.ticketName} numberOfLines={2}>{tk.shortName}</Text>
          <Text style={styles.ticketMeta}>{tk.date}  ·  {tk.city}</Text>
          {tk.section && <Text style={styles.ticketSection}>{tk.section}</Text>}
        </View>
      </View>
      <View style={styles.ticketRight}>
        <View style={[styles.ticketStatusBadge, { backgroundColor: cfg.bg }]}>
          <Text style={[styles.ticketStatusText, { color: cfg.color }]}>{cfg.label}</Text>
        </View>
        <Text style={styles.ticketPrice}>{tk.price}</Text>
      </View>
    </Pressable>
  );
}

export default function JuniorClubSection({ juniorClub }: { juniorClub: JuniorClubPrefs }) {
  const club = JUNIOR_CLUBS.find((c) => c.id === juniorClub.clubId);

  const activeTournaments = CLUB_TOURNAMENTS.filter(
    (t) => t.status !== "completed"
  );
  const completedTournaments = CLUB_TOURNAMENTS.filter(
    (t) => t.status === "completed"
  );

  return (
    <View style={styles.container}>
      {/* ── Club Identity Header ─────────────────────────── */}
      <LinearGradient
        colors={["rgba(58,123,245,0.15)", "rgba(0,31,91,0.3)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.clubHeader}
      >
        <View style={styles.clubHeaderTop}>
          <View style={styles.clubCodeBadge}>
            <Text style={styles.clubCode}>{club?.code ?? "CLB"}</Text>
          </View>
          <View style={styles.clubHeaderInfo}>
            <Text style={styles.clubName}>{juniorClub.clubName}</Text>
            <Text style={styles.clubSub}>
              {juniorClub.ageGroup}  ·  {club?.region ?? "USA Volleyball"}
            </Text>
          </View>
          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>{ROLE_LABELS[juniorClub.role]}</Text>
          </View>
        </View>

        <View style={styles.clubStatsRow}>
          <View style={styles.clubStat}>
            <Text style={styles.clubStatNum}>{CLUB_TOURNAMENTS.filter((t) => t.status === "qualified" || t.status === "completed").length}</Text>
            <Text style={styles.clubStatLabel}>Events</Text>
          </View>
          <View style={styles.clubStatDivider} />
          <View style={styles.clubStat}>
            <Text style={styles.clubStatNum}>{CLUB_TOURNAMENTS.filter((t) => t.status === "qualified").length}</Text>
            <Text style={styles.clubStatLabel}>Qualified</Text>
          </View>
          <View style={styles.clubStatDivider} />
          <View style={styles.clubStat}>
            <Text style={styles.clubStatNum}>{CLUB_TICKETS.filter((t) => t.ticketStatus === "purchased").length}</Text>
            <Text style={styles.clubStatLabel}>Tickets</Text>
          </View>
        </View>
      </LinearGradient>

      {/* ── Upcoming Tournaments ─────────────────────────── */}
      <View style={styles.section}>
        <SectionHeader
          icon={<NetCourtIcon size={16} color={C.accent} />}
          title="Club Tournaments"
          count={activeTournaments.length}
        />
        {activeTournaments.map((t) => (
          <TournamentCard key={t.id} t={t} />
        ))}
        {completedTournaments.map((t) => (
          <TournamentCard key={t.id} t={t} />
        ))}
      </View>

      {/* ── Tickets ──────────────────────────────────────── */}
      <View style={styles.section}>
        <SectionHeader
          icon={<SpikeIcon size={16} color={C.accent} />}
          title="Event Tickets"
          count={CLUB_TICKETS.length}
        />
        {CLUB_TICKETS.map((tk) => (
          <TicketCard key={tk.id} tk={tk} />
        ))}
      </View>

      {/* ── Fan Hub (national / collegiate connection) ───── */}
      <View style={styles.section}>
        <SectionHeader
          icon={<VolleyballSvg size={16} color={C.accent} />}
          title="Fan Hub"
        />
        <Text style={styles.fanHubSubtitle}>
          Follow your path from the junior club level all the way to the national team.
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.fanHubRow}>
          {[
            { label: "USA Women's", sub: "VNL 2026 · #1 Ranked", color: "#E04E8A" },
            { label: "USA Men's",   sub: "VNL 2026 · #1 Ranked", color: "#3A7BF5" },
            { label: "Beach VB",    sub: "FIVB Beach Pro Tour",   color: "#F5A623" },
            { label: "NCAA Women's",sub: "Top Programs",          color: "#E04E8A" },
            { label: "NCAA Men's",  sub: "Top Programs",          color: "#3A7BF5" },
          ].map((item) => (
            <Pressable
              key={item.label}
              style={({ pressed }) => [styles.fanHubCard, { borderColor: `${item.color}35` }, pressed && { opacity: 0.8 }]}
            >
              <View style={[styles.fanHubDot, { backgroundColor: item.color }]} />
              <Text style={[styles.fanHubLabel, { color: item.color }]}>{item.label}</Text>
              <Text style={styles.fanHubSub}>{item.sub}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 0 },

  /* Club Header */
  clubHeader: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(58,123,245,0.2)",
  },
  clubHeaderTop: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 },
  clubCodeBadge: {
    width: 52, height: 52, borderRadius: 14,
    backgroundColor: "rgba(58,123,245,0.2)",
    borderWidth: 1.5, borderColor: "rgba(58,123,245,0.4)",
    alignItems: "center", justifyContent: "center",
  },
  clubCode: { fontSize: 14, color: "#3A7BF5", fontFamily: "Inter_700Bold" },
  clubHeaderInfo: { flex: 1, gap: 3 },
  clubName: { fontSize: 16, color: C.text, fontFamily: "Inter_700Bold" },
  clubSub: { fontSize: 12, color: C.textSecondary, fontFamily: "Inter_400Regular" },
  roleBadge: {
    backgroundColor: "rgba(191,13,62,0.12)", borderRadius: 10,
    paddingHorizontal: 10, paddingVertical: 4,
    borderWidth: 1, borderColor: "rgba(191,13,62,0.25)",
  },
  roleBadgeText: { fontSize: 11, color: C.accent, fontFamily: "Inter_600SemiBold" },
  clubStatsRow: { flexDirection: "row", alignItems: "center" },
  clubStat: { flex: 1, alignItems: "center", gap: 2 },
  clubStatNum: { fontSize: 20, color: C.text, fontFamily: "Inter_700Bold" },
  clubStatLabel: { fontSize: 11, color: C.textMuted, fontFamily: "Inter_400Regular" },
  clubStatDivider: { width: 1, height: 32, backgroundColor: "rgba(255,255,255,0.08)" },

  /* Sections */
  section: { marginBottom: 20 },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  sectionHeaderLeft: { flexDirection: "row", alignItems: "center", gap: 7 },
  sectionHeaderTitle: { fontSize: 15, color: C.text, fontFamily: "Inter_600SemiBold" },
  countPill: { backgroundColor: "rgba(191,13,62,0.12)", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2, borderWidth: 1, borderColor: "rgba(191,13,62,0.2)" },
  countPillText: { fontSize: 11, color: C.accent, fontFamily: "Inter_600SemiBold" },

  /* Tournament Card */
  tournamentCard: {
    backgroundColor: C.cardBg, borderRadius: 14, padding: 14,
    marginBottom: 10, borderWidth: 1, borderColor: C.separator, gap: 6,
  },
  tournamentTop: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 10 },
  tournamentInfo: { flex: 1, gap: 2 },
  tournamentName: { fontSize: 14, color: C.text, fontFamily: "Inter_600SemiBold" },
  tournamentDivision: { fontSize: 12, color: C.textSecondary, fontFamily: "Inter_400Regular" },
  statusBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  statusText: { fontSize: 11, fontFamily: "Inter_600SemiBold" },
  tournamentMeta: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaText: { fontSize: 12, color: C.textMuted, fontFamily: "Inter_400Regular" },
  metaDot: { fontSize: 12, color: C.textMuted },
  usavTag: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  usavTagText: { fontSize: 11, color: C.accent, fontFamily: "Inter_500Medium" },
  resultRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 2 },
  resultLabel: { fontSize: 11, color: C.textMuted, fontFamily: "Inter_400Regular" },
  resultValue: { fontSize: 12, color: C.text, fontFamily: "Inter_600SemiBold", flex: 1 },
  resultPoints: { fontSize: 12, color: "#44C98E", fontFamily: "Inter_600SemiBold" },

  /* Ticket Card */
  ticketCard: {
    flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between",
    backgroundColor: C.cardBg, borderRadius: 14, padding: 14,
    marginBottom: 10, borderWidth: 1, borderColor: C.separator, gap: 10,
  },
  ticketLeft: { flexDirection: "row", alignItems: "flex-start", gap: 10, flex: 1 },
  ticketIconWrap: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: "rgba(191,13,62,0.1)",
    borderWidth: 1, borderColor: "rgba(191,13,62,0.2)",
    alignItems: "center", justifyContent: "center",
  },
  ticketInfo: { flex: 1, gap: 3 },
  ticketName: { fontSize: 13, color: C.text, fontFamily: "Inter_600SemiBold", lineHeight: 18 },
  ticketMeta: { fontSize: 11, color: C.textMuted, fontFamily: "Inter_400Regular" },
  ticketSection: { fontSize: 11, color: C.textSecondary, fontFamily: "Inter_500Medium" },
  ticketRight: { alignItems: "flex-end", gap: 6 },
  ticketStatusBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  ticketStatusText: { fontSize: 11, fontFamily: "Inter_600SemiBold" },
  ticketPrice: { fontSize: 14, color: C.text, fontFamily: "Inter_700Bold" },

  /* Fan Hub */
  fanHubSubtitle: { fontSize: 13, color: C.textMuted, fontFamily: "Inter_400Regular", lineHeight: 18, marginBottom: 12 },
  fanHubRow: { gap: 10, paddingRight: 4 },
  fanHubCard: {
    width: 130, backgroundColor: C.cardBg, borderRadius: 14, padding: 14,
    gap: 6, borderWidth: 1,
  },
  fanHubDot: { width: 8, height: 8, borderRadius: 4 },
  fanHubLabel: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
  fanHubSub: { fontSize: 11, color: C.textMuted, fontFamily: "Inter_400Regular", lineHeight: 15 },
});
