// A scatter of small stars across the top of the page.
// Same two-ink palette as Moonscape — #0f0f0f on #ece7d9, greys carry the rest.

const STARS: { x: number; y: number; s: number; c: string; o: number; twinkle?: number }[] = [
  { x: 40, y: 10, s: 1, c: "#0f0f0f", o: 0.6 },
  { x: 95, y: 5, s: 1, c: "#6a635a", o: 0.5 },
  { x: 150, y: 14, s: 1, c: "#0f0f0f", o: 0.5, twinkle: 4.2 },
  { x: 205, y: 7, s: 1, c: "#8a8378", o: 0.4 },
  { x: 260, y: 12, s: 1, c: "#0f0f0f", o: 0.55 },
  { x: 320, y: 4, s: 1, c: "#6a635a", o: 0.45 },
  { x: 380, y: 15, s: 1, c: "#0f0f0f", o: 0.5, twinkle: 5.6 },
  { x: 430, y: 8, s: 1, c: "#0f0f0f", o: 0.6 },
  { x: 470, y: 40, s: 1, c: "#6a635a", o: 0.5 },
  { x: 500, y: 70, s: 1, c: "#0f0f0f", o: 0.55, twinkle: 6.4 },
  { x: 445, y: 90, s: 1, c: "#8a8378", o: 0.4 },
  { x: 520, y: 25, s: 1, c: "#0f0f0f", o: 0.5 },
  { x: 555, y: 100, s: 1, c: "#6a635a", o: 0.45 },
  { x: 490, y: 110, s: 1, c: "#0f0f0f", o: 0.5, twinkle: 5 },
  { x: 540, y: 55, s: 1, c: "#8a8378", o: 0.4 },
  { x: 600, y: 9, s: 1, c: "#0f0f0f", o: 0.55 },
  { x: 650, y: 3, s: 1, c: "#6a635a", o: 0.5 },
  { x: 700, y: 13, s: 1, c: "#0f0f0f", o: 0.45, twinkle: 4.8 },
  { x: 750, y: 6, s: 1, c: "#8a8378", o: 0.4 },
  { x: 800, y: 11, s: 1, c: "#0f0f0f", o: 0.6 },
  { x: 850, y: 5, s: 1, c: "#6a635a", o: 0.5 },
  { x: 900, y: 15, s: 1, c: "#0f0f0f", o: 0.5, twinkle: 6 },
  { x: 950, y: 8, s: 1, c: "#8a8378", o: 0.45 },
];

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
        <rect
          key={i}
          x={star.x}
          y={star.y}
          width={star.s}
          height={star.s}
          fill={star.c}
          opacity={star.o}
        >
          {star.twinkle ? (
            <animate
              attributeName="opacity"
              values={`${star.o};${star.o * 0.25};${star.o}`}
              dur={`${star.twinkle}s`}
              repeatCount="indefinite"
            />
          ) : null}
        </rect>
      ))}
    </svg>
  );
}
