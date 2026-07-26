// A small radar sweep at the top of the page — fixed pixel size (see
// .stars in page.module.css), so it never stretches or distorts on
// wide/high-res monitors the way a full-width viewBox would.

const BLIPS = [
  { angle: 40, r: 30, twinkle: 3.6 },
  { angle: 160, r: 18, twinkle: 4.4 },
  { angle: 250, r: 40, twinkle: 5.1 },
  { angle: 300, r: 24, twinkle: 3.9 },
];

const CX = 170;
const CY = 65;

function polar(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + Math.cos(rad) * r, y: CY + Math.sin(rad) * r };
}

export default function Radar({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 340 130"
      role="img"
      aria-hidden="true"
    >
      <g stroke="var(--ink)" strokeWidth="0.75" fill="none" opacity="0.5">
        <circle cx={CX} cy={CY} r="48" />
        <circle cx={CX} cy={CY} r="32" />
        <circle cx={CX} cy={CY} r="16" />
        <line x1={CX - 48} y1={CY} x2={CX + 48} y2={CY} />
        <line x1={CX} y1={CY - 48} x2={CX} y2={CY + 48} />
      </g>

      <g opacity="0.55">
        <path
          d={`M ${CX},${CY} L ${CX + 48},${CY} A 48,48 0 0,1 ${polar(35, 48).x},${polar(35, 48).y} Z`}
          fill="var(--ink)"
          opacity="0.35"
        />
        <line x1={CX} y1={CY} x2={CX + 48} y2={CY} stroke="var(--ink)" strokeWidth="1">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${CX} ${CY}`}
            to={`360 ${CX} ${CY}`}
            dur="5s"
            repeatCount="indefinite"
          />
        </line>
      </g>

      {BLIPS.map((b, i) => {
        const { x, y } = polar(b.angle, b.r);
        return (
          <circle key={i} cx={x} cy={y} r="2" fill="var(--ink)" opacity="0.7">
            <animate
              attributeName="opacity"
              values="0;0.7;0"
              dur={`${b.twinkle}s`}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}

      <circle cx={CX} cy={CY} r="1.5" fill="var(--ink)" opacity="0.8" />
    </svg>
  );
}
