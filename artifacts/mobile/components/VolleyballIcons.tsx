import React from "react";
import Svg, {
  Circle,
  Line,
  Path,
  Rect,
  G,
  Defs,
  ClipPath,
} from "react-native-svg";

type IconProps = {
  size?: number;
  color?: string;
  opacity?: number;
};

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
        <Path
          d={`M ${cx - r} ${cy} Q ${cx - r * 0.5} ${cy - r * 0.7} ${cx} ${cy - r * 0.7} Q ${cx + r * 0.5} ${cy - r * 0.7} ${cx + r} ${cy}`}
          fill="none" stroke={color} strokeWidth={size * 0.032}
        />
        <Path
          d={`M ${cx - r} ${cy} Q ${cx - r * 0.5} ${cy + r * 0.7} ${cx} ${cy + r * 0.7} Q ${cx + r * 0.5} ${cy + r * 0.7} ${cx + r} ${cy}`}
          fill="none" stroke={color} strokeWidth={size * 0.032}
        />
        <Path
          d={`M ${cx} ${cy - r} Q ${cx + r * 0.7} ${cy - r * 0.5} ${cx + r * 0.7} ${cy} Q ${cx + r * 0.7} ${cy + r * 0.5} ${cx} ${cy + r}`}
          fill="none" stroke={color} strokeWidth={size * 0.032}
        />
        <Path
          d={`M ${cx} ${cy - r} Q ${cx - r * 0.7} ${cy - r * 0.5} ${cx - r * 0.7} ${cy} Q ${cx - r * 0.7} ${cy + r * 0.5} ${cx} ${cy + r}`}
          fill="none" stroke={color} strokeWidth={size * 0.032}
        />
      </G>
    </Svg>
  );
}

export function SpikeIcon({ size = 32, color = "#BF0D3E", opacity = 1 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <G opacity={opacity}>
        <Circle cx="22" cy="7" r="4.5" fill="none" stroke={color} strokeWidth="1.5" />
        <Path d="M 21 7 Q 21.5 8 22 8.5" fill="none" stroke={color} strokeWidth="0.9" />
        <Path d="M 22 4.5 Q 23.5 5.5 24 7" fill="none" stroke={color} strokeWidth="0.9" />
        <Path d="M 19 6 Q 20 4.5 22 4.5" fill="none" stroke={color} strokeWidth="0.9" />
        <Path
          d="M 18 11 Q 15 14 13 18 Q 12 21 14 24"
          fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round"
        />
        <Path
          d="M 14 24 Q 12 28 10 29.5 Q 9 30 8 28.5 Q 11 25 12.5 21"
          fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round"
        />
        <Path
          d="M 14 24 Q 16 28 15.5 30 Q 14.5 31 13.5 30 Q 13 27 13.5 24"
          fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round"
        />
        <Path
          d="M 14 24 Q 17.5 27.5 18.5 29.5 Q 19 30.5 18 30.5 Q 15.5 28.5 14.5 24"
          fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round"
        />
        <Path d="M 6 14 Q 10 11 14.5 17" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </G>
    </Svg>
  );
}

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

export function JerseyIcon({ size = 32, color = "#BF0D3E", opacity = 1 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <G opacity={opacity}>
        <Path
          d="M 10 4 L 5 10 L 9.5 12.5 L 9.5 28 L 22.5 28 L 22.5 12.5 L 27 10 L 22 4 Q 19.5 8 16 8 Q 12.5 8 10 4 Z"
          fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"
        />
        <Line x1="13" y1="18" x2="13" y2="24" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <Line x1="16" y1="18" x2="16" y2="24" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <Line x1="13" y1="18" x2="16" y2="18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <Line x1="13" y1="21" x2="16" y2="21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <Line x1="18.5" y1="18" x2="18.5" y2="24" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      </G>
    </Svg>
  );
}

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
          <Circle
            key={i}
            cx={pos.cx}
            cy={pos.cy}
            r={ring * 0.82}
            fill="none"
            stroke={color}
            strokeWidth={size * 0.05}
          />
        ))}
        <Path
          d={`M ${size * 0.35} ${size * 0.72} Q ${size * 0.5} ${size * 0.64} ${size * 0.65} ${size * 0.72}`}
          fill="none" stroke={color} strokeWidth={size * 0.045} strokeLinecap="round"
        />
        <Line
          x1={size * 0.5} y1={size * 0.72}
          x2={size * 0.5} y2={size * 0.9}
          stroke={color} strokeWidth={size * 0.045} strokeLinecap="round"
        />
        <Path
          d={`M ${size * 0.35} ${size * 0.76} Q ${size * 0.5} ${size * 0.85} ${size * 0.65} ${size * 0.76}`}
          fill="none" stroke={color} strokeWidth={size * 0.045} strokeLinecap="round"
        />
      </G>
    </Svg>
  );
}

export function VolleyballBgDecor({ size = 64, opacity = 0.07 }: { size?: number; opacity?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 2;
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} opacity={opacity}>
      <Circle cx={cx} cy={cy} r={r} fill="none" stroke="white" strokeWidth="1.5" />
      <Path
        d={`M ${cx - r} ${cy} Q ${cx - r * 0.5} ${cy - r * 0.7} ${cx} ${cy - r * 0.7} Q ${cx + r * 0.5} ${cy - r * 0.7} ${cx + r} ${cy}`}
        fill="none" stroke="white" strokeWidth="1"
      />
      <Path
        d={`M ${cx - r} ${cy} Q ${cx - r * 0.5} ${cy + r * 0.7} ${cx} ${cy + r * 0.7} Q ${cx + r * 0.5} ${cy + r * 0.7} ${cx + r} ${cy}`}
        fill="none" stroke="white" strokeWidth="1"
      />
      <Path
        d={`M ${cx} ${cy - r} Q ${cx + r * 0.7} ${cy - r * 0.5} ${cx + r * 0.7} ${cy} Q ${cx + r * 0.7} ${cy + r * 0.5} ${cx} ${cy + r}`}
        fill="none" stroke="white" strokeWidth="1"
      />
      <Path
        d={`M ${cx} ${cy - r} Q ${cx - r * 0.7} ${cy - r * 0.5} ${cx - r * 0.7} ${cy} Q ${cx - r * 0.7} ${cy + r * 0.5} ${cx} ${cy + r}`}
        fill="none" stroke="white" strokeWidth="1"
      />
    </Svg>
  );
}
