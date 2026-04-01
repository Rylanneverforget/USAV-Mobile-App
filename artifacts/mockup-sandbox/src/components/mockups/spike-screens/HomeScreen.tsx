import { Star, ChevronRight, Calendar, AlertCircle } from "lucide-react";

const BG = "#000D2E";
const CARD = "#060E2C";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT = "#E8ECF5";
const MUTED = "#6B7A9F";
const ACCENT = "#BF0D3E";
const SUCCESS = "#2DC579";

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

function StatStrip() {
  const stats = [
    { val: "2", label: "Live Now" },
    { val: "5", label: "Upcoming" },
    { val: "3", label: "Disciplines" },
    { val: "4", label: "Favorites" },
  ];
  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "14px 0", display: "flex", marginBottom: 14 }}>
      {stats.map((s, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, borderRight: i < 3 ? `1px solid ${BORDER}` : "none" }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>{s.val}</span>
          <span style={{ fontSize: 10, color: MUTED, fontFamily: "Inter", letterSpacing: "0.3px" }}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function SpotlightCard() {
  const discColor = "#3A7BF5";
  return (
    <div style={{ borderRadius: 20, marginBottom: 16, overflow: "hidden", border: "1px solid rgba(232,72,85,0.4)", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0A2E80, #001A50)" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${discColor}25, transparent)` }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(225deg, rgba(232,72,85,0.15), transparent)" }} />
      <div style={{ position: "absolute", left: -15, top: -15, opacity: 1 }}>
        <VolleyBall size={130} color="rgba(255,255,255,0.03)" />
      </div>
      <div style={{ position: "relative", padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.07)", borderRadius: 8, padding: "5px 10px" }}>
            <span style={{ fontSize: 11, color: discColor, fontFamily: "Inter", fontWeight: 600 }}>Men's</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(232,72,85,0.2)", border: "1px solid rgba(232,72,85,0.5)", borderRadius: 20, padding: "5px 10px" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#E84855", display: "inline-block" }} />
            <span style={{ fontSize: 11, color: "#E84855", fontFamily: "Inter", fontWeight: 700, letterSpacing: 1 }}>LIVE NOW</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 52, height: 52, borderRadius: 26, border: `1.5px solid ${discColor}50`, display: "flex", alignItems: "center", justifyContent: "center", background: `${discColor}30`, position: "relative", overflow: "hidden" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: discColor, fontFamily: "Inter", letterSpacing: "0.5px" }}>BRA</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: TEXT, fontFamily: "Inter", textAlign: "center" }}>Brazil</span>
          </div>
          <div style={{ width: 100, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 36, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>2</span>
              <span style={{ fontSize: 24, color: MUTED, fontFamily: "Inter" }}>:</span>
              <span style={{ fontSize: 36, fontWeight: 700, color: "rgba(232,245,255,0.5)", fontFamily: "Inter" }}>1</span>
            </div>
            <span style={{ fontSize: 9, color: MUTED, fontFamily: "Inter", letterSpacing: "0.5px", textTransform: "uppercase" }}>VNL 2026</span>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 52, height: 52, borderRadius: 26, border: `1.5px solid ${discColor}50`, display: "flex", alignItems: "center", justifyContent: "center", background: `${discColor}30`, overflow: "hidden" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: discColor, fontFamily: "Inter", letterSpacing: "0.5px" }}>ITA</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: TEXT, fontFamily: "Inter", textAlign: "center" }}>Italy</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DisciplineSection({ color, label, tournament }: { color: string; label: string; tournament: string }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, borderLeft: `3px solid ${color}`, borderRadius: 12, padding: "11px 14px", marginBottom: 12, background: `${color}10`, border: `1px solid rgba(255,255,255,0.06)`, borderLeftColor: color, position: "relative", overflow: "hidden" }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <VolleyBall size={14} color="rgba(255,255,255,0.8)" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color, fontFamily: "Inter" }}>{label}</div>
          <div style={{ fontSize: 10, color: MUTED, fontFamily: "Inter", marginTop: 1 }}>{tournament}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(255,215,0,0.1)", borderRadius: 10, padding: "3px 7px" }}>
          <Star size={9} fill="#FFD700" color="#FFD700" />
          <span style={{ fontSize: 10, color: "#FFD700", fontWeight: 700, fontFamily: "Inter" }}>2</span>
        </div>
      </div>
      <MatchCardMini color={color} home="Brazil" away="Italy" homeScore={2} awayScore={1} isLive={true} />
      <NewsCardMini color={color} category="VNL 2026" title="Brazil continues dominant run in men's VNL with 5th straight victory" />
    </div>
  );
}

function MatchCardMini({ color, home, away, homeScore, awayScore, isLive }: any) {
  return (
    <div style={{ background: CARD, borderRadius: 18, padding: 16, marginBottom: 12, border: isLive ? "1px solid rgba(232,72,85,0.35)" : `1px solid ${BORDER}`, overflow: "hidden", position: "relative" }}>
      {isLive && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(232,72,85,0.08), transparent)" }} />}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, position: "relative" }}>
        <span style={{ fontSize: 10, color: ACCENT, fontFamily: "Inter", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>VNL 2026</span>
        {isLive && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(232,72,85,0.18)", border: "1px solid rgba(232,72,85,0.4)", borderRadius: 20, padding: "4px 10px" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#E84855", display: "inline-block" }} />
            <span style={{ fontSize: 10, color: "#E84855", fontFamily: "Inter", fontWeight: 700, letterSpacing: 1.5 }}>LIVE</span>
          </div>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 44, height: 44, borderRadius: 22, border: `1.5px solid ${color}40`, background: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color, fontFamily: "Inter" }}>{home.slice(0,3).toUpperCase()}</span>
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: TEXT, fontFamily: "Inter", textAlign: "center" }}>{home}</span>
        </div>
        <div style={{ width: 90, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 32, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>{homeScore}</span>
            <span style={{ fontSize: 18, color: MUTED, fontFamily: "Inter" }}>:</span>
            <span style={{ fontSize: 32, fontWeight: 700, color: "rgba(232,245,255,0.5)", fontFamily: "Inter" }}>{awayScore}</span>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 44, height: 44, borderRadius: 22, border: `1.5px solid ${color}40`, background: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color, fontFamily: "Inter" }}>{away.slice(0,3).toUpperCase()}</span>
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: TEXT, fontFamily: "Inter", textAlign: "center" }}>{away}</span>
        </div>
      </div>
    </div>
  );
}

function NewsCardMini({ color, category, title }: any) {
  return (
    <div style={{ background: CARD, borderRadius: 16, marginBottom: 10, border: `1px solid ${BORDER}`, display: "flex", overflow: "hidden" }}>
      <div style={{ width: 88, flexShrink: 0, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${color}50, #001F5B)` }} />
        <div style={{ position: "absolute", top: -4, left: -8 }}>
          <VolleyBall size={50} color={`${color}25`} />
        </div>
        <VolleyBall size={22} color="rgba(255,255,255,0.7)" />
      </div>
      <div style={{ flex: 1, padding: 14, display: "flex", flexDirection: "column", gap: 7, justifyContent: "center" }}>
        <div style={{ background: `${color}18`, borderRadius: 4, padding: "3px 7px", alignSelf: "flex-start" }}>
          <span style={{ fontSize: 9, color, fontFamily: "Inter", fontWeight: 700, letterSpacing: "0.5px" }}>{category}</span>
        </div>
        <span style={{ fontSize: 14, color: TEXT, fontFamily: "Inter", fontWeight: 600, lineHeight: "20px" }}>{title}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>Jun 12</span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: MUTED, display: "inline-block" }} />
          <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>4 min</span>
        </div>
      </div>
    </div>
  );
}

export function HomeScreen() {
  return (
    <div style={{ width: 390, height: 844, overflowY: "auto", background: BG, fontFamily: "Inter, sans-serif", position: "relative" }}>
      {/* Header gradient */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 280, background: "linear-gradient(135deg, #002080, #001F5B)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 280, background: "linear-gradient(225deg, rgba(191,13,62,0.22), transparent)", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, padding: "52px 16px 20px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 30, fontWeight: 700, color: TEXT, fontFamily: "Inter", letterSpacing: -0.5 }}>Spike</div>
            <div style={{ fontSize: 13, color: "rgba(232,236,245,0.65)", fontFamily: "Inter", marginTop: 2 }}>Train hard, play harder.</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(232,72,85,0.18)", border: "1px solid rgba(232,72,85,0.4)", borderRadius: 20, padding: "5px 10px" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E84855", display: "inline-block" }} />
              <span style={{ fontSize: 11, color: "#E84855", fontFamily: "Inter", fontWeight: 700, letterSpacing: 0.5 }}>2 LIVE</span>
            </div>
            <div style={{ width: 36, height: 36, borderRadius: 18, background: "rgba(191,13,62,0.2)", border: "1.5px solid rgba(191,13,62,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 13, color: ACCENT, fontFamily: "Inter", fontWeight: 700 }}>JD</span>
            </div>
          </div>
        </div>

        {/* USAV bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(191,13,62,0.08)", border: "1px solid rgba(191,13,62,0.2)", borderRadius: 20, padding: "5px 12px", alignSelf: "flex-start", marginBottom: 14, width: "fit-content" }}>
          <VolleyBall size={11} color={ACCENT} />
          <span style={{ fontSize: 11, color: ACCENT, fontFamily: "Inter", fontWeight: 600, letterSpacing: "0.3px" }}>Powered by USA Volleyball</span>
        </div>

        <StatStrip />
        <SpotlightCard />

        {/* Interest chips */}
        <div style={{ display: "flex", gap: 8, marginBottom: 14, overflowX: "hidden" }}>
          {["Live", "Results", "Stats", "Training"].map((chip) => (
            <div key={chip} style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(191,13,62,0.1)", border: "1px solid rgba(191,13,62,0.22)", borderRadius: 20, padding: "6px 12px", whiteSpace: "nowrap" }}>
              <span style={{ fontSize: 12, color: ACCENT, fontFamily: "Inter", fontWeight: 500 }}>{chip}</span>
            </div>
          ))}
        </div>

        {/* Discipline filter */}
        <div style={{ display: "flex", gap: 8, marginBottom: 18, overflowX: "hidden" }}>
          <div style={{ background: ACCENT, borderRadius: 20, padding: "7px 13px", border: `1px solid ${ACCENT}` }}>
            <span style={{ fontSize: 12, color: "#fff", fontFamily: "Inter", fontWeight: 600 }}>All</span>
          </div>
          {[{ label: "Men's", color: "#3A7BF5" }, { label: "Women's", color: "#E04E8A" }, { label: "Beach", color: "#F5A623" }].map(({ label, color }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 5, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "7px 13px" }}>
              <span style={{ fontSize: 12, color: "rgba(232,236,245,0.65)", fontFamily: "Inter", fontWeight: 600 }}>{label}</span>
            </div>
          ))}
        </div>

        <DisciplineSection color="#3A7BF5" label="Men's" tournament="VNL 2026" />
        <DisciplineSection color="#E04E8A" label="Women's" tournament="VNL 2026" />
      </div>
    </div>
  );
}
