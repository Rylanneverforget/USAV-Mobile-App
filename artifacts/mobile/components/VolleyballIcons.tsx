import React from "react";
import Svg, {
  Circle,
  Ellipse,
  Line,
  Path,
  Rect,
  G,
  Defs,
  ClipPath,
  Polygon,
} from "react-native-svg";

type IconProps = {
  size?: number;
  color?: string;
  opacity?: number;
};

// ─── VOLLEYBALL (the ball) ────────────────────────────────────────────────────
export function VolleyballSvg({ size = 40, color = "#fff", opacity = 1 }: IconProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - size * 0.045;
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Defs>
        <ClipPath id={`vc${size}`}>
          <Circle cx={cx} cy={cy} r={r} />
        </ClipPath>
      </Defs>
      <Circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={size * 0.04} opacity={opacity} />
      <G clipPath={`url(#vc${size})`} opacity={opacity}>
        <Path d={`M ${cx - r} ${cy} Q ${cx - r * 0.5} ${cy - r * 0.7} ${cx} ${cy - r * 0.7} Q ${cx + r * 0.5} ${cy - r * 0.7} ${cx + r} ${cy}`} fill="none" stroke={color} strokeWidth={size * 0.032} />
        <Path d={`M ${cx - r} ${cy} Q ${cx - r * 0.5} ${cy + r * 0.7} ${cx} ${cy + r * 0.7} Q ${cx + r * 0.5} ${cy + r * 0.7} ${cx + r} ${cy}`} fill="none" stroke={color} strokeWidth={size * 0.032} />
        <Path d={`M ${cx} ${cy - r} Q ${cx + r * 0.7} ${cy - r * 0.5} ${cx + r * 0.7} ${cy} Q ${cx + r * 0.7} ${cy + r * 0.5} ${cx} ${cy + r}`} fill="none" stroke={color} strokeWidth={size * 0.032} />
        <Path d={`M ${cx} ${cy - r} Q ${cx - r * 0.7} ${cy - r * 0.5} ${cx - r * 0.7} ${cy} Q ${cx - r * 0.7} ${cy + r * 0.5} ${cx} ${cy + r}`} fill="none" stroke={color} strokeWidth={size * 0.032} />
      </G>
    </Svg>
  );
}

// ─── SPIKE / PLAYER ATTACKING ────────────────────────────────────────────────
export function SpikeIcon({ size = 32, color = "#BF0D3E", opacity = 1 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <G opacity={opacity}>
        <Circle cx="22" cy="7" r="4.5" fill="none" stroke={color} strokeWidth="1.5" />
        <Path d="M 21 7 Q 21.5 8 22 8.5" fill="none" stroke={color} strokeWidth="0.9" />
        <Path d="M 22 4.5 Q 23.5 5.5 24 7" fill="none" stroke={color} strokeWidth="0.9" />
        <Path d="M 19 6 Q 20 4.5 22 4.5" fill="none" stroke={color} strokeWidth="0.9" />
        <Path d="M 18 11 Q 15 14 13 18 Q 12 21 14 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        <Path d="M 14 24 Q 12 28 10 29.5 Q 9 30 8 28.5 Q 11 25 12.5 21" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        <Path d="M 14 24 Q 16 28 15.5 30 Q 14.5 31 13.5 30 Q 13 27 13.5 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        <Path d="M 14 24 Q 17.5 27.5 18.5 29.5 Q 19 30.5 18 30.5 Q 15.5 28.5 14.5 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        <Path d="M 6 14 Q 10 11 14.5 17" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </G>
    </Svg>
  );
}

// ─── NET & COURT (top-down) ───────────────────────────────────────────────────
export function NetCourtIcon({ size = 32, color = "#BF0D3E", opacity = 1 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <G opacity={opacity}>
        <Rect x="2" y="7" width="28" height="18" rx="1.5" fill="none" stroke={color} strokeWidth="1.5" />
        <Line x1="16" y1="7" x2="16" y2="25" stroke={color} strokeWidth="2" />
        <Rect x="2" y="14.5" width="28" height="3" rx="1" fill={color} opacity={0.25} />
        <Line x1="2" y1="16" x2="30" y2="16" stroke={color} strokeWidth="2" />
        <Line x1="6" y1="7" x2="6" y2="25" stroke={color} strokeWidth="0.8" opacity={0.5} />
        <Line x1="11" y1="7" x2="11" y2="25" stroke={color} strokeWidth="0.8" opacity={0.5} />
        <Line x1="21" y1="7" x2="21" y2="25" stroke={color} strokeWidth="0.8" opacity={0.5} />
        <Line x1="26" y1="7" x2="26" y2="25" stroke={color} strokeWidth="0.8" opacity={0.5} />
        <Line x1="2" y1="11" x2="30" y2="11" stroke={color} strokeWidth="0.8" opacity={0.5} />
        <Line x1="2" y1="21" x2="30" y2="21" stroke={color} strokeWidth="0.8" opacity={0.5} />
      </G>
    </Svg>
  );
}

// ─── JERSEY / NUMBER ─────────────────────────────────────────────────────────
export function JerseyIcon({ size = 32, color = "#BF0D3E", opacity = 1 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <G opacity={opacity}>
        <Path d="M 10 4 L 5 10 L 9.5 12.5 L 9.5 28 L 22.5 28 L 22.5 12.5 L 27 10 L 22 4 Q 19.5 8 16 8 Q 12.5 8 10 4 Z" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        <Line x1="13" y1="18" x2="13" y2="24" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <Line x1="16" y1="18" x2="16" y2="24" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <Line x1="13" y1="18" x2="16" y2="18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <Line x1="13" y1="21" x2="16" y2="21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <Line x1="18.5" y1="18" x2="18.5" y2="24" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      </G>
    </Svg>
  );
}

// ─── OLYMPICS RINGS + ATHLETE ────────────────────────────────────────────────
export function OlympicsIcon({ size = 32, color = "#BF0D3E", opacity = 1 }: IconProps) {
  const ring = size * 0.18;
  const gap = ring * 0.5;
  const y1 = size * 0.32;
  const y2 = size * 0.52;
  const positions = [
    { cx: ring + 2, cy: y1 },
    { cx: ring * 2 + gap + 2, cy: y1 },
    { cx: ring * 3 + gap * 2 + 2, cy: y1 },
    { cx: ring * 1.5 + gap * 0.5 + 2, cy: y2 },
    { cx: ring * 2.5 + gap * 1.5 + 2, cy: y2 },
  ];
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <G opacity={opacity}>
        {positions.map((pos, i) => (
          <Circle key={i} cx={pos.cx} cy={pos.cy} r={ring * 0.82} fill="none" stroke={color} strokeWidth={size * 0.05} />
        ))}
        <Path d={`M ${size * 0.35} ${size * 0.72} Q ${size * 0.5} ${size * 0.64} ${size * 0.65} ${size * 0.72}`} fill="none" stroke={color} strokeWidth={size * 0.045} strokeLinecap="round" />
        <Line x1={size * 0.5} y1={size * 0.72} x2={size * 0.5} y2={size * 0.9} stroke={color} strokeWidth={size * 0.045} strokeLinecap="round" />
        <Path d={`M ${size * 0.35} ${size * 0.76} Q ${size * 0.5} ${size * 0.85} ${size * 0.65} ${size * 0.76}`} fill="none" stroke={color} strokeWidth={size * 0.045} strokeLinecap="round" />
      </G>
    </Svg>
  );
}

// ─── SCOREBOARD / STANDINGS ───────────────────────────────────────────────────
// A volleyball above a simple podium — for the Standings tab
export function ScoreboardIcon({ size = 32, color = "#BF0D3E", opacity = 1 }: IconProps) {
  const s = size / 32;
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <G opacity={opacity}>
        {/* Volleyball at top */}
        <Circle cx="16" cy="7" r="5" fill="none" stroke={color} strokeWidth={1.5 * s * 32 / 32} />
        <Path d="M 11 7 Q 13 4.5 16 4.5 Q 19 4.5 21 7" fill="none" stroke={color} strokeWidth="1.1" />
        <Path d="M 11 7 Q 13 9.5 16 9.5 Q 19 9.5 21 7" fill="none" stroke={color} strokeWidth="1.1" />
        <Path d="M 16 2 Q 19 4 20.5 7 Q 19 10 16 12" fill="none" stroke={color} strokeWidth="1.1" />
        {/* Podium */}
        <Rect x="12" y="15" width="8" height="12" rx="1" fill="none" stroke={color} strokeWidth="1.5" />
        <Rect x="3" y="20" width="8" height="7" rx="1" fill="none" stroke={color} strokeWidth="1.4" />
        <Rect x="21" y="22" width="8" height="5" rx="1" fill="none" stroke={color} strokeWidth="1.4" />
        {/* Numbers */}
        <Line x1="16" y1="18" x2="16" y2="24" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        <Line x1="6" y1="23" x2="7.5" y2="21.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
        <Line x1="7.5" y1="21.5" x2="7.5" y2="25" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
        <Line x1="24" y1="25" x2="25.5" y2="25" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      </G>
    </Svg>
  );
}

// ─── PLAYER STATS (person + bar chart) ───────────────────────────────────────
export function PlayerStatsIcon({ size = 32, color = "#BF0D3E", opacity = 1 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <G opacity={opacity}>
        {/* Head */}
        <Circle cx="12" cy="6" r="4" fill="none" stroke={color} strokeWidth="1.5" />
        {/* Body */}
        <Path d="M 5 28 Q 5 18 12 18 Q 15 18 16.5 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <Path d="M 12 18 L 12 26" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <Path d="M 7 22 L 17 22" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        {/* Bar chart */}
        <Rect x="19" y="20" width="3.5" height="8" rx="1" fill="none" stroke={color} strokeWidth="1.3" />
        <Rect x="24" y="15" width="3.5" height="13" rx="1" fill="none" stroke={color} strokeWidth="1.3" />
        <Rect x="29" y="12" width="1.5" height="16" rx="0.7" fill={color} opacity={0.4} />
        <Line x1="19" y1="29" x2="32" y2="29" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      </G>
    </Svg>
  );
}

// ─── NEWS / SCROLL ───────────────────────────────────────────────────────────
// Newspaper with a mini volleyball in the corner
export function NewsScrollIcon({ size = 32, color = "#BF0D3E", opacity = 1 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <G opacity={opacity}>
        {/* Page */}
        <Rect x="3" y="5" width="20" height="24" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
        {/* Lines of text */}
        <Line x1="7" y1="11" x2="19" y2="11" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        <Line x1="7" y1="15" x2="19" y2="15" stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity={0.6} />
        <Line x1="7" y1="19" x2="15" y2="19" stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity={0.6} />
        <Line x1="7" y1="23" x2="17" y2="23" stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity={0.6} />
        {/* Mini volleyball badge top-right */}
        <Circle cx="25" cy="9" r="5.5" fill="none" stroke={color} strokeWidth="1.4" />
        <Path d="M 19.5 9 Q 22 6.5 25 6.5 Q 28 6.5 30.5 9" fill="none" stroke={color} strokeWidth="0.9" />
        <Path d="M 19.5 9 Q 22 11.5 25 11.5 Q 28 11.5 30.5 9" fill="none" stroke={color} strokeWidth="0.9" />
      </G>
    </Svg>
  );
}

// ─── HOME / COURT HOUSE ──────────────────────────────────────────────────────
// A volleyball net inside a house-roof silhouette
export function HomeCourtIcon({ size = 32, color = "#BF0D3E", opacity = 1 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <G opacity={opacity}>
        {/* Roof */}
        <Path d="M 16 3 L 28 13 L 24 13 L 24 28 L 8 28 L 8 13 L 4 13 Z" fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
        {/* Net inside court area */}
        <Line x1="8" y1="20" x2="24" y2="20" stroke={color} strokeWidth="1.8" />
        {/* Net grid */}
        <Line x1="11" y1="20" x2="11" y2="28" stroke={color} strokeWidth="0.8" opacity={0.5} />
        <Line x1="14" y1="20" x2="14" y2="28" stroke={color} strokeWidth="0.8" opacity={0.5} />
        <Line x1="17" y1="20" x2="17" y2="28" stroke={color} strokeWidth="0.8" opacity={0.5} />
        <Line x1="20" y1="20" x2="20" y2="28" stroke={color} strokeWidth="0.8" opacity={0.5} />
        <Line x1="8" y1="23.5" x2="24" y2="23.5" stroke={color} strokeWidth="0.8" opacity={0.5} />
        {/* Volleyball above net */}
        <Circle cx="16" cy="16" r="3" fill="none" stroke={color} strokeWidth="1.2" />
        <Path d="M 13 16 Q 14.5 14 16 14 Q 17.5 14 19 16" fill="none" stroke={color} strokeWidth="0.8" />
        <Path d="M 13 16 Q 14.5 18 16 18 Q 17.5 18 19 16" fill="none" stroke={color} strokeWidth="0.8" />
      </G>
    </Svg>
  );
}

// ─── BEACH VOLLEYBALL ────────────────────────────────────────────────────────
// Sun rays + volleyball + sand wave
export function BeachIcon({ size = 32, color = "#F5A623", opacity = 1 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <G opacity={opacity}>
        {/* Sun */}
        <Circle cx="24" cy="8" r="3.5" fill="none" stroke={color} strokeWidth="1.3" />
        <Line x1="24" y1="2.5" x2="24" y2="1" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        <Line x1="28.3" y1="3.7" x2="29.3" y2="2.7" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        <Line x1="29.5" y1="8" x2="31" y2="8" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        <Line x1="28.3" y1="12.3" x2="29.3" y2="13.3" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        {/* Volleyball */}
        <Circle cx="13" cy="13" r="7" fill="none" stroke={color} strokeWidth="1.5" />
        <Path d="M 6 13 Q 9.5 9 13 9 Q 16.5 9 20 13" fill="none" stroke={color} strokeWidth="1.1" />
        <Path d="M 6 13 Q 9.5 17 13 17 Q 16.5 17 20 13" fill="none" stroke={color} strokeWidth="1.1" />
        <Path d="M 13 6 Q 18 9.5 19.5 13 Q 18 16.5 13 20" fill="none" stroke={color} strokeWidth="1.1" />
        {/* Sand wave */}
        <Path d="M 2 26 Q 8 23 14 26 Q 20 29 26 26 Q 28 25 30 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        <Path d="M 2 30 Q 8 27 14 30 Q 20 33 26 30" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity={0.5} />
      </G>
    </Svg>
  );
}

// ─── SITTING VOLLEYBALL ───────────────────────────────────────────────────────
// Seated player reaching up for a ball
export function SittingIcon({ size = 32, color = "#44C98E", opacity = 1 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <G opacity={opacity}>
        {/* Head */}
        <Circle cx="22" cy="5" r="3.5" fill="none" stroke={color} strokeWidth="1.4" />
        {/* Arm reaching up */}
        <Path d="M 19 8 Q 16 10 15 7 Q 12 3 10 5" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        {/* Torso */}
        <Path d="M 19 9 Q 20 13 18 17" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        {/* Sitting on ground - legs */}
        <Path d="M 18 17 Q 14 18 10 18 Q 7 18 5 21" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <Path d="M 18 17 Q 22 19 25 21" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        {/* Ground line */}
        <Line x1="2" y1="22" x2="30" y2="22" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity={0.5} />
        {/* Volleyball being reached for */}
        <Circle cx="9" cy="7" r="4.5" fill="none" stroke={color} strokeWidth="1.3" />
        <Path d="M 4.5 7 Q 6.5 4.5 9 4.5 Q 11.5 4.5 13.5 7" fill="none" stroke={color} strokeWidth="0.9" />
        <Path d="M 4.5 7 Q 6.5 9.5 9 9.5 Q 11.5 9.5 13.5 7" fill="none" stroke={color} strokeWidth="0.9" />
      </G>
    </Svg>
  );
}

// ─── NCAA / COLLEGIATE ────────────────────────────────────────────────────────
// Graduation cap with a volleyball tucked under the board
export function CollegeIcon({ size = 32, color = "#BF0D3E", opacity = 1 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <G opacity={opacity}>
        {/* Cap board */}
        <Polygon points="16,4 30,10 16,16 2,10" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        {/* Cap top brim accent */}
        <Line x1="16" y1="4" x2="16" y2="16" stroke={color} strokeWidth="0.8" opacity={0.4} />
        {/* Tassel stem */}
        <Line x1="28" y1="10" x2="28" y2="18" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
        {/* Tassel end */}
        <Circle cx="28" cy="20" r="2" fill="none" stroke={color} strokeWidth="1.2" />
        {/* Volleyball below cap */}
        <Circle cx="16" cy="24" r="5.5" fill="none" stroke={color} strokeWidth="1.3" />
        <Path d="M 10.5 24 Q 13 21 16 21 Q 19 21 21.5 24" fill="none" stroke={color} strokeWidth="0.9" />
        <Path d="M 10.5 24 Q 13 27 16 27 Q 19 27 21.5 24" fill="none" stroke={color} strokeWidth="0.9" />
        <Path d="M 16 18.5 Q 20 21 21.5 24 Q 20 27 16 29.5" fill="none" stroke={color} strokeWidth="0.9" />
      </G>
    </Svg>
  );
}

// ─── WOMENS VOLLEYBALL ───────────────────────────────────────────────────────
// Female player with ponytail mid-jump
export function WomensIcon({ size = 32, color = "#E04E8A", opacity = 1 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <G opacity={opacity}>
        {/* Volleyball */}
        <Circle cx="22" cy="6" r="4.5" fill="none" stroke={color} strokeWidth="1.4" />
        <Path d="M 17.5 6 Q 19.5 3.5 22 3.5 Q 24.5 3.5 26.5 6" fill="none" stroke={color} strokeWidth="0.9" />
        <Path d="M 17.5 6 Q 19.5 8.5 22 8.5 Q 24.5 8.5 26.5 6" fill="none" stroke={color} strokeWidth="0.9" />
        {/* Head */}
        <Circle cx="11" cy="8" r="3.5" fill="none" stroke={color} strokeWidth="1.4" />
        {/* Ponytail */}
        <Path d="M 13 6 Q 16 4 17 6 Q 16 8 14 7.5" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        {/* Arm reaching up to hit ball */}
        <Path d="M 13.5 10 Q 16 10 18 12 Q 19.5 10 20 9" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        {/* Body */}
        <Path d="M 11.5 12 Q 11 17 10 20" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        {/* Legs jumping */}
        <Path d="M 10 20 Q 8 24 6 27" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        <Path d="M 10 20 Q 12 24 13 28" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        {/* Other arm */}
        <Path d="M 11.5 12 Q 7 13 5 15" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      </G>
    </Svg>
  );
}

// ─── MENS VOLLEYBALL ─────────────────────────────────────────────────────────
// Male player with block arms above the net
export function MensIcon({ size = 32, color = "#3A7BF5", opacity = 1 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <G opacity={opacity}>
        {/* Volleyball */}
        <Circle cx="16" cy="5" r="4.5" fill="none" stroke={color} strokeWidth="1.4" />
        <Path d="M 11.5 5 Q 13.5 2.5 16 2.5 Q 18.5 2.5 20.5 5" fill="none" stroke={color} strokeWidth="0.9" />
        <Path d="M 11.5 5 Q 13.5 7.5 16 7.5 Q 18.5 7.5 20.5 5" fill="none" stroke={color} strokeWidth="0.9" />
        {/* Head */}
        <Circle cx="16" cy="13" r="3.5" fill="none" stroke={color} strokeWidth="1.4" />
        {/* Arms stretched wide blocking */}
        <Path d="M 12.5 14 Q 7 13 4 11" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <Path d="M 19.5 14 Q 25 13 28 11" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        {/* Body */}
        <Path d="M 16 17 L 16 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        {/* Legs */}
        <Path d="M 16 24 Q 13 27 11 30" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        <Path d="M 16 24 Q 19 27 21 30" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        {/* Net line */}
        <Line x1="2" y1="17" x2="30" y2="17" stroke={color} strokeWidth="1.8" />
      </G>
    </Svg>
  );
}

// ─── BACKGROUND DECOR ─────────────────────────────────────────────────────────
export function VolleyballBgDecor({ size = 64, opacity = 0.07 }: { size?: number; opacity?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 2;
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} opacity={opacity}>
      <Circle cx={cx} cy={cy} r={r} fill="none" stroke="white" strokeWidth="1.5" />
      <Path d={`M ${cx - r} ${cy} Q ${cx - r * 0.5} ${cy - r * 0.7} ${cx} ${cy - r * 0.7} Q ${cx + r * 0.5} ${cy - r * 0.7} ${cx + r} ${cy}`} fill="none" stroke="white" strokeWidth="1" />
      <Path d={`M ${cx - r} ${cy} Q ${cx - r * 0.5} ${cy + r * 0.7} ${cx} ${cy + r * 0.7} Q ${cx + r * 0.5} ${cy + r * 0.7} ${cx + r} ${cy}`} fill="none" stroke="white" strokeWidth="1" />
      <Path d={`M ${cx} ${cy - r} Q ${cx + r * 0.7} ${cy - r * 0.5} ${cx + r * 0.7} ${cy} Q ${cx + r * 0.7} ${cy + r * 0.5} ${cx} ${cy + r}`} fill="none" stroke="white" strokeWidth="1" />
      <Path d={`M ${cx} ${cy - r} Q ${cx - r * 0.7} ${cy - r * 0.5} ${cx - r * 0.7} ${cy} Q ${cx - r * 0.7} ${cy + r * 0.5} ${cx} ${cy + r}`} fill="none" stroke="white" strokeWidth="1" />
    </Svg>
  );
}
