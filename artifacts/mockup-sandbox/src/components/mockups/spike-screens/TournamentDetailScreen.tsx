import { ChevronLeft, MapPin, Calendar, Trophy, Users, ExternalLink, Ticket, CheckCircle, AlertCircle, Clock, Share2 } from "lucide-react";

const BG = "#000D2E";
const CARD = "#060E2C";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT = "#E8ECF5";
const MUTED = "#6B7A9F";
const ACCENT = "#BF0D3E";
const SUCCESS = "#2DC579";
const BLUE = "#3A7BF5";
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

// ── Mock data: Girls JNCs (qualified tournament) ──────────────────────────────

const TOURNAMENT = {
  shortName: "Girls JNCs",
  fullName: "USA Volleyball Girls Junior National Championships",
  division: "18 Open",
  ageGroup: "18U",
  status: "qualified" as const,
  dateRange: "Jun 26 – Jul 5, 2026",
  location: "Indianapolis, IN",
  venue: "Indiana Convention Center",
  usavCode: "26GJNC",
  format: "Pool Play + Gold/Silver Bracket",
  totalTeams: 48,
  teamResult: "Pool A – 2nd Place",
  poolRecord: "4-1",
  pointsEarned: 820,
  pointsPossible: 1000,
  teamName: "Mizuno Long Beach 17 National",
};

const POOL_RESULTS = [
  { opponent: "A5 Georgia 18 Elite",    result: "W", score: "25-21, 25-18", pts: 180 },
  { opponent: "Skyline Chicago 18 N",   result: "W", score: "25-23, 22-25, 15-12", pts: 160 },
  { opponent: "Empire State 18 Natl",   result: "W", score: "25-19, 25-17", pts: 180 },
  { opponent: "Rocky Mountain 18 E",    result: "W", score: "22-25, 25-23, 15-10", pts: 160 },
  { opponent: "NorCal Volleyball 18 N", result: "L", score: "23-25, 25-22, 12-15", pts: 140 },
];

const TICKET_OPTIONS = [
  { session: "Session 1 — Pool Play",   date: "Jun 26, 2026", time: "8:00 AM", price: "$25", status: "purchased", section: "Section 114, Row C, Seat 7" },
  { session: "Session 2 — Pool Play",   date: "Jun 27, 2026", time: "8:00 AM", price: "$25", status: "available" },
  { session: "Gold Medal – Bracket",    date: "Jul 4, 2026",  time: "10:00 AM", price: "$40", status: "available" },
  { session: "Championship Finals",     date: "Jul 5, 2026",  time: "2:00 PM",  price: "$55", status: "soldout" },
];

const CHECKLIST = [
  { item: "Team registration complete",     done: true  },
  { item: "USAV membership verified",       done: true  },
  { item: "Pool assignment confirmed",       done: true  },
  { item: "Hotel block reserved",           done: false },
  { item: "Travel arrangements confirmed",  done: false },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: "qualified" | "upcoming" | "registered" | "completed" }) {
  const cfg = {
    qualified:  { label: "Qualified",  color: SUCCESS, bg: "rgba(45,197,121,0.15)", border: `${SUCCESS}40` },
    upcoming:   { label: "Upcoming",   color: "#F5A623", bg: "rgba(245,166,35,0.12)", border: "#F5A62340" },
    registered: { label: "Registered", color: BLUE,    bg: "rgba(58,123,245,0.12)", border: `${BLUE}40` },
    completed:  { label: "Completed",  color: MUTED,   bg: "rgba(107,122,159,0.1)", border: `${MUTED}30` },
  }[status];
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 20, padding: "5px 12px" }}>
      <div style={{ width: 6, height: 6, borderRadius: 3, background: cfg.color }} />
      <span style={{ fontSize: 12, color: cfg.color, fontFamily: "Inter", fontWeight: 700 }}>{cfg.label}</span>
    </div>
  );
}

function MapPlaceholder() {
  return (
    <div style={{ height: 130, borderRadius: 14, overflow: "hidden", position: "relative", background: "#0A1535", border: `1px solid ${BORDER}`, marginBottom: 12 }}>
      {/* Stylised map grid */}
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 20} x2="100%" y2={i * 20} stroke="rgba(58,123,245,0.08)" strokeWidth="1" />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 22} y1="0" x2={i * 22} y2="100%" stroke="rgba(58,123,245,0.08)" strokeWidth="1" />
        ))}
        {/* Roads */}
        <rect x="0" y="55" width="100%" height="8" rx="0" fill="rgba(58,123,245,0.12)" />
        <rect x="130" y="0" width="8" height="100%" rx="0" fill="rgba(58,123,245,0.10)" />
        <rect x="230" y="0" width="8" height="100%" rx="0" fill="rgba(58,123,245,0.08)" />
        {/* Venue block */}
        <rect x="150" y="30" width="70" height="50" rx="6" fill="rgba(58,123,245,0.22)" stroke="rgba(58,123,245,0.5)" strokeWidth="1.5" />
      </svg>
      {/* Pin */}
      <div style={{ position: "absolute", left: "50%", top: "38%", transform: "translate(-50%, -100%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 28, height: 28, borderRadius: 14, background: ACCENT, border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(191,13,62,0.5)" }}>
          <MapPin size={14} color="white" />
        </div>
        <div style={{ width: 2, height: 8, background: ACCENT }} />
      </div>
      {/* Label */}
      <div style={{ position: "absolute", bottom: 10, left: 10, background: "rgba(6,14,44,0.9)", borderRadius: 8, padding: "5px 10px", backdropFilter: "blur(4px)" }}>
        <div style={{ fontSize: 11, color: TEXT, fontFamily: "Inter", fontWeight: 600 }}>Indiana Convention Center</div>
        <div style={{ fontSize: 10, color: MUTED, fontFamily: "Inter" }}>100 S Capitol Ave, Indianapolis, IN</div>
      </div>
      <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(6,14,44,0.8)", borderRadius: 8, padding: "5px 8px", display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
        <ExternalLink size={11} color={BLUE} />
        <span style={{ fontSize: 10, color: BLUE, fontFamily: "Inter", fontWeight: 600 }}>Directions</span>
      </div>
    </div>
  );
}

function PoolResultRow({ r }: { r: typeof POOL_RESULTS[0] }) {
  const isWin = r.result === "W";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, paddingVertical: 8, padding: "8px 0", borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ width: 22, height: 22, borderRadius: 6, background: isWin ? "rgba(45,197,121,0.18)" : "rgba(232,72,85,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: isWin ? SUCCESS : "#E84855", fontFamily: "Inter" }}>{r.result}</span>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, color: TEXT, fontFamily: "Inter", fontWeight: 600 }}>{r.opponent}</div>
        <div style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>{r.score}</div>
      </div>
      <span style={{ fontSize: 12, color: isWin ? SUCCESS : MUTED, fontFamily: "Inter", fontWeight: 600 }}>{r.pts} pts</span>
    </div>
  );
}

function TicketRow({ tk }: { tk: typeof TICKET_OPTIONS[0] }) {
  const isBought  = tk.status === "purchased";
  const isSoldOut = tk.status === "soldout";
  const priceColor = isBought ? SUCCESS : isSoldOut ? MUTED : TEXT;

  return (
    <div style={{ background: isBought ? `${SUCCESS}09` : CARD, borderRadius: 14, padding: 14, marginBottom: 8, border: isBought ? `1px solid ${SUCCESS}28` : `1px solid ${BORDER}`, overflow: "hidden", position: "relative" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: TEXT, fontFamily: "Inter", fontWeight: 600, marginBottom: 4 }}>{tk.session}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: isBought ? 6 : 0 }}>
            <Calendar size={10} color={MUTED} />
            <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>{tk.date} · {tk.time}</span>
          </div>
          {isBought && (tk as any).section && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <CheckCircle size={10} color={SUCCESS} />
              <span style={{ fontSize: 11, color: SUCCESS, fontFamily: "Inter", fontWeight: 500 }}>{(tk as any).section}</span>
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
          <span style={{ fontSize: 18, color: priceColor, fontFamily: "Inter", fontWeight: 700 }}>{tk.price}</span>
          {isBought ? (
            <div style={{ background: "rgba(45,197,121,0.15)", border: `1px solid ${SUCCESS}35`, borderRadius: 8, padding: "4px 10px" }}>
              <span style={{ fontSize: 11, color: SUCCESS, fontFamily: "Inter", fontWeight: 600 }}>Purchased</span>
            </div>
          ) : isSoldOut ? (
            <div style={{ background: "rgba(107,122,159,0.1)", borderRadius: 8, padding: "4px 10px" }}>
              <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter", fontWeight: 600 }}>Sold Out</span>
            </div>
          ) : (
            <div style={{ background: ACCENT, borderRadius: 8, padding: "6px 14px", cursor: "pointer" }}>
              <span style={{ fontSize: 12, color: "#fff", fontFamily: "Inter", fontWeight: 700 }}>Get Tickets</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────────────

export function TournamentDetailScreen() {
  return (
    <div style={{ width: 390, height: 960, overflowY: "auto", background: BG, fontFamily: "Inter, sans-serif", position: "relative" }}>

      {/* Header gradient */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 200, background: "linear-gradient(135deg, #001840, #000D2E)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 200, background: `linear-gradient(135deg, ${SUCCESS}18, transparent)`, zIndex: 0 }} />
      <div style={{ position: "absolute", top: -20, right: -30, zIndex: 0 }}>
        <VolleyBall size={160} color="rgba(255,255,255,0.025)" />
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: "52px 16px 32px" }}>

        {/* ── Back nav ──────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <div style={{ width: 34, height: 34, borderRadius: 17, background: "rgba(255,255,255,0.07)", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronLeft size={18} color={TEXT} />
            </div>
            <span style={{ fontSize: 14, color: "rgba(232,236,245,0.7)", fontFamily: "Inter", fontWeight: 500 }}>My Club Hub</span>
          </div>
          <div style={{ width: 34, height: 34, borderRadius: 17, background: "rgba(255,255,255,0.07)", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Share2 size={15} color={TEXT} />
          </div>
        </div>

        {/* ── Tournament Hero ────────────────────────────── */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: `${SUCCESS}20`, border: `1.5px solid ${SUCCESS}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <VolleyBall size={28} color={SUCCESS} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: TEXT, fontFamily: "Inter", lineHeight: "26px", marginBottom: 4 }}>{TOURNAMENT.shortName}</div>
              <div style={{ fontSize: 12, color: MUTED, fontFamily: "Inter", lineHeight: "17px" }}>{TOURNAMENT.fullName}</div>
            </div>
          </div>

          <StatusBadge status={TOURNAMENT.status} />

          <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" as const }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: CARD, borderRadius: 10, padding: "7px 11px", border: `1px solid ${BORDER}` }}>
              <Calendar size={12} color={MUTED} />
              <span style={{ fontSize: 12, color: TEXT, fontFamily: "Inter", fontWeight: 500 }}>{TOURNAMENT.dateRange}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: CARD, borderRadius: 10, padding: "7px 11px", border: `1px solid ${BORDER}` }}>
              <MapPin size={12} color={MUTED} />
              <span style={{ fontSize: 12, color: TEXT, fontFamily: "Inter", fontWeight: 500 }}>{TOURNAMENT.location}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: CARD, borderRadius: 10, padding: "7px 11px", border: `1px solid ${BORDER}` }}>
              <Users size={12} color={MUTED} />
              <span style={{ fontSize: 12, color: TEXT, fontFamily: "Inter", fontWeight: 500 }}>{TOURNAMENT.totalTeams} teams</span>
            </div>
          </div>
        </div>

        {/* ── Your Team Card ────────────────────────────── */}
        <div style={{ borderRadius: 16, padding: 14, marginBottom: 20, border: `1px solid ${SUCCESS}30`, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${SUCCESS}12, transparent)` }} />
          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 11, color: SUCCESS, fontFamily: "Inter", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" as const, marginBottom: 6 }}>Your Team</div>
            <div style={{ fontSize: 16, color: TEXT, fontFamily: "Inter", fontWeight: 700, marginBottom: 8 }}>{TOURNAMENT.teamName}</div>
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 22, color: SUCCESS, fontFamily: "Inter", fontWeight: 700 }}>{TOURNAMENT.teamResult.split(" ")[2] || "2nd"}</span>
                <span style={{ fontSize: 10, color: MUTED, fontFamily: "Inter" }}>Finish</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 22, color: TEXT, fontFamily: "Inter", fontWeight: 700 }}>{TOURNAMENT.poolRecord}</span>
                <span style={{ fontSize: 10, color: MUTED, fontFamily: "Inter" }}>Pool Record</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 22, color: SUCCESS, fontFamily: "Inter", fontWeight: 700 }}>{TOURNAMENT.pointsEarned}</span>
                <span style={{ fontSize: 10, color: MUTED, fontFamily: "Inter" }}>USAV Pts</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 22, color: MUTED, fontFamily: "Inter", fontWeight: 700 }}>{TOURNAMENT.pointsPossible}</span>
                <span style={{ fontSize: 10, color: MUTED, fontFamily: "Inter" }}>Possible</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Venue & Location ──────────────────────────── */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: MUTED, fontFamily: "Inter", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase" as const, marginBottom: 10 }}>Venue</div>
          <MapPlaceholder />
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, background: CARD, borderRadius: 12, padding: "10px 14px", border: `1px solid ${BORDER}` }}>
              <div style={{ fontSize: 12, color: TEXT, fontFamily: "Inter", fontWeight: 600 }}>{TOURNAMENT.venue}</div>
              <div style={{ fontSize: 11, color: MUTED, fontFamily: "Inter", marginTop: 2 }}>100 S Capitol Ave</div>
            </div>
            <div style={{ background: `${BLUE}15`, borderRadius: 12, padding: "10px 14px", border: `1px solid ${BLUE}30`, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <ExternalLink size={13} color={BLUE} />
              <span style={{ fontSize: 12, color: BLUE, fontFamily: "Inter", fontWeight: 600 }}>Open Maps</span>
            </div>
          </div>
        </div>

        {/* ── Pool Results ──────────────────────────────── */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ fontSize: 13, color: MUTED, fontFamily: "Inter", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase" as const }}>Pool A Results</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Trophy size={12} color={SUCCESS} />
              <span style={{ fontSize: 12, color: SUCCESS, fontFamily: "Inter", fontWeight: 600 }}>{TOURNAMENT.teamResult}</span>
            </div>
          </div>
          <div style={{ background: CARD, borderRadius: 14, padding: "4px 14px", border: `1px solid ${BORDER}` }}>
            {POOL_RESULTS.map((r, i) => <PoolResultRow key={i} r={r} />)}
          </div>
          <div style={{ background: `${SUCCESS}0D`, borderRadius: 12, padding: "10px 14px", marginTop: 8, border: `1px solid ${SUCCESS}22`, display: "flex", alignItems: "center", gap: 8 }}>
            <Trophy size={14} color={SUCCESS} />
            <span style={{ fontSize: 13, color: SUCCESS, fontFamily: "Inter", fontWeight: 600 }}>Qualified for Gold Bracket</span>
          </div>
        </div>

        {/* ── Pre-Tournament Checklist ──────────────────── */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: MUTED, fontFamily: "Inter", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase" as const, marginBottom: 10 }}>Checklist</div>
          <div style={{ background: CARD, borderRadius: 14, padding: "4px 14px", border: `1px solid ${BORDER}` }}>
            {CHECKLIST.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < CHECKLIST.length - 1 ? `1px solid ${BORDER}` : "none" }}>
                {item.done ? (
                  <CheckCircle size={16} color={SUCCESS} />
                ) : (
                  <AlertCircle size={16} color="#F5A623" />
                )}
                <span style={{ fontSize: 13, color: item.done ? "rgba(232,236,245,0.7)" : TEXT, fontFamily: "Inter", fontWeight: item.done ? 400 : 500, textDecoration: item.done ? "line-through" : "none" }}>{item.item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Spectator Tickets ─────────────────────────── */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ fontSize: 13, color: MUTED, fontFamily: "Inter", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase" as const }}>Spectator Tickets</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(45,197,121,0.1)", borderRadius: 10, padding: "3px 8px" }}>
              <Ticket size={11} color={SUCCESS} />
              <span style={{ fontSize: 11, color: SUCCESS, fontFamily: "Inter", fontWeight: 600 }}>1 Purchased</span>
            </div>
          </div>
          {TICKET_OPTIONS.map((tk, i) => <TicketRow key={i} tk={tk} />)}
        </div>

        {/* ── USAV Event info ───────────────────────────── */}
        <div style={{ background: "rgba(191,13,62,0.06)", borderRadius: 14, padding: 14, border: "1px solid rgba(191,13,62,0.15)", display: "flex", alignItems: "center", gap: 10 }}>
          <VolleyBall size={22} color={ACCENT} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: ACCENT, fontFamily: "Inter", fontWeight: 600, marginBottom: 2 }}>USAV Sanctioned Event · {TOURNAMENT.usavCode}</div>
            <div style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>Official rankings points apply. Results submitted to HQ upon completion.</div>
          </div>
          <ExternalLink size={14} color={ACCENT} style={{ cursor: "pointer" }} />
        </div>

      </div>
    </div>
  );
}
