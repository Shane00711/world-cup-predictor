import * as React from "react";

type PillItem = { text: string; color: string };
type MatchSlot = { a?: string; b?: string };

type Props = {
  leftRoundOf16?: PillItem[];
  rightRoundOf16?: PillItem[];

  // Optional labels inside the match bars (leave empty for the “blank slots” look)
  qfLeftTop?: MatchSlot;
  qfLeftBottom?: MatchSlot;
  qfRightTop?: MatchSlot;
  qfRightBottom?: MatchSlot;

  sfLeft?: MatchSlot;
  sfRight?: MatchSlot;

  final?: MatchSlot;
  bronze?: MatchSlot;

  className?: string;
};

const W = 1244;
const H = 447;

const DEFAULT_LEFT: PillItem[] = [
  { text: "POOL A WINNER", color: "#A657F1" },
  { text: "POOL C/E/F BEST 3RD", color: "#EF4A0C" },
  { text: "POOL B WINNER", color: "#0AF171" },
  { text: "POOL D/E/F BEST 3RD", color: "#E94D04" },
  { text: "POOL C RUNNER-UP", color: "#FD64A1" },
  { text: "POOL F RUNNER-UP", color: "#5394FE" },
  { text: "POOL E WINNER", color: "#FF9F01" },
  { text: "POOL D RUNNER-UP", color: "#07DCED" },
];

const DEFAULT_RIGHT: PillItem[] = [
  { text: "POOL A RUNNER-UP", color: "#A558ED" },
  { text: "POOL E RUNNER-UP", color: "#FFA100" },
  { text: "POOL F WINNER", color: "#5695FF" },
  { text: "POOL B RUNNER-UP", color: "#0AF171" },
  { text: "POOL C WINNER", color: "#FD64A1" },
  { text: "POOL A/E/F BEST 3RD", color: "#B84216" },
  { text: "POOL D WINNER", color: "#07DCED" },
  { text: "POOL B/E/F BEST 3RD", color: "#F45318" },
];

function Text({
  x,
  y,
  children,
  size = 14,
  weight = 800,
  anchor = "start",
  opacity = 1,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  weight?: number;
  anchor?: "start" | "middle" | "end";
  opacity?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial"
      fontSize={size}
      fontWeight={weight}
      fill="#111827"
      opacity={opacity}
      dominantBaseline="middle"
      style={{ letterSpacing: 0.5 }}
    >
      {children}
    </text>
  );
}

function Pill({ x, y, w, h, color, text }: { x: number; y: number; w: number; h: number; color: string; text: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={color} />
      <text
        x={x + w / 2}
        y={y + h / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial"
        fontSize={12}
        fontWeight={800}
        fill="#111827"
      >
        {text}
      </text>
    </g>
  );
}

function MatchBars({
  x,
  y,
  w = 151,
  h = 28,
  gap = 6,
  fill = "#FB4804",
  a,
  b,
  textColor = "#111827",
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  gap?: number;
  fill?: string;
  a?: string;
  b?: string;
  textColor?: string;
}) {
  const r = h / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} />
      <rect x={x} y={y + h + gap} width={w} height={h} rx={r} fill={fill} />
      {(a || b) && (
        <>
          <text
            x={x + w / 2}
            y={y + h / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="ui-sans-serif, system-ui"
            fontSize={12}
            fontWeight={800}
            fill={textColor}
          >
            {a ?? ""}
          </text>
          <text
            x={x + w / 2}
            y={y + h + gap + h / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="ui-sans-serif, system-ui"
            fontSize={12}
            fontWeight={800}
            fill={textColor}
          >
            {b ?? ""}
          </text>
        </>
      )}
    </g>
  );
}

function Trophy({ x, y, scale = 1, color = "#D1AD65" }: { x: number; y: number; scale?: number; color?: string }) {
  // Simple trophy silhouette (stylized, close enough to the layout)
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`} fill={color}>
      <path d="M40 0c6 0 10 4 10 10v18c0 18-12 34-30 38v10h16c4 0 8 4 8 8v6H6v-6c0-4 4-8 8-8h16V66C12 62 0 46 0 28V10C0 4 4 0 10 0h30z" />
      <path d="M0 14H-10c0 18 6 30 18 36V38C2 34 0 26 0 14z" />
      <path d="M50 14h10c0 18-6 30-18 36V38c6-4 8-12 8-24z" />
      <rect x="20" y="92" width="10" height="18" rx="3" />
      <rect x="6" y="110" width="38" height="12" rx="6" />
    </g>
  );
}

export function TournamentBracketStyle({
  leftRoundOf16 = DEFAULT_LEFT,
  rightRoundOf16 = DEFAULT_RIGHT,
  qfLeftTop,
  qfLeftBottom,
  qfRightTop,
  qfRightBottom,
  sfLeft,
  sfRight,
  final,
  bronze,
  className,
}: Props) {
  const bg = "#FFECE5";
  const patternStroke = "rgba(248, 200, 186, 0.55)";

  // Coordinates pulled to match the uploaded image’s layout (viewBox 1244×447)
  const pillLeftX = 21;
  const pillRightX = 1078;
  const pillY = [71, 104, 163, 197, 255, 289, 347, 382];
  const pillW = 152;
  const pillH = 29;

  return (
    <div className={className}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Tournament bracket">
        {/* Background */}
        <rect x="0" y="0" width={W} height={H} fill={bg} />

        {/* Corner accents (teal triangles like the original) */}
        <path d="M1244 0 L1188 0 L1244 56 Z" fill="#26BDB6" />
        <path d="M0 447 L0 392 L56 447 Z" fill="#26BDB6" />

        {/* Soft pattern overlay (approximation) */}
        <g fill="none" stroke={patternStroke} strokeWidth="28" opacity="0.45">
          <path d="M-120 140 C 200 40, 420 60, 760 190" />
          <path d="M220 520 C 420 320, 700 300, 980 420" />
          <path d="M-60 330 C 220 180, 520 160, 980 260" />
        </g>
        <g fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="44" opacity="0.55">
          <path d="M-40 240 C 260 80, 520 120, 860 220" />
          <path d="M260 560 C 520 360, 820 320, 1080 460" />
        </g>

        {/* Left headings */}
        <Text x={28} y={46} size={14} weight={900}>
          ROUND OF 16
        </Text>
        <Text x={200} y={105} size={14} weight={900}>
          QUARTER-FINALS
        </Text>
        <Text x={360} y={205} size={14} weight={900}>
          SEMI-FINAL
        </Text>

        {/* Right headings */}
        <Text x={1055} y={46} size={14} weight={900} anchor="end">
          ROUND OF 16
        </Text>
        <Text x={1047} y={105} size={14} weight={900} anchor="end">
          QUARTER-FINALS
        </Text>
        <Text x={884} y={205} size={14} weight={900} anchor="end">
          SEMI-FINAL
        </Text>

        {/* Center headings */}
        <Trophy x={612} y={20} scale={1.2} color="#D1AD65" />
        <Text x={622} y={160} size={26} weight={1000} anchor="middle">
          FINAL
        </Text>

        <Text x={622} y={336} size={14} weight={900} anchor="middle">
          BRONZE FINAL
        </Text>

        {/* Round of 16 pills (left) */}
        {leftRoundOf16.slice(0, 8).map((p, i) => (
          <Pill
            key={`L${i}`}
            x={pillLeftX}
            y={pillY[i]}
            w={pillW}
            h={pillH}
            color={p.color}
            text={p.text}
          />
        ))}

        {/* Round of 16 pills (right) */}
        {rightRoundOf16.slice(0, 8).map((p, i) => (
          <Pill
            key={`R${i}`}
            x={pillRightX}
            y={pillY[i]}
            w={pillW}
            h={pillH}
            color={p.color}
            text={p.text}
          />
        ))}

        {/* Quarter-finals (left) */}
        <MatchBars x={200} y={121} fill="#FB4804" a={qfLeftTop?.a} b={qfLeftTop?.b} />
        <MatchBars x={200} y={305} fill="#FB4804" a={qfLeftBottom?.a} b={qfLeftBottom?.b} />

        {/* Semi-final (left) */}
        <MatchBars x={369} y={216} fill="#FB4804" a={sfLeft?.a} b={sfLeft?.b} />

        {/* Quarter-finals (right) */}
        <MatchBars x={896} y={121} fill="#FB4804" a={qfRightTop?.a} b={qfRightTop?.b} />
        <MatchBars x={896} y={305} fill="#FB4804" a={qfRightBottom?.a} b={qfRightBottom?.b} />

        {/* Semi-final (right) */}
        <MatchBars x={730} y={217} fill="#FB4804" a={sfRight?.a} b={sfRight?.b} />

        {/* Final (gold) */}
        <MatchBars
          x={547}
          y={217}
          fill="#D1AD65"
          a={final?.a}
          b={final?.b}
          textColor="#111827"
        />

        {/* Bronze final (light gold) */}
        <MatchBars
          x={548}
          y={357}
          w={149}
          h={27}
          gap={7}
          fill="#F4D49D"
          a={bronze?.a}
          b={bronze?.b}
          textColor="#111827"
        />
      </svg>
    </div>
  );
}

// Example usage:
// <TournamentBracketStyle className="w-full max-w-5xl" />
