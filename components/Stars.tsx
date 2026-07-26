// A scatter of stars across the top of the page — small four-point
// sparkles for the brighter ones, single pixels for distant ones.
// Same two-ink palette as Moonscape — ink on paper, greys carry the rest.

type Star = {
  x: number;
  y: number;
  c: string;
  o: number;
  big?: boolean;
  twinkle?: number;
};

const STARS: Star[] = [
  { x: 40, y: 10, c: "var(--ink)", o: 0.6 },
  { x: 95, y: 5, c: "var(--mute-1)", o: 0.5, big: true },
  { x: 150, y: 14, c: "var(--ink)", o: 0.7, big: true, twinkle: 4.2 },
  { x: 205, y: 7, c: "var(--mute-2)", o: 0.4 },
  { x: 260, y: 12, c: "var(--ink)", o: 0.55 },
  { x: 320, y: 4, c: "var(--mute-1)", o: 0.45 },
  { x: 380, y: 15, c: "var(--ink)", o: 0.7, big: true, twinkle: 5.6 },
  { x: 430, y: 8, c: "var(--ink)", o: 0.6 },
  { x: 470, y: 40, c: "var(--mute-1)", o: 0.5 },
  { x: 500, y: 70, c: "var(--ink)", o: 0.75, big: true, twinkle: 6.4 },
  { x: 445, y: 90, c: "var(--mute-2)", o: 0.4 },
  { x: 520, y: 25, c: "var(--ink)", o: 0.5, big: true },
  { x: 555, y: 100, c: "var(--mute-1)", o: 0.45 },
  { x: 490, y: 110, c: "var(--ink)", o: 0.6, twinkle: 5 },
  { x: 540, y: 55, c: "var(--mute-2)", o: 0.4 },
  { x: 600, y: 9, c: "var(--ink)", o: 0.7, big: true },
  { x: 650, y: 3, c: "var(--mute-1)", o: 0.5 },
  { x: 700, y: 13, c: "var(--ink)", o: 0.65, big: true, twinkle: 4.8 },
  { x: 750, y: 6, c: "var(--mute-2)", o: 0.4 },
  { x: 800, y: 11, c: "var(--ink)", o: 0.6 },
  { x: 850, y: 5, c: "var(--mute-1)", o: 0.5, big: true },
  { x: 900, y: 15, c: "var(--ink)", o: 0.7, big: true, twinkle: 6 },
  { x: 950, y: 8, c: "var(--mute-2)", o: 0.45 },
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

function StarGlyph({ star }: { star: Star }) {
  if (star.big) {
    return (
      <g fill={star.c} opacity={star.o}>
        <rect x={star.x - 0.5} y={star.y - 3} width="1" height="6" />
        <rect x={star.x - 3} y={star.y - 0.5} width="6" height="1" />
        <rect x={star.x - 1} y={star.y - 1} width="2" height="2" />
        {star.twinkle ? <Twinkle base={star.o} dur={star.twinkle} /> : null}
      </g>
    );
  }
  return (
    <rect x={star.x} y={star.y} width="1" height="1" fill={star.c} opacity={star.o}>
      {star.twinkle ? <Twinkle base={star.o} dur={star.twinkle} /> : null}
    </rect>
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
      {STARS.map((star, i) => (
        <StarGlyph key={i} star={star} />
      ))}
    </svg>
  );
}
