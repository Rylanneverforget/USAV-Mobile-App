import { Trophy, Calendar, MapPin, Ticket, ChevronRight, Star, Users } from "lucide-react";

const BG = "#000D2E";
const CARD = "#060E2C";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT = "#E8ECF5";
const MUTED = "#6B7A9F";
const ACCENT = "#BF0D3E";
const SUCCESS = "#2DC579";
const DANGER = "#E84855";
const BLUE = "#3A7BF5";

// ── Mock data matching the real app ──────────────────────────────────────────

const CLUB = { code: "MLB", name: "Mizuno Long Beach", region: "Southern California", city: "Long Beach", state: "CA" };
const ROLE = "Junior Player";
const AGE_GROUP = "17U";

const TOURNAMENTS = [
  {
    id: "ct1", shortName: "Girls JNCs", division: "18 Open",
    date: "Jun 26", endDate: "Jul 5, 2026", location: "Indianapolis, IN",
    venue: "Indiana Convention Center", status: "qualified",
    usavCode: "26GJNC", pointsEarned: 820, pointsPossible: 1000, teamResult: "Pool A – 2nd",
  },
  {
    id: "ct2", shortName: "Boys JNCs", division: "18 USA",
    date: "Jul 9", endDate: "Jul 14, 2026", location: "Minneapolis, MN",
    venue: "Minneapolis Convention Center", status: "upcoming",
    usavCode: "26BJNC",
  },
  {
    id: "ct4", shortName: "SE Qualifier S2", division: "17 National",
    date: "Apr 12", endDate: "Apr 13, 2026", location: "Atlanta, GA",
    venue: "Georgia World Congress Center", status: "registered",
    usavCode: "26SEQS2",
  },
  {
    id: "ct3", shortName: "GL Qualifier", division: "16 Open",
    date: "Mar 8", endDate: "Mar 9, 2026", location: "Chicago, IL",
    venue: "Odeum Expo Center", status: "completed",
    usavCode: "26GLRQ", pointsEarned: 400, pointsPossible: 400, teamResult: "1st Place",
  },
];

const TICKETS = [
  {
    id: "tk1", shortName: "Girls JNCs – Session 1", date: "Jun 26, 2026",
    city: "Indianapolis, IN", ticketStatus: "purchased", price: "$25", section: "Section 114, Row C",
    category: "national_championship",
  },
  {
    id: "tk2", shortName: "VNL Women's Finals", date: "Jul 19, 2026",
    city: "Denver, CO", ticketStatus: "available", price: "$42", category: "pro_match",
  },
  {
    id: "tk3", shortName: "NCAA Championship", date: "Dec 18, 2026",
    city: "Louisville, KY", ticketStatus: "available", price: "$35", category: "college_match",
  },
];

const FAN_PATHWAY = [
  { label: "USA Women's", sub: "VNL 2026 · #1 Ranked",  color: "#E04E8A" },
  { label: "USA Men's",   sub: "VNL 2026 · #1 Ranked",  color: BLUE },
  { label: "Beach VB",    sub: "FIVB Beach Pro Tour",    color: "#F5A623" },
  { label: "NCAA Women's",sub: "Top Programs",           color: "#E04E8A" },
  { label: "NCAA Men's",  sub: "Top Programs",           color: BLUE },
];

const STATUS_CFG: Record<string, { label: string; color: string; bg: string }> = {
  qualified:  { label: "Qualified",  color: SUCCESS,  bg: "rgba(45,197,121,0.12)" },
  registered: { label: "Registered", color: BLUE,     bg: "rgba(58,123,245,0.12)" },
  upcoming:   { label: "Upcoming",   color: "#F5A623", bg: "rgba(245,166,35,0.12)" },
  completed:  { label: "Completed",  color: MUTED,     bg: "rgba(107,122,159,0.1)" },
};

const TICKET_CFG: Record<string, { label: string; color: string; bg: string }> = {
  purchased: { label: "Purchased", color: SUCCESS, bg: "rgba(45,197,121,0.12)" },
  available: { label: "Available", color: BLUE,    bg: "rgba(58,123,245,0.12)" },
  soldout:   { label: "Sold Out",  color: DANGER,  bg: "rgba(232,72,85,0.12)" },
};

// ── Sub-components ────────────────────────────────────────────────────────────

function VolleyBall({ size = 24, color = "rgba(255,255,255,0.12)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
      <path d="M12 2 C12 2 8 6 8 12 C8 18 12 22 12 22" stroke={color} strokeWidth="1.5" />
      <path d="M2 12 C2 12 6 8 12 8 C18 8 22 12 22 12" stroke={color} strokeWidth="1.5" />
      <path d="M4.93 4.93 C4.93 4.93 10 7 12 12 C14 17 13 21 13 21" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function NetIcon({ size = 20, color = MUTED }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="10" width="20" height="4" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M8 10 L8 22M16 10 L16 22M2 14 L22 14" stroke={color} strokeWidth="1.2" />
      <circle cx="12" cy="6" r="3" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function SectionHeader({ icon, title, count }: { icon: React.ReactNode; title: string; count?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        {icon}
        <span style={{ fontSize: 15, color: TEXT, fontFamily: "Inter", fontWeight: 600 }}>{title}</span>
      </div>
      {count !== undefined && (
        <div style={{ background: "rgba(191,13,62,0.12)", border: "1px solid rgba(191,13,62,0.2)", borderRadius: 10, padding: "2px 8px" }}>
          <span style={{ fontSize: 11, color: ACCENT, fontFamily: "Inter", fontWeight: 600 }}>{count}</span>
        </div>
      )}
    </div>
  );
}

function TournamentCard({ t }: { t: typeof TOURNAMENTS[0] }) {
  const cfg = STATUS_CFG[t.status];
  return (
    <div style={{ background: CARD, borderRadius: 14, padding: 14, marginBottom: 10, border: `1px solid ${BORDER}`, display: "flex", flexDirection: "column", gap: 6, overflow: "hidden", position: "relative" }}>
      {t.status === "qualified" && (
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${SUCCESS}08, transparent)` }} />
      )}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, position: "relative" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontSize: 14, color: TEXT, fontFamily: "Inter", fontWeight: 600 }}>{t.shortName}</span>
          <span style={{ fontSize: 12, color: "rgba(232,236,245,0.65)", fontFamily: "Inter" }}>{t.division}</span>
        </div>
        <div style={{ background: cfg.bg, borderRadius: 8, padding: "3px 8px", flexShrink: 0 }}>
          <span style={{ fontSize: 11, color: cfg.color, fontFamily: "Inter", fontWeight: 600 }}>{cfg.label}</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, position: "relative" }}>
        <Calendar size={11} color={MUTED} />
        <span style={{ fontSize: 12, color: MUTED, fontFamily: "Inter" }}>{t.date}{t.endDate ? ` – ${t.endDate}` : ""}</span>
        <span style={{ color: MUTED, fontSize: 12 }}>·</span>
        <MapPin size={11} color={MUTED} />
        <span style={{ fontSize: 12, color: MUTED, fontFamily: "Inter" }}>{t.location}</span>
      </div>
      {t.usavCode && (
        <div style={{ display: "flex", alignItems: "center", gap: 4, position: "relative" }}>
          <VolleyBall size={10} color={ACCENT} />
          <span style={{ fontSize: 11, color: ACCENT, fontFamily: "Inter", fontWeight: 500 }}>USAV Sanctioned · {t.usavCode}</span>
        </div>
      )}
      {(t.status === "completed" || t.status === "qualified") && t.teamResult && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, position: "relative", paddingTop: 4, borderTop: `1px solid ${BORDER}`, marginTop: 2 }}>
          <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>
            {t.status === "qualified" ? "Qualifier result" : "Result"}
          </span>
          <span style={{ fontSize: 12, color: TEXT, fontFamily: "Inter", fontWeight: 600, flex: 1 }}>{t.teamResult}</span>
          {t.pointsEarned !== undefined && (
            <span style={{ fontSize: 12, color: SUCCESS, fontFamily: "Inter", fontWeight: 600 }}>
              {t.pointsEarned}{t.pointsPossible ? `/${t.pointsPossible}` : ""} pts
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function TicketCard({ tk }: { tk: typeof TICKETS[0] }) {
  const cfg = TICKET_CFG[tk.ticketStatus];
  const isPurchased = tk.ticketStatus === "purchased";
  return (
    <div style={{ background: CARD, borderRadius: 14, padding: 14, marginBottom: 10, border: isPurchased ? `1px solid ${SUCCESS}30` : `1px solid ${BORDER}`, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, overflow: "hidden", position: "relative", cursor: "pointer" }}>
      {isPurchased && <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${SUCCESS}07, transparent)` }} />}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flex: 1, position: "relative" }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(191,13,62,0.1)", border: "1px solid rgba(191,13,62,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Ticket size={16} color={ACCENT} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
          <span style={{ fontSize: 13, color: TEXT, fontFamily: "Inter", fontWeight: 600, lineHeight: "18px" }}>{tk.shortName}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Calendar size={10} color={MUTED} />
            <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>{tk.date}</span>
            <span style={{ color: MUTED, fontSize: 11 }}>·</span>
            <MapPin size={10} color={MUTED} />
            <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>{tk.city}</span>
          </div>
          {tk.section && (
            <span style={{ fontSize: 11, color: "rgba(232,236,245,0.65)", fontFamily: "Inter", fontWeight: 500 }}>{tk.section}</span>
          )}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, position: "relative" }}>
        <div style={{ background: cfg.bg, borderRadius: 8, padding: "3px 8px" }}>
          <span style={{ fontSize: 11, color: cfg.color, fontFamily: "Inter", fontWeight: 600 }}>{cfg.label}</span>
        </div>
        <span style={{ fontSize: 14, color: TEXT, fontFamily: "Inter", fontWeight: 700 }}>{tk.price}</span>
      </div>
    </div>
  );
}

function FanPathwayCard({ item }: { item: typeof FAN_PATHWAY[0] }) {
  return (
    <div style={{ width: 130, background: CARD, borderRadius: 14, padding: 14, gap: 6, border: `1px solid ${item.color}35`, display: "flex", flexDirection: "column", cursor: "pointer", flexShrink: 0 }}>
      <div style={{ width: 8, height: 8, borderRadius: 4, background: item.color }} />
      <span style={{ fontSize: 13, color: item.color, fontFamily: "Inter", fontWeight: 600 }}>{item.label}</span>
      <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter", lineHeight: "15px" }}>{item.sub}</span>
    </div>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────────────

export function JuniorClubScreen() {
  const qualifiedCount = TOURNAMENTS.filter(t => t.status === "qualified" || t.status === "completed").length;
  const activeCount = TOURNAMENTS.filter(t => t.status !== "completed").length;
  const purchasedTickets = TICKETS.filter(t => t.ticketStatus === "purchased").length;
  const totalPoints = TOURNAMENTS.reduce((sum, t) => sum + (t.pointsEarned ?? 0), 0);

  return (
    <div style={{ width: 390, height: 1080, overflowY: "auto", background: BG, fontFamily: "Inter, sans-serif", position: "relative" }}>
      {/* Header gradients */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 260, background: "linear-gradient(135deg, #001A50, #000D30)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 260, background: `linear-gradient(135deg, ${BLUE}25, transparent)`, zIndex: 0 }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, zIndex: 0, opacity: 0.6 }}>
        <VolleyBall size={200} color="rgba(255,255,255,0.025)" />
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: "52px 16px 32px" }}>

        {/* ── Page Header ──────────────────────────────────────── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>My Club Hub</div>
            <div style={{ fontSize: 13, color: "rgba(232,236,245,0.65)", fontFamily: "Inter", marginTop: 2 }}>Junior Club Volleyball</div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: `${BLUE}20`, border: `1px solid ${BLUE}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <NetIcon size={20} color={BLUE} />
          </div>
        </div>

        {/* USAV bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(191,13,62,0.08)", border: "1px solid rgba(191,13,62,0.2)", borderRadius: 20, padding: "5px 12px", width: "fit-content", marginBottom: 20 }}>
          <VolleyBall size={11} color={ACCENT} />
          <span style={{ fontSize: 11, color: ACCENT, fontFamily: "Inter", fontWeight: 600 }}>USA Volleyball Junior Club Affiliate</span>
        </div>

        {/* ── Club Identity Card ────────────────────────────────── */}
        <div style={{ borderRadius: 18, padding: 16, marginBottom: 20, border: `1px solid ${BLUE}25`, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${BLUE}18, rgba(0,31,91,0.35))` }} />
          <div style={{ position: "relative" }}>
            {/* Club top row */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${BLUE}20`, border: `1.5px solid ${BLUE}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 14, color: BLUE, fontFamily: "Inter", fontWeight: 700 }}>{CLUB.code}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>{CLUB.name}</div>
                <div style={{ fontSize: 12, color: "rgba(232,236,245,0.65)", fontFamily: "Inter", marginTop: 3 }}>
                  {AGE_GROUP} · {CLUB.region}
                </div>
              </div>
              <div style={{ background: "rgba(191,13,62,0.12)", border: "1px solid rgba(191,13,62,0.25)", borderRadius: 10, padding: "4px 10px" }}>
                <span style={{ fontSize: 11, color: ACCENT, fontFamily: "Inter", fontWeight: 600 }}>{ROLE}</span>
              </div>
            </div>

            {/* Club stats */}
            <div style={{ display: "flex", alignItems: "center", background: "rgba(0,0,0,0.2)", borderRadius: 14, padding: "12px 0" }}>
              {[
                { val: qualifiedCount, label: "Events" },
                { val: TOURNAMENTS.filter(t => t.status === "qualified").length, label: "Qualified" },
                { val: purchasedTickets, label: "Tickets" },
                { val: `${totalPoints}`, label: "USAV Pts" },
              ].map((stat, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, borderRight: i < 3 ? `1px solid rgba(255,255,255,0.08)` : "none" }}>
                  <span style={{ fontSize: 20, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>{stat.val}</span>
                  <span style={{ fontSize: 10, color: MUTED, fontFamily: "Inter", letterSpacing: "0.3px" }}>{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Season progress bar */}
            <div style={{ marginTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: "rgba(232,236,245,0.7)", fontFamily: "Inter", fontWeight: 500 }}>Season Progress</span>
                <span style={{ fontSize: 12, color: BLUE, fontFamily: "Inter", fontWeight: 600 }}>75% · {totalPoints} pts</span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: 6, borderRadius: 3, width: "75%", background: `linear-gradient(to right, ${BLUE}, ${BLUE}80)` }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                <span style={{ fontSize: 10, color: MUTED, fontFamily: "Inter" }}>Start</span>
                <span style={{ fontSize: 10, color: MUTED, fontFamily: "Inter" }}>JNCs · Jun 26</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Club Tournaments ──────────────────────────────────── */}
        <div style={{ marginBottom: 20 }}>
          <SectionHeader icon={<NetIcon size={16} color={ACCENT} />} title="Club Tournaments" count={activeCount} />
          {TOURNAMENTS.map(t => <TournamentCard key={t.id} t={t} />)}
        </div>

        {/* ── Event Tickets ─────────────────────────────────────── */}
        <div style={{ marginBottom: 20 }}>
          <SectionHeader icon={<Ticket size={16} color={ACCENT} />} title="Event Tickets" count={TICKETS.length} />
          {TICKETS.map(tk => <TicketCard key={tk.id} tk={tk} />)}
          <div style={{ background: `${BLUE}10`, border: `1px dashed ${BLUE}30`, borderRadius: 14, padding: 14, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", marginTop: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${BLUE}20`, border: `1px solid ${BLUE}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Ticket size={16} color={BLUE} />
              </div>
              <div>
                <div style={{ fontSize: 13, color: TEXT, fontFamily: "Inter", fontWeight: 600 }}>Browse More Events</div>
                <div style={{ fontSize: 11, color: MUTED, fontFamily: "Inter", marginTop: 2 }}>Find volleyball tickets near you</div>
              </div>
            </div>
            <ChevronRight size={16} color={MUTED} />
          </div>
        </div>

        {/* ── Fan Hub / Pathway ─────────────────────────────────── */}
        <div style={{ marginBottom: 20 }}>
          <SectionHeader icon={<VolleyBall size={16} color={ACCENT} />} title="Fan Hub" />
          <p style={{ fontSize: 13, color: MUTED, fontFamily: "Inter", lineHeight: "18px", margin: "0 0 12px" }}>
            Follow your path from the junior club level all the way to the national team.
          </p>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
            {FAN_PATHWAY.map(item => <FanPathwayCard key={item.label} item={item} />)}
          </div>
        </div>

        {/* ── Club Teammates / Team Card ─────────────────────────── */}
        <div style={{ marginBottom: 16 }}>
          <SectionHeader icon={<Users size={16} color={ACCENT} />} title="Teammates" count={12} />
          <div style={{ background: CARD, borderRadius: 18, padding: 16, border: `1px solid ${BORDER}` }}>
            <div style={{ display: "flex", gap: -8, marginBottom: 10 }}>
              {["AR", "BR", "CJ", "DL", "EK", "FM"].map((initials, i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: 18, background: `${BLUE}25`, border: `2px solid ${BG}`, marginLeft: i > 0 ? -8 : 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 10, color: BLUE, fontFamily: "Inter", fontWeight: 700 }}>{initials}</span>
                </div>
              ))}
              <div style={{ width: 36, height: 36, borderRadius: 18, background: "rgba(255,255,255,0.06)", border: `2px solid ${BG}`, marginLeft: -8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 10, color: MUTED, fontFamily: "Inter", fontWeight: 600 }}>+6</span>
              </div>
            </div>
            <div style={{ fontSize: 13, color: TEXT, fontFamily: "Inter", fontWeight: 600, marginBottom: 4 }}>Mizuno Long Beach — 17U</div>
            <div style={{ fontSize: 12, color: MUTED, fontFamily: "Inter" }}>12 players registered this season · {CLUB.city}, {CLUB.state}</div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <div style={{ flex: 1, background: `${BLUE}15`, borderRadius: 10, padding: "8px 12px", border: `1px solid ${BLUE}25`, cursor: "pointer", textAlign: "center" }}>
                <span style={{ fontSize: 12, color: BLUE, fontFamily: "Inter", fontWeight: 600 }}>View Roster</span>
              </div>
              <div style={{ flex: 1, background: "rgba(191,13,62,0.1)", borderRadius: 10, padding: "8px 12px", border: "1px solid rgba(191,13,62,0.22)", cursor: "pointer", textAlign: "center" }}>
                <span style={{ fontSize: 12, color: ACCENT, fontFamily: "Inter", fontWeight: 600 }}>Club Updates</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
