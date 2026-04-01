import { Bell, ChevronRight, Star, Flame, Clock, Calendar, Trophy, TrendingUp } from "lucide-react";

const BG = "#000D2E";
const CARD = "#060E2C";
const SURFACE = "#0A1535";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT = "#E8ECF5";
const MUTED = "#6B7A9F";
const ACCENT = "#BF0D3E";
const SUCCESS = "#2DC579";
const DANGER = "#E84855";

const DISC: Record<string, { label: string; color: string }> = {
  mens:    { label: "Men's",    color: "#3A7BF5" },
  womens:  { label: "Women's",  color: "#E04E8A" },
  beach:   { label: "Beach",    color: "#F5A623" },
  sitting: { label: "Sitting",  color: "#44C98E" },
  ncaa_w:  { label: "NCAA ♀",   color: "#E04E8A" },
  ncaa_m:  { label: "NCAA ♂",   color: "#3A7BF5" },
};

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

function PulsingDot() {
  return (
    <span style={{ position: "relative", width: 8, height: 8, display: "inline-block" }}>
      <span style={{ position: "absolute", inset: 0, borderRadius: 4, background: DANGER, opacity: 0.5, animation: "ping 1.2s ease-in-out infinite" }} />
      <span style={{ position: "absolute", inset: 1, borderRadius: 3, background: DANGER }} />
      <style>{`@keyframes ping{0%,100%{transform:scale(1);opacity:0.5}50%{transform:scale(1.8);opacity:0}}`}</style>
    </span>
  );
}

function TeamAvatar({ code, color, size = 44 }: { code: string; color: string; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size / 2, border: `1.5px solid ${color}50`, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ fontSize: size * 0.27, fontWeight: 700, color, fontFamily: "Inter", letterSpacing: "0.3px" }}>{code}</span>
    </div>
  );
}

// ── Section header ─────────────────────────────────────────────────────────────

function SectionRow({ icon, title, action }: { icon?: React.ReactNode; title: string; action?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        {icon}
        <span style={{ fontSize: 15, color: TEXT, fontFamily: "Inter", fontWeight: 700 }}>{title}</span>
      </div>
      {action && (
        <div style={{ display: "flex", alignItems: "center", gap: 3, cursor: "pointer" }}>
          <span style={{ fontSize: 12, color: ACCENT, fontFamily: "Inter", fontWeight: 600 }}>{action}</span>
          <ChevronRight size={13} color={ACCENT} />
        </div>
      )}
    </div>
  );
}

// ── LIVE HERO card ─────────────────────────────────────────────────────────────

function LiveHeroCard() {
  const color = DISC.mens.color;
  return (
    <div style={{ borderRadius: 22, overflow: "hidden", border: `1px solid ${DANGER}35`, marginBottom: 20, position: "relative", cursor: "pointer" }}>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, #0A2E80, #001840)` }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${color}20, transparent)` }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5))` }} />
      <div style={{ position: "absolute", right: -30, top: -30, opacity: 0.4 }}>
        <VolleyBall size={200} color={`${color}22`} />
      </div>

      <div style={{ position: "relative", padding: 18 }}>
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: `${color}20`, border: `1px solid ${color}40`, borderRadius: 20, padding: "4px 10px" }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: color }} />
              <span style={{ fontSize: 11, color, fontFamily: "Inter", fontWeight: 700 }}>Men's VNL 2026</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(232,72,85,0.18)", border: "1px solid rgba(232,72,85,0.45)", borderRadius: 20, padding: "5px 11px" }}>
            <PulsingDot />
            <span style={{ fontSize: 11, color: DANGER, fontFamily: "Inter", fontWeight: 700, letterSpacing: 0.8 }}>LIVE NOW</span>
          </div>
        </div>

        {/* Scoreboard */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <TeamAvatar code="BRA" color={color} size={56} />
            <span style={{ fontSize: 15, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>Brazil</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: 110 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 42, fontWeight: 700, color: TEXT, fontFamily: "Inter", lineHeight: 1 }}>2</span>
              <span style={{ fontSize: 24, color: MUTED, fontFamily: "Inter", lineHeight: 1 }}>:</span>
              <span style={{ fontSize: 42, fontWeight: 700, color: "rgba(232,245,255,0.4)", fontFamily: "Inter", lineHeight: 1 }}>1</span>
            </div>
            {/* Current set score */}
            <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 8, padding: "3px 10px" }}>
              <span style={{ fontSize: 12, color: MUTED, fontFamily: "Inter", fontWeight: 500 }}>Set 4 · 19–16</span>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <TeamAvatar code="ITA" color={color} size={56} />
            <span style={{ fontSize: 15, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>Italy</span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", gap: 14 }}>
            <div style={{ textAlign: "center" as const }}>
              <div style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>Set scores</div>
              <div style={{ fontSize: 12, color: TEXT, fontFamily: "Inter", fontWeight: 600, marginTop: 2 }}>25-22, 22-25, 25-19</div>
            </div>
          </div>
          <div style={{ background: ACCENT, borderRadius: 12, padding: "8px 16px", cursor: "pointer" }}>
            <span style={{ fontSize: 12, color: "#fff", fontFamily: "Inter", fontWeight: 700 }}>Watch Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Today's matches strip ──────────────────────────────────────────────────────

const SCHEDULE = [
  { home: "USA",  away: "POL", disc: "womens", time: "7:00 PM",   status: "upcoming", tournament: "VNL 2026" },
  { home: "BRA",  away: "FRA", disc: "mens",   time: "9:30 PM",   status: "upcoming", tournament: "VNL 2026" },
  { home: "SLO",  away: "USA", disc: "beach",  time: "2:00 PM",   status: "live",     tournament: "FIVB Beach Pro" },
];

function ScheduleChip({ match }: { match: typeof SCHEDULE[0] }) {
  const d = DISC[match.disc];
  const isLive = match.status === "live";
  return (
    <div style={{ width: 156, background: CARD, borderRadius: 16, padding: 13, border: isLive ? `1px solid ${DANGER}35` : `1px solid ${BORDER}`, flexShrink: 0, overflow: "hidden", position: "relative", cursor: "pointer" }}>
      {isLive && <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${DANGER}07, transparent)` }} />}
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 5, height: 5, borderRadius: 2.5, background: d.color }} />
            <span style={{ fontSize: 9, color: d.color, fontFamily: "Inter", fontWeight: 700 }}>{d.label}</span>
          </div>
          {isLive
            ? <div style={{ display: "flex", alignItems: "center", gap: 4 }}><PulsingDot /><span style={{ fontSize: 9, color: DANGER, fontFamily: "Inter", fontWeight: 700 }}>LIVE</span></div>
            : <div style={{ display: "flex", alignItems: "center", gap: 3 }}><Clock size={9} color={MUTED} /><span style={{ fontSize: 10, color: MUTED, fontFamily: "Inter" }}>{match.time}</span></div>
          }
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <TeamAvatar code={match.home} color={d.color} size={32} />
            <span style={{ fontSize: 11, fontWeight: 600, color: TEXT, fontFamily: "Inter" }}>{match.home}</span>
          </div>
          <span style={{ fontSize: 12, color: MUTED, fontFamily: "Inter", fontWeight: 500 }}>vs</span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <TeamAvatar code={match.away} color={d.color} size={32} />
            <span style={{ fontSize: 11, fontWeight: 600, color: TEXT, fontFamily: "Inter" }}>{match.away}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Favorite teams ─────────────────────────────────────────────────────────────

const FAV_TEAMS = [
  { code: "USA", name: "USA Women",  disc: "womens", rank: 1,  form: ["W","W","W","L","W"], pts: 27 },
  { code: "BRA", name: "Brazil Men", disc: "mens",   rank: 1,  form: ["W","W","W","W","W"], pts: 30 },
  { code: "USA", name: "USA Men",    disc: "mens",   rank: 4,  form: ["W","W","L","W","L"], pts: 20 },
];

function FavTeamRow({ team }: { team: typeof FAV_TEAMS[0] }) {
  const d = DISC[team.disc];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, paddingVertical: 10, padding: "10px 0", borderBottom: `1px solid ${BORDER}`, cursor: "pointer" }}>
      <TeamAvatar code={team.code} color={d.color} size={38} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, fontFamily: "Inter", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{team.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
          <div style={{ width: 5, height: 5, borderRadius: 2.5, background: d.color }} />
          <span style={{ fontSize: 11, color: d.color, fontFamily: "Inter", fontWeight: 600 }}>{d.label}</span>
          <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>· #{team.rank} Ranked</span>
        </div>
      </div>
      {/* Mini form */}
      <div style={{ display: "flex", gap: 2 }}>
        {team.form.map((f, i) => (
          <div key={i} style={{ width: 14, height: 14, borderRadius: 3, background: f === "W" ? "rgba(45,197,121,0.25)" : "rgba(232,72,85,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 7, fontWeight: 700, color: f === "W" ? SUCCESS : DANGER, fontFamily: "Inter" }}>{f}</span>
          </div>
        ))}
      </div>
      <span style={{ fontSize: 13, color: ACCENT, fontFamily: "Inter", fontWeight: 700, width: 28, textAlign: "right" as const }}>{team.pts}</span>
    </div>
  );
}

// ── Compact news card ──────────────────────────────────────────────────────────

const NEWS = [
  { category: "VNL 2026", disc: "mens",   title: "Brazil's historic perfect run — can anyone stop them?",      date: "Jun 12", readTime: 4 },
  { category: "Awards",   disc: "womens", title: "Paola Egonu wins Best Scorer for third year running",         date: "Jun 11", readTime: 3 },
  { category: "Feature",  disc: "beach",  title: "USA beach pair climb to #1 in the world in just two seasons", date: "Jun 10", readTime: 5 },
];

function NewsChip({ item }: { item: typeof NEWS[0] }) {
  const d = DISC[item.disc];
  const catColors: Record<string, string> = { "VNL 2026": SUCCESS, "Awards": ACCENT, "Feature": "#9B59B6", "Analysis": "#5B8DEF" };
  const catColor = catColors[item.category] ?? ACCENT;
  return (
    <div style={{ background: CARD, borderRadius: 16, marginBottom: 10, border: `1px solid ${BORDER}`, display: "flex", overflow: "hidden", cursor: "pointer" }}>
      {/* Left disc bar */}
      <div style={{ width: 3, background: d.color, flexShrink: 0 }} />
      {/* Thumbnail */}
      <div style={{ width: 76, flexShrink: 0, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${d.color}45, #001F5B)` }} />
        <div style={{ position: "absolute", top: -6, left: -6, opacity: 0.4 }}>
          <VolleyBall size={64} color={d.color} />
        </div>
        <div style={{ position: "relative" }}>
          <VolleyBall size={22} color="rgba(255,255,255,0.8)" />
        </div>
      </div>
      {/* Content */}
      <div style={{ flex: 1, padding: "11px 12px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 6, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ background: `${catColor}18`, borderRadius: 4, padding: "2px 6px" }}>
            <span style={{ fontSize: 9, color: catColor, fontFamily: "Inter", fontWeight: 700, letterSpacing: "0.3px" }}>{item.category}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <div style={{ width: 4, height: 4, borderRadius: 2, background: d.color }} />
            <span style={{ fontSize: 9, color: d.color, fontFamily: "Inter", fontWeight: 600 }}>{d.label}</span>
          </div>
        </div>
        <div style={{ fontSize: 12, color: TEXT, fontFamily: "Inter", fontWeight: 600, lineHeight: "17px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>
          {item.title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 10, color: MUTED, fontFamily: "Inter" }}>{item.date}</span>
          <div style={{ width: 2, height: 2, borderRadius: 1, background: MUTED }} />
          <Clock size={9} color={MUTED} />
          <span style={{ fontSize: 10, color: MUTED, fontFamily: "Inter" }}>{item.readTime} min</span>
        </div>
      </div>
    </div>
  );
}

// ── Quick-action buttons ───────────────────────────────────────────────────────

const QUICK = [
  { icon: <Trophy size={18} color="#FFD700" />,      label: "Standings", bg: "rgba(255,215,0,0.1)",    border: "rgba(255,215,0,0.2)" },
  { icon: <Calendar size={18} color="#3A7BF5" />,    label: "Schedule",  bg: "rgba(58,123,245,0.1)",   border: "rgba(58,123,245,0.2)" },
  { icon: <TrendingUp size={18} color="#2DC579" />,  label: "Stats",     bg: "rgba(45,197,121,0.1)",   border: "rgba(45,197,121,0.2)" },
  { icon: <Star size={18} color="#E04E8A" />,        label: "Favorites", bg: "rgba(224,78,138,0.1)",   border: "rgba(224,78,138,0.2)" },
];

function QuickActions() {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
      {QUICK.map((q, i) => (
        <div key={i} style={{ flex: 1, background: q.bg, border: `1px solid ${q.border}`, borderRadius: 14, padding: "12px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: 7, cursor: "pointer" }}>
          {q.icon}
          <span style={{ fontSize: 10, color: TEXT, fontFamily: "Inter", fontWeight: 600 }}>{q.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── My Disciplines filter chips ────────────────────────────────────────────────

const MY_DISCS = ["mens", "womens", "beach"];

function MyDisciplines() {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 14, overflowX: "auto", scrollbarWidth: "none" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "6px 13px", borderRadius: 20, background: ACCENT, border: `1px solid ${ACCENT}`, whiteSpace: "nowrap", flexShrink: 0 }}>
        <span style={{ fontSize: 12, color: "#fff", fontFamily: "Inter", fontWeight: 600 }}>All</span>
      </div>
      {MY_DISCS.map(k => {
        const d = DISC[k];
        return (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 13px", borderRadius: 20, background: CARD, border: `1px solid ${BORDER}`, whiteSpace: "nowrap", flexShrink: 0, cursor: "pointer" }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: d.color }} />
            <span style={{ fontSize: 12, color: MUTED, fontFamily: "Inter", fontWeight: 600 }}>{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── Main screen ────────────────────────────────────────────────────────────────

export function HomeScreen() {
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <div style={{ width: 390, height: 844, overflowY: "auto", background: BG, fontFamily: "Inter, sans-serif", position: "relative" }}>
      {/* Header gradient */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 300, background: "linear-gradient(135deg, #002080, #001F5B)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 300, background: "linear-gradient(225deg, rgba(191,13,62,0.22), transparent)", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, padding: "52px 16px 24px" }}>

        {/* ── Personalized greeting ──────────────────────── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 13, color: "rgba(232,236,245,0.6)", fontFamily: "Inter", marginBottom: 2 }}>{greeting} 👋</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: TEXT, fontFamily: "Inter", letterSpacing: -0.5, lineHeight: "32px" }}>Jordan</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(45,197,121,0.1)", border: "1px solid rgba(45,197,121,0.2)", borderRadius: 20, padding: "3px 9px" }}>
                <div style={{ width: 5, height: 5, borderRadius: 2.5, background: SUCCESS }} />
                <span style={{ fontSize: 10, color: SUCCESS, fontFamily: "Inter", fontWeight: 600 }}>Men's · Women's · Beach</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ position: "relative", width: 38, height: 38, borderRadius: 19, background: "rgba(255,255,255,0.06)", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Bell size={17} color="rgba(232,236,245,0.7)" />
              {/* Notification dot */}
              <div style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: 4, background: DANGER, border: `2px solid ${BG}` }} />
            </div>
            <div style={{ width: 38, height: 38, borderRadius: 19, background: "rgba(191,13,62,0.2)", border: "1.5px solid rgba(191,13,62,0.4)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <span style={{ fontSize: 13, color: ACCENT, fontFamily: "Inter", fontWeight: 700 }}>JD</span>
            </div>
          </div>
        </div>

        {/* ── Quick actions ──────────────────────────────── */}
        <QuickActions />

        {/* ── Live now ───────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
          <PulsingDot />
          <span style={{ fontSize: 15, color: TEXT, fontFamily: "Inter", fontWeight: 700 }}>Live Right Now</span>
          <div style={{ background: "rgba(232,72,85,0.12)", border: "1px solid rgba(232,72,85,0.3)", borderRadius: 10, padding: "2px 8px", marginLeft: 2 }}>
            <span style={{ fontSize: 11, color: DANGER, fontFamily: "Inter", fontWeight: 700 }}>2</span>
          </div>
        </div>
        <LiveHeroCard />

        {/* ── Today's schedule ───────────────────────────── */}
        <SectionRow icon={<Calendar size={15} color={ACCENT} />} title="Today's Matches" action="View all" />
        <div style={{ display: "flex", gap: 10, overflowX: "auto", scrollbarWidth: "none", marginBottom: 22, paddingBottom: 2 }}>
          {SCHEDULE.map((m, i) => <ScheduleChip key={i} match={m} />)}
        </div>

        {/* ── My disciplines filter ──────────────────────── */}
        <MyDisciplines />

        {/* ── Favorite teams ─────────────────────────────── */}
        <SectionRow icon={<Star size={15} color="#FFD700" fill="#FFD700" />} title="My Teams" action="Edit" />
        <div style={{ background: CARD, borderRadius: 18, padding: "4px 14px", border: `1px solid ${BORDER}`, marginBottom: 22 }}>
          {FAV_TEAMS.map((t, i) => <FavTeamRow key={i} team={t} />)}
        </div>

        {/* ── Latest news ────────────────────────────────── */}
        <SectionRow icon={<Flame size={15} color={ACCENT} />} title="Breaking News" action="All news" />
        {NEWS.map((n, i) => <NewsChip key={i} item={n} />)}

      </div>
    </div>
  );
}
