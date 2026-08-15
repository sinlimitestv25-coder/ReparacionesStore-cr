import { LogOut } from 'lucide-react'
import { Button } from '../ui/Button'

export function Topbar({ storeName, user, bannerDataUrl, onLogout }) {
  return (
    <header
      className="relative flex items-center justify-between overflow-hidden border-b border-slate-200 bg-white bg-cover bg-center px-4 py-8"
      style={bannerDataUrl ? { backgroundImage: `url(${bannerDataUrl})` } : undefined}
    >
      {bannerDataUrl && <div className="absolute inset-0 bg-slate-900/45" />}
      <div className="relative">
        <p className={`text-sm font-semibold ${bannerDataUrl ? 'text-white' : 'text-slate-800'}`}>{storeName}</p>
        <p className={`text-xs ${bannerDataUrl ? 'text-white/80' : 'text-slate-400'}`}>Gestión de venta y reparación de celulares</p>
      </div>
      <div className="relative flex items-center gap-3">
        <div className="text-right">
          <p className={`text-sm font-medium ${bannerDataUrl ? 'text-white' : 'text-slate-700'}`}>{user?.name}</p>
          <p className={`text-xs ${bannerDataUrl ? 'text-white/80' : 'text-slate-400'}`}>Dueño de local</p>
        </div>
        <Button
          variant="secondary"
          size="md"
          onClick={onLogout}
          className={bannerDataUrl ? 'border-white/40 bg-white/10 text-white hover:bg-white/20' : ''}
        >
          <LogOut size={18} />
          Salir
        </Button>
      </div>
    </header>
  )
}
