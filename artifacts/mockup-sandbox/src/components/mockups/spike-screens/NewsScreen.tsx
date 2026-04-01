const BG = "#000D2E";
const CARD = "#060E2C";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT = "#E8ECF5";
const MUTED = "#6B7A9F";
const ACCENT = "#BF0D3E";

const CATEGORY_COLORS: Record<string, string> = {
  "VNL 2026": "#2DC579", "Awards": "#BF0D3E", "Analysis": "#5B8DEF",
  "Injury": "#E84855", "Feature": "#9B59B6", "Interview": "#F5A623", "Results": "#2DC579",
};
const DISC_COLORS: Record<string, string> = {
  mens: "#3A7BF5", womens: "#E04E8A", beach: "#F5A623", sitting: "#44C98E",
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

const ITEMS = [
  { category: "VNL 2026", disc: "mens", title: "Brazil continues dominant run in men's VNL with 5th straight victory", summary: "The Brazilian squad put on a masterclass against Serbia in straight sets, cementing their place atop the standings with an undefeated record.", date: "Jun 12", readTime: 4, featured: true },
  { category: "Awards", disc: "womens", title: "Paola Egonu named VNL Best Scorer for third consecutive year", date: "Jun 11", readTime: 3, featured: false },
  { category: "Analysis", disc: "mens", title: "Breaking down Poland's elite serve-receive system that's dominating VNL", date: "Jun 11", readTime: 6, featured: false },
  { category: "Feature", disc: "beach", title: "The rise of beach volleyball: How the US climbed to #1 in the world", date: "Jun 10", readTime: 5, featured: false },
  { category: "Interview", disc: "sitting", title: "USA Sitting Volleyball captain speaks on Paralympic preparation", date: "Jun 9", readTime: 4, featured: false },
];

function FeaturedCard({ item }: { item: typeof ITEMS[0] }) {
  const discColor = DISC_COLORS[item.disc] ?? "#3A7BF5";
  const catColor = CATEGORY_COLORS[item.category] ?? ACCENT;
  return (
    <div style={{ background: CARD, borderRadius: 20, marginBottom: 14, border: `1px solid ${BORDER}`, overflow: "hidden" }}>
      {/* Image placeholder */}
      <div style={{ height: 180, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${discColor}40, #001F5B, #000D2E)` }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.6))" }} />
        <div style={{ position: "absolute", left: -10, top: -10 }}>
          <VolleyBall size={90} color={`${discColor}22`} />
        </div>
        <div style={{ position: "absolute", right: 20, bottom: 10 }}>
          <VolleyBall size={50} color="rgba(255,255,255,0.04)" />
        </div>
        <div style={{ position: "absolute", top: 12, left: 12, background: `${catColor}CC`, borderRadius: 6, padding: "5px 10px" }}>
          <span style={{ fontSize: 10, color: "#fff", fontFamily: "Inter", fontWeight: 700, letterSpacing: "0.5px" }}>{item.category}</span>
        </div>
        <div style={{ position: "absolute", bottom: 12, right: 12, width: 28, height: 28, borderRadius: 14, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <VolleyBall size={11} color="#fff" />
        </div>
      </div>
      {/* Body */}
      <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ background: `${catColor}22`, border: `1px solid ${catColor}50`, borderRadius: 6, padding: "4px 10px" }}>
            <span style={{ fontSize: 10, color: catColor, fontFamily: "Inter", fontWeight: 700, letterSpacing: "0.5px" }}>{item.category}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>⏱ {item.readTime} min</span>
          </div>
        </div>
        <div style={{ fontSize: 19, color: TEXT, fontFamily: "Inter", fontWeight: 700, lineHeight: "26px" }}>{item.title}</div>
        <div style={{ fontSize: 13, color: "rgba(232,236,245,0.6)", fontFamily: "Inter", lineHeight: "20px" }}>{item.summary}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
          <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>{item.date}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 12, color: ACCENT, fontFamily: "Inter", fontWeight: 600 }}>Read more</span>
            <span style={{ fontSize: 11, color: ACCENT }}>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompactCard({ item }: { item: typeof ITEMS[0] }) {
  const discColor = DISC_COLORS[item.disc] ?? "#3A7BF5";
  const catColor = CATEGORY_COLORS[item.category] ?? ACCENT;
  return (
    <div style={{ background: CARD, borderRadius: 16, marginBottom: 10, border: `1px solid ${BORDER}`, display: "flex", overflow: "hidden" }}>
      <div style={{ width: 88, flexShrink: 0, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${discColor}50, #001F5B)` }} />
        <div style={{ position: "absolute", top: -4, left: -8 }}>
          <VolleyBall size={50} color={`${discColor}25`} />
        </div>
        <VolleyBall size={22} color="rgba(255,255,255,0.7)" />
      </div>
      <div style={{ flex: 1, padding: "14px", display: "flex", flexDirection: "column", gap: 7, justifyContent: "center" }}>
        <div style={{ background: `${catColor}18`, borderRadius: 4, padding: "3px 7px", alignSelf: "flex-start" }}>
          <span style={{ fontSize: 9, color: catColor, fontFamily: "Inter", fontWeight: 700, letterSpacing: "0.5px" }}>{item.category}</span>
        </div>
        <div style={{ fontSize: 14, color: TEXT, fontFamily: "Inter", fontWeight: 600, lineHeight: "20px" }}>{item.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>{item.date}</span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: MUTED, display: "inline-block" }} />
          <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>{item.readTime} min</span>
        </div>
      </div>
    </div>
  );
}

export function NewsScreen() {
  const disciplines = [
    { key: "all", label: "All" },
    { key: "mens", label: "Men's" },
    { key: "womens", label: "Women's" },
    { key: "beach", label: "Beach" },
    { key: "sitting", label: "Sitting" },
  ];

  return (
    <div style={{ width: 390, height: 844, overflowY: "auto", background: BG, fontFamily: "Inter, sans-serif", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220, background: "linear-gradient(135deg, #002080, #001F5B)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220, background: "linear-gradient(225deg, rgba(191,13,62,0.28), transparent)", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, padding: "52px 16px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>News</div>
            <div style={{ fontSize: 13, color: "rgba(232,236,245,0.65)", fontFamily: "Inter", marginTop: 2 }}>Breaking stories & analysis</div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: "rgba(191,13,62,0.2)", border: "1px solid rgba(191,13,62,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <VolleyBall size={20} color={ACCENT} />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(191,13,62,0.08)", border: "1px solid rgba(191,13,62,0.2)", borderRadius: 20, padding: "5px 12px", width: "fit-content", marginBottom: 16 }}>
          <VolleyBall size={11} color={ACCENT} />
          <span style={{ fontSize: 11, color: ACCENT, fontFamily: "Inter", fontWeight: 600 }}>Powered by USA Volleyball</span>
        </div>

        {/* Discipline tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "hidden" }}>
          {disciplines.map((d, i) => (
            <div key={d.key} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 20, background: i === 0 ? ACCENT : CARD, border: `1px solid ${i === 0 ? ACCENT : BORDER}`, whiteSpace: "nowrap", cursor: "pointer" }}>
              <span style={{ fontSize: 12, color: "#fff", fontFamily: "Inter", fontWeight: 600 }}>{d.label}</span>
            </div>
          ))}
        </div>

        {/* Featured */}
        <FeaturedCard item={ITEMS[0]} />

        {/* Compact cards */}
        {ITEMS.slice(1).map((item, i) => <CompactCard key={i} item={item} />)}
      </div>
    </div>
  );
}
