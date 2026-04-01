const BG = "#000D2E";
const CARD = "#060E2C";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT = "#E8ECF5";
const MUTED = "#6B7A9F";
const ACCENT = "#BF0D3E";

const RANK_GRADIENTS = [
  ["#FFD700", "#FFA500"],
  ["#C0C0C0", "#A0A0A0"],
  ["#CD7F32", "#A0522D"],
] as const;

const POS_COLORS: Record<string, string> = {
  "OH": "#3A7BF5", "OPP": "#E04E8A", "MB": "#F5A623", "S": "#44C98E", "L": "#9B59B6",
};

function VolleyBall({ size = 24, color = "rgba(255,255,255,0.12)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
      <path d="M12 2 C12 2 8 6 8 12 C8 18 12 22 12 22" stroke={color} strokeWidth="1.5" />
      <path d="M2 12 C2 12 6 8 12 8 C18 8 22 12 22 12" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

const PLAYERS = [
  { name: "Wilfredo León",    code: "WL", pos: "OH",  team: "Perugia",    country: "CUB", pts: 312, pct: 0.97 },
  { name: "Earvin N'Gapeth",  code: "EN", pos: "OH",  team: "Modena",     country: "FRA", pts: 289, pct: 0.90 },
  { name: "Ivan Zaytsev",     code: "IZ", pos: "OPP", team: "Monza",      country: "ITA", pts: 271, pct: 0.85 },
  { name: "Bartosz Kurek",    code: "BK", pos: "OPP", team: "ZAKSA",      country: "POL", pts: 253, pct: 0.79 },
  { name: "Matt Anderson",    code: "MA", pos: "OH",  team: "USA",        country: "USA", pts: 238, pct: 0.74 },
  { name: "Lucas Saatkamp",   code: "LS", pos: "MB",  team: "Modena",     country: "BRA", pts: 212, pct: 0.66 },
];

function LeaderCard() {
  const leader = PLAYERS[0];
  const discColor = "#3A7BF5";
  const posColor = POS_COLORS[leader.pos] ?? "#3A7BF5";

  return (
    <div style={{ borderRadius: 20, padding: 18, marginBottom: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${discColor}30, #001F5B)` }} />
      <div style={{ position: "absolute", right: -10, top: -10 }}>
        <VolleyBall size={90} color="rgba(255,255,255,0.04)" />
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 9, color: ACCENT, fontFamily: "Inter", fontWeight: 700, letterSpacing: 2 }}>LEADER · POINTS</span>
          <span style={{ fontSize: 20, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>{leader.name}</span>
          <span style={{ fontSize: 12, color: "rgba(232,236,245,0.65)", fontFamily: "Inter" }}>{leader.team} · {leader.country}</span>
        </div>
        <div style={{ alignItems: "center", padding: "10px 16px", background: "rgba(255,255,255,0.06)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)", minWidth: 72, display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 30, fontWeight: 700, color: discColor, fontFamily: "Inter", lineHeight: "34px" }}>{leader.pts}</span>
          <span style={{ fontSize: 9, color: MUTED, fontFamily: "Inter", fontWeight: 700, letterSpacing: 1.5, marginTop: 2 }}>PTS</span>
        </div>
      </div>
    </div>
  );
}

function PlayerCard({ player, rank }: { player: typeof PLAYERS[0]; rank: number }) {
  const isTop3 = rank <= 3;
  const rankGradient = isTop3 ? RANK_GRADIENTS[rank - 1] : null;
  const posColor = POS_COLORS[player.pos] ?? "#3A7BF5";
  const discColor = "#3A7BF5";
  const initials = player.code;

  return (
    <div style={{ display: "flex", alignItems: "center", background: CARD, borderRadius: 16, padding: 13, marginBottom: 8, border: `${isTop3 ? "1.5px" : "1px"} solid ${isTop3 ? `${rankGradient![0]}40` : BORDER}`, gap: 10, overflow: "hidden", position: "relative" }}>
      {isTop3 && <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${rankGradient![0]}12, transparent)` }} />}
      {!isTop3 && <span style={{ width: 20, fontSize: 13, color: MUTED, fontFamily: "Inter", fontWeight: 700, textAlign: "center", flexShrink: 0 }}>{rank}</span>}

      {/* Avatar */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{ width: 46, height: 46, borderRadius: 23, border: `1.5px solid ${posColor}60`, background: `${discColor}45`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -4, left: -4 }}>
            <VolleyBall size={36} color={`${posColor}18`} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: posColor, fontFamily: "Inter", position: "relative" }}>{initials}</span>
        </div>
        {isTop3 && (
          <div style={{ position: "absolute", bottom: -3, right: -3, width: 18, height: 18, borderRadius: 9, background: `linear-gradient(135deg, ${rankGradient![0]}, ${rankGradient![1]})`, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(0,0,0,0.3)" }}>
            <span style={{ fontSize: 8, color: "#000", fontFamily: "Inter", fontWeight: 700 }}>{rank}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: TEXT, fontFamily: "Inter", flex: 1 }}>{player.name}</span>
          <div style={{ background: `${posColor}20`, border: `1px solid ${posColor}40`, borderRadius: 4, padding: "2px 6px", flexShrink: 0 }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: posColor, fontFamily: "Inter", letterSpacing: "0.3px" }}>{player.pos}</span>
          </div>
        </div>
        <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>{player.team} · {player.country}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
          <div style={{ flex: 1, height: 4, background: "#0B1535", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: 4, borderRadius: 2, width: `${player.pct * 100}%`, background: `linear-gradient(to right, ${discColor}, ${discColor}60)` }} />
          </div>
          <span style={{ fontSize: 9, color: MUTED, fontFamily: "Inter", fontWeight: 500, width: 28, textAlign: "right" }}>{Math.round(player.pct * 100)}%</span>
        </div>
      </div>

      {/* Stat */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, minWidth: 46 }}>
        <span style={{ fontSize: 24, fontWeight: 700, color: isTop3 ? rankGradient![0] : ACCENT, fontFamily: "Inter", lineHeight: "28px" }}>{player.pts}</span>
        <span style={{ fontSize: 9, color: MUTED, fontFamily: "Inter", fontWeight: 700, letterSpacing: 1 }}>PTS</span>
      </div>
    </div>
  );
}

export function PlayersScreen() {
  const statTabs = ["Points", "Aces", "Blocks", "Digs"];
  const discTabs = [{ label: "All", color: "#BF0D3E" }, { label: "Men's", color: "#3A7BF5" }, { label: "Women's", color: "#E04E8A" }, { label: "Beach", color: "#F5A623" }];

  return (
    <div style={{ width: 390, height: 844, overflowY: "auto", background: BG, fontFamily: "Inter, sans-serif", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220, background: "linear-gradient(135deg, #002080, #001F5B)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220, background: "linear-gradient(225deg, rgba(58,123,245,0.30), transparent)", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, padding: "52px 16px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>Players</div>
            <div style={{ fontSize: 13, color: "rgba(232,236,245,0.65)", fontFamily: "Inter", marginTop: 2 }}>Season Points</div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: "rgba(58,123,245,0.2)", border: "1px solid rgba(58,123,245,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <VolleyBall size={20} color="#3A7BF5" />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(191,13,62,0.08)", border: "1px solid rgba(191,13,62,0.2)", borderRadius: 20, padding: "5px 12px", width: "fit-content", marginBottom: 16 }}>
          <VolleyBall size={11} color={ACCENT} />
          <span style={{ fontSize: 11, color: ACCENT, fontFamily: "Inter", fontWeight: 600 }}>Powered by USA Volleyball</span>
        </div>

        <LeaderCard />

        {/* Discipline tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 10, overflowX: "hidden" }}>
          {discTabs.map((tab, i) => (
            <div key={tab.label} style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 13px", borderRadius: 20, background: i === 0 ? tab.color : CARD, border: `1px solid ${i === 0 ? tab.color : BORDER}`, whiteSpace: "nowrap" }}>
              <span style={{ fontSize: 12, color: "#fff", fontFamily: "Inter", fontWeight: 600 }}>{tab.label}</span>
            </div>
          ))}
        </div>

        {/* Stat tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "hidden" }}>
          {statTabs.map((tab, i) => (
            <div key={tab} style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 13px", borderRadius: 20, background: i === 0 ? ACCENT : CARD, border: `1px solid ${i === 0 ? ACCENT : BORDER}`, whiteSpace: "nowrap" }}>
              <span style={{ fontSize: 12, color: "#fff", fontFamily: "Inter", fontWeight: 600 }}>{tab}</span>
            </div>
          ))}
        </div>

        {/* Player cards */}
        <div>
          {PLAYERS.map((player, i) => <PlayerCard key={i} player={player} rank={i + 1} />)}
        </div>
      </div>
    </div>
  );
}
