export function Topbar({ title, subtitle, bannerDataUrl }) {
  return (
    <header
      className="relative flex items-center overflow-hidden border-b border-slate-200 bg-white bg-cover bg-center px-4 py-20 sm:px-8"
      style={bannerDataUrl ? { backgroundImage: `url(${bannerDataUrl})` } : undefined}
    >
      {bannerDataUrl && <div className="absolute inset-0 bg-slate-900/45" />}
      <div className="relative">
        <p className={`text-xl font-semibold ${bannerDataUrl ? 'text-white' : 'text-slate-800'}`}>{title}</p>
        {subtitle && <p className={`mt-1 text-sm ${bannerDataUrl ? 'text-white/80' : 'text-slate-400'}`}>{subtitle}</p>}
      </div>
    </header>
  )
}
