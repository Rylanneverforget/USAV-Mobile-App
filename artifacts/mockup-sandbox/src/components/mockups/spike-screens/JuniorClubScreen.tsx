import { Ticket, ChevronRight, Users, ChevronDown, Trophy, Clock } from "lucide-react";
import { useState } from "react";

const BG = "#000D2E";
const CARD = "#060E2C";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT = "#E8ECF5";
const MUTED = "#6B7A9F";
const ACCENT = "#BF0D3E";
const SUCCESS = "#2DC579";
const BLUE = "#3A7BF5";
const WARN = "#F5A623";

function VolleyBall({ size = 24, color = "rgba(255,255,255,0.12)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
      <path d="M12 2 C12 2 8 6 8 12 C8 18 12 22 12 22" stroke={color} strokeWidth="1.5" />
      <path d="M2 12 C2 12 6 8 12 8 C18 8 22 12 22 12" stroke={color} strokeWidth="1.5" />
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

const TOURNAMENTS = [
  {
    id: "ct1", shortName: "Girls JNCs", division: "18 Open", date: "Jun 26", endDate: "Jul 5, 2026",
    location: "Indianapolis, IN", status: "qualified", usavCode: "26GJNC",
    pointsEarned: 820, pointsPossible: 1000, teamResult: "Pool A – 2nd",
    hasTickets: true,
  },
  {
    id: "ct2", shortName: "Boys JNCs", division: "18 USA", date: "Jul 9", endDate: "Jul 14, 2026",
    location: "Minneapolis, MN", status: "upcoming", usavCode: "26BJNC",
    hasTickets: true,
  },
  {
    id: "ct4", shortName: "SE Qualifier S2", division: "17 National", date: "Apr 12", endDate: "Apr 13, 2026",
    location: "Atlanta, GA", status: "registered", usavCode: "26SEQS2",
    hasTickets: false,
  },
  {
    id: "ct3", shortName: "GL Qualifier", division: "16 Open", date: "Mar 8", endDate: "Mar 9, 2026",
    location: "Chicago, IL", status: "completed", usavCode: "26GLRQ",
    pointsEarned: 400, pointsPossible: 400, teamResult: "1st Place",
    hasTickets: false,
  },
];

const TICKETS = [
  { id: "tk1", shortName: "Girls JNCs – Session 1", date: "Jun 26, 2026", city: "Indianapolis, IN", ticketStatus: "purchased", price: "$25", section: "Section 114, Row C" },
  { id: "tk2", shortName: "VNL Women's Finals",     date: "Jul 19, 2026", city: "Denver, CO",        ticketStatus: "available", price: "$42" },
  { id: "tk3", shortName: "NCAA Championship",       date: "Dec 18, 2026", city: "Louisville, KY",    ticketStatus: "available", price: "$35" },
];

const STATUS_CFG: Record<string, { label: string; color: string; bg: string }> = {
  qualified:  { label: "Qualified",  color: SUCCESS, bg: "rgba(45,197,121,0.12)" },
  registered: { label: "Registered", color: BLUE,    bg: "rgba(58,123,245,0.12)" },
  upcoming:   { label: "Upcoming",   color: WARN,    bg: "rgba(245,166,35,0.12)" },
  completed:  { label: "Completed",  color: MUTED,   bg: "rgba(107,122,159,0.1)" },
};

const TICKET_CFG: Record<string, { label: string; color: string; bg: string }> = {
  purchased: { label: "Purchased", color: SUCCESS, bg: "rgba(45,197,121,0.12)" },
  available: { label: "Available", color: BLUE,    bg: "rgba(58,123,245,0.12)" },
  soldout:   { label: "Sold Out",  color: "#E84855", bg: "rgba(232,72,85,0.12)" },
};

const FAN_PATHWAY = [
  { label: "USA Women's",  sub: "VNL 2026 · #1",      color: "#E04E8A" },
  { label: "USA Men's",    sub: "VNL 2026 · #1",      color: BLUE },
  { label: "Beach VB",     sub: "FIVB Beach Pro Tour", color: WARN },
  { label: "NCAA Women's", sub: "Top Programs",        color: "#E04E8A" },
  { label: "NCAA Men's",   sub: "Top Programs",        color: BLUE },
];

function TournamentCard({ t, tab }: { t: typeof TOURNAMENTS[0]; tab: "upcoming" | "results" }) {
  const cfg = STATUS_CFG[t.status];
  const isCompleted = t.status === "completed";
  const isQualified = t.status === "qualified";
  const highlightColor = isQualified ? SUCCESS : isCompleted ? MUTED : cfg.color;

  return (
    <div style={{ background: CARD, borderRadius: 16, marginBottom: 10, border: `1px solid ${isQualified ? SUCCESS + "30" : BORDER}`, overflow: "hidden", position: "relative", cursor: "pointer" }}>
      {isQualified && <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${SUCCESS}07, transparent)` }} />}

      {/* Colored left accent bar */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: highlightColor, borderRadius: "16px 0 0 16px" }} />

      <div style={{ padding: "13px 14px 13px 18px", position: "relative" }}>
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: TEXT, fontFamily: "Inter", fontWeight: 600, marginBottom: 2 }}>{t.shortName}</div>
            <div style={{ fontSize: 12, color: MUTED, fontFamily: "Inter" }}>{t.division} · {t.location}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
            <div style={{ background: cfg.bg, borderRadius: 8, padding: "3px 8px" }}>
              <span style={{ fontSize: 11, color: cfg.color, fontFamily: "Inter", fontWeight: 600 }}>{cfg.label}</span>
            </div>
            {t.hasTickets && tab === "upcoming" && (
              <div style={{ background: "rgba(191,13,62,0.1)", borderRadius: 8, padding: "3px 8px", border: "1px solid rgba(191,13,62,0.2)" }}>
                <span style={{ fontSize: 10, color: ACCENT, fontFamily: "Inter", fontWeight: 600 }}>🎟 Tickets</span>
              </div>
            )}
          </div>
        </div>

        {/* Date row */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: isCompleted || isQualified ? 8 : 0 }}>
          <Clock size={10} color={MUTED} />
          <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>{t.date}{t.endDate ? ` – ${t.endDate}` : ""}</span>
          {t.usavCode && (
            <>
              <span style={{ color: MUTED, fontSize: 11 }}>·</span>
              <VolleyBall size={9} color={ACCENT} />
              <span style={{ fontSize: 11, color: ACCENT, fontFamily: "Inter", fontWeight: 500 }}>{t.usavCode}</span>
            </>
          )}
        </div>

        {/* Result row (for completed/qualified) */}
        {(isCompleted || isQualified) && t.teamResult && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 8, borderTop: `1px solid ${BORDER}` }}>
            <Trophy size={12} color={isQualified ? SUCCESS : MUTED} />
            <span style={{ fontSize: 12, color: TEXT, fontFamily: "Inter", fontWeight: 600, flex: 1 }}>{t.teamResult}</span>
            {t.pointsEarned !== undefined && (
              <span style={{ fontSize: 12, color: isQualified ? SUCCESS : MUTED, fontFamily: "Inter", fontWeight: 600 }}>
                {t.pointsEarned}{t.pointsPossible ? `/${t.pointsPossible}` : ""} pts
              </span>
            )}
          </div>
        )}

        {/* View details affordance */}
        <div style={{ position: "absolute", right: 14, bottom: 13 }}>
          <ChevronRight size={14} color={MUTED} />
        </div>
      </div>
    </div>
  );
}

function TicketCard({ tk }: { tk: typeof TICKETS[0] }) {
  const cfg = TICKET_CFG[tk.ticketStatus];
  const isPurchased = tk.ticketStatus === "purchased";
  return (
    <div style={{ background: CARD, borderRadius: 14, padding: 13, marginBottom: 10, border: isPurchased ? `1px solid ${SUCCESS}30` : `1px solid ${BORDER}`, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, cursor: "pointer", position: "relative", overflow: "hidden" }}>
      {isPurchased && <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${SUCCESS}06, transparent)` }} />}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flex: 1, position: "relative" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(191,13,62,0.1)", border: "1px solid rgba(191,13,62,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Ticket size={15} color={ACCENT} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
          <span style={{ fontSize: 13, color: TEXT, fontFamily: "Inter", fontWeight: 600, lineHeight: "17px" }}>{tk.shortName}</span>
          <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>{tk.date} · {tk.city}</span>
          {(tk as any).section && <span style={{ fontSize: 11, color: "rgba(232,236,245,0.7)", fontFamily: "Inter", fontWeight: 500 }}>{(tk as any).section}</span>}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5, position: "relative" }}>
        <div style={{ background: cfg.bg, borderRadius: 8, padding: "3px 8px" }}>
          <span style={{ fontSize: 11, color: cfg.color, fontFamily: "Inter", fontWeight: 600 }}>{cfg.label}</span>
        </div>
        <span style={{ fontSize: 14, color: TEXT, fontFamily: "Inter", fontWeight: 700 }}>{tk.price}</span>
      </div>
    </div>
  );
}

export function JuniorClubScreen() {
  const [tournTab, setTournTab] = useState<"upcoming" | "results">("upcoming");

  const upcomingTournaments = TOURNAMENTS.filter(t => t.status !== "completed");
  const pastTournaments     = TOURNAMENTS.filter(t => t.status === "completed");
  const displayTournaments  = tournTab === "upcoming" ? upcomingTournaments : pastTournaments;

  const totalPoints = TOURNAMENTS.reduce((sum, t) => sum + (t.pointsEarned ?? 0), 0);

  return (
    <div style={{ width: 390, height: 1080, overflowY: "auto", background: BG, fontFamily: "Inter, sans-serif", position: "relative" }}>
      {/* Header gradient */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 240, background: "linear-gradient(135deg, #001A50, #000D30)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 240, background: `linear-gradient(135deg, ${BLUE}22, transparent)`, zIndex: 0 }} />
      <div style={{ position: "absolute", top: -20, right: -20, zIndex: 0 }}>
        <VolleyBall size={180} color="rgba(255,255,255,0.025)" />
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: "52px 16px 32px" }}>

        {/* Page header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>My Club Hub</div>
            <div style={{ fontSize: 13, color: "rgba(232,236,245,0.6)", fontFamily: "Inter", marginTop: 2 }}>Junior Club Volleyball</div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: `${BLUE}20`, border: `1px solid ${BLUE}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <NetIcon size={20} color={BLUE} />
          </div>
        </div>

        {/* USAV bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(191,13,62,0.08)", border: "1px solid rgba(191,13,62,0.2)", borderRadius: 20, padding: "5px 12px", width: "fit-content", marginBottom: 18 }}>
          <VolleyBall size={10} color={ACCENT} />
          <span style={{ fontSize: 11, color: ACCENT, fontFamily: "Inter", fontWeight: 600 }}>USA Volleyball Junior Club Affiliate</span>
        </div>

        {/* ── Club Identity Card ────────────────────────── */}
        <div style={{ borderRadius: 18, padding: 16, marginBottom: 18, border: `1px solid ${BLUE}25`, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${BLUE}18, rgba(0,31,91,0.35))` }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${BLUE}20`, border: `1.5px solid ${BLUE}45`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 14, color: BLUE, fontFamily: "Inter", fontWeight: 700 }}>MLB</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>Mizuno Long Beach</div>
                <div style={{ fontSize: 12, color: "rgba(232,236,245,0.65)", fontFamily: "Inter", marginTop: 3 }}>17U · Southern California</div>
              </div>
              <div style={{ background: "rgba(191,13,62,0.12)", border: "1px solid rgba(191,13,62,0.25)", borderRadius: 10, padding: "4px 10px" }}>
                <span style={{ fontSize: 11, color: ACCENT, fontFamily: "Inter", fontWeight: 600 }}>Junior Player</span>
              </div>
            </div>

            {/* Stat strip */}
            <div style={{ display: "flex", alignItems: "center", background: "rgba(0,0,0,0.2)", borderRadius: 12, padding: "11px 0" }}>
              {[
                { val: "3",          label: "Upcoming" },
                { val: "1",          label: "Qualified" },
                { val: "1",          label: "Completed" },
                { val: `${totalPoints}`, label: "USAV Pts" },
              ].map((s, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, borderRight: i < 3 ? `1px solid rgba(255,255,255,0.07)` : "none" }}>
                  <span style={{ fontSize: 19, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>{s.val}</span>
                  <span style={{ fontSize: 10, color: MUTED, fontFamily: "Inter" }}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Season progress */}
            <div style={{ marginTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: "rgba(232,236,245,0.7)", fontFamily: "Inter", fontWeight: 500 }}>Season Progress</span>
                <span style={{ fontSize: 12, color: BLUE, fontFamily: "Inter", fontWeight: 600 }}>75% · {totalPoints} pts</span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: 6, borderRadius: 3, width: "75%", background: `linear-gradient(to right, ${BLUE}, ${BLUE}70)` }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                <span style={{ fontSize: 10, color: MUTED, fontFamily: "Inter" }}>Season start</span>
                <span style={{ fontSize: 10, color: MUTED, fontFamily: "Inter" }}>Girls JNCs · Jun 26</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tournaments ───────────────────────────────── */}
        <div style={{ marginBottom: 20 }}>
          {/* Section header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <NetIcon size={16} color={ACCENT} />
              <span style={{ fontSize: 15, color: TEXT, fontFamily: "Inter", fontWeight: 600 }}>Club Tournaments</span>
            </div>
            <div style={{ background: "rgba(191,13,62,0.12)", border: "1px solid rgba(191,13,62,0.2)", borderRadius: 10, padding: "2px 8px" }}>
              <span style={{ fontSize: 11, color: ACCENT, fontFamily: "Inter", fontWeight: 600 }}>{TOURNAMENTS.length}</span>
            </div>
          </div>

          {/* Upcoming / Results toggle */}
          <div style={{ display: "flex", background: CARD, borderRadius: 12, padding: 3, marginBottom: 14, border: `1px solid ${BORDER}` }}>
            {(["upcoming", "results"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setTournTab(tab)}
                style={{
                  flex: 1, padding: "8px 0", borderRadius: 10, border: "none", cursor: "pointer",
                  background: tournTab === tab ? BLUE : "transparent",
                  color: tournTab === tab ? "#fff" : MUTED,
                  fontSize: 13, fontFamily: "Inter", fontWeight: 600,
                  transition: "all 0.15s",
                }}
              >
                {tab === "upcoming" ? `Upcoming (${upcomingTournaments.length})` : `Results (${pastTournaments.length})`}
              </button>
            ))}
          </div>

          {displayTournaments.length === 0 ? (
            <div style={{ padding: "24px 0", textAlign: "center" }}>
              <VolleyBall size={32} color={MUTED} />
              <div style={{ fontSize: 14, color: MUTED, fontFamily: "Inter", marginTop: 10 }}>
                {tournTab === "results" ? "No completed tournaments yet" : "No upcoming tournaments"}
              </div>
            </div>
          ) : (
            displayTournaments.map(t => <TournamentCard key={t.id} t={t} tab={tournTab} />)
          )}
        </div>

        {/* ── Event Tickets ─────────────────────────────── */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <Ticket size={16} color={ACCENT} />
              <span style={{ fontSize: 15, color: TEXT, fontFamily: "Inter", fontWeight: 600 }}>Event Tickets</span>
            </div>
            <div style={{ background: "rgba(191,13,62,0.12)", border: "1px solid rgba(191,13,62,0.2)", borderRadius: 10, padding: "2px 8px" }}>
              <span style={{ fontSize: 11, color: ACCENT, fontFamily: "Inter", fontWeight: 600 }}>{TICKETS.length}</span>
            </div>
          </div>
          {TICKETS.map(tk => <TicketCard key={tk.id} tk={tk} />)}

          {/* Browse more */}
          <div style={{ background: `${BLUE}0D`, border: `1px dashed ${BLUE}35`, borderRadius: 14, padding: 14, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", marginTop: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${BLUE}18`, border: `1px solid ${BLUE}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
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

        {/* ── Fan Hub ───────────────────────────────────── */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
            <VolleyBall size={16} color={ACCENT} />
            <span style={{ fontSize: 15, color: TEXT, fontFamily: "Inter", fontWeight: 600 }}>Fan Hub</span>
          </div>
          <p style={{ fontSize: 13, color: MUTED, fontFamily: "Inter", lineHeight: "18px", margin: "0 0 12px" }}>
            Follow your path from junior club all the way to the national team.
          </p>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
            {FAN_PATHWAY.map(item => (
              <div key={item.label} style={{ width: 126, background: CARD, borderRadius: 14, padding: 13, gap: 6, border: `1px solid ${item.color}35`, display: "flex", flexDirection: "column", cursor: "pointer", flexShrink: 0 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: item.color }} />
                <span style={{ fontSize: 13, color: item.color, fontFamily: "Inter", fontWeight: 600 }}>{item.label}</span>
                <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter", lineHeight: "15px" }}>{item.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Teammates ─────────────────────────────────── */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
            <Users size={16} color={ACCENT} />
            <span style={{ fontSize: 15, color: TEXT, fontFamily: "Inter", fontWeight: 600 }}>Teammates</span>
            <div style={{ background: "rgba(191,13,62,0.12)", border: "1px solid rgba(191,13,62,0.2)", borderRadius: 10, padding: "2px 8px", marginLeft: "auto" }}>
              <span style={{ fontSize: 11, color: ACCENT, fontFamily: "Inter", fontWeight: 600 }}>12</span>
            </div>
          </div>
          <div style={{ background: CARD, borderRadius: 18, padding: 16, border: `1px solid ${BORDER}` }}>
            <div style={{ display: "flex", marginBottom: 10 }}>
              {["AR", "BR", "CJ", "DL", "EK", "FM"].map((initials, i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: 18, background: `${BLUE}22`, border: `2px solid ${BG}`, marginLeft: i > 0 ? -8 : 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 10, color: BLUE, fontFamily: "Inter", fontWeight: 700 }}>{initials}</span>
                </div>
              ))}
              <div style={{ width: 36, height: 36, borderRadius: 18, background: "rgba(255,255,255,0.06)", border: `2px solid ${BG}`, marginLeft: -8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 9, color: MUTED, fontFamily: "Inter", fontWeight: 600 }}>+6</span>
              </div>
            </div>
            <div style={{ fontSize: 13, color: TEXT, fontFamily: "Inter", fontWeight: 600, marginBottom: 3 }}>Mizuno Long Beach — 17U</div>
            <div style={{ fontSize: 12, color: MUTED, fontFamily: "Inter", marginBottom: 12 }}>12 players registered · Long Beach, CA</div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1, background: `${BLUE}15`, borderRadius: 10, padding: "8px 12px", border: `1px solid ${BLUE}25`, cursor: "pointer", textAlign: "center" as const }}>
                <span style={{ fontSize: 12, color: BLUE, fontFamily: "Inter", fontWeight: 600 }}>View Roster</span>
              </div>
              <div style={{ flex: 1, background: "rgba(191,13,62,0.1)", borderRadius: 10, padding: "8px 12px", border: "1px solid rgba(191,13,62,0.22)", cursor: "pointer", textAlign: "center" as const }}>
                <span style={{ fontSize: 12, color: ACCENT, fontFamily: "Inter", fontWeight: 600 }}>Club Updates</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
