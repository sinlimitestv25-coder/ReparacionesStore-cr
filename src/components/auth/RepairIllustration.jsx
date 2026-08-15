// Ilustración original (SVG), no una foto: herramientas + celular con la
// pantalla rota, para el panel de login. Pensada para poder reemplazarse
// más adelante por una foto real sin tocar el resto del layout.
export function RepairIllustration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 480 640"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Ilustración de reparación de celulares"
    >
      <defs>
        <linearGradient id="ri-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="55%" stopColor="#152c7d" />
          <stop offset="100%" stopColor="#265ef5" />
        </linearGradient>
        <linearGradient id="ri-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#93c5fd" />
        </linearGradient>
      </defs>

      <rect width="480" height="640" fill="url(#ri-bg)" />

      <circle cx="55" cy="90" r="130" fill="#4d80ff" opacity="0.14" />
      <circle cx="440" cy="570" r="170" fill="#80a8ff" opacity="0.12" />

      <g stroke="#ffffff" strokeOpacity="0.1" strokeWidth="2" fill="none">
        <path d="M15 110 H115 V170 H190" />
        <path d="M465 500 H365 V440 H305" />
        <circle cx="115" cy="170" r="4" fill="#ffffff" fillOpacity="0.18" stroke="none" />
        <circle cx="305" cy="440" r="4" fill="#ffffff" fillOpacity="0.18" stroke="none" />
      </g>

      <g transform="translate(78 500) rotate(-35)">
        <rect x="-8" y="-150" width="16" height="150" rx="8" fill="#cbd5f5" />
        <rect x="-17" y="-8" width="34" height="72" rx="11" fill="#f59e0b" />
      </g>

      <g transform="translate(404 150) rotate(35)">
        <rect x="-14" y="-8" width="28" height="182" rx="14" fill="#f59e0b" />
        <circle cx="0" cy="-18" r="30" fill="none" stroke="#f59e0b" strokeWidth="16" />
        <circle cx="0" cy="182" r="26" fill="none" stroke="#f59e0b" strokeWidth="14" />
      </g>

      <g transform="rotate(-4 240 360)">
        <rect x="150" y="190" width="180" height="340" rx="30" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
        <rect x="166" y="222" width="148" height="256" rx="10" fill="url(#ri-screen)" />
        <circle cx="240" cy="500" r="10" fill="#1e293b" opacity="0.5" />
        <g stroke="#1e293b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8">
          <path d="M240 300 L215 340 L235 360 L205 410 L245 430 L260 470" />
          <path d="M235 360 L272 350" />
          <path d="M245 430 L282 422" />
        </g>
        <circle cx="240" cy="300" r="6" fill="#1e293b" opacity="0.85" />
      </g>

      <circle cx="66" cy="250" r="7" fill="#ffffff" fillOpacity="0.4" />
      <circle cx="418" cy="320" r="5" fill="#ffffff" fillOpacity="0.35" />
      <circle cx="112" cy="560" r="6" fill="#ffffff" fillOpacity="0.3" />
      <circle cx="360" cy="580" r="4" fill="#ffffff" fillOpacity="0.3" />
    </svg>
  )
}
