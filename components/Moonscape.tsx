// Halftone moonscape used on the homepage.
// Two inks — near-black #0f0f0f on paper #ece7d9. Two greys carry the rest.

export default function Moonscape({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 680 760"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <defs>
        <pattern id="ht" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="1.5" fill="var(--ink)" />
        </pattern>
        <pattern id="htd" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="var(--ink)" />
        </pattern>
        <radialGradient id="fade" cx="0.5" cy="0.5" r="0.5">
          <stop offset="60%" stopColor="#000" stopOpacity="1" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <mask id="moonmask">
          <rect width="680" height="760" fill="#000" />
          <circle cx="560" cy="620" r="440" fill="url(#fade)" />
        </mask>
      </defs>

      {/* moon — halftone circle fading at the edges */}
      <g mask="url(#moonmask)">
        <circle cx="560" cy="620" r="380" fill="url(#ht)" />
      </g>

      {/* ground + two mesas — foreground halftone */}
      <rect x="0" y="580" width="680" height="180" fill="url(#htd)" />
      <rect x="120" y="430" width="70" height="330" fill="url(#htd)" />
      <rect x="215" y="480" width="55" height="280" fill="url(#htd)" />
    </svg>
  );
}
