import { Trophy } from "lucide-react";

const BG = "#000D2E";
const CARD = "#060E2C";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT = "#E8ECF5";
const MUTED = "#6B7A9F";
const ACCENT = "#BF0D3E";

function VolleyBall({ size = 24, color = "rgba(255,255,255,0.12)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
      <path d="M12 2 C12 2 8 6 8 12 C8 18 12 22 12 22" stroke={color} strokeWidth="1.5" />
      <path d="M2 12 C2 12 6 8 12 8 C18 8 22 12 22 12" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

const MATCHES = [
  { home: "Brazil", away: "Italy", homeScore: 3, awayScore: 1, status: "live", tournament: "VNL 2026", disc: "mens", discColor: "#3A7BF5", set: 4 },
  { home: "USA", away: "France", homeScore: 0, awayScore: 0, status: "upcoming", tournament: "VNL 2026", disc: "mens", discColor: "#3A7BF5", time: "18:00 UTC", date: "Jun 14" },
  { home: "Egonu/Pietrini", away: "Sweat/Stack", homeScore: 2, awayScore: 1, status: "live", tournament: "Beach Pro Tour", disc: "beach", discColor: "#F5A623", set: 3 },
  { home: "Poland", away: "Japan", homeScore: 3, awayScore: 0, status: "finished", tournament: "VNL 2026", disc: "mens", discColor: "#3A7BF5" },
  { home: "Serbia", away: "Turkey", homeScore: 0, awayScore: 0, status: "upcoming", tournament: "VNL 2026", disc: "womens", discColor: "#E04E8A", time: "20:00 UTC", date: "Jun 14" },
  { home: "Netherlands", away: "China", homeScore: 2, awayScore: 3, status: "finished", tournament: "VNL 2026", disc: "womens", discColor: "#E04E8A" },
];

function MatchCard({ match }: { match: typeof MATCHES[0] }) {
  const isLive    = match.status === "live";
  const isUpcoming = match.status === "upcoming";
  const teamColor = isLive ? "#E84855" : isUpcoming ? "#5B8DEF" : MUTED;

  return (
    <div style={{ background: CARD, borderRadius: 18, padding: 16, marginBottom: 12, border: isLive ? "1px solid rgba(232,72,85,0.35)" : `1px solid ${BORDER}`, overflow: "hidden", position: "relative" }}>
      {isLive && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(232,72,85,0.08), transparent)" }} />}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Trophy size={10} color={ACCENT} />
          <span style={{ fontSize: 10, color: ACCENT, fontFamily: "Inter", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>{match.tournament}</span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: MUTED, display: "inline-block", margin: "0 2px" }} />
          <span style={{ fontSize: 10, color: match.discColor, fontFamily: "Inter", fontWeight: 600 }}>{match.disc === "mens" ? "Men's" : match.disc === "womens" ? "Women's" : match.disc === "beach" ? "Beach" : match.disc}</span>
        </div>
        {isLive && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(232,72,85,0.18)", border: "1px solid rgba(232,72,85,0.4)", borderRadius: 20, padding: "4px 10px" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#E84855", display: "inline-block" }} />
            <span style={{ fontSize: 10, color: "#E84855", fontFamily: "Inter", fontWeight: 700, letterSpacing: 1.5 }}>LIVE</span>
          </div>
        )}
        {isUpcoming && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(91,141,239,0.12)", border: "1px solid rgba(91,141,239,0.3)", borderRadius: 20, padding: "4px 10px" }}>
            <span style={{ fontSize: 10, color: "#5B8DEF", fontFamily: "Inter", fontWeight: 600 }}>{match.date}</span>
          </div>
        )}
        {!isLive && !isUpcoming && (
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 6, padding: "3px 8px" }}>
            <span style={{ fontSize: 9, color: MUTED, fontFamily: "Inter", fontWeight: 700, letterSpacing: 1 }}>FINAL</span>
          </div>
        )}
      </div>

      {/* Court */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }}>
        {/* Home */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 44, height: 44, borderRadius: 22, border: `1.5px solid ${teamColor}40`, background: `${teamColor}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: teamColor, fontFamily: "Inter" }}>{match.home.split(/[ /]/)[0].slice(0, 3).toUpperCase()}</span>
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: TEXT, fontFamily: "Inter", textAlign: "center" }}>{match.home}</span>
        </div>

        {/* Center */}
        <div style={{ width: 90, display: "flex", flexDirection: "column", alignItems: "center" }}>
          {isUpcoming ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ marginBottom: 2 }}>
                <VolleyBall size={22} color="rgba(255,255,255,0.08)" />
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: "rgba(232,236,245,0.65)", fontFamily: "Inter", letterSpacing: 2 }}>VS</span>
              <span style={{ fontSize: 10, color: MUTED, fontFamily: "Inter" }}>{match.time}</span>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: !isLive && match.homeScore > match.awayScore ? TEXT : "rgba(232,236,245,0.5)", fontFamily: "Inter" }}>{match.homeScore}</span>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <VolleyBall size={14} color="rgba(255,255,255,0.12)" />
              </div>
              <span style={{ fontSize: 32, fontWeight: 700, color: !isLive && match.awayScore > match.homeScore ? TEXT : "rgba(232,236,245,0.5)", fontFamily: "Inter" }}>{match.awayScore}</span>
            </div>
          )}
        </div>

        {/* Away */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 44, height: 44, borderRadius: 22, border: `1.5px solid ${teamColor}40`, background: `${teamColor}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: teamColor, fontFamily: "Inter" }}>{match.away.split(/[ /]/)[0].slice(0, 3).toUpperCase()}</span>
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: TEXT, fontFamily: "Inter", textAlign: "center" }}>{match.away}</span>
        </div>
      </div>

      {isLive && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 10 }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: ACCENT }} />
          <span style={{ fontSize: 11, color: ACCENT, fontFamily: "Inter", fontWeight: 500 }}>Set {match.set} in progress</span>
        </div>
      )}
    </div>
  );
}

export function MatchesScreen() {
  const statusTabs = ["All", "Live", "Upcoming", "Finished"];
  const discTabs = ["All", "Men's", "Women's", "Beach", "Sitting"];
  const liveCount = MATCHES.filter(m => m.status === "live").length;

  return (
    <div style={{ width: 390, height: 844, overflowY: "auto", background: BG, fontFamily: "Inter, sans-serif", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220, background: "linear-gradient(135deg, #002080, #001F5B)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220, background: "linear-gradient(225deg, rgba(232,72,85,0.20), transparent)", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, padding: "52px 16px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>Matches</div>
            <div style={{ fontSize: 13, color: "rgba(232,236,245,0.65)", fontFamily: "Inter", marginTop: 2 }}>Live scores & schedules</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(232,72,85,0.18)", border: "1px solid rgba(232,72,85,0.4)", borderRadius: 20, padding: "5px 10px" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E84855", display: "inline-block" }} />
              <span style={{ fontSize: 11, color: "#E84855", fontFamily: "Inter", fontWeight: 700, letterSpacing: 0.5 }}>{liveCount} LIVE</span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(191,13,62,0.08)", border: "1px solid rgba(191,13,62,0.2)", borderRadius: 20, padding: "5px 12px", width: "fit-content", marginBottom: 16 }}>
          <VolleyBall size={11} color={ACCENT} />
          <span style={{ fontSize: 11, color: ACCENT, fontFamily: "Inter", fontWeight: 600 }}>Powered by USA Volleyball</span>
        </div>

        {/* Status tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12, overflowX: "hidden" }}>
          {statusTabs.map((tab, i) => (
            <div key={tab} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 20, background: i === 0 ? ACCENT : CARD, border: `1px solid ${i === 0 ? ACCENT : BORDER}`, whiteSpace: "nowrap" }}>
              <span style={{ fontSize: 12, color: "#fff", fontFamily: "Inter", fontWeight: 600 }}>{tab}</span>
            </div>
          ))}
        </div>

        {/* Discipline tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "hidden" }}>
          {discTabs.map((tab, i) => {
            const colors = ["#BF0D3E", "#3A7BF5", "#E04E8A", "#F5A623", "#44C98E"];
            const isActive = i === 0;
            return (
              <div key={tab} style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 13px", borderRadius: 20, background: isActive ? colors[0] : CARD, border: `1px solid ${isActive ? colors[0] : BORDER}`, whiteSpace: "nowrap" }}>
                <span style={{ fontSize: 12, color: "#fff", fontFamily: "Inter", fontWeight: 600 }}>{tab}</span>
              </div>
            );
          })}
        </div>

        {/* Section: Live */}
        <div style={{ marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: "#E84855", display: "inline-block" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#E84855", fontFamily: "Inter", letterSpacing: "0.8px", textTransform: "uppercase" }}>Live Now</span>
          </div>
          {MATCHES.filter(m => m.status === "live").map((m, i) => <MatchCard key={i} match={m} />)}
        </div>

        {/* Section: Upcoming */}
        <div style={{ marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: "#5B8DEF", display: "inline-block" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(232,236,245,0.65)", fontFamily: "Inter", letterSpacing: "0.8px", textTransform: "uppercase" }}>Upcoming</span>
          </div>
          {MATCHES.filter(m => m.status === "upcoming").map((m, i) => <MatchCard key={i} match={m} />)}
        </div>

        {/* Section: Finished */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: MUTED, display: "inline-block" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(232,236,245,0.65)", fontFamily: "Inter", letterSpacing: "0.8px", textTransform: "uppercase" }}>Results</span>
          </div>
          {MATCHES.filter(m => m.status === "finished").map((m, i) => <MatchCard key={i} match={m} />)}
        </div>
      </div>
    </div>
  );
}
