import { Menu } from 'lucide-react'

export function Topbar({ title, subtitle, bannerDataUrl, onOpenMenu }) {
  return (
    <header
      className="relative flex items-center overflow-hidden border-b border-slate-200 bg-white bg-cover bg-center px-4 py-20 sm:px-8"
      style={bannerDataUrl ? { backgroundImage: `url(${bannerDataUrl})` } : undefined}
    >
      {bannerDataUrl && <div className="absolute inset-0 bg-slate-900/45" />}
      {onOpenMenu && (
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Abrir menú"
          className={`absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-lg sm:hidden ${
            bannerDataUrl ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Menu size={20} />
        </button>
      )}
      <div className="relative">
        <p className={`text-xl font-semibold ${bannerDataUrl ? 'text-white' : 'text-slate-800'}`}>{title}</p>
        {subtitle && <p className={`mt-1 text-sm ${bannerDataUrl ? 'text-white/80' : 'text-slate-400'}`}>{subtitle}</p>}
      </div>
    </header>
  )
}
