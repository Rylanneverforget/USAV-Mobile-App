import { useState } from "react";
import { Shield, TrendingUp, Award } from "lucide-react";

const BG     = "#000D2E";
const CARD   = "#060E2C";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT   = "#E8ECF5";
const MUTED  = "#6B7A9F";
const ACCENT = "#BF0D3E";
const GOLD   = "#FFD700";
const SILVER = "#C0C0C0";
const BRONZE = "#CD7F32";

function VolleyBall({ size = 24, color = "rgba(255,255,255,0.12)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
      <path d="M12 2 C12 2 8 6 8 12 C8 18 12 22 12 22" stroke={color} strokeWidth="1.5" />
      <path d="M2 12 C2 12 6 8 12 8 C18 8 22 12 22 12" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// ── Medal data: all-time Olympic volleyball medals by discipline ────────────────

type Row = { code: string; name: string; g: number; s: number; b: number; total: number; usa?: boolean };

const ALL: Row[] = [
  { code: "USA", name: "United States",  g: 8,  s: 8,  b: 6,  total: 22, usa: true },
  { code: "BRA", name: "Brazil",         g: 7,  s: 7,  b: 5,  total: 19 },
  { code: "RUS", name: "Russia/USSR",    g: 7,  s: 4,  b: 3,  total: 14 },
  { code: "CHN", name: "China",          g: 4,  s: 3,  b: 3,  total: 10 },
  { code: "CUB", name: "Cuba",           g: 3,  s: 2,  b: 1,  total:  6 },
  { code: "ITA", name: "Italy",          g: 2,  s: 4,  b: 4,  total: 10 },
  { code: "JPN", name: "Japan",          g: 2,  s: 3,  b: 3,  total:  8 },
  { code: "GER", name: "Germany",        g: 2,  s: 2,  b: 2,  total:  6 },
];

const WOMENS: Row[] = [
  { code: "USA", name: "United States",  g: 2,  s: 3,  b: 2,  total: 7, usa: true },
  { code: "BRA", name: "Brazil",         g: 3,  s: 2,  b: 1,  total: 6 },
  { code: "RUS", name: "Russia/USSR",    g: 4,  s: 1,  b: 1,  total: 6 },
  { code: "CUB", name: "Cuba",           g: 3,  s: 1,  b: 0,  total: 4 },
  { code: "CHN", name: "China",          g: 2,  s: 2,  b: 1,  total: 5 },
  { code: "JPN", name: "Japan",          g: 1,  s: 2,  b: 2,  total: 5 },
];

const MENS: Row[] = [
  { code: "RUS", name: "Russia/USSR",    g: 4,  s: 3,  b: 2,  total: 9 },
  { code: "USA", name: "United States",  g: 3,  s: 0,  b: 2,  total: 5, usa: true },
  { code: "BRA", name: "Brazil",         g: 3,  s: 3,  b: 0,  total: 6 },
  { code: "ITA", name: "Italy",          g: 1,  s: 3,  b: 2,  total: 6 },
  { code: "POL", name: "Poland",         g: 2,  s: 0,  b: 0,  total: 2 },
  { code: "FRA", name: "France",         g: 2,  s: 0,  b: 0,  total: 2 },
];

const BEACH: Row[] = [
  { code: "USA", name: "United States",  g: 4,  s: 4,  b: 3,  total: 11, usa: true },
  { code: "BRA", name: "Brazil",         g: 3,  s: 4,  b: 3,  total: 10 },
  { code: "AUS", name: "Australia",      g: 2,  s: 0,  b: 1,  total:  3 },
  { code: "GER", name: "Germany",        g: 1,  s: 2,  b: 2,  total:  5 },
  { code: "NOR", name: "Norway",         g: 0,  s: 2,  b: 1,  total:  3 },
  { code: "LAT", name: "Latvia",         g: 1,  s: 1,  b: 0,  total:  2 },
];

const TABS: { key: "all" | "womens" | "mens" | "beach"; label: string; data: Row[]; color: string }[] = [
  { key: "all",    label: "All-Time",  data: ALL,    color: ACCENT     },
  { key: "womens", label: "Women's",   data: WOMENS, color: "#E04E8A" },
  { key: "mens",   label: "Men's",     data: MENS,   color: "#3A7BF5" },
  { key: "beach",  label: "Beach",     data: BEACH,  color: "#F5A623" },
];

// ── USA spotlight card ─────────────────────────────────────────────────────────
function UsaSpotlight({ data, discColor }: { data: Row[]; discColor: string }) {
  const usa = data.find(r => r.usa)!;
  const rank = data.findIndex(r => r.usa) + 1;
  const total = data.length;

  // bar widths relative to max in set
  const maxMedal = Math.max(...data.map(r => r.g + r.s + r.b));
  const usaTotal = usa.g + usa.s + usa.b;

  return (
    <div style={{ borderRadius: 22, marginBottom: 18, overflow: "hidden", border: `1px solid rgba(191,13,62,0.35)`, position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1A0014, #001240)" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${ACCENT}22, transparent)` }} />
      <div style={{ position: "absolute", right: -20, top: -20, opacity: 0.4 }}>
        <VolleyBall size={180} color={`${ACCENT}15`} />
      </div>
      <div style={{ position: "relative", padding: 18 }}>
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 32, height: 32, borderRadius: 16, background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 10, color: "#fff", fontFamily: "Inter", fontWeight: 800 }}>USA</span>
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>United States</div>
              <div style={{ fontSize: 11, color: "rgba(232,236,245,0.5)", fontFamily: "Inter" }}>Olympic Volleyball · All-Time</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(0,0,0,0.35)", borderRadius: 12, padding: "8px 14px", border: "1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ fontSize: 26, fontWeight: 700, color: discColor === ACCENT ? "#FFD700" : discColor, fontFamily: "Inter", lineHeight: "30px" }}>#{rank}</span>
            <span style={{ fontSize: 9, color: MUTED, fontFamily: "Inter", letterSpacing: "0.5px" }}>WORLD RANK</span>
          </div>
        </div>

        {/* Medal counts */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          {[
            { label: "GOLD",   count: usa.g, color: GOLD   },
            { label: "SILVER", count: usa.s, color: SILVER },
            { label: "BRONZE", count: usa.b, color: BRONZE },
            { label: "TOTAL",  count: usa.total, color: discColor === ACCENT ? "#FFD700" : discColor },
          ].map(m => (
            <div key={m.label} style={{ flex: 1, background: `${m.color}14`, border: `1px solid ${m.color}30`, borderRadius: 12, padding: "10px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: m.color, fontFamily: "Inter", lineHeight: "26px" }}>{m.count}</span>
              <span style={{ fontSize: 8, color: MUTED, fontFamily: "Inter", letterSpacing: "0.8px" }}>{m.label}</span>
            </div>
          ))}
        </div>

        {/* Medal bar */}
        <div style={{ marginBottom: 4 }}>
          <div style={{ height: 8, borderRadius: 4, overflow: "hidden", background: "rgba(255,255,255,0.06)", display: "flex" }}>
            <div style={{ width: `${(usa.g / usaTotal) * 100}%`, background: GOLD,   height: "100%" }} />
            <div style={{ width: `${(usa.s / usaTotal) * 100}%`, background: SILVER, height: "100%" }} />
            <div style={{ width: `${(usa.b / usaTotal) * 100}%`, background: BRONZE, height: "100%" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {[{ c: GOLD, l: "Gold" }, { c: SILVER, l: "Silver" }, { c: BRONZE, l: "Bronze" }].map(m => (
            <div key={m.l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: 3.5, background: m.c }} />
              <span style={{ fontSize: 10, color: "rgba(232,236,245,0.45)", fontFamily: "Inter" }}>{m.l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Medal dots ─────────────────────────────────────────────────────────────────
function MedalCount({ count, color }: { count: number; color: string }) {
  return (
    <div style={{ width: 44, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <span style={{ fontSize: 16, fontWeight: 700, color: count > 0 ? color : "rgba(107,122,159,0.3)", fontFamily: "Inter", lineHeight: "20px" }}>{count > 0 ? count : "–"}</span>
    </div>
  );
}

// ── Country row ─────────────────────────────────────────────────────────────────
function CountryRow({ row, rank, maxTotal }: { row: Row; rank: number; maxTotal: number }) {
  const isUsa = !!row.usa;
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "11px 14px", borderBottom: `1px solid ${BORDER}`, gap: 10, position: "relative", overflow: "hidden", background: isUsa ? "rgba(191,13,62,0.06)" : "transparent" }}>
      {isUsa && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: ACCENT, borderRadius: "0 2px 2px 0" }} />}

      {/* Rank */}
      <div style={{ width: 20, textAlign: "center", flexShrink: 0, paddingLeft: isUsa ? 2 : 0 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: rank === 1 ? GOLD : rank === 2 ? SILVER : rank === 3 ? BRONZE : MUTED, fontFamily: "Inter" }}>
          {rank <= 3 ? ["①","②","③"][rank-1] : rank}
        </span>
      </div>

      {/* Country badge */}
      <div style={{ width: 36, height: 36, borderRadius: 10, background: isUsa ? `${ACCENT}25` : "rgba(255,255,255,0.05)", border: `1.5px solid ${isUsa ? ACCENT + "50" : "rgba(255,255,255,0.09)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: isUsa ? ACCENT : MUTED, fontFamily: "Inter", letterSpacing: "0.3px" }}>{row.code}</span>
      </div>

      {/* Name + bar */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: isUsa ? 700 : 600, color: isUsa ? TEXT : "rgba(232,236,245,0.85)", fontFamily: "Inter", marginBottom: 5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {row.name}
        </div>
        <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(row.total / maxTotal) * 100}%`, background: isUsa ? `linear-gradient(to right, ${ACCENT}, #FF4D6A)` : "rgba(255,255,255,0.18)", borderRadius: 2, transition: "width 0.4s" }} />
        </div>
      </div>

      {/* Medals */}
      <MedalCount count={row.g} color={GOLD}   />
      <MedalCount count={row.s} color={SILVER} />
      <MedalCount count={row.b} color={BRONZE} />

      {/* Total */}
      <div style={{ width: 32, textAlign: "right", flexShrink: 0 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: isUsa ? ACCENT : "rgba(232,236,245,0.5)", fontFamily: "Inter" }}>{row.total}</span>
      </div>
    </div>
  );
}

// ── Main screen ─────────────────────────────────────────────────────────────────
export function StandingsScreen() {
  const [tab, setTab] = useState<"all" | "womens" | "mens" | "beach">("all");
  const cfg = TABS.find(t => t.key === tab)!;
  const sorted = [...cfg.data].sort((a, b) => b.total - a.total || b.g - a.g || b.s - a.s);
  const maxTotal = sorted[0].total;

  return (
    <div style={{ width: 390, height: 844, overflowY: "auto", background: BG, fontFamily: "Inter, sans-serif", position: "relative" }}>
      {/* Header gradient */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220, background: "linear-gradient(135deg, #1A0008, #001240)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220, background: `linear-gradient(225deg, ${cfg.color}25, transparent)`, zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, padding: "52px 16px 24px" }}>

        {/* ── Header ─────────────────────────────────────── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: TEXT, fontFamily: "Inter", letterSpacing: -0.5 }}>Medal Table</div>
            <div style={{ fontSize: 13, color: "rgba(232,236,245,0.6)", fontFamily: "Inter", marginTop: 3 }}>USA in the World · Olympic All-Time</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(191,13,62,0.12)", border: "1px solid rgba(191,13,62,0.3)", borderRadius: 20, padding: "6px 12px" }}>
            <Shield size={13} color={ACCENT} />
            <span style={{ fontSize: 11, color: ACCENT, fontFamily: "Inter", fontWeight: 700 }}>USA</span>
          </div>
        </div>

        {/* ── Discipline tabs ─────────────────────────────── */}
        <div style={{ display: "flex", background: CARD, borderRadius: 14, padding: 3, marginBottom: 20, border: `1px solid ${BORDER}` }}>
          {TABS.map(t => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                style={{ flex: 1, padding: "9px 0", borderRadius: 11, border: "none", cursor: "pointer", background: active ? t.color : "transparent", color: active ? "#fff" : MUTED, fontSize: 11, fontFamily: "Inter", fontWeight: 700, transition: "all 0.15s" }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* ── USA spotlight ───────────────────────────────── */}
        <UsaSpotlight data={cfg.data} discColor={cfg.color} />

        {/* ── Medal table ─────────────────────────────────── */}
        <div style={{ background: CARD, borderRadius: 18, overflow: "hidden", border: `1px solid ${BORDER}` }}>
          {/* Column headers */}
          <div style={{ display: "flex", alignItems: "center", padding: "10px 14px", background: "#050B25", gap: 10 }}>
            <div style={{ width: 20 }} />
            <div style={{ width: 36 }} />
            <span style={{ flex: 1, fontSize: 10, color: MUTED, fontFamily: "Inter", fontWeight: 600, letterSpacing: "0.3px" }}>COUNTRY</span>
            <span style={{ width: 44, fontSize: 10, color: GOLD,   fontFamily: "Inter", fontWeight: 700, textAlign: "center" }}>G</span>
            <span style={{ width: 44, fontSize: 10, color: SILVER, fontFamily: "Inter", fontWeight: 700, textAlign: "center" }}>S</span>
            <span style={{ width: 44, fontSize: 10, color: BRONZE, fontFamily: "Inter", fontWeight: 700, textAlign: "center" }}>B</span>
            <span style={{ width: 32, fontSize: 10, color: MUTED,  fontFamily: "Inter", fontWeight: 600, textAlign: "right" }}>TOT</span>
          </div>

          {sorted.map((row, i) => (
            <CountryRow key={row.code} row={row} rank={i + 1} maxTotal={maxTotal} />
          ))}
        </div>

        {/* ── Footer note ─────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 16, paddingLeft: 2 }}>
          <Award size={12} color={MUTED} />
          <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>Olympic Games 1964 – 2024 · Indoor & Beach</span>
        </div>
      </div>
    </div>
  );
}
