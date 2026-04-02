import { Heart, MessageCircle, Share2, Play, ChevronRight, Bookmark } from "lucide-react";
import { useState } from "react";

const BG     = "#000D2E";
const CARD   = "#060E2C";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT   = "#E8ECF5";
const MUTED  = "#6B7A9F";
const ACCENT = "#BF0D3E";
const SURFACE = "#0A1535";

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

// ── Platform icons ─────────────────────────────────────────────────────────────
function IgIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="6" stroke="url(#igGrad)" strokeWidth="2"/>
      <circle cx="12" cy="12" r="4.5" stroke="url(#igGrad)" strokeWidth="2"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="url(#igGrad)"/>
      <defs>
        <linearGradient id="igGrad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5A623"/>
          <stop offset="50%" stopColor="#E04E8A"/>
          <stop offset="100%" stopColor="#9B59B6"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function TikTokIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" stroke="#69C9D0" strokeWidth="1.5"/>
      <path d="M10 12a3 3 0 1 0 3 3V7.5a4.5 4.5 0 0 0 4.5 4.5" stroke="#EE1D52" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 12a3 3 0 1 0 3 3V7.5a4.5 4.5 0 0 0 4.5 4.5" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="rgba(255,255,255,0.1)"/>
      <path d="M6 6l12 12M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

// ── Athlete data ────────────────────────────────────────────────────────────────
type Platform = "instagram" | "tiktok" | "x";
type Athlete = { code: string; name: string; handle: string; role: string; color: string };

const ATHLETES: Athlete[] = [
  { code: "AR", name: "April Ross",         handle: "@aprilross",          role: "Beach",    color: "#F5A623" },
  { code: "CB", name: "Chase Budinger",     handle: "@chasebudinger",      role: "Beach",    color: "#44C98E" },
  { code: "JL", name: "Jordan Larson",      handle: "@jordanlarson10",     role: "Women's",  color: "#E04E8A" },
  { code: "ES", name: "Erik Shoji",         handle: "@erikshoji",          role: "Men's",    color: "#3A7BF5" },
  { code: "JP", name: "Jordyn Poulter",     handle: "@jordynpoulter",      role: "Women's",  color: "#E04E8A" },
  { code: "MA", name: "Matt Anderson",      handle: "@matt__anderson",     role: "Men's",    color: "#3A7BF5" },
  { code: "MC", name: "Micah C.",           handle: "@micahchristenson",   role: "Men's",    color: "#3A7BF5" },
];

type Post = {
  athlete: Athlete;
  platform: Platform;
  time: string;
  isVideo: boolean;
  views?: string;
  gradient: string[];
  caption: string;
  likes: string;
  comments: string;
  tag?: string;
};

const POSTS: Post[] = [
  {
    athlete: ATHLETES[1],
    platform: "tiktok",
    time: "2h ago",
    isVideo: true,
    views: "1.4M views",
    gradient: ["#003322", "#001A30"],
    caption: "POV: You went from the NBA to beach volleyball and it was the best decision of your life 🏐🌊 @TeamUSA // Road to LA28",
    likes: "218K",
    comments: "4.2K",
    tag: "🔥 Going viral",
  },
  {
    athlete: ATHLETES[0],
    platform: "instagram",
    time: "5h ago",
    isVideo: false,
    gradient: ["#2A1800", "#001A30"],
    caption: "Pre-match routine locked in ✅ Doha ready. Two years from LA28 — every block, every dig counts. Let's go @TeamUSA 🇺🇸🏐",
    likes: "31.2K",
    comments: "892",
    tag: undefined,
  },
  {
    athlete: ATHLETES[2],
    platform: "instagram",
    time: "Yesterday",
    isVideo: false,
    gradient: ["#1A0018", "#001A40"],
    caption: "428 caps. One flag. Forever grateful for every single match I got to wear this jersey. 🇺🇸❤️ The journey isn't over — it's just beginning in a new way. #TeamUSA",
    likes: "78.4K",
    comments: "3.1K",
    tag: "❤️ Fan favorite",
  },
  {
    athlete: ATHLETES[3],
    platform: "tiktok",
    time: "Yesterday",
    isVideo: true,
    views: "672K views",
    gradient: ["#001230", "#000D20"],
    caption: "Day in the life of a libero: wake up, dig everything, sleep, repeat 😂 #TeamUSA #volleyball #libero",
    likes: "94K",
    comments: "2.7K",
    tag: undefined,
  },
  {
    athlete: ATHLETES[4],
    platform: "instagram",
    time: "2d ago",
    isVideo: false,
    gradient: ["#1A0018", "#001440"],
    caption: "Serie A1 life ☕🇮🇹 6am sets in Monza, then espresso on the balcony. Living the dream while keeping eyes on the prize — USA 2026. 🇺🇸",
    likes: "22.8K",
    comments: "614",
    tag: undefined,
  },
];

// ── Story circle ───────────────────────────────────────────────────────────────
function StoryCircle({ athlete, hasNew }: { athlete: Athlete; hasNew: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, flexShrink: 0, cursor: "pointer" }}>
      <div style={{ padding: 2, borderRadius: 24, background: hasNew ? `linear-gradient(135deg, ${athlete.color}, ${ACCENT})` : "transparent", border: hasNew ? "none" : `1.5px solid ${BORDER}` }}>
        <div style={{ width: 44, height: 44, borderRadius: 22, background: `${athlete.color}22`, border: `2px solid ${BG}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: athlete.color, fontFamily: "Inter" }}>{athlete.code}</span>
        </div>
      </div>
      <span style={{ fontSize: 9, color: hasNew ? TEXT : MUTED, fontFamily: "Inter", fontWeight: hasNew ? 600 : 400, maxWidth: 52, textAlign: "center", lineHeight: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{athlete.name.split(" ")[0]}</span>
    </div>
  );
}

// ── Post thumbnail ─────────────────────────────────────────────────────────────
function PostThumb({ post, height = 210 }: { post: Post; height?: number }) {
  return (
    <div style={{ height, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${post.gradient[0]}, ${post.gradient[1]})` }}>
      {/* Decorative ball */}
      <div style={{ position: "absolute", right: -30, bottom: -30, opacity: 0.5 }}>
        <VolleyBall size={180} color={`${post.athlete.color}20`} />
      </div>
      <div style={{ position: "absolute", left: 20, top: 20, opacity: 0.35 }}>
        <VolleyBall size={80} color={`${post.athlete.color}30`} />
      </div>

      {/* Platform badge */}
      <div style={{ position: "absolute", top: 12, right: 12, width: 28, height: 28, borderRadius: 8, background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {post.platform === "instagram" ? <IgIcon size={14} /> : post.platform === "tiktok" ? <TikTokIcon size={14} /> : <XIcon size={14} />}
      </div>

      {/* Video play / views */}
      {post.isVideo && (
        <>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: 26, background: "rgba(0,0,0,0.55)", border: "2px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Play size={22} color="white" fill="white" style={{ marginLeft: 3 }} />
            </div>
          </div>
          {post.views && (
            <div style={{ position: "absolute", bottom: 12, left: 12, background: "rgba(0,0,0,0.6)", borderRadius: 10, padding: "3px 9px" }}>
              <span style={{ fontSize: 11, color: "#fff", fontFamily: "Inter", fontWeight: 600 }}>{post.views}</span>
            </div>
          )}
        </>
      )}

      {/* Viral tag */}
      {post.tag && (
        <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,0.6)", borderRadius: 10, padding: "4px 10px", border: "1px solid rgba(255,255,255,0.12)" }}>
          <span style={{ fontSize: 10, color: "#fff", fontFamily: "Inter", fontWeight: 700 }}>{post.tag}</span>
        </div>
      )}

      {/* Bottom gradient */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(to top, rgba(6,14,44,0.9), transparent)" }} />
    </div>
  );
}

// ── Featured post card ─────────────────────────────────────────────────────────
function FeaturedPost({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const a = post.athlete;

  return (
    <div style={{ background: CARD, borderRadius: 20, marginBottom: 20, border: `1px solid rgba(255,255,255,0.09)`, overflow: "hidden" }}>
      {/* Author row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px 10px" }}>
        <div style={{ width: 38, height: 38, borderRadius: 12, background: `${a.color}25`, border: `1.5px solid ${a.color}50`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: a.color, fontFamily: "Inter" }}>{a.code}</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>{a.name}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>{a.handle}</span>
            <span style={{ fontSize: 10, color: MUTED }}>·</span>
            <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>{post.time}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, background: `${a.color}15`, border: `1px solid ${a.color}30`, borderRadius: 10, padding: "3px 9px" }}>
          {post.platform === "instagram" ? <IgIcon size={11}/> : post.platform === "tiktok" ? <TikTokIcon size={11}/> : <XIcon size={11}/>}
          <span style={{ fontSize: 10, color: a.color, fontFamily: "Inter", fontWeight: 600, textTransform: "capitalize" as const }}>{post.platform === "x" ? "X" : post.platform}</span>
        </div>
      </div>

      {/* Media */}
      <PostThumb post={post} height={210} />

      {/* Caption */}
      <div style={{ padding: "12px 14px 4px" }}>
        <span style={{ fontSize: 13, color: "rgba(232,236,245,0.85)", fontFamily: "Inter", lineHeight: "20px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
          <span style={{ color: a.color, fontWeight: 700 }}>{a.handle} </span>{post.caption}
        </span>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", padding: "10px 14px 14px", gap: 16 }}>
        <button onClick={() => setLiked(!liked)} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <Heart size={20} color={liked ? "#E84855" : MUTED} fill={liked ? "#E84855" : "none"} />
          <span style={{ fontSize: 13, color: liked ? "#E84855" : MUTED, fontFamily: "Inter", fontWeight: 600 }}>{post.likes}</span>
        </button>
        <button style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <MessageCircle size={20} color={MUTED} />
          <span style={{ fontSize: 13, color: MUTED, fontFamily: "Inter", fontWeight: 600 }}>{post.comments}</span>
        </button>
        <button style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <Share2 size={18} color={MUTED} />
        </button>
        <div style={{ flex: 1 }} />
        <button onClick={() => setSaved(!saved)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <Bookmark size={20} color={saved ? ACCENT : MUTED} fill={saved ? ACCENT : "none"} />
        </button>
      </div>
    </div>
  );
}

// ── Compact post card ──────────────────────────────────────────────────────────
function CompactPost({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const a = post.athlete;

  return (
    <div style={{ background: CARD, borderRadius: 18, marginBottom: 12, border: `1px solid ${BORDER}`, overflow: "hidden" }}>
      {/* Author row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 13px" }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: `${a.color}22`, border: `1.5px solid ${a.color}45`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: a.color, fontFamily: "Inter" }}>{a.code}</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>{a.name}</div>
          <div style={{ fontSize: 10, color: MUTED, fontFamily: "Inter" }}>{a.handle} · {post.time}</div>
        </div>
        {post.platform === "instagram" ? <IgIcon size={16}/> : post.platform === "tiktok" ? <TikTokIcon size={16}/> : <XIcon size={16}/>}
      </div>

      {/* Media row */}
      <div style={{ display: "flex", gap: 0 }}>
        {/* Thumbnail */}
        <div style={{ width: 110, flexShrink: 0, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${post.gradient[0]}, ${post.gradient[1]})` }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <VolleyBall size={70} color={`${a.color}30`} />
          </div>
          {post.isVideo && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 34, height: 34, borderRadius: 17, background: "rgba(0,0,0,0.5)", border: "1.5px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Play size={14} color="white" fill="white" style={{ marginLeft: 2 }} />
              </div>
            </div>
          )}
          {post.views && (
            <div style={{ position: "absolute", bottom: 6, left: 6, background: "rgba(0,0,0,0.7)", borderRadius: 6, padding: "2px 6px" }}>
              <span style={{ fontSize: 9, color: "#fff", fontFamily: "Inter", fontWeight: 600 }}>{post.views}</span>
            </div>
          )}
        </div>

        {/* Caption + actions */}
        <div style={{ flex: 1, padding: "10px 12px", display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
          <span style={{ fontSize: 12, color: "rgba(232,236,245,0.8)", fontFamily: "Inter", lineHeight: "18px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
            {post.caption}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
            <button onClick={() => setLiked(!liked)} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              <Heart size={14} color={liked ? "#E84855" : MUTED} fill={liked ? "#E84855" : "none"} />
              <span style={{ fontSize: 11, color: liked ? "#E84855" : MUTED, fontFamily: "Inter" }}>{post.likes}</span>
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <MessageCircle size={14} color={MUTED} />
              <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>{post.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main screen ─────────────────────────────────────────────────────────────────
export function NewsScreen() {
  const [activeAthleteIdx, setActiveAthleteIdx] = useState(1);

  return (
    <div style={{ width: 390, height: 844, overflowY: "auto", background: BG, fontFamily: "Inter, sans-serif", position: "relative" }}>
      {/* Header gradient */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 210, background: "linear-gradient(135deg, #001A40, #000D2E)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 210, background: "linear-gradient(225deg, rgba(68,201,142,0.2), transparent)", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, padding: "52px 0 24px" }}>

        {/* ── Header ─────────────────────────────────────── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18, paddingLeft: 16, paddingRight: 16 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: TEXT, fontFamily: "Inter", letterSpacing: -0.5 }}>Athletes</div>
            <div style={{ fontSize: 13, color: "rgba(232,236,245,0.6)", fontFamily: "Inter", marginTop: 3 }}>USA Volleyball · Social Feed</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {(["instagram", "tiktok", "x"] as Platform[]).map(p => (
              <div key={p} style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(255,255,255,0.06)", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {p === "instagram" ? <IgIcon size={16}/> : p === "tiktok" ? <TikTokIcon size={16}/> : <XIcon size={16}/>}
              </div>
            ))}
          </div>
        </div>

        {/* ── Stories / athlete strip ─────────────────────── */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ paddingLeft: 16, paddingRight: 16, marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: MUTED, fontFamily: "Inter", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" as const }}>Following</span>
            <div style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
              <span style={{ fontSize: 12, color: ACCENT, fontFamily: "Inter", fontWeight: 600 }}>Manage</span>
              <ChevronRight size={13} color={ACCENT} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 14, overflowX: "auto", scrollbarWidth: "none", paddingLeft: 16, paddingRight: 16 }}>
            {ATHLETES.map((a, i) => (
              <div key={i} onClick={() => setActiveAthleteIdx(i)}>
                <StoryCircle athlete={a} hasNew={i <= 4} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ paddingLeft: 16, paddingRight: 16 }}>

          {/* ── Featured viral post ─────────────────────────── */}
          <FeaturedPost post={POSTS[0]} />

          {/* ── Feed header ─────────────────────────────────── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ fontSize: 15, color: TEXT, fontFamily: "Inter", fontWeight: 700 }}>Recent Posts</span>
            <div style={{ display: "flex", gap: 6 }}>
              {["All", "Videos", "Photos"].map((f, i) => (
                <div key={f} style={{ padding: "5px 10px", borderRadius: 10, background: i === 0 ? ACCENT : SURFACE, border: `1px solid ${i === 0 ? ACCENT : BORDER}`, cursor: "pointer" }}>
                  <span style={{ fontSize: 11, color: i === 0 ? "#fff" : MUTED, fontFamily: "Inter", fontWeight: 600 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Feed posts ──────────────────────────────────── */}
          {POSTS.slice(1).map((post, i) => <CompactPost key={i} post={post} />)}

        </div>
      </div>
    </div>
  );
}
