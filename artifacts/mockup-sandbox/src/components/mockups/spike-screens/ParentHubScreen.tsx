import { useState } from "react";
import { MapPin, ChevronRight, Ticket, Users, Calendar, Phone, Mail, Shield, Check, Clock } from "lucide-react";

const BG     = "#000D2E";
const CARD   = "#060E2C";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT   = "#E8ECF5";
const MUTED  = "#6B7A9F";
const ACCENT = "#BF0D3E";
const GREEN  = "#2DC579";
const GOLD   = "#FFD700";
const DISC   = "#9B59B6"; // NCAA / junior purple

function VolleyBall({ size = 24, color = "rgba(255,255,255,0.12)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
      <path d="M12 2 C12 2 8 6 8 12 C8 18 12 22 12 22" stroke={color} strokeWidth="1.5" />
      <path d="M2 12 C2 12 6 8 12 8 C18 8 22 12 22 12" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// ── Club data ──────────────────────────────────────────────────────────────────

const CLUB = {
  name: "Mountain Empire Volleyball Club",
  shortName: "MEVC",
  team: "16 Elite",
  director: "Sarah Mitchell",
  coach: "Coach Daniels",
  assistants: ["Asst. Rivera", "Asst. Park"],
  gym: "Desert Ridge Sports Complex",
  city: "Phoenix, AZ",
  phone: "(602) 555-0182",
  email: "16elite@mevbc.org",
  region: "Arizona Region",
  affNum: "AZ-2026-4412",
  ageGroup: "16U",
  colors: ["#6B2FBF", "#FFFFFF"],
};

type Player = { num: number; name: string; pos: string; ht: string; gradYear: number };
const ROSTER: Player[] = [
  { num:  1, name: "Ava Mitchell",      pos: "S",   ht: `5'9"`,  gradYear: 2028 },
  { num:  3, name: "Priya Sharma",      pos: "OH",  ht: `5'11"`, gradYear: 2028 },
  { num:  5, name: "Chloe Jensen",      pos: "MB",  ht: `6'0"`,  gradYear: 2027 },
  { num:  7, name: "Lily Park",         pos: "OH",  ht: `5'10"`, gradYear: 2028 },
  { num: 10, name: "Sofia Delgado",     pos: "OPP", ht: `5'11"`, gradYear: 2027 },
  { num: 12, name: "Emma Thornton",     pos: "MB",  ht: `6'1"`,  gradYear: 2028 },
  { num: 14, name: "Jasmine Brooks",    pos: "OH",  ht: `5'10"`, gradYear: 2029 },
  { num: 16, name: "Nadia Kowalski",    pos: "DS",  ht: `5'6"`,  gradYear: 2029 },
  { num: 18, name: "Taylor Nguyen",     pos: "L",   ht: `5'5"`,  gradYear: 2028 },
  { num: 20, name: "Grace Okonkwo",     pos: "MB",  ht: `5'11"`, gradYear: 2027 },
  { num: 22, name: "Brianna Walsh",     pos: "S",   ht: `5'8"`,  gradYear: 2028 },
  { num: 24, name: "Mia Rodriguez",     pos: "OH",  ht: `5'9"`,  gradYear: 2029 },
];

const POS_COLOR: Record<string, string> = {
  OH: "#3A7BF5", OPP: "#E04E8A", MB: "#F5A623", S: "#44C98E", L: "#9B59B6", DS: "#9B59B6",
};

type Event = {
  id: number;
  name: string; short: string;
  date: string; dateShort: string;
  city: string; venue: string; state: string;
  division: string;
  ticketsAvail: boolean;
  purchased: boolean;
  sessions: { label: string; price: number; sold?: boolean }[];
};

const EVENTS: Event[] = [
  {
    id: 1,
    name: "Southwest Qualifier 2026",
    short: "SW Qualifier",
    date: "Sat–Sun, Jan 18–19, 2026",
    dateShort: "Jan 18–19",
    city: "Las Vegas", venue: "Las Vegas Convention Center", state: "NV",
    division: "16U Gold",
    ticketsAvail: true,
    purchased: true,   // ← parent already bought tickets
    sessions: [
      { label: "Day 1 – Saturday", price: 12 },
      { label: "Day 2 – Sunday",   price: 12 },
      { label: "Weekend Pass",     price: 20 },
    ],
  },
  {
    id: 2,
    name: "Desert Invitational",
    short: "Desert Invite",
    date: "Sat, Feb 8, 2026",
    dateShort: "Feb 8",
    city: "Phoenix", venue: "Desert Ridge Sports Complex", state: "AZ",
    division: "16U Open",
    ticketsAvail: true,
    purchased: false,
    sessions: [
      { label: "All-Day Pass", price: 10 },
    ],
  },
  {
    id: 3,
    name: "AZ Region Championships",
    short: "AZ Regionals",
    date: "Fri–Sun, Mar 7–9, 2026",
    dateShort: "Mar 7–9",
    city: "Tucson", venue: "Tucson Convention Center", state: "AZ",
    division: "16U",
    ticketsAvail: false,
    purchased: false,
    sessions: [
      { label: "Day 1 – Friday",   price: 10 },
      { label: "Day 2 – Saturday", price: 12 },
      { label: "Day 3 – Sunday",   price: 12 },
      { label: "Full Event Pass",  price: 28 },
    ],
  },
  {
    id: 4,
    name: "USAV Junior National Championships",
    short: "Junior Nationals",
    date: "Thu–Mon, Jun 25–29, 2026",
    dateShort: "Jun 25–29",
    city: "Indianapolis", venue: "Indiana Convention Center", state: "IN",
    division: "16U National",
    ticketsAvail: false,
    purchased: false,
    sessions: [],
  },
];

// ── Purchased ticket banner ────────────────────────────────────────────────────
function PurchasedBanner({ event }: { event: Event }) {
  return (
    <div style={{ borderRadius: 20, marginBottom: 18, overflow: "hidden", border: `1.5px solid ${GREEN}45`, position: "relative", cursor: "pointer" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #001A10, #001240)" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${GREEN}18, transparent)` }} />
      <div style={{ position: "absolute", right: -20, bottom: -20, opacity: 0.3 }}>
        <VolleyBall size={150} color={`${GREEN}20`} />
      </div>
      <div style={{ position: "relative", padding: "14px 16px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: `${GREEN}25`, border: `1px solid ${GREEN}50`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ticket size={14} color={GREEN} />
          </div>
          <span style={{ fontSize: 12, color: GREEN, fontFamily: "Inter", fontWeight: 800, letterSpacing: "0.5px" }}>YOUR TICKET · {event.short.toUpperCase()}</span>
          <div style={{ marginLeft: "auto", background: `${GREEN}20`, border: `1px solid ${GREEN}40`, borderRadius: 10, padding: "3px 9px", display: "flex", alignItems: "center", gap: 4 }}>
            <Check size={10} color={GREEN} />
            <span style={{ fontSize: 10, color: GREEN, fontFamily: "Inter", fontWeight: 700 }}>Purchased</span>
          </div>
        </div>

        {/* Event info */}
        <div style={{ fontSize: 16, fontWeight: 700, color: TEXT, fontFamily: "Inter", marginBottom: 8, lineHeight: "22px" }}>{event.name}</div>

        <div style={{ display: "flex", gap: 14, marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Calendar size={12} color={MUTED} />
            <span style={{ fontSize: 12, color: "rgba(232,236,245,0.75)", fontFamily: "Inter" }}>{event.date}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <MapPin size={12} color={MUTED} />
            <span style={{ fontSize: 12, color: "rgba(232,236,245,0.75)", fontFamily: "Inter" }}>{event.city}, {event.state}</span>
          </div>
        </div>

        <div style={{ fontSize: 11, color: MUTED, fontFamily: "Inter", marginBottom: 10 }}>{event.venue}</div>

        {/* Sessions purchased */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
          {event.sessions.filter(s => !s.sold).map((s, i) => (
            <div key={i} style={{ background: `${GREEN}12`, border: `1px solid ${GREEN}30`, borderRadius: 10, padding: "5px 11px", display: "flex", alignItems: "center", gap: 5 }}>
              <Check size={10} color={GREEN} />
              <span style={{ fontSize: 11, color: GREEN, fontFamily: "Inter", fontWeight: 600 }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* View ticket CTA */}
        <div style={{ marginTop: 12, padding: "10px 14px", background: GREEN, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer" }}>
          <Ticket size={14} color="#fff" />
          <span style={{ fontSize: 13, color: "#fff", fontFamily: "Inter", fontWeight: 700 }}>View & Download Ticket</span>
          <ChevronRight size={14} color="#fff" />
        </div>
      </div>
    </div>
  );
}

// ── Club card ──────────────────────────────────────────────────────────────────
function ClubCard() {
  return (
    <div style={{ borderRadius: 20, marginBottom: 20, overflow: "hidden", border: `1px solid ${DISC}35`, position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0D0020, #001240)" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${DISC}18, transparent)` }} />
      <div style={{ position: "absolute", right: -20, top: -20, opacity: 0.3 }}>
        <VolleyBall size={160} color={`${DISC}18`} />
      </div>

      <div style={{ position: "relative", padding: "16px 18px" }}>
        {/* Club identity */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: `${DISC}30`, border: `2px solid ${DISC}55`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: DISC, fontFamily: "Inter" }}>{CLUB.shortName}</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: TEXT, fontFamily: "Inter", lineHeight: "21px" }}>{CLUB.name}</div>
            <div style={{ fontSize: 12, color: DISC, fontFamily: "Inter", fontWeight: 600, marginTop: 2 }}>{CLUB.team} · {CLUB.ageGroup}</div>
          </div>
          <div style={{ background: "rgba(191,13,62,0.12)", border: "1px solid rgba(191,13,62,0.28)", borderRadius: 10, padding: "4px 9px" }}>
            <span style={{ fontSize: 10, color: ACCENT, fontFamily: "Inter", fontWeight: 700 }}>USAV ✓</span>
          </div>
        </div>

        {/* Details grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
          {[
            { icon: <Users size={12} color={MUTED} />,   label: "Head Coach",  val: CLUB.coach },
            { icon: <Users size={12} color={MUTED} />,   label: "Director",    val: CLUB.director },
            { icon: <MapPin size={12} color={MUTED} />,  label: "Home Gym",    val: `${CLUB.gym} · ${CLUB.city}` },
            { icon: <Shield size={12} color={MUTED} />,  label: "Region",      val: `${CLUB.region}` },
            { icon: <Phone size={12} color={MUTED} />,   label: "Contact",     val: CLUB.phone },
            { icon: <Mail size={12} color={MUTED} />,    label: "Email",       val: CLUB.email },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 22, display: "flex", justifyContent: "center", flexShrink: 0 }}>{r.icon}</div>
              <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter", width: 64, flexShrink: 0 }}>{r.label}</span>
              <span style={{ fontSize: 12, color: "rgba(232,236,245,0.85)", fontFamily: "Inter", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.val}</span>
            </div>
          ))}
        </div>

        {/* Affiliation pill */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "7px 11px" }}>
          <Shield size={11} color={MUTED} />
          <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>USA Volleyball Affiliation No.</span>
          <span style={{ fontSize: 11, color: TEXT, fontFamily: "Inter", fontWeight: 700, marginLeft: "auto" }}>{CLUB.affNum}</span>
        </div>
      </div>
    </div>
  );
}

// ── Roster tab ─────────────────────────────────────────────────────────────────
function RosterTab() {
  return (
    <div>
      {/* Coaches */}
      <div style={{ marginBottom: 16 }}>
        <span style={{ fontSize: 12, color: MUTED, fontFamily: "Inter", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" as const }}>Coaching Staff</span>
        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
          {[{ name: CLUB.coach, role: "Head Coach" }, { name: CLUB.assistants[0], role: "Assistant Coach" }, { name: CLUB.assistants[1], role: "Assistant Coach" }].map((c, i) => (
            <div key={i} style={{ background: CARD, borderRadius: 12, padding: "10px 14px", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: `${DISC}20`, border: `1px solid ${DISC}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Users size={14} color={DISC} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: TEXT, fontFamily: "Inter" }}>{c.name}</div>
                <div style={{ fontSize: 11, color: DISC, fontFamily: "Inter" }}>{c.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Players */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontSize: 12, color: MUTED, fontFamily: "Inter", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" as const }}>Players · {ROSTER.length} Athletes</span>
        </div>
        <div style={{ background: CARD, borderRadius: 16, overflow: "hidden", border: `1px solid ${BORDER}` }}>
          {/* Column headers */}
          <div style={{ display: "flex", alignItems: "center", padding: "8px 14px", background: "#050B25", gap: 8 }}>
            <span style={{ width: 28, fontSize: 10, color: MUTED, fontFamily: "Inter", fontWeight: 600, textAlign: "center" }}>#</span>
            <span style={{ flex: 1, fontSize: 10, color: MUTED, fontFamily: "Inter", fontWeight: 600 }}>Name</span>
            <span style={{ width: 36, fontSize: 10, color: MUTED, fontFamily: "Inter", fontWeight: 600, textAlign: "center" }}>Pos</span>
            <span style={{ width: 36, fontSize: 10, color: MUTED, fontFamily: "Inter", fontWeight: 600, textAlign: "center" }}>Ht</span>
            <span style={{ width: 38, fontSize: 10, color: MUTED, fontFamily: "Inter", fontWeight: 600, textAlign: "center" }}>Yr</span>
          </div>
          {ROSTER.map((p, i) => {
            const pc = POS_COLOR[p.pos] ?? DISC;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", padding: "10px 14px", borderTop: i > 0 ? `1px solid ${BORDER}` : "none", gap: 8 }}>
                <span style={{ width: 28, fontSize: 12, fontWeight: 700, color: MUTED, fontFamily: "Inter", textAlign: "center" }}>{p.num}</span>
                <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: TEXT, fontFamily: "Inter" }}>{p.name}</span>
                <div style={{ width: 36, display: "flex", justifyContent: "center" }}>
                  <div style={{ background: `${pc}18`, border: `1px solid ${pc}40`, borderRadius: 5, padding: "2px 6px" }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: pc, fontFamily: "Inter" }}>{p.pos}</span>
                  </div>
                </div>
                <span style={{ width: 36, fontSize: 11, color: MUTED, fontFamily: "Inter", textAlign: "center" }}>{p.ht}</span>
                <span style={{ width: 38, fontSize: 11, color: MUTED, fontFamily: "Inter", textAlign: "center" }}>'{String(p.gradYear).slice(2)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Schedule tab ───────────────────────────────────────────────────────────────
function ScheduleTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {EVENTS.map((ev, i) => (
        <div key={i} style={{ background: CARD, borderRadius: 18, overflow: "hidden", border: `1px solid ${ev.purchased ? GREEN + "35" : BORDER}`, position: "relative" }}>
          {ev.purchased && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: GREEN, borderRadius: "0 2px 2px 0" }} />}
          <div style={{ padding: "13px 14px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, fontFamily: "Inter", lineHeight: "19px", marginBottom: 4 }}>{ev.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" as const }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Calendar size={11} color={MUTED} />
                    <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>{ev.date}</span>
                  </div>
                </div>
              </div>
              {ev.purchased ? (
                <div style={{ background: `${GREEN}15`, border: `1px solid ${GREEN}35`, borderRadius: 10, padding: "4px 9px", display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                  <Check size={10} color={GREEN} />
                  <span style={{ fontSize: 10, color: GREEN, fontFamily: "Inter", fontWeight: 700 }}>Purchased</span>
                </div>
              ) : !ev.ticketsAvail ? (
                <div style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "4px 9px", flexShrink: 0 }}>
                  <span style={{ fontSize: 10, color: MUTED, fontFamily: "Inter", fontWeight: 600 }}>Tickets Soon</span>
                </div>
              ) : null}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
              <MapPin size={11} color={MUTED} />
              <span style={{ fontSize: 11, color: "rgba(232,236,245,0.65)", fontFamily: "Inter" }}>{ev.venue} · {ev.city}, {ev.state}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Shield size={11} color={MUTED} />
              <span style={{ fontSize: 11, color: DISC, fontFamily: "Inter", fontWeight: 600 }}>{ev.division}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Tickets tab ────────────────────────────────────────────────────────────────
function TicketsTab() {
  const [buying, setBuying] = useState<number | null>(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {EVENTS.map((ev, i) => (
        <div key={i} style={{ background: CARD, borderRadius: 18, overflow: "hidden", border: `1px solid ${ev.purchased ? GREEN + "35" : BORDER}` }}>
          {/* Event header */}
          <div style={{ padding: "13px 14px 10px", borderBottom: `1px solid ${BORDER}` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, fontFamily: "Inter" }}>{ev.short}</div>
                <div style={{ fontSize: 11, color: MUTED, fontFamily: "Inter", marginTop: 2 }}>{ev.dateShort} · {ev.city}, {ev.state}</div>
              </div>
              {ev.purchased && (
                <div style={{ background: `${GREEN}15`, border: `1px solid ${GREEN}35`, borderRadius: 10, padding: "4px 9px", display: "flex", alignItems: "center", gap: 4 }}>
                  <Check size={10} color={GREEN} />
                  <span style={{ fontSize: 10, color: GREEN, fontFamily: "Inter", fontWeight: 700 }}>Purchased</span>
                </div>
              )}
              {!ev.ticketsAvail && !ev.purchased && (
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Clock size={11} color={MUTED} />
                  <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>Coming soon</span>
                </div>
              )}
            </div>
          </div>

          {/* Sessions */}
          {ev.sessions.length > 0 && (
            <div style={{ padding: "10px 14px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
              {ev.sessions.map((s, j) => (
                <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 12, border: `1px solid ${BORDER}` }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: TEXT, fontFamily: "Inter", fontWeight: 500 }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: MUTED, fontFamily: "Inter", marginTop: 2 }}>${s.price}.00 per person</div>
                  </div>
                  {ev.purchased ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 4, background: `${GREEN}12`, border: `1px solid ${GREEN}30`, borderRadius: 10, padding: "6px 11px" }}>
                      <Check size={11} color={GREEN} />
                      <span style={{ fontSize: 11, color: GREEN, fontFamily: "Inter", fontWeight: 700 }}>Included</span>
                    </div>
                  ) : ev.ticketsAvail ? (
                    <button
                      onClick={() => setBuying(ev.id * 10 + j)}
                      style={{ background: buying === ev.id * 10 + j ? GREEN : ACCENT, border: "none", borderRadius: 10, padding: "7px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}
                    >
                      {buying === ev.id * 10 + j ? <Check size={12} color="#fff" /> : <Ticket size={12} color="#fff" />}
                      <span style={{ fontSize: 12, color: "#fff", fontFamily: "Inter", fontWeight: 700 }}>{buying === ev.id * 10 + j ? "Added!" : "Buy"}</span>
                    </button>
                  ) : (
                    <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "6px 11px" }}>
                      <span style={{ fontSize: 11, color: MUTED, fontFamily: "Inter" }}>Soon</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {ev.sessions.length === 0 && (
            <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 6 }}>
              <Clock size={12} color={MUTED} />
              <span style={{ fontSize: 12, color: MUTED, fontFamily: "Inter" }}>Ticket sales open closer to the event date</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main screen ─────────────────────────────────────────────────────────────────
export function ParentHubScreen() {
  const [tab, setTab] = useState<"roster" | "schedule" | "tickets">("schedule");
  const purchasedEvent = EVENTS.find(e => e.purchased);

  return (
    <div style={{ width: 390, height: 844, overflowY: "auto", background: BG, fontFamily: "Inter, sans-serif", position: "relative" }}>
      {/* Header gradient */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220, background: "linear-gradient(135deg, #0D0020, #001240)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220, background: `linear-gradient(225deg, ${DISC}25, transparent)`, zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, padding: "52px 16px 28px" }}>

        {/* ── Header ─────────────────────────────────────── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: TEXT, fontFamily: "Inter", letterSpacing: -0.5 }}>Parent Hub</div>
            <div style={{ fontSize: 13, color: "rgba(232,236,245,0.6)", fontFamily: "Inter", marginTop: 3 }}>Junior Club · {CLUB.team}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: `${DISC}15`, border: `1px solid ${DISC}35`, borderRadius: 20, padding: "6px 12px" }}>
            <Shield size={13} color={DISC} />
            <span style={{ fontSize: 11, color: DISC, fontFamily: "Inter", fontWeight: 700 }}>{CLUB.ageGroup}</span>
          </div>
        </div>

        {/* ── Purchased ticket banner (always at top if purchased) ── */}
        {purchasedEvent && <PurchasedBanner event={purchasedEvent} />}

        {/* ── Club card ───────────────────────────────────── */}
        <ClubCard />

        {/* ── Content tabs ────────────────────────────────── */}
        <div style={{ display: "flex", background: CARD, borderRadius: 14, padding: 3, marginBottom: 20, border: `1px solid ${BORDER}` }}>
          {(["schedule", "roster", "tickets"] as const).map(key => {
            const labels = { schedule: "Schedule", roster: "Roster", tickets: "Tickets" };
            const active = tab === key;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={{ flex: 1, padding: "9px 0", borderRadius: 11, border: "none", cursor: "pointer", background: active ? DISC : "transparent", color: active ? "#fff" : MUTED, fontSize: 12, fontFamily: "Inter", fontWeight: 700, transition: "all 0.15s" }}
              >
                {labels[key]}
              </button>
            );
          })}
        </div>

        {/* ── Tab content ─────────────────────────────────── */}
        {tab === "roster"   && <RosterTab   />}
        {tab === "schedule" && <ScheduleTab />}
        {tab === "tickets"  && <TicketsTab  />}

      </div>
    </div>
  );
}
