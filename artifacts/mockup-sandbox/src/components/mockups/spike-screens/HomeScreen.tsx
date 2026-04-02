import { useState } from "react";
import { Bell, ChevronRight, Star, Flame, Clock, Calendar, Trophy, TrendingUp, Ticket, Users, MapPin, Check, Shield } from "lucide-react";

const BG      = "#000D2E";
const CARD    = "#060E2C";
const SURFACE = "#0A1535";
const BORDER  = "rgba(255,255,255,0.07)";
const TEXT    = "#E8ECF5";
const MUTED   = "#6B7A9F";
const ACCENT  = "#BF0D3E";
const SUCCESS = "#2DC579";
const DANGER  = "#E84855";
const DISC_PURPLE = "#9B59B6";

const DISC: Record<string, { label: string; color: string }> = {
  mens:    { label: "Men's",    color: "#3A7BF5" },
  womens:  { label: "Women's",  color: "#E04E8A" },
  beach:   { label: "Beach",    color: "#F5A623" },
  sitting: { label: "Sitting",  color: "#44C98E" },
};

type Persona = "fan" | "junior" | "parent";

// ── Shared helpers ─────────────────────────────────────────────────────────────

function VolleyBall({ size = 24, color = "rgba(255,255,255,0.12)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
      <path d="M12 2 C12 2 8 6 8 12 C8 18 12 22 12 22" stroke={color} strokeWidth="1.5" />
      <path d="M2 12 C2 12 6 8 12 8 C18 8 22 12 22 12" stroke={color} strokeWidth="1.5" />
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
      <span style={{ fontSize: Math.floor(size * 0.27), fontWeight: 700, color, fontFamily: "Inter" }}>{code}</span>
    </div>
  );
}

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

// ── Persona switcher (mockup demo UI) ─────────────────────────────────────────

function PersonaSwitcher({ persona, onChange }: { persona: Persona; onChange: (p: Persona) => void }) {
  const opts: { key: Persona; label: string; color: string }[] = [
    { key: "fan",    label: "Fan",           color: ACCENT },
    { key: "junior", label: "Junior Player", color: DISC_PURPLE },
    { key: "parent", label: "Parent",        color: SUCCESS },
  ];
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 9, color: MUTED, fontFamily: "Inter", fontWeight: 700, letterSpacing: "0.8px", marginBottom: 6, textTransform: "uppercase" as const }}>Persona preview</div>
      <div style={{ display: "flex", gap: 6 }}>
        {opts.map(o => (
          <button key={o.key} onClick={() => onChange(o.key)} style={{ flex: 1, padding: "7px 0", borderRadius: 10, border: `1px solid ${persona === o.key ? o.color + "60" : BORDER}`, background: persona === o.key ? `${o.color}18` : "transparent", cursor: "pointer", fontFamily: "Inter", fontSize: 10, fontWeight: 700, color: persona === o.key ? o.color : MUTED, transition: "all 0.15s" }}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── ════════════════════════════════════════════════════════════════════════════
// ── FAN / NATIONAL TEAM home ──────────────────────────────────────────────────
// ── ════════════════════════════════════════════════════════════════════════════

function LiveHeroCard() {
  const color = DISC.mens.color;
  return (
    <div style={{ borderRadius: 22, overflow: "hidden", border: `1px solid ${DANGER}35`, marginBottom: 20, position: "relative", cursor: "pointer" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0A2E80, #001840)" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${color}20, transparent)` }} />
      <div style={{ position: "absolute", right: -30, top: -30, opacity: 0.4 }}>
        <VolleyBall size={200} color={`${color}22`} />
      </div>
      <div style={{ position: "relative", padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, background: `${color}20`, border: `1px solid ${color}40`, borderRadius: 20, padding: "4px 10px" }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: color }} />
            <span style={{ fontSize: 11, color, fontFamily: "Inter", fontWeight: 700 }}>Men's VNL 2026</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(232,72,85,0.18)", border: "1px solid rgba(232,72,85,0.45)", borderRadius: 20, padding: "5px 11px" }}>
            <PulsingDot />
            <span style={{ fontSize: 11, color: DANGER, fontFamily: "Inter", fontWeight: 700, letterSpacing: 0.8 }}>LIVE NOW</span>
          </div>
        </div>
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
            <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 8, padding: "3px 10px" }}>
              <span style={{ fontSize: 12, color: MUTED, fontFamily: "Inter", fontWeight: 500 }}>Set 4 · 19–16</span>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <TeamAvatar code="ITA" color={color} size={56} />
            <span style={{ fontSize: 15, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>Italy</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontSize: 12, color: "rgba(232,236,245,0.55)", fontFamily: "Inter" }}>25-22, 22-25, 25-19</div>
          <div style={{ background: ACCENT, borderRadius: 12, padding: "8px 16px", cursor: "pointer" }}>
            <span style={{ fontSize: 12, color: "#fff", fontFamily: "Inter", fontWeight: 700 }}>Watch Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const SCHEDULE = [
  { home: "USA", away: "POL", disc: "womens", time: "7:00 PM", status: "upcoming", tournament: "VNL 2026" },
  { home: "BRA", away: "FRA", disc: "mens",   time: "9:30 PM", status: "upcoming", tournament: "VNL 2026" },
  { home: "SLO", away: "USA", disc: "beach",  time: "2:00 PM", status: "live",     tournament: "FIVB Beach" },
];

function ScheduleChip({ match }: { match: typeof SCHEDULE[0] }) {
  const d = DISC[match.disc] ?? DISC.mens;
  const isLive = match.status === "live";
  return (
    <div style={{ width: 150, background: CARD, borderRadius: 16, padding: 12, border: isLive ? `1px solid ${DANGER}35` : `1px solid ${BORDER}`, flexShrink: 0, cursor: "pointer" }}>
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
        <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>vs</span>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <TeamAvatar code={match.away} color={d.color} size={32} />
          <span style={{ fontSize: 11, fontWeight: 600, color: TEXT, fontFamily: "Inter" }}>{match.away}</span>
        </div>
      </div>
    </div>
  );
}

const FAV_TEAMS = [
  { code: "USA", name: "USA Women",  disc: "womens", rank: 1, form: ["W","W","W","L","W"], pts: 27 },
  { code: "BRA", name: "Brazil Men", disc: "mens",   rank: 1, form: ["W","W","W","W","W"], pts: 30 },
  { code: "USA", name: "USA Men",    disc: "mens",   rank: 4, form: ["W","W","L","W","L"], pts: 20 },
];

function FavTeamRow({ team }: { team: typeof FAV_TEAMS[0] }) {
  const d = DISC[team.disc];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${BORDER}`, cursor: "pointer" }}>
      <TeamAvatar code={team.code} color={d.color} size={38} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>{team.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
          <div style={{ width: 5, height: 5, borderRadius: 2.5, background: d.color }} />
          <span style={{ fontSize: 11, color: d.color, fontFamily: "Inter", fontWeight: 600 }}>{d.label}</span>
          <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>· #{team.rank}</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 2 }}>
        {team.form.map((f, i) => (
          <div key={i} style={{ width: 14, height: 14, borderRadius: 3, background: f === "W" ? "rgba(45,197,121,0.25)" : "rgba(232,72,85,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 7, fontWeight: 700, color: f === "W" ? SUCCESS : DANGER, fontFamily: "Inter" }}>{f}</span>
          </div>
        ))}
      </div>
      <span style={{ fontSize: 13, color: ACCENT, fontFamily: "Inter", fontWeight: 700 }}>{team.pts}</span>
    </div>
  );
}

function FanHome() {
  return (
    <>
      {/* Quick actions */}
      <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
        {[
          { icon: <Trophy size={18} color="#FFD700" />,     label: "Standings", bg: "rgba(255,215,0,0.1)",  border: "rgba(255,215,0,0.2)" },
          { icon: <Calendar size={18} color="#3A7BF5" />,   label: "Schedule",  bg: "rgba(58,123,245,0.1)", border: "rgba(58,123,245,0.2)" },
          { icon: <TrendingUp size={18} color="#2DC579" />, label: "Stats",     bg: "rgba(45,197,121,0.1)", border: "rgba(45,197,121,0.2)" },
          { icon: <Star size={18} color="#E04E8A" />,       label: "Athletes",  bg: "rgba(224,78,138,0.1)", border: "rgba(224,78,138,0.2)" },
        ].map((q, i) => (
          <div key={i} style={{ flex: 1, background: q.bg, border: `1px solid ${q.border}`, borderRadius: 14, padding: "12px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: 7, cursor: "pointer" }}>
            {q.icon}
            <span style={{ fontSize: 10, color: TEXT, fontFamily: "Inter", fontWeight: 600 }}>{q.label}</span>
          </div>
        ))}
      </div>

      {/* Live now */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
        <PulsingDot />
        <span style={{ fontSize: 15, color: TEXT, fontFamily: "Inter", fontWeight: 700 }}>Live Right Now</span>
        <div style={{ background: "rgba(232,72,85,0.12)", border: "1px solid rgba(232,72,85,0.3)", borderRadius: 10, padding: "2px 8px" }}>
          <span style={{ fontSize: 11, color: DANGER, fontFamily: "Inter", fontWeight: 700 }}>2</span>
        </div>
      </div>
      <LiveHeroCard />

      {/* Today's schedule */}
      <SectionRow icon={<Calendar size={15} color={ACCENT} />} title="Today's Matches" action="View all" />
      <div style={{ display: "flex", gap: 10, overflowX: "auto", scrollbarWidth: "none", marginBottom: 22, paddingBottom: 2 }}>
        {SCHEDULE.map((m, i) => <ScheduleChip key={i} match={m} />)}
      </div>

      {/* Fav teams */}
      <SectionRow icon={<Star size={15} color="#FFD700" fill="#FFD700" />} title="My Teams" action="Edit" />
      <div style={{ background: CARD, borderRadius: 18, padding: "4px 14px", border: `1px solid ${BORDER}`, marginBottom: 22 }}>
        {FAV_TEAMS.map((t, i) => <FavTeamRow key={i} team={t} />)}
      </div>

      {/* News */}
      <SectionRow icon={<Flame size={15} color={ACCENT} />} title="Breaking News" action="All news" />
      {[
        { cat: "VNL 2026", disc: "mens",   title: "Brazil's historic run — can anyone stop them?",         date: "Jun 12", readTime: 4 },
        { cat: "Feature",  disc: "beach",  title: "USA beach pair climb to #1 in the world",               date: "Jun 10", readTime: 5 },
      ].map((n, i) => {
        const d = DISC[n.disc];
        return (
          <div key={i} style={{ background: CARD, borderRadius: 16, marginBottom: 10, border: `1px solid ${BORDER}`, display: "flex", overflow: "hidden", cursor: "pointer" }}>
            <div style={{ width: 3, background: d.color, flexShrink: 0 }} />
            <div style={{ width: 72, flexShrink: 0, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${d.color}45, #001F5B)` }} />
              <VolleyBall size={22} color="rgba(255,255,255,0.8)" />
            </div>
            <div style={{ flex: 1, padding: "11px 12px", minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
                <div style={{ background: `${ACCENT}18`, borderRadius: 4, padding: "2px 6px" }}>
                  <span style={{ fontSize: 9, color: ACCENT, fontFamily: "Inter", fontWeight: 700 }}>{n.cat}</span>
                </div>
              </div>
              <div style={{ fontSize: 12, color: TEXT, fontFamily: "Inter", fontWeight: 600, lineHeight: "17px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{n.title}</div>
              <div style={{ fontSize: 10, color: MUTED, fontFamily: "Inter", marginTop: 4 }}>{n.date} · {n.readTime} min</div>
            </div>
          </div>
        );
      })}
    </>
  );
}

// ── ════════════════════════════════════════════════════════════════════════════
// ── JUNIOR CLUB home ──────────────────────────────────────────────────────────
// ── ════════════════════════════════════════════════════════════════════════════

function JuniorHome() {
  const clubColor = DISC_PURPLE;
  const form = ["W","L","W","W","W"];
  const teammates = [
    { code: "AV", name: "Ava" },    { code: "PR", name: "Priya" },
    { code: "CH", name: "Chloe" },  { code: "LI", name: "Lily" },
    { code: "SO", name: "Sofia" },  { code: "EM", name: "Emma" },
  ];

  return (
    <>
      {/* Next tournament hero */}
      <div style={{ borderRadius: 22, overflow: "hidden", border: `1.5px solid ${clubColor}45`, marginBottom: 20, position: "relative", cursor: "pointer" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg, #0D0020, #001240)" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${clubColor}22, transparent)` }} />
        <div style={{ position: "absolute", right: -25, bottom: -25, opacity: 0.3 }}>
          <VolleyBall size={180} color={`${clubColor}20`} />
        </div>
        <div style={{ position: "relative", padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, background: `${clubColor}18`, border: `1px solid ${clubColor}35`, borderRadius: 20, padding: "5px 12px" }}>
              <Trophy size={11} color={clubColor} />
              <span style={{ fontSize: 11, color: clubColor, fontFamily: "Inter", fontWeight: 700 }}>YOUR NEXT TOURNAMENT</span>
            </div>
            <div style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>Jan 18–19</div>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: TEXT, fontFamily: "Inter", marginBottom: 4 }}>Southwest Qualifier 2026</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 14 }}>
            <MapPin size={12} color={MUTED} />
            <span style={{ fontSize: 12, color: MUTED, fontFamily: "Inter" }}>Las Vegas Convention Center · Las Vegas, NV</span>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: "8px 14px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 9, color: MUTED, fontFamily: "Inter", marginBottom: 2 }}>DIVISION</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>16U Gold</div>
            </div>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: "8px 14px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 9, color: MUTED, fontFamily: "Inter", marginBottom: 2 }}>CLUB</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>MEVC 16 Elite</div>
            </div>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: "8px 14px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 9, color: MUTED, fontFamily: "Inter", marginBottom: 2 }}>STARTS IN</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: clubColor, fontFamily: "Inter" }}>14 days</div>
            </div>
          </div>
          {/* Recent form */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>Team form</span>
            <div style={{ display: "flex", gap: 3 }}>
              {form.map((f, i) => (
                <div key={i} style={{ width: 20, height: 20, borderRadius: 5, background: f === "W" ? "rgba(45,197,121,0.22)" : "rgba(232,72,85,0.18)", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${f === "W" ? "rgba(45,197,121,0.4)" : "rgba(232,72,85,0.3)"}` }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: f === "W" ? SUCCESS : DANGER, fontFamily: "Inter" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
        {[
          { icon: <Calendar size={18} color={clubColor} />,    label: "Schedule",  bg: `${clubColor}12`, border: `${clubColor}25` },
          { icon: <Users size={18} color="#3A7BF5" />,         label: "Roster",    bg: "rgba(58,123,245,0.1)",  border: "rgba(58,123,245,0.2)" },
          { icon: <Ticket size={18} color={SUCCESS} />,        label: "Tickets",   bg: "rgba(45,197,121,0.1)",  border: "rgba(45,197,121,0.2)" },
          { icon: <TrendingUp size={18} color="#F5A623" />,    label: "Bracket",   bg: "rgba(245,166,35,0.1)",  border: "rgba(245,166,35,0.2)" },
        ].map((q, i) => (
          <div key={i} style={{ flex: 1, background: q.bg, border: `1px solid ${q.border}`, borderRadius: 14, padding: "12px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: 7, cursor: "pointer" }}>
            {q.icon}
            <span style={{ fontSize: 10, color: TEXT, fontFamily: "Inter", fontWeight: 600 }}>{q.label}</span>
          </div>
        ))}
      </div>

      {/* Teammates */}
      <SectionRow icon={<Users size={15} color={clubColor} />} title="Your Team" action="Full roster" />
      <div style={{ display: "flex", gap: 12, overflowX: "auto", scrollbarWidth: "none", marginBottom: 22, paddingBottom: 2 }}>
        {teammates.map((t, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0, cursor: "pointer" }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: `${clubColor}20`, border: `1.5px solid ${clubColor}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: clubColor, fontFamily: "Inter" }}>{t.code}</span>
            </div>
            <span style={{ fontSize: 10, color: MUTED, fontFamily: "Inter", fontWeight: 500 }}>{t.name}</span>
          </div>
        ))}
      </div>

      {/* Club update */}
      <SectionRow icon={<Bell size={15} color={ACCENT} />} title="Club Updates" action="See all" />
      {[
        { from: "Coach Daniels", time: "2h ago", msg: "Practice moved to 5pm this Thursday — please confirm attendance with team coordinator." },
        { from: "MEVC Club", time: "Yesterday", msg: "Uniform pickup is Saturday 10am–12pm at Desert Ridge. Bring your $45 deposit." },
      ].map((u, i) => (
        <div key={i} style={{ background: CARD, borderRadius: 16, padding: "13px 14px", marginBottom: 10, border: `1px solid ${BORDER}`, cursor: "pointer" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: clubColor, fontFamily: "Inter" }}>{u.from}</span>
            <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>{u.time}</span>
          </div>
          <div style={{ fontSize: 12, color: "rgba(232,236,245,0.75)", fontFamily: "Inter", lineHeight: "18px" }}>{u.msg}</div>
        </div>
      ))}
    </>
  );
}

// ── ════════════════════════════════════════════════════════════════════════════
// ── PARENT home ───────────────────────────────────────────────────────────────
// ── ════════════════════════════════════════════════════════════════════════════

function ParentHome() {
  const clubColor = SUCCESS;

  return (
    <>
      {/* Purchased ticket banner */}
      <div style={{ borderRadius: 20, marginBottom: 18, overflow: "hidden", border: `1.5px solid ${clubColor}45`, position: "relative", cursor: "pointer" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #001A10, #001240)" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${clubColor}18, transparent)` }} />
        <div style={{ position: "absolute", right: -20, bottom: -20, opacity: 0.3 }}>
          <VolleyBall size={140} color={`${clubColor}20`} />
        </div>
        <div style={{ position: "relative", padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: `${clubColor}25`, border: `1px solid ${clubColor}50`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Ticket size={14} color={clubColor} />
            </div>
            <span style={{ fontSize: 12, color: clubColor, fontFamily: "Inter", fontWeight: 800 }}>YOUR TICKET · SW QUALIFIER</span>
            <div style={{ marginLeft: "auto", background: `${clubColor}20`, border: `1px solid ${clubColor}40`, borderRadius: 10, padding: "3px 9px", display: "flex", alignItems: "center", gap: 4 }}>
              <Check size={10} color={clubColor} />
              <span style={{ fontSize: 10, color: clubColor, fontFamily: "Inter", fontWeight: 700 }}>Purchased</span>
            </div>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: TEXT, fontFamily: "Inter", marginBottom: 6 }}>Southwest Qualifier 2026</div>
          <div style={{ display: "flex", gap: 14, marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Calendar size={11} color={MUTED} />
              <span style={{ fontSize: 11, color: "rgba(232,236,245,0.7)", fontFamily: "Inter" }}>Jan 18–19, 2026</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <MapPin size={11} color={MUTED} />
              <span style={{ fontSize: 11, color: "rgba(232,236,245,0.7)", fontFamily: "Inter" }}>Las Vegas, NV</span>
            </div>
          </div>
          <div style={{ padding: "10px 14px", background: clubColor, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Ticket size={13} color="#fff" />
            <span style={{ fontSize: 13, color: "#fff", fontFamily: "Inter", fontWeight: 700 }}>View & Download Ticket</span>
            <ChevronRight size={13} color="#fff" />
          </div>
        </div>
      </div>

      {/* Athlete card */}
      <div style={{ background: CARD, borderRadius: 20, padding: 16, marginBottom: 20, border: `1px solid ${DISC_PURPLE}30`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${DISC_PURPLE}10, transparent)` }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, background: `${DISC_PURPLE}22`, border: `2px solid ${DISC_PURPLE}50`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: DISC_PURPLE, fontFamily: "Inter" }}>AV</span>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>Ava Mitchell</div>
              <div style={{ fontSize: 11, color: MUTED, fontFamily: "Inter", marginTop: 2 }}>MEVC 16 Elite · #1 · Setter</div>
            </div>
            <div style={{ marginLeft: "auto", background: `${DISC_PURPLE}15`, border: `1px solid ${DISC_PURPLE}35`, borderRadius: 10, padding: "4px 10px" }}>
              <span style={{ fontSize: 10, color: DISC_PURPLE, fontFamily: "Inter", fontWeight: 700 }}>16U</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: "9px 12px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ fontSize: 9, color: MUTED, fontFamily: "Inter", marginBottom: 3 }}>NEXT EVENT</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, fontFamily: "Inter" }}>SW Qualifier</div>
              <div style={{ fontSize: 10, color: MUTED, fontFamily: "Inter" }}>Jan 18 · Las Vegas</div>
            </div>
            <div style={{ flex: 1, background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: "9px 12px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ fontSize: 9, color: MUTED, fontFamily: "Inter", marginBottom: 3 }}>TEAM FORM</div>
              <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
                {["W","L","W","W","W"].map((f, i) => (
                  <div key={i} style={{ width: 16, height: 16, borderRadius: 4, background: f === "W" ? "rgba(45,197,121,0.22)" : "rgba(232,72,85,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 7, fontWeight: 700, color: f === "W" ? SUCCESS : DANGER, fontFamily: "Inter" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
        {[
          { icon: <Calendar size={18} color={DISC_PURPLE} />,  label: "Schedule",  bg: `${DISC_PURPLE}12`, border: `${DISC_PURPLE}25` },
          { icon: <Users size={18} color="#3A7BF5" />,         label: "Roster",    bg: "rgba(58,123,245,0.1)", border: "rgba(58,123,245,0.2)" },
          { icon: <Ticket size={18} color={clubColor} />,      label: "Tickets",   bg: `${clubColor}12`,     border: `${clubColor}25` },
          { icon: <MapPin size={18} color="#F5A623" />,        label: "Venue",     bg: "rgba(245,166,35,0.1)", border: "rgba(245,166,35,0.2)" },
        ].map((q, i) => (
          <div key={i} style={{ flex: 1, background: q.bg, border: `1px solid ${q.border}`, borderRadius: 14, padding: "12px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: 7, cursor: "pointer" }}>
            {q.icon}
            <span style={{ fontSize: 10, color: TEXT, fontFamily: "Inter", fontWeight: 600 }}>{q.label}</span>
          </div>
        ))}
      </div>

      {/* Upcoming tournaments */}
      <SectionRow icon={<Trophy size={15} color={DISC_PURPLE} />} title="Season Schedule" action="Full schedule" />
      {[
        { name: "Southwest Qualifier",  date: "Jan 18–19", city: "Las Vegas, NV",  purchased: true  },
        { name: "Desert Invitational",  date: "Feb 8",     city: "Phoenix, AZ",    purchased: false },
        { name: "AZ Region Champs",     date: "Mar 7–9",   city: "Tucson, AZ",     purchased: false },
      ].map((ev, i) => (
        <div key={i} style={{ background: CARD, borderRadius: 16, padding: "12px 14px", marginBottom: 10, border: `1px solid ${ev.purchased ? clubColor + "35" : BORDER}`, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", position: "relative", overflow: "hidden" }}>
          {ev.purchased && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: clubColor, borderRadius: "0 2px 2px 0" }} />}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>{ev.name}</div>
            <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Calendar size={10} color={MUTED} />
                <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>{ev.date}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <MapPin size={10} color={MUTED} />
                <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>{ev.city}</span>
              </div>
            </div>
          </div>
          {ev.purchased
            ? <div style={{ background: `${clubColor}15`, border: `1px solid ${clubColor}35`, borderRadius: 10, padding: "4px 9px", display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                <Check size={10} color={clubColor} />
                <span style={{ fontSize: 10, color: clubColor, fontFamily: "Inter", fontWeight: 700 }}>Purchased</span>
              </div>
            : <div style={{ background: ACCENT, borderRadius: 10, padding: "5px 11px", cursor: "pointer", flexShrink: 0 }}>
                <span style={{ fontSize: 11, color: "#fff", fontFamily: "Inter", fontWeight: 700 }}>Buy Tickets</span>
              </div>
          }
        </div>
      ))}
    </>
  );
}

// ── ════════════════════════════════════════════════════════════════════════════
// ── Main screen ───────────────────────────────────────────────────────────────
// ── ════════════════════════════════════════════════════════════════════════════

const PERSONA_META: Record<Persona, { name: string; sub: string; code: string; color: string; tab1: string }> = {
  fan:    { name: "Jordan",  sub: "Men's · Women's · Beach", code: "JD", color: ACCENT,       tab1: "National Teams" },
  junior: { name: "Ava",     sub: "MEVC 16 Elite · 16U",    code: "AV", color: DISC_PURPLE,   tab1: "My Club"        },
  parent: { name: "Michael", sub: "MEVC Parent · Ava's Dad", code: "MD", color: SUCCESS,      tab1: "Club Hub"       },
};

export function HomeScreen() {
  const [persona, setPersona]   = useState<Persona>("fan");
  const [homeTab, setHomeTab]   = useState<"myspace" | "national">("myspace");
  const meta = PERSONA_META[persona];

  const handlePersonaChange = (p: Persona) => {
    setPersona(p);
    setHomeTab("myspace");
  };

  const headerGradients: Record<Persona, string[]> = {
    fan:    ["linear-gradient(135deg, #002080, #001F5B)", "linear-gradient(225deg, rgba(191,13,62,0.22), transparent)"],
    junior: ["linear-gradient(135deg, #0D0020, #001240)", `linear-gradient(225deg, ${DISC_PURPLE}28, transparent)`],
    parent: ["linear-gradient(135deg, #001A10, #001240)", `linear-gradient(225deg, ${SUCCESS}20, transparent)`],
  };

  return (
    <div style={{ width: 390, height: 844, overflowY: "auto", background: BG, fontFamily: "Inter, sans-serif", position: "relative" }}>
      {/* Header gradient */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 280, background: headerGradients[persona][0], zIndex: 0 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 280, background: headerGradients[persona][1], zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, padding: "52px 16px 24px" }}>

        {/* ── Persona switcher (demo only) ─────────────────── */}
        <PersonaSwitcher persona={persona} onChange={handlePersonaChange} />

        {/* ── Greeting ────────────────────────────────────── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: persona !== "fan" ? 14 : 20 }}>
          <div>
            <div style={{ fontSize: 13, color: "rgba(232,236,245,0.55)", fontFamily: "Inter", marginBottom: 2 }}>Good afternoon 👋</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: TEXT, fontFamily: "Inter", letterSpacing: -0.5, lineHeight: "32px" }}>{meta.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5, background: `${meta.color}12`, border: `1px solid ${meta.color}28`, borderRadius: 20, padding: "3px 9px", width: "fit-content" }}>
              <div style={{ width: 5, height: 5, borderRadius: 2.5, background: meta.color }} />
              <span style={{ fontSize: 10, color: meta.color, fontFamily: "Inter", fontWeight: 600 }}>{meta.sub}</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ position: "relative", width: 38, height: 38, borderRadius: 19, background: "rgba(255,255,255,0.06)", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Bell size={17} color="rgba(232,236,245,0.7)" />
              <div style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: 4, background: DANGER, border: `2px solid ${BG}` }} />
            </div>
            <div style={{ width: 38, height: 38, borderRadius: 19, background: `${meta.color}22`, border: `1.5px solid ${meta.color}50`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <span style={{ fontSize: 12, color: meta.color, fontFamily: "Inter", fontWeight: 700 }}>{meta.code}</span>
            </div>
          </div>
        </div>

        {/* ── Home tab bar (junior + parent only) ─────────── */}
        {persona !== "fan" && (
          <div style={{ display: "flex", background: CARD, borderRadius: 14, padding: 3, marginBottom: 20, border: `1px solid ${BORDER}` }}>
            <button
              onClick={() => setHomeTab("myspace")}
              style={{ flex: 1, padding: "9px 0", borderRadius: 11, border: "none", cursor: "pointer", background: homeTab === "myspace" ? meta.color : "transparent", color: homeTab === "myspace" ? "#fff" : MUTED, fontSize: 12, fontFamily: "Inter", fontWeight: 700, transition: "all 0.15s" }}
            >
              {meta.tab1}
            </button>
            <button
              onClick={() => setHomeTab("national")}
              style={{ flex: 1, padding: "9px 0", borderRadius: 11, border: "none", cursor: "pointer", background: homeTab === "national" ? ACCENT : "transparent", color: homeTab === "national" ? "#fff" : MUTED, fontSize: 12, fontFamily: "Inter", fontWeight: 700, transition: "all 0.15s" }}
            >
              National Teams
            </button>
          </div>
        )}

        {/* ── Content ─────────────────────────────────────── */}
        {(persona === "fan" || homeTab === "national") && <FanHome />}
        {persona === "junior" && homeTab === "myspace" && <JuniorHome />}
        {persona === "parent" && homeTab === "myspace" && <ParentHome />}

      </div>
    </div>
  );
}
