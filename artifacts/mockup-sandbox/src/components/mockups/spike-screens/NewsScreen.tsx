import { Flame, Clock, ChevronRight, Bookmark, TrendingUp } from "lucide-react";

const BG = "#000D2E";
const CARD = "#060E2C";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT = "#E8ECF5";
const MUTED = "#6B7A9F";
const ACCENT = "#BF0D3E";
const SURFACE = "#0A1535";

const CATEGORY_COLORS: Record<string, string> = {
  "VNL 2026":  "#2DC579",
  "Awards":    "#BF0D3E",
  "Analysis":  "#5B8DEF",
  "Injury":    "#E84855",
  "Feature":   "#9B59B6",
  "Interview": "#F5A623",
  "Results":   "#2DC579",
  "Recap":     "#3A7BF5",
};

const DISC: Record<string, { label: string; color: string }> = {
  mens:    { label: "Men's",    color: "#3A7BF5" },
  womens:  { label: "Women's",  color: "#E04E8A" },
  beach:   { label: "Beach",    color: "#F5A623" },
  sitting: { label: "Sitting",  color: "#44C98E" },
};

const ITEMS = [
  {
    category: "VNL 2026", disc: "mens", featured: true,
    title: "Brazil's perfect run: Five straight wins cement historic VNL dominance",
    summary: "The Brazilian squad put on a masterclass against Serbia in straight sets, cementing their place atop the standings with an undefeated record heading into Week 3.",
    date: "Jun 12", readTime: 4,
  },
  {
    category: "Awards", disc: "womens", featured: false,
    title: "Paola Egonu named VNL Best Scorer for third consecutive year",
    date: "Jun 11", readTime: 3,
  },
  {
    category: "Analysis", disc: "mens", featured: false,
    title: "Breaking down Poland's elite serve-receive system dominating VNL",
    date: "Jun 11", readTime: 6,
  },
  {
    category: "Feature", disc: "beach", featured: false,
    title: "How the US beach pair climbed to world #1 in just two seasons",
    date: "Jun 10", readTime: 5,
  },
  {
    category: "Interview", disc: "sitting", featured: false,
    title: "USA Sitting Volleyball captain on the road to Paris Paralympics",
    date: "Jun 9", readTime: 4,
  },
];

const TRENDING = [
  { icon: "🔥", label: "Brazil 5-0" },
  { icon: "⚡", label: "VNL Week 4" },
  { icon: "🏆", label: "Egonu" },
  { icon: "🌊", label: "USA Beach #1" },
  { icon: "🇺🇸", label: "USA Women" },
  { icon: "🎖", label: "Paralympics" },
];

const DISCIPLINES = [
  { key: "all",     label: "All",      color: ACCENT },
  { key: "mens",    label: "Men's",    color: "#3A7BF5" },
  { key: "womens",  label: "Women's",  color: "#E04E8A" },
  { key: "beach",   label: "Beach",    color: "#F5A623" },
  { key: "sitting", label: "Sitting",  color: "#44C98E" },
  { key: "ncaa",    label: "NCAA",     color: "#9B59B6" },
];

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

function DisciplineThumb({ disc, size = 80 }: { disc: string; size?: number }) {
  const d = DISC[disc] ?? DISC.mens;
  return (
    <div style={{ width: size, height: size, flexShrink: 0, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${d.color}45, #001F5B)` }} />
      <div style={{ position: "absolute", top: -8, left: -8, opacity: 0.4 }}>
        <VolleyBall size={72} color={d.color} />
      </div>
      <div style={{ position: "relative" }}>
        <VolleyBall size={24} color="rgba(255,255,255,0.8)" />
      </div>
    </div>
  );
}

function FeaturedCard({ item }: { item: typeof ITEMS[0] }) {
  const d = DISC[item.disc] ?? DISC.mens;
  const catColor = CATEGORY_COLORS[item.category] ?? ACCENT;

  return (
    <div style={{ background: CARD, borderRadius: 20, marginBottom: 20, border: `1px solid rgba(255,255,255,0.09)`, overflow: "hidden", cursor: "pointer" }}>
      {/* Hero image area */}
      <div style={{ height: 200, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${d.color}55, #001840 60%, #000D2E)` }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 45%, rgba(0,5,20,0.85))" }} />
        {/* Decorative balls */}
        <div style={{ position: "absolute", right: -30, top: -30, opacity: 0.5 }}>
          <VolleyBall size={180} color={`${d.color}22`} />
        </div>
        <div style={{ position: "absolute", left: 20, top: 20, opacity: 0.6 }}>
          <VolleyBall size={70} color={`${d.color}20`} />
        </div>

        {/* Top badges row */}
        <div style={{ position: "absolute", top: 14, left: 14, right: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", borderRadius: 20, padding: "4px 10px", border: "1px solid rgba(255,255,255,0.12)" }}>
              <Flame size={11} color="#F5A623" />
              <span style={{ fontSize: 10, color: "#F5A623", fontFamily: "Inter", fontWeight: 700, letterSpacing: "0.3px" }}>TOP STORY</span>
            </div>
            <div style={{ background: `${catColor}CC`, borderRadius: 20, padding: "4px 10px" }}>
              <span style={{ fontSize: 10, color: "#fff", fontFamily: "Inter", fontWeight: 700, letterSpacing: "0.3px" }}>{item.category}</span>
            </div>
          </div>
          <div style={{ width: 30, height: 30, borderRadius: 15, background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Bookmark size={13} color="rgba(255,255,255,0.7)" />
          </div>
        </div>

        {/* Discipline pill bottom-left */}
        <div style={{ position: "absolute", bottom: 14, left: 14, display: "flex", alignItems: "center", gap: 5, background: `${d.color}30`, border: `1px solid ${d.color}60`, borderRadius: 20, padding: "4px 10px" }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: d.color }} />
          <span style={{ fontSize: 10, color: d.color, fontFamily: "Inter", fontWeight: 700 }}>{d.label}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontSize: 18, color: TEXT, fontFamily: "Inter", fontWeight: 700, lineHeight: "26px" }}>
          {item.title}
        </div>
        <div style={{ fontSize: 13, color: "rgba(232,236,245,0.65)", fontFamily: "Inter", lineHeight: "20px" }}>
          {item.summary}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 4, borderTop: `1px solid ${BORDER}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12, color: MUTED, fontFamily: "Inter" }}>{item.date}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Clock size={11} color={MUTED} />
              <span style={{ fontSize: 12, color: MUTED, fontFamily: "Inter" }}>{item.readTime} min read</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, background: `${ACCENT}18`, border: `1px solid ${ACCENT}40`, borderRadius: 20, padding: "5px 12px" }}>
            <span style={{ fontSize: 12, color: ACCENT, fontFamily: "Inter", fontWeight: 700 }}>Read story</span>
            <ChevronRight size={13} color={ACCENT} />
          </div>
        </div>
      </div>
    </div>
  );
}

function CompactCard({ item }: { item: typeof ITEMS[0] }) {
  const d = DISC[item.disc] ?? DISC.mens;
  const catColor = CATEGORY_COLORS[item.category] ?? ACCENT;

  return (
    <div style={{ background: CARD, borderRadius: 16, marginBottom: 10, border: `1px solid ${BORDER}`, display: "flex", overflow: "hidden", cursor: "pointer", position: "relative" }}>
      {/* Colored left discipline bar */}
      <div style={{ width: 3, background: d.color, flexShrink: 0 }} />

      {/* Thumbnail */}
      <DisciplineThumb disc={item.disc} size={82} />

      {/* Content */}
      <div style={{ flex: 1, padding: "12px 13px 12px 10px", display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0, gap: 6 }}>
        {/* Category + discipline row */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" as const }}>
          <div style={{ background: `${catColor}18`, borderRadius: 4, padding: "2px 7px" }}>
            <span style={{ fontSize: 9, color: catColor, fontFamily: "Inter", fontWeight: 700, letterSpacing: "0.4px" }}>{item.category}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <div style={{ width: 5, height: 5, borderRadius: 2.5, background: d.color }} />
            <span style={{ fontSize: 9, color: d.color, fontFamily: "Inter", fontWeight: 600 }}>{d.label}</span>
          </div>
        </div>

        {/* Title — clamped to 2 lines */}
        <div style={{ fontSize: 13, color: TEXT, fontFamily: "Inter", fontWeight: 600, lineHeight: "19px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>
          {item.title}
        </div>

        {/* Meta row */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>{item.date}</span>
          <div style={{ width: 3, height: 3, borderRadius: 1.5, background: MUTED }} />
          <Clock size={10} color={MUTED} />
          <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>{item.readTime} min</span>
        </div>
      </div>

      {/* Bookmark icon */}
      <div style={{ display: "flex", alignItems: "flex-start", padding: "12px 12px 0 0" }}>
        <Bookmark size={14} color={MUTED} />
      </div>
    </div>
  );
}

export function NewsScreen() {
  return (
    <div style={{ width: 390, height: 844, overflowY: "auto", background: BG, fontFamily: "Inter, sans-serif", position: "relative" }}>
      {/* Header gradient */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220, background: "linear-gradient(135deg, #002080, #001F5B)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220, background: "linear-gradient(225deg, rgba(191,13,62,0.28), transparent)", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, padding: "52px 16px 24px" }}>

        {/* ── Page header ───────────────────────────────── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>News</div>
            <div style={{ fontSize: 13, color: "rgba(232,236,245,0.6)", fontFamily: "Inter", marginTop: 2 }}>Breaking stories & analysis</div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: "rgba(191,13,62,0.18)", border: "1px solid rgba(191,13,62,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <VolleyBall size={20} color={ACCENT} />
          </div>
        </div>

        {/* ── Discipline filter tabs ─────────────────────── */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 2 }}>
          {DISCIPLINES.map((d, i) => (
            <div key={d.key} style={{ display: "flex", alignItems: "center", padding: "7px 14px", borderRadius: 20, background: i === 0 ? ACCENT : CARD, border: `1px solid ${i === 0 ? ACCENT : BORDER}`, whiteSpace: "nowrap", flexShrink: 0, cursor: "pointer" }}>
              <span style={{ fontSize: 12, color: i === 0 ? "#fff" : MUTED, fontFamily: "Inter", fontWeight: 600 }}>{d.label}</span>
            </div>
          ))}
        </div>

        {/* ── Trending strip ─────────────────────────────── */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
            <TrendingUp size={13} color={ACCENT} />
            <span style={{ fontSize: 12, color: MUTED, fontFamily: "Inter", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" as const }}>Trending</span>
          </div>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none" }}>
            {TRENDING.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "6px 12px", whiteSpace: "nowrap", flexShrink: 0, cursor: "pointer" }}>
                <span style={{ fontSize: 12 }}>{t.icon}</span>
                <span style={{ fontSize: 12, color: TEXT, fontFamily: "Inter", fontWeight: 500 }}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Featured story ─────────────────────────────── */}
        <FeaturedCard item={ITEMS[0]} />

        {/* ── Latest section header ──────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontSize: 15, color: TEXT, fontFamily: "Inter", fontWeight: 700 }}>Latest Stories</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
            <span style={{ fontSize: 12, color: ACCENT, fontFamily: "Inter", fontWeight: 600 }}>See all</span>
            <ChevronRight size={13} color={ACCENT} />
          </div>
        </div>

        {/* ── Compact cards ──────────────────────────────── */}
        {ITEMS.slice(1).map((item, i) => <CompactCard key={i} item={item} />)}

      </div>
    </div>
  );
}
