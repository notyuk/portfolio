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

      {/* stars — near-black */}
      <g fill="var(--ink)">
        <rect x="42" y="38" width="1" height="1"/><rect x="88" y="24" width="1" height="1"/>
        <rect x="130" y="52" width="1" height="1"/><rect x="172" y="34" width="1" height="1"/>
        <rect x="220" y="60" width="1" height="1"/><rect x="66" y="80" width="1" height="1"/>
        <rect x="112" y="98" width="1" height="1"/><rect x="154" y="120" width="1" height="1"/>
        <rect x="196" y="88" width="1" height="1"/><rect x="238" y="140" width="1" height="1"/>
        <rect x="46" y="150" width="1" height="1"/><rect x="94" y="168" width="1" height="1"/>
        <rect x="140" y="196" width="1" height="1"/><rect x="184" y="180" width="1" height="1"/>
        <rect x="26" y="220" width="1" height="1"/><rect x="74" y="240" width="1" height="1"/>
        <rect x="118" y="256" width="1" height="1"/><rect x="164" y="230" width="1" height="1"/>
        <rect x="210" y="220" width="1" height="1"/><rect x="256" y="266" width="1" height="1"/>
      </g>
      {/* fainter stars — mid grey */}
      <g fill="var(--mute-1)">
        <rect x="60" y="60" width="1" height="1"/><rect x="120" y="30" width="1" height="1"/>
        <rect x="200" y="102" width="1" height="1"/><rect x="80" y="200" width="1" height="1"/>
        <rect x="180" y="260" width="1" height="1"/><rect x="240" y="180" width="1" height="1"/>
        <rect x="30" y="100" width="1" height="1"/>
      </g>

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
