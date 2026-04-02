import { MapPin, Clock, Bell, ChevronRight, Calendar, Trophy } from "lucide-react";
import { useState } from "react";

const BG     = "#000D2E";
const CARD   = "#060E2C";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT   = "#E8ECF5";
const MUTED  = "#6B7A9F";
const ACCENT = "#BF0D3E";
const LIVE_RED = "#E84855";
const SURFACE = "#0A1535";

function VolleyBall({ size = 24, color = "rgba(255,255,255,0.12)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
      <path d="M12 2 C12 2 8 6 8 12 C8 18 12 22 12 22" stroke={color} strokeWidth="1.5" />
      <path d="M2 12 C2 12 6 8 12 8 C18 8 22 12 22 12" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────────

type Status = "live" | "upcoming" | "finished";

type Match = {
  home: string; homeCode: string; homeIsUSA?: boolean;
  away: string; awayCode: string; awayIsUSA?: boolean;
  homeScore?: number; awayScore?: number;
  status: Status;
  tournament: string; disc: string; discColor: string;
  time?: string; date?: string;
  set?: number; setScores?: string;
  venue: string; venueFlag: string; city: string;
};

const MATCHES: Match[] = [
  // Live
  { home: "Brazil",  homeCode: "BRA", away: "Italy",   awayCode: "ITA", homeScore: 3, awayScore: 1, status: "live",
    tournament: "VNL 2026", disc: "Men's",   discColor: "#3A7BF5",
    set: 4, setScores: "25-22, 23-25, 25-19, 19-16",
    venue: "Atlas Arena", venueFlag: "🇵🇱", city: "Łódź, Poland" },

  { home: "Egonu / Pietrini", homeCode: "ITA", away: "Ross / Klineman", awayCode: "USA", awayIsUSA: true,
    homeScore: 1, awayScore: 2, status: "live",
    tournament: "Beach Pro Tour Elite16", disc: "Beach", discColor: "#F5A623",
    set: 3, setScores: "21-19, 18-21, 14-12",
    venue: "Aspire Arena", venueFlag: "🇶🇦", city: "Doha, Qatar" },

  // Upcoming — USA
  { home: "USA",    homeCode: "USA", homeIsUSA: true, away: "France", awayCode: "FRA",
    status: "upcoming", tournament: "VNL 2026", disc: "Men's", discColor: "#3A7BF5",
    time: "18:00 UTC", date: "Sat, Jun 14",
    venue: "Ergo Arena", venueFlag: "🇵🇱", city: "Gdańsk, Poland" },

  // More upcoming
  { home: "Serbia", homeCode: "SRB", away: "Turkey", awayCode: "TUR",
    status: "upcoming", tournament: "VNL 2026", disc: "Women's", discColor: "#E04E8A",
    time: "15:00 UTC", date: "Sat, Jun 14",
    venue: "Cotai Arena", venueFlag: "🇨🇳", city: "Macau, China" },

  { home: "USA",    homeCode: "USA", homeIsUSA: true, away: "China", awayCode: "CHN",
    status: "upcoming", tournament: "VNL 2026", disc: "Women's", discColor: "#E04E8A",
    time: "20:30 UTC", date: "Sat, Jun 14",
    venue: "Cotai Arena", venueFlag: "🇨🇳", city: "Macau, China" },

  { home: "Netherlands", homeCode: "NED", away: "Poland", awayCode: "POL",
    status: "upcoming", tournament: "VNL 2026", disc: "Men's", discColor: "#3A7BF5",
    time: "21:00 UTC", date: "Sat, Jun 14",
    venue: "Ergo Arena", venueFlag: "🇵🇱", city: "Gdańsk, Poland" },

  // Finished
  { home: "Poland", homeCode: "POL", away: "Japan", awayCode: "JPN", homeScore: 3, awayScore: 0,
    status: "finished", tournament: "VNL 2026", disc: "Men's", discColor: "#3A7BF5",
    venue: "Atlas Arena", venueFlag: "🇵🇱", city: "Łódź, Poland" },

  { home: "Netherlands", homeCode: "NED", away: "China", awayCode: "CHN", homeScore: 2, awayScore: 3,
    status: "finished", tournament: "VNL 2026", disc: "Women's", discColor: "#E04E8A",
    venue: "Cotai Arena", venueFlag: "🇨🇳", city: "Macau, China" },
];

type Tournament = {
  name: string; short: string; disc: string; discColor: string;
  phase: string; flag: string; city: string; status: "active" | "upcoming";
  usaIn: boolean;
};

const TOURNAMENTS: Tournament[] = [
  { name: "Volleyball Nations League 2026", short: "VNL 2026 — Men's",   disc: "Men's",   discColor: "#3A7BF5", phase: "Week 3 of 5", flag: "🇵🇱", city: "Gdańsk, Poland",  status: "active",   usaIn: true  },
  { name: "Volleyball Nations League 2026", short: "VNL 2026 — Women's", disc: "Women's", discColor: "#E04E8A", phase: "Week 3 of 5", flag: "🇨🇳", city: "Macau, China",    status: "active",   usaIn: true  },
  { name: "Beach Pro Tour Elite16",         short: "Beach Pro Tour",      disc: "Beach",   discColor: "#F5A623", phase: "Quarterfinals", flag: "🇶🇦", city: "Doha, Qatar",  status: "active",   usaIn: true  },
  { name: "FIVB World Championship Qual.",  short: "World Ch. Qualifiers",disc: "Men's",   discColor: "#3A7BF5", phase: "Pool Play",   flag: "🌍", city: "Various",       status: "upcoming", usaIn: false },
  { name: "NCAA Championships",            short: "NCAA Championships",   disc: "NCAA ♀",  discColor: "#9B59B6", phase: "Regionals",  flag: "🇺🇸", city: "Kansas City",   status: "upcoming", usaIn: false },
];

// ── USA next match hero ────────────────────────────────────────────────────────
function UsaNextMatch() {
  const [reminded, setReminded] = useState(false);
  const next = MATCHES.find(m => m.status === "upcoming" && (m.homeIsUSA || m.awayIsUSA) && m.disc === "Men's")!;
  const usaHome = !!next.homeIsUSA;
  const opponent = usaHome ? next.away : next.home;
  const oppCode  = usaHome ? next.awayCode : next.homeCode;
  const usaForm = ["W","W","L","W","W"];

  return (
    <div style={{ borderRadius: 22, marginBottom: 20, overflow: "hidden", border: `1.5px solid ${ACCENT}40`, position: "relative", cursor: "pointer" }}>
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg, #200010, #001240)" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${ACCENT}25, transparent 60%)` }} />
      <div style={{ position: "absolute", right: -30, bottom: -30, opacity: 0.35 }}>
        <VolleyBall size={200} color={`${ACCENT}20`} />
      </div>

      <div style={{ position: "relative", padding: "16px 18px 18px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, background: `${ACCENT}22`, border: `1px solid ${ACCENT}40`, borderRadius: 20, padding: "5px 12px" }}>
            <span style={{ fontSize: 10, color: "#fff", fontFamily: "Inter", fontWeight: 800 }}>🇺🇸 USA'S NEXT MATCH</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Calendar size={11} color={MUTED} />
            <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>{next.date}</span>
          </div>
        </div>

        {/* Teams */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          {/* USA side */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: `${ACCENT}30`, border: `2px solid ${ACCENT}60`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", fontFamily: "Inter" }}>USA</span>
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>United States</span>
            <div style={{ display: "flex", gap: 3 }}>
              {usaForm.map((f, i) => (
                <div key={i} style={{ width: 16, height: 16, borderRadius: 4, background: f === "W" ? "rgba(45,197,121,0.25)" : "rgba(232,72,85,0.2)", border: `1px solid ${f === "W" ? "rgba(45,197,121,0.5)" : "rgba(232,72,85,0.4)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 8, fontWeight: 700, color: f === "W" ? "#2DC579" : "#E84855", fontFamily: "Inter" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Center */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: "rgba(232,236,245,0.5)", fontFamily: "Inter", letterSpacing: 3 }}>VS</span>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Clock size={11} color={ACCENT} />
              <span style={{ fontSize: 12, color: ACCENT, fontFamily: "Inter", fontWeight: 600 }}>{next.time}</span>
            </div>
          </div>

          {/* Opponent side */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(91,141,239,0.15)", border: "1.5px solid rgba(91,141,239,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#5B8DEF", fontFamily: "Inter" }}>{oppCode}</span>
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>{opponent}</span>
            <div style={{ display: "flex", gap: 3 }}>
              {["L","W","W","L","W"].map((f, i) => (
                <div key={i} style={{ width: 16, height: 16, borderRadius: 4, background: f === "W" ? "rgba(45,197,121,0.18)" : "rgba(232,72,85,0.15)", border: `1px solid ${f === "W" ? "rgba(45,197,121,0.35)" : "rgba(232,72,85,0.3)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 8, fontWeight: 700, color: f === "W" ? "#2DC579" : "#E84855", fontFamily: "Inter" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Venue row */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(0,0,0,0.3)", borderRadius: 12, padding: "9px 12px", marginBottom: 14, border: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontSize: 16 }}>{next.venueFlag}</span>
          <MapPin size={12} color={MUTED} />
          <span style={{ fontSize: 13, color: TEXT, fontFamily: "Inter", fontWeight: 600 }}>{next.venue}</span>
          <span style={{ fontSize: 12, color: MUTED, fontFamily: "Inter" }}>· {next.city}</span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: "#3A7BF5" }} />
            <span style={{ fontSize: 11, color: "#3A7BF5", fontFamily: "Inter", fontWeight: 600 }}>{next.disc}</span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => setReminded(!reminded)}
          style={{ width: "100%", padding: "13px 0", borderRadius: 14, border: "none", cursor: "pointer", background: reminded ? "rgba(45,197,121,0.15)" : ACCENT, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s" }}
        >
          <Bell size={15} color={reminded ? "#2DC579" : "#fff"} fill={reminded ? "#2DC579" : "none"} />
          <span style={{ fontSize: 14, fontWeight: 700, color: reminded ? "#2DC579" : "#fff", fontFamily: "Inter" }}>{reminded ? "Reminder set ✓" : "Set match reminder"}</span>
        </button>
      </div>
    </div>
  );
}

// ── Tournament pills strip ─────────────────────────────────────────────────────
function TournamentStrip() {
  const [selected, setSelected] = useState(0);
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 13, color: MUTED, fontFamily: "Inter", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" as const }}>Active Competitions</span>
        <div style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
          <span style={{ fontSize: 12, color: ACCENT, fontFamily: "Inter", fontWeight: 600 }}>All</span>
          <ChevronRight size={13} color={ACCENT} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, overflowX: "auto", scrollbarWidth: "none" }}>
        {TOURNAMENTS.map((t, i) => (
          <div
            key={i}
            onClick={() => setSelected(i)}
            style={{ flexShrink: 0, background: selected === i ? `${t.discColor}20` : CARD, border: `1px solid ${selected === i ? t.discColor + "50" : BORDER}`, borderRadius: 16, padding: "11px 14px", cursor: "pointer", minWidth: 155 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 7 }}>
              <div style={{ width: 7, height: 7, borderRadius: 3.5, background: t.status === "active" ? "#2DC579" : MUTED, flexShrink: 0 }} />
              <span style={{ fontSize: 9, color: t.status === "active" ? "#2DC579" : MUTED, fontFamily: "Inter", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" as const }}>{t.status === "active" ? "Active" : "Upcoming"}</span>
              {t.usaIn && <span style={{ fontSize: 8, color: ACCENT, fontFamily: "Inter", fontWeight: 700, marginLeft: "auto", background: `${ACCENT}18`, border: `1px solid ${ACCENT}30`, borderRadius: 6, padding: "1px 5px" }}>🇺🇸 USA</span>}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: TEXT, fontFamily: "Inter", lineHeight: "17px", marginBottom: 5 }}>{t.short}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 14 }}>{t.flag}</span>
              <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>{t.city}</span>
            </div>
            <div style={{ marginTop: 6 }}>
              <span style={{ fontSize: 10, color: t.discColor, fontFamily: "Inter", fontWeight: 600 }}>{t.phase}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Match row ──────────────────────────────────────────────────────────────────
function MatchRow({ match }: { match: Match }) {
  const isLive     = match.status === "live";
  const isUpcoming = match.status === "upcoming";
  const isUSA      = match.homeIsUSA || match.awayIsUSA;
  const accentColor = isLive ? LIVE_RED : isUSA ? ACCENT : match.discColor;

  return (
    <div style={{ background: CARD, borderRadius: 18, padding: "13px 14px", marginBottom: 10, border: `1px solid ${isUSA && isUpcoming ? ACCENT + "35" : isLive ? LIVE_RED + "30" : BORDER}`, overflow: "hidden", position: "relative", cursor: "pointer" }}>
      {isUSA && isUpcoming && <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${ACCENT}08, transparent)` }} />}
      {isLive && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(232,72,85,0.06), transparent)" }} />}
      {isUSA && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: ACCENT, borderRadius: "0 2px 2px 0" }} />}

      <div style={{ position: "relative" }}>
        {/* Meta row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" as const }}>
            <Trophy size={10} color={match.discColor} />
            <span style={{ fontSize: 10, color: match.discColor, fontFamily: "Inter", fontWeight: 600 }}>{match.tournament}</span>
            <span style={{ fontSize: 10, color: MUTED }}>·</span>
            <span style={{ fontSize: 13 }}>{match.venueFlag}</span>
            <span style={{ fontSize: 10, color: MUTED, fontFamily: "Inter" }}>{match.city}</span>
          </div>
          {isLive ? (
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(232,72,85,0.15)", border: "1px solid rgba(232,72,85,0.35)", borderRadius: 20, padding: "3px 9px", flexShrink: 0 }}>
              <div style={{ width: 5, height: 5, borderRadius: 2.5, background: LIVE_RED }} />
              <span style={{ fontSize: 9, color: LIVE_RED, fontFamily: "Inter", fontWeight: 700, letterSpacing: 1 }}>LIVE</span>
            </div>
          ) : isUpcoming ? (
            <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(91,141,239,0.1)", border: "1px solid rgba(91,141,239,0.25)", borderRadius: 10, padding: "3px 8px", flexShrink: 0 }}>
              <span style={{ fontSize: 10, color: "#5B8DEF", fontFamily: "Inter", fontWeight: 600 }}>{match.date}</span>
            </div>
          ) : (
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 6, padding: "3px 8px" }}>
              <span style={{ fontSize: 9, color: MUTED, fontFamily: "Inter", fontWeight: 700, letterSpacing: 1 }}>FINAL</span>
            </div>
          )}
        </div>

        {/* Teams + score */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Home */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: match.homeIsUSA ? `${ACCENT}25` : `${match.discColor}15`, border: `1.5px solid ${match.homeIsUSA ? ACCENT + "50" : match.discColor + "30"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: match.homeIsUSA ? ACCENT : match.discColor, fontFamily: "Inter" }}>{match.homeCode}</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: match.homeIsUSA ? 700 : 600, color: match.homeIsUSA ? TEXT : "rgba(232,236,245,0.85)", fontFamily: "Inter", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{match.home}</span>
          </div>

          {/* Score / vs */}
          <div style={{ width: 70, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, flexShrink: 0 }}>
            {isUpcoming ? (
              <>
                <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(232,236,245,0.4)", fontFamily: "Inter", letterSpacing: 2 }}>VS</span>
                <span style={{ fontSize: 10, color: accentColor, fontFamily: "Inter" }}>{match.time}</span>
              </>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 22, fontWeight: 700, color: !isLive && (match.homeScore ?? 0) > (match.awayScore ?? 0) ? TEXT : "rgba(232,236,245,0.55)", fontFamily: "Inter" }}>{match.homeScore}</span>
                <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>–</span>
                <span style={{ fontSize: 22, fontWeight: 700, color: !isLive && (match.awayScore ?? 0) > (match.homeScore ?? 0) ? TEXT : "rgba(232,236,245,0.55)", fontFamily: "Inter" }}>{match.awayScore}</span>
              </div>
            )}
          </div>

          {/* Away */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: match.awayIsUSA ? 700 : 600, color: match.awayIsUSA ? TEXT : "rgba(232,236,245,0.85)", fontFamily: "Inter", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "right" }}>{match.away}</span>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: match.awayIsUSA ? `${ACCENT}25` : `${match.discColor}15`, border: `1.5px solid ${match.awayIsUSA ? ACCENT + "50" : match.discColor + "30"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: match.awayIsUSA ? ACCENT : match.discColor, fontFamily: "Inter" }}>{match.awayCode}</span>
            </div>
          </div>
        </div>

        {/* Live set info */}
        {isLive && match.set && (
          <div style={{ marginTop: 8, padding: "6px 10px", background: "rgba(232,72,85,0.08)", borderRadius: 10, border: "1px solid rgba(232,72,85,0.15)", display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 5, height: 5, borderRadius: 2.5, background: LIVE_RED }} />
            <span style={{ fontSize: 11, color: LIVE_RED, fontFamily: "Inter", fontWeight: 600 }}>Set {match.set}</span>
            {match.setScores && <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>· {match.setScores}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main screen ─────────────────────────────────────────────────────────────────
export function MatchesScreen() {
  const [tab, setTab] = useState<"all" | "live" | "upcoming" | "results">("all");

  const filtered = MATCHES.filter(m => {
    if (tab === "all") return true;
    if (tab === "live") return m.status === "live";
    if (tab === "upcoming") return m.status === "upcoming";
    return m.status === "finished";
  });

  const liveCount = MATCHES.filter(m => m.status === "live").length;

  const liveSec     = filtered.filter(m => m.status === "live");
  const upcomingSec = filtered.filter(m => m.status === "upcoming");
  const finishedSec = filtered.filter(m => m.status === "finished");

  return (
    <div style={{ width: 390, height: 844, overflowY: "auto", background: BG, fontFamily: "Inter, sans-serif", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220, background: "linear-gradient(135deg, #1A000A, #001240)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220, background: "linear-gradient(225deg, rgba(191,13,62,0.25), transparent)", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, padding: "52px 16px 24px" }}>

        {/* ── Header ─────────────────────────────────────── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: TEXT, fontFamily: "Inter", letterSpacing: -0.5 }}>Matches</div>
            <div style={{ fontSize: 13, color: "rgba(232,236,245,0.6)", fontFamily: "Inter", marginTop: 3 }}>International competitions · Live & Upcoming</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(232,72,85,0.15)", border: "1px solid rgba(232,72,85,0.35)", borderRadius: 20, padding: "6px 12px", flexShrink: 0 }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: LIVE_RED }} />
            <span style={{ fontSize: 11, color: LIVE_RED, fontFamily: "Inter", fontWeight: 700 }}>{liveCount} LIVE</span>
          </div>
        </div>

        {/* ── Status tabs ─────────────────────────────────── */}
        <div style={{ display: "flex", background: CARD, borderRadius: 14, padding: 3, marginBottom: 20, border: `1px solid ${BORDER}` }}>
          {(["all","live","upcoming","results"] as const).map(key => {
            const label = key === "all" ? "All" : key === "live" ? `🔴 Live (${liveCount})` : key === "upcoming" ? "Upcoming" : "Results";
            const active = tab === key;
            const color  = key === "live" ? LIVE_RED : ACCENT;
            return (
              <button key={key} onClick={() => setTab(key)} style={{ flex: 1, padding: "8px 0", borderRadius: 11, border: "none", cursor: "pointer", background: active ? (key === "live" ? "rgba(232,72,85,0.25)" : ACCENT) : "transparent", color: active ? (key === "live" ? LIVE_RED : "#fff") : MUTED, fontSize: 11, fontFamily: "Inter", fontWeight: 700, whiteSpace: "nowrap" as const }}>
                {label}
              </button>
            );
          })}
        </div>

        {/* ── USA next match hero ─────────────────────────── */}
        {(tab === "all" || tab === "upcoming") && <UsaNextMatch />}

        {/* ── Tournament strip ────────────────────────────── */}
        {(tab === "all") && <TournamentStrip />}

        {/* ── Match sections ──────────────────────────────── */}
        {liveSec.length > 0 && (
          <div style={{ marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: LIVE_RED }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: LIVE_RED, fontFamily: "Inter", letterSpacing: "0.8px", textTransform: "uppercase" as const }}>Live Now</span>
            </div>
            {liveSec.map((m, i) => <MatchRow key={i} match={m} />)}
          </div>
        )}

        {upcomingSec.length > 0 && (
          <div style={{ marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12, marginTop: liveSec.length > 0 ? 8 : 0 }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: "#5B8DEF" }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(232,236,245,0.65)", fontFamily: "Inter", letterSpacing: "0.8px", textTransform: "uppercase" as const }}>Upcoming</span>
            </div>
            {upcomingSec.map((m, i) => <MatchRow key={i} match={m} />)}
          </div>
        )}

        {finishedSec.length > 0 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12, marginTop: upcomingSec.length > 0 ? 8 : 0 }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: MUTED }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(232,236,245,0.65)", fontFamily: "Inter", letterSpacing: "0.8px", textTransform: "uppercase" as const }}>Results</span>
            </div>
            {finishedSec.map((m, i) => <MatchRow key={i} match={m} />)}
          </div>
        )}
      </div>
    </div>
  );
}
