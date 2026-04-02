import { Star, ChevronRight, Award, Calendar, Shield } from "lucide-react";
import { useState } from "react";

const BG     = "#000D2E";
const CARD   = "#060E2C";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT   = "#E8ECF5";
const MUTED  = "#6B7A9F";
const ACCENT = "#BF0D3E";
const GOLD   = "#FFD700";
const SILVER = "#C0C0C0";
const BRONZE = "#CD7F32";
const MENS   = "#3A7BF5";
const WOMENS = "#E04E8A";
const BEACH  = "#F5A623";

function VolleyBall({ size = 24, color = "rgba(255,255,255,0.12)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
      <path d="M12 2 C12 2 8 6 8 12 C8 18 12 22 12 22" stroke={color} strokeWidth="1.5" />
      <path d="M2 12 C2 12 6 8 12 8 C18 8 22 12 22 12" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

const POS_COLORS: Record<string, string> = {
  OH: MENS, OPP: WOMENS, MB: BEACH, S: "#44C98E", L: "#9B59B6", DS: "#9B59B6",
};

// ── All-time resume data ────────────────────────────────────────────────────────

type Medal = { event: string; year: number; color: "gold" | "silver" | "bronze" };
type Player = {
  name: string; code: string; number: number; pos: string;
  years: string; caps: number; active: boolean;
  bio: string;
  medals: Medal[];
  careerStats: { label: string; val: string }[];
};

const WOMENS_PLAYERS: Player[] = [
  {
    name: "Jordan Larson", code: "JL", number: 10, pos: "OH",
    years: "2007 – 2024", caps: 428, active: false,
    bio: "One of the most decorated players in USA Volleyball history. Two-time Olympian and team captain who led USA to the 2020 Olympic gold medal.",
    medals: [
      { event: "Olympic Games",           year: 2020, color: "gold"   },
      { event: "Olympic Games",           year: 2012, color: "silver" },
      { event: "World Championship",      year: 2014, color: "silver" },
      { event: "VNL",                     year: 2018, color: "gold"   },
      { event: "NORCECA Championship",    year: 2011, color: "gold"   },
    ],
    careerStats: [
      { label: "Caps",      val: "428" },
      { label: "Points",    val: "3,104" },
      { label: "Spikes%",   val: "43.2" },
      { label: "Olympics",  val: "2" },
    ],
  },
  {
    name: "Foluke Akinradewo", code: "FA", number: 15, pos: "MB",
    years: "2009 – 2021", caps: 312, active: false,
    bio: "Elite middle blocker and three-time Olympian. Known for her dominant presence at the net and crucial role in USA's 2014 World Championship silver run.",
    medals: [
      { event: "Olympic Games",        year: 2020, color: "gold"   },
      { event: "Olympic Games",        year: 2016, color: "bronze" },
      { event: "Olympic Games",        year: 2012, color: "silver" },
      { event: "World Championship",   year: 2014, color: "silver" },
    ],
    careerStats: [
      { label: "Caps",    val: "312" },
      { label: "Blocks",  val: "1,248" },
      { label: "Block%",  val: "51.3" },
      { label: "Olympics", val: "3" },
    ],
  },
  {
    name: "Jordyn Poulter", code: "JP", number: 8, pos: "S",
    years: "2018 – present", caps: 186, active: true,
    bio: "Dynamic setter and 2020 Olympic gold medalist. Plays professionally in Italy's Serie A1 and is a cornerstone of the USA program's future.",
    medals: [
      { event: "Olympic Games",    year: 2020, color: "gold" },
      { event: "VNL",              year: 2021, color: "gold" },
      { event: "VNL",              year: 2022, color: "gold" },
    ],
    careerStats: [
      { label: "Caps",      val: "186" },
      { label: "Assists",   val: "4,812" },
      { label: "Aces",      val: "132" },
      { label: "Olympics",  val: "1" },
    ],
  },
  {
    name: "Kelsey Robinson", code: "KR", number: 5, pos: "OH",
    years: "2016 – present", caps: 221, active: true,
    bio: "Versatile and explosive outside hitter. Olympic gold medalist whose powerful serve-receive and high-flying attacks make her one of the game's elite.",
    medals: [
      { event: "Olympic Games",   year: 2020, color: "gold"   },
      { event: "VNL",             year: 2021, color: "gold"   },
    ],
    careerStats: [
      { label: "Caps",     val: "221" },
      { label: "Points",   val: "1,876" },
      { label: "Spikes%",  val: "38.8" },
      { label: "Olympics", val: "1" },
    ],
  },
  {
    name: "Kim Hill", code: "KH", number: 18, pos: "OH",
    years: "2011 – 2019", caps: 198, active: false,
    bio: "Powerful outside hitter who anchored USA's attack through a golden era. Known for her fearless play and championship pedigree.",
    medals: [
      { event: "Olympic Games",      year: 2016, color: "bronze" },
      { event: "Olympic Games",      year: 2012, color: "silver" },
      { event: "World Championship", year: 2014, color: "silver" },
    ],
    careerStats: [
      { label: "Caps",     val: "198" },
      { label: "Points",   val: "1,643" },
      { label: "Spikes%",  val: "40.1" },
      { label: "Olympics", val: "2" },
    ],
  },
];

const MENS_PLAYERS: Player[] = [
  {
    name: "Matt Anderson", code: "MA", number: 1, pos: "OH",
    years: "2010 – present", caps: 316, active: true,
    bio: "The face of USA Men's Volleyball for over a decade. Six-time Olympian and former team captain whose serve and attack have terrorized defenses worldwide.",
    medals: [
      { event: "Olympic Games",       year: 2016, color: "bronze" },
      { event: "World League",        year: 2015, color: "gold"   },
      { event: "World League",        year: 2014, color: "gold"   },
      { event: "NORCECA Championship",year: 2013, color: "gold"   },
    ],
    careerStats: [
      { label: "Caps",     val: "316" },
      { label: "Points",   val: "3,841" },
      { label: "Spikes%",  val: "47.2" },
      { label: "Olympics", val: "2" },
    ],
  },
  {
    name: "Micah Christenson", code: "MC", number: 11, pos: "S",
    years: "2013 – present", caps: 278, active: true,
    bio: "Elite setter and team general. His court vision and quick sets are the engine behind USA's fast-paced offensive system on the world stage.",
    medals: [
      { event: "Olympic Games",       year: 2016, color: "bronze" },
      { event: "World League",        year: 2015, color: "gold"   },
    ],
    careerStats: [
      { label: "Caps",     val: "278" },
      { label: "Assists",  val: "7,234" },
      { label: "Aces",     val: "189" },
      { label: "Olympics", val: "1" },
    ],
  },
  {
    name: "Erik Shoji", code: "ES", number: 22, pos: "L",
    years: "2012 – present", caps: 301, active: true,
    bio: "Two-time Olympian and one of the best liberos in the world. His extraordinary defensive range and serve reception have been the backbone of the USA system.",
    medals: [
      { event: "Olympic Games",   year: 2020, color: "bronze" },
      { event: "Olympic Games",   year: 2016, color: "bronze" },
      { event: "World League",    year: 2015, color: "gold"   },
    ],
    careerStats: [
      { label: "Caps",   val: "301" },
      { label: "Digs",   val: "4,102" },
      { label: "Rec%",   val: "63.8" },
      { label: "Olympics", val: "2" },
    ],
  },
  {
    name: "Taylor Sander", code: "TS", number: 16, pos: "OH",
    years: "2011 – 2022", caps: 256, active: false,
    bio: "A cornerstone of the USA program across a decade. His explosive athleticism and powerful arm made him one of the most feared attackers in international volleyball.",
    medals: [
      { event: "Olympic Games",   year: 2016, color: "bronze" },
      { event: "World League",    year: 2015, color: "gold"   },
    ],
    careerStats: [
      { label: "Caps",     val: "256" },
      { label: "Points",   val: "2,934" },
      { label: "Spikes%",  val: "45.3" },
      { label: "Olympics", val: "1" },
    ],
  },
];

const BEACH_PLAYERS: Player[] = [
  {
    name: "April Ross", code: "AR", number: 0, pos: "OH",
    years: "2007 – present", caps: 0, active: true,
    bio: "The most decorated US beach volleyball player ever. Three Olympic medals across three consecutive Games is a feat unmatched in the sport's history.",
    medals: [
      { event: "Olympic Games", year: 2020, color: "gold"   },
      { event: "Olympic Games", year: 2016, color: "bronze" },
      { event: "Olympic Games", year: 2012, color: "silver" },
    ],
    careerStats: [
      { label: "FIVB Wins",  val: "68" },
      { label: "Olympics",   val: "3" },
      { label: "Medal",      val: "3×" },
      { label: "World Rank", val: "#3" },
    ],
  },
  {
    name: "Phil Dalhausser", code: "PD", number: 0, pos: "OH",
    years: "2003 – 2021", caps: 0, active: false,
    bio: "\"The Thin Beast.\" 2008 Olympic champion and FIVB World Tour legend. One of the greatest net players in beach volleyball history.",
    medals: [
      { event: "Olympic Games", year: 2008, color: "gold"   },
      { event: "Olympic Games", year: 2016, color: "bronze" },
      { event: "World Championship", year: 2007, color: "gold" },
    ],
    careerStats: [
      { label: "FIVB Wins",  val: "47" },
      { label: "Olympics",   val: "3" },
      { label: "Medal",      val: "2×" },
      { label: "WC Titles",  val: "1" },
    ],
  },
];

const MEDAL_COLOR: Record<string, string> = { gold: GOLD, silver: SILVER, bronze: BRONZE };

// ── Medal badge ────────────────────────────────────────────────────────────────
function MedalBadge({ medal, compact = false }: { medal: Medal; compact?: boolean }) {
  const color = MEDAL_COLOR[medal.color];
  if (compact) {
    return (
      <div style={{ width: 18, height: 18, borderRadius: 9, background: `${color}30`, border: `1px solid ${color}60`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ fontSize: 8, fontFamily: "Inter", fontWeight: 700, color }}>
          {medal.color === "gold" ? "G" : medal.color === "silver" ? "S" : "B"}
        </span>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, background: `${color}10`, border: `1px solid ${color}30`, borderRadius: 10, padding: "5px 10px" }}>
      <div style={{ width: 8, height: 8, borderRadius: 4, background: color }} />
      <div>
        <div style={{ fontSize: 11, color, fontFamily: "Inter", fontWeight: 700 }}>{medal.event} {medal.year}</div>
      </div>
    </div>
  );
}

// ── Featured hero card ──────────────────────────────────────────────────────────
function HeroCard({ player, discColor }: { player: Player; discColor: string }) {
  const posColor = POS_COLORS[player.pos] ?? discColor;
  const goldMedals   = player.medals.filter(m => m.color === "gold").length;
  const silverMedals = player.medals.filter(m => m.color === "silver").length;
  const bronzeMedals = player.medals.filter(m => m.color === "bronze").length;

  return (
    <div style={{ borderRadius: 22, marginBottom: 20, overflow: "hidden", border: `1px solid ${discColor}30`, position: "relative", cursor: "pointer" }}>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, #001840, #000D30)` }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${discColor}20, transparent)` }} />
      <div style={{ position: "absolute", right: -20, top: -20, opacity: 0.5 }}>
        <VolleyBall size={160} color={`${discColor}18`} />
      </div>

      <div style={{ position: "relative", padding: 18 }}>
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: `rgba(0,0,0,0.3)`, borderRadius: 20, padding: "4px 12px", border: `1px solid rgba(255,255,255,0.08)` }}>
            <Shield size={11} color={ACCENT} />
            <span style={{ fontSize: 11, color: ACCENT, fontFamily: "Inter", fontWeight: 700 }}>USA Volleyball · All-Time Resume</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, background: player.active ? "rgba(45,197,121,0.12)" : "rgba(107,122,159,0.12)", border: `1px solid ${player.active ? "rgba(45,197,121,0.3)" : "rgba(107,122,159,0.2)"}`, borderRadius: 10, padding: "3px 9px" }}>
            <div style={{ width: 5, height: 5, borderRadius: 2.5, background: player.active ? "#2DC579" : MUTED }} />
            <span style={{ fontSize: 10, color: player.active ? "#2DC579" : MUTED, fontFamily: "Inter", fontWeight: 600 }}>{player.active ? "Active" : "Retired"}</span>
          </div>
        </div>

        {/* Player identity */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: `${discColor}22`, border: `2px solid ${discColor}50`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative" }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: discColor, fontFamily: "Inter" }}>{player.code}</span>
            <div style={{ position: "absolute", top: -6, right: -6, width: 20, height: 20, borderRadius: 10, background: `${posColor}30`, border: `1px solid ${posColor}60`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 9, color: posColor, fontFamily: "Inter", fontWeight: 700 }}>{player.pos}</span>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: TEXT, fontFamily: "Inter", lineHeight: "27px", marginBottom: 4 }}>{player.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Calendar size={11} color={MUTED} />
              <span style={{ fontSize: 12, color: MUTED, fontFamily: "Inter" }}>{player.years}</span>
              <span style={{ fontSize: 11, color: MUTED }}>·</span>
              <span style={{ fontSize: 12, color: MUTED, fontFamily: "Inter" }}>{player.caps > 0 ? `${player.caps} caps` : "FIVB Tour"}</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div style={{ fontSize: 13, color: "rgba(232,236,245,0.65)", fontFamily: "Inter", lineHeight: "20px", marginBottom: 14 }}>
          {player.bio}
        </div>

        {/* Medal summary row */}
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          {goldMedals > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: `${GOLD}12`, border: `1px solid ${GOLD}35`, borderRadius: 10, padding: "5px 11px" }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: GOLD }} />
              <span style={{ fontSize: 12, color: GOLD, fontFamily: "Inter", fontWeight: 700 }}>{goldMedals}× Gold</span>
            </div>
          )}
          {silverMedals > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: `${SILVER}10`, border: `1px solid ${SILVER}30`, borderRadius: 10, padding: "5px 11px" }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: SILVER }} />
              <span style={{ fontSize: 12, color: SILVER, fontFamily: "Inter", fontWeight: 700 }}>{silverMedals}× Silver</span>
            </div>
          )}
          {bronzeMedals > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: `${BRONZE}10`, border: `1px solid ${BRONZE}30`, borderRadius: 10, padding: "5px 11px" }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: BRONZE }} />
              <span style={{ fontSize: 12, color: BRONZE, fontFamily: "Inter", fontWeight: 700 }}>{bronzeMedals}× Bronze</span>
            </div>
          )}
        </div>

        {/* Career stats strip */}
        <div style={{ display: "flex", background: "rgba(0,0,0,0.25)", borderRadius: 14, padding: "12px 0", marginBottom: 14, border: `1px solid rgba(255,255,255,0.05)` }}>
          {player.careerStats.map((s, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, borderRight: i < player.careerStats.length - 1 ? `1px solid rgba(255,255,255,0.07)` : "none" }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>{s.val}</span>
              <span style={{ fontSize: 9, color: MUTED, fontFamily: "Inter", letterSpacing: "0.5px" }}>{s.label.toUpperCase()}</span>
            </div>
          ))}
        </div>

        {/* Medal timeline (top 3) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {player.medals.slice(0, 3).map((m, i) => <MedalBadge key={i} medal={m} />)}
          {player.medals.length > 3 && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
              <span style={{ fontSize: 12, color: ACCENT, fontFamily: "Inter", fontWeight: 600 }}>+{player.medals.length - 3} more honors</span>
              <ChevronRight size={13} color={ACCENT} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Compact player row ──────────────────────────────────────────────────────────
function PlayerRow({ player, rank, discColor }: { player: Player; rank: number; discColor: string }) {
  const posColor = POS_COLORS[player.pos] ?? discColor;
  const goldCount   = player.medals.filter(m => m.color === "gold").length;
  const silverCount = player.medals.filter(m => m.color === "silver").length;
  const bronzeCount = player.medals.filter(m => m.color === "bronze").length;

  return (
    <div style={{ background: CARD, borderRadius: 16, padding: "13px 14px", marginBottom: 8, border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", overflow: "hidden", position: "relative" }}>
      {/* Avatar */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{ width: 46, height: 46, borderRadius: 13, background: `${discColor}20`, border: `1.5px solid ${discColor}45`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: discColor, fontFamily: "Inter" }}>{player.code}</span>
        </div>
        <div style={{ position: "absolute", bottom: -3, right: -3, background: `${posColor}25`, border: `1px solid ${posColor}50`, borderRadius: 6, padding: "1px 4px" }}>
          <span style={{ fontSize: 8, color: posColor, fontFamily: "Inter", fontWeight: 700 }}>{player.pos}</span>
        </div>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: TEXT, fontFamily: "Inter", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{player.name}</span>
          {!player.active && (
            <span style={{ fontSize: 9, color: MUTED, fontFamily: "Inter", fontWeight: 500, flexShrink: 0 }}>Ret.</span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Calendar size={10} color={MUTED} />
          <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>{player.years}</span>
          {player.caps > 0 && (
            <>
              <span style={{ fontSize: 10, color: MUTED }}>·</span>
              <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>{player.caps} caps</span>
            </>
          )}
        </div>
      </div>

      {/* Medal dots */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
        {goldCount   > 0 && <div style={{ display: "flex", alignItems: "center", gap: 2 }}><div style={{ width: 9, height: 9, borderRadius: 4.5, background: GOLD }} /><span style={{ fontSize: 9, color: GOLD, fontFamily: "Inter", fontWeight: 700 }}>{goldCount > 1 ? goldCount : ""}</span></div>}
        {silverCount > 0 && <div style={{ display: "flex", alignItems: "center", gap: 2 }}><div style={{ width: 9, height: 9, borderRadius: 4.5, background: SILVER }} /><span style={{ fontSize: 9, color: SILVER, fontFamily: "Inter", fontWeight: 700 }}>{silverCount > 1 ? silverCount : ""}</span></div>}
        {bronzeCount > 0 && <div style={{ display: "flex", alignItems: "center", gap: 2 }}><div style={{ width: 9, height: 9, borderRadius: 4.5, background: BRONZE }} /><span style={{ fontSize: 9, color: BRONZE, fontFamily: "Inter", fontWeight: 700 }}>{bronzeCount > 1 ? bronzeCount : ""}</span></div>}
        <ChevronRight size={13} color={MUTED} style={{ marginLeft: 4 }} />
      </div>
    </div>
  );
}

// ── Main screen ─────────────────────────────────────────────────────────────────
export function PlayersScreen() {
  const [tab, setTab] = useState<"womens" | "mens" | "beach">("womens");

  const config = {
    womens: { players: WOMENS_PLAYERS, color: WOMENS, label: "Women's" },
    mens:   { players: MENS_PLAYERS,   color: MENS,   label: "Men's"   },
    beach:  { players: BEACH_PLAYERS,  color: BEACH,  label: "Beach"   },
  }[tab];

  const featured = config.players[0];
  const rest     = config.players.slice(1);

  return (
    <div style={{ width: 390, height: 844, overflowY: "auto", background: BG, fontFamily: "Inter, sans-serif", position: "relative" }}>
      {/* Header gradient */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 230, background: "linear-gradient(135deg, #001A50, #000D30)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 230, background: `linear-gradient(225deg, ${config.color}28, transparent)`, zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, padding: "52px 16px 24px" }}>

        {/* ── Header ─────────────────────────────────────── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: TEXT, fontFamily: "Inter", letterSpacing: -0.5 }}>USA Players</div>
            <div style={{ fontSize: 13, color: "rgba(232,236,245,0.6)", fontFamily: "Inter", marginTop: 3 }}>National Team · All-Time Resumes</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(191,13,62,0.12)", border: "1px solid rgba(191,13,62,0.25)", borderRadius: 20, padding: "6px 12px" }}>
            <Shield size={13} color={ACCENT} />
            <span style={{ fontSize: 11, color: ACCENT, fontFamily: "Inter", fontWeight: 700 }}>USA</span>
          </div>
        </div>

        {/* ── Team tabs ───────────────────────────────────── */}
        <div style={{ display: "flex", background: CARD, borderRadius: 14, padding: 3, marginBottom: 20, border: `1px solid ${BORDER}` }}>
          {(["womens", "mens", "beach"] as const).map(key => {
            const cfg = { womens: { label: "Women's", color: WOMENS }, mens: { label: "Men's", color: MENS }, beach: { label: "Beach", color: BEACH } }[key];
            const active = tab === key;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={{
                  flex: 1, padding: "9px 0", borderRadius: 11, border: "none", cursor: "pointer",
                  background: active ? cfg.color : "transparent",
                  color: active ? "#fff" : MUTED,
                  fontSize: 12, fontFamily: "Inter", fontWeight: 700,
                  transition: "all 0.15s",
                }}
              >
                {cfg.label}
              </button>
            );
          })}
        </div>

        {/* ── Featured player hero ────────────────────────── */}
        <HeroCard player={featured} discColor={config.color} />

        {/* ── Rest of roster ──────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontSize: 13, color: MUTED, fontFamily: "Inter", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" as const }}>Full Roster</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
            <span style={{ fontSize: 12, color: ACCENT, fontFamily: "Inter", fontWeight: 600 }}>View all</span>
            <ChevronRight size={13} color={ACCENT} />
          </div>
        </div>

        {rest.map((p, i) => <PlayerRow key={i} player={p} rank={i + 2} discColor={config.color} />)}

      </div>
    </div>
  );
}
