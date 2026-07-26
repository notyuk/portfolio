// The Big Dipper (Ursa Major), plus a scatter of background stars,
// across the top of the page. Same ink/mute palette as Moonscape.

type Point = { x: number; y: number };

// Dubhe, Merak, Phecda, Megrez, Alioth, Mizar, Alkaid — scaled to fit
// the open gap between the header text blocks.
const DIPPER: Point[] = [
  { x: 397, y: 29 }, // Dubhe
  { x: 397, y: 58 }, // Merak
  { x: 511, y: 67 }, // Phecda
  { x: 511, y: 39 }, // Megrez
  { x: 587, y: 48 }, // Alioth
  { x: 663, y: 39 }, // Mizar
  { x: 720, y: 20 }, // Alkaid
];

// bowl (0-1-2-3-0) then handle (3-4-5-6)
const LINES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [3, 4],
  [4, 5],
  [5, 6],
];

const BACKGROUND_STARS = [
  { x: 40, y: 10, c: "var(--ink)", o: 0.55 },
  { x: 120, y: 6, c: "var(--mute-1)", o: 0.45 },
  { x: 220, y: 13, c: "var(--ink)", o: 0.5, twinkle: 5.2 },
  { x: 290, y: 5, c: "var(--mute-2)", o: 0.35 },
  { x: 800, y: 9, c: "var(--ink)", o: 0.55, twinkle: 4.6 },
  { x: 860, y: 4, c: "var(--mute-1)", o: 0.45 },
  { x: 920, y: 14, c: "var(--ink)", o: 0.5 },
  { x: 960, y: 7, c: "var(--mute-2)", o: 0.4, twinkle: 6 },
];

function Twinkle({ base, dur }: { base: number; dur: number }) {
  return (
    <animate
      attributeName="opacity"
      values={`${base};${base * 0.2};${base}`}
      dur={`${dur}s`}
      repeatCount="indefinite"
    />
  );
}

function Sparkle({
  x,
  y,
  size = 6,
  color = "var(--ink)",
  opacity = 0.8,
  twinkle,
}: {
  x: number;
  y: number;
  size?: number;
  color?: string;
  opacity?: number;
  twinkle?: number;
}) {
  const half = size / 2;
  return (
    <g fill={color} opacity={opacity}>
      <rect x={x - 0.6} y={y - half} width="1.2" height={size} />
      <rect x={x - half} y={y - 0.6} width={size} height="1.2" />
      <rect x={x - 1.1} y={y - 1.1} width="2.2" height="2.2" />
      {twinkle ? <Twinkle base={opacity} dur={twinkle} /> : null}
    </g>
  );
}

export default function Stars({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1000 130"
      preserveAspectRatio="none"
      role="img"
      aria-hidden="true"
    >
      {BACKGROUND_STARS.map((star, i) => (
        <rect key={i} x={star.x} y={star.y} width="1" height="1" fill={star.c} opacity={star.o}>
          {star.twinkle ? <Twinkle base={star.o} dur={star.twinkle} /> : null}
        </rect>
      ))}

      <g stroke="var(--mute-2)" strokeWidth="0.6" opacity="0.55">
        {LINES.map(([a, b], i) => (
          <line
            key={i}
            x1={DIPPER[a].x}
            y1={DIPPER[a].y}
            x2={DIPPER[b].x}
            y2={DIPPER[b].y}
          />
        ))}
      </g>

      {DIPPER.map((star, i) => (
        <Sparkle
          key={i}
          x={star.x}
          y={star.y}
          size={i === 3 ? 5 : 7}
          opacity={i === 3 ? 0.6 : 0.85}
          twinkle={i === 0 ? 5 : i === 6 ? 4.5 : undefined}
        />
      ))}
    </svg>
  );
}
