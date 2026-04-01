import { Star } from "lucide-react";

const BG = "#000D2E";
const CARD = "#060E2C";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT = "#E8ECF5";
const MUTED = "#6B7A9F";
const ACCENT = "#BF0D3E";
const SUCCESS = "#2DC579";
const DANGER = "#E84855";

function VolleyBall({ size = 24, color = "rgba(255,255,255,0.12)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
      <path d="M12 2 C12 2 8 6 8 12 C8 18 12 22 12 22" stroke={color} strokeWidth="1.5" />
      <path d="M2 12 C2 12 6 8 12 8 C18 8 22 12 22 12" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

const TEAMS = [
  { code: "BRA", name: "Brazil",        country: "Brazil",       wins: 10, losses: 0, form: ["W","W","W","W","W"], pts: 30 },
  { code: "POL", name: "Poland",         country: "Poland",       wins: 9,  losses: 1, form: ["W","W","W","L","W"], pts: 26 },
  { code: "ITA", name: "Italy",          country: "Italy",        wins: 8,  losses: 2, form: ["W","L","W","W","W"], pts: 23 },
  { code: "USA", name: "United States",  country: "USA",          wins: 7,  losses: 3, form: ["W","W","L","W","L"], pts: 20 },
  { code: "FRA", name: "France",         country: "France",       wins: 6,  losses: 4, form: ["L","W","W","L","W"], pts: 17 },
  { code: "SLO", name: "Slovenia",       country: "Slovenia",     wins: 5,  losses: 5, form: ["W","L","L","W","L"], pts: 14 },
];

const PODIUM_MEDALS = ["#FFD700", "#C0C0C0", "#CD7F32"];

function PodiumCard() {
  const top3 = TEAMS.slice(0, 3);
  const order = [1, 0, 2];
  const heights = [72, 96, 56];
  const labels = ["2ND", "1ST", "3RD"];
  const discColor = "#3A7BF5";

  return (
    <div style={{ borderRadius: 20, padding: 20, marginBottom: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #001A50, #000D30)" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${discColor}25, transparent)` }} />
      <div style={{ position: "absolute", right: -20, top: -20 }}>
        <VolleyBall size={120} color="rgba(255,255,255,0.03)" />
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 8, paddingTop: 8 }}>
        {order.map((teamIdx, displayPos) => {
          const team = top3[teamIdx];
          const medal = PODIUM_MEDALS[teamIdx];
          const h = heights[displayPos];
          const lbl = labels[displayPos];
          return (
            <div key={teamIdx} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: 46, height: 46, borderRadius: 23, border: `2px solid ${medal}60`, display: "flex", alignItems: "center", justifyContent: "center", background: `${medal}35`, marginBottom: 4, overflow: "hidden" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: medal, fontFamily: "Inter", letterSpacing: "0.3px" }}>{team.code}</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: TEXT, fontFamily: "Inter", textAlign: "center" }}>{team.name}</span>
              <span style={{ fontSize: 9, color: MUTED, fontFamily: "Inter", textAlign: "center" }}>{team.country}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(232,236,245,0.7)", fontFamily: "Inter", marginBottom: 4 }}>{team.pts} pts</span>
              <div style={{ width: "100%", height: h, background: `${medal}22`, border: `1px solid ${medal}40`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: medal, fontFamily: "Inter", letterSpacing: 1, padding: "6px 0" }}>{lbl}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TeamRow({ team, rank }: { team: typeof TEAMS[0]; rank: number }) {
  const isTop3 = rank <= 3;
  const rankColor = isTop3 ? PODIUM_MEDALS[rank - 1] : undefined;
  const discColor = "#3A7BF5";
  const borderColor = rankColor ?? discColor;

  return (
    <div style={{ display: "flex", alignItems: "center", padding: "11px 14px", borderBottom: `1px solid ${BORDER}`, gap: 8, position: "relative", overflow: "hidden" }}>
      {isTop3 && <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${rankColor}10, transparent)` }} />}
      <div style={{ width: 20, textAlign: "center", flexShrink: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: rankColor ?? MUTED, fontFamily: "Inter" }}>{rank}</span>
      </div>
      <div style={{ width: 34, height: 34, borderRadius: 17, border: `1.5px solid ${borderColor}50`, background: `${borderColor}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: rankColor ?? discColor, fontFamily: "Inter", letterSpacing: "0.3px" }}>{team.code}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>{team.name}</div>
        <div style={{ fontSize: 10, color: MUTED, fontFamily: "Inter", marginTop: 1 }}>{team.country}</div>
      </div>
      <div style={{ display: "flex", gap: 3, width: 75, justifyContent: "center" }}>
        {team.form.map((f, i) => (
          <div key={i} style={{ width: 18, height: 18, borderRadius: 5, background: f === "W" ? "rgba(45,197,121,0.2)" : "rgba(232,72,85,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: f === "W" ? SUCCESS : DANGER, fontFamily: "Inter" }}>{f}</span>
          </div>
        ))}
      </div>
      <span style={{ width: 40, textAlign: "center", fontSize: 12, color: "rgba(232,236,245,0.7)", fontFamily: "Inter", fontWeight: 500 }}>{team.wins}-{team.losses}</span>
      <span style={{ width: 40, textAlign: "center", fontSize: 13, color: ACCENT, fontFamily: "Inter", fontWeight: 700 }}>{team.pts}</span>
      <div style={{ width: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Star size={18} color="#FFD700" fill={rank <= 2 ? "#FFD700" : "transparent"} />
      </div>
    </div>
  );
}

export function StandingsScreen() {
  const tabs = ["Men's", "Women's", "Beach", "Sitting", "NCAA ♀", "NCAA ♂"];

  return (
    <div style={{ width: 390, height: 844, overflowY: "auto", background: BG, fontFamily: "Inter, sans-serif", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220, background: "linear-gradient(135deg, #002080, #001F5B)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220, background: "linear-gradient(225deg, rgba(58,123,245,0.35), transparent)", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, padding: "52px 16px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>Standings</div>
            <div style={{ fontSize: 13, color: "rgba(232,236,245,0.65)", fontFamily: "Inter", marginTop: 2 }}>VNL 2026 Men's</div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: "rgba(58,123,245,0.2)", border: "1px solid rgba(58,123,245,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <VolleyBall size={20} color="#3A7BF5" />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(191,13,62,0.08)", border: "1px solid rgba(191,13,62,0.2)", borderRadius: 20, padding: "5px 12px", width: "fit-content", marginBottom: 16 }}>
          <VolleyBall size={11} color={ACCENT} />
          <span style={{ fontSize: 11, color: ACCENT, fontFamily: "Inter", fontWeight: 600 }}>Powered by USA Volleyball</span>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "hidden" }}>
          {tabs.map((tab, i) => (
            <div key={tab} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 20, background: i === 0 ? "#3A7BF5" : CARD, border: `1px solid ${i === 0 ? "#3A7BF5" : BORDER}`, whiteSpace: "nowrap" }}>
              <span style={{ fontSize: 12, color: "#fff", fontFamily: "Inter", fontWeight: 600 }}>{tab}</span>
            </div>
          ))}
        </div>

        <PodiumCard />

        {/* Table */}
        <div style={{ background: CARD, borderRadius: 18, overflow: "hidden", border: `1px solid ${BORDER}`, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", padding: "10px 14px", background: "#050B25", gap: 8 }}>
            <span style={{ width: 20, fontSize: 10, color: MUTED, fontFamily: "Inter", fontWeight: 600, textAlign: "center" }}>#</span>
            <div style={{ width: 34 }} />
            <span style={{ flex: 1, fontSize: 10, color: MUTED, fontFamily: "Inter", fontWeight: 600 }}>Team</span>
            <span style={{ width: 75, fontSize: 10, color: MUTED, fontFamily: "Inter", fontWeight: 600, textAlign: "center" }}>Form</span>
            <span style={{ width: 40, fontSize: 10, color: MUTED, fontFamily: "Inter", fontWeight: 600, textAlign: "center" }}>W-L</span>
            <span style={{ width: 40, fontSize: 10, color: ACCENT, fontFamily: "Inter", fontWeight: 600, textAlign: "center" }}>Pts</span>
            <div style={{ width: 28 }} />
          </div>
          {TEAMS.map((team, i) => <TeamRow key={team.code} team={team} rank={i + 1} />)}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 20, paddingLeft: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: SUCCESS }} />
            <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>Win</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: DANGER }} />
            <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>Loss</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Star size={11} color="#FFD700" fill="#FFD700" />
            <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>Favorite</span>
          </div>
        </div>
      </div>
    </div>
  );
}
