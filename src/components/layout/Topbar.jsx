import { LogOut, ArrowLeftCircle } from 'lucide-react'
import { Button } from '../ui/Button'

export function Topbar({ storeName, user, isImpersonating, onExitImpersonation, onLogout }) {
  return (
    <header className="flex flex-col border-b border-slate-200 bg-white">
      {isImpersonating && (
        <div className="flex items-center justify-between bg-amber-50 px-4 py-1.5 text-xs text-amber-800">
          <span>Estás viendo <strong>{storeName}</strong> como Super Admin.</span>
          <button onClick={onExitImpersonation} className="flex items-center gap-1 font-medium hover:underline">
            <ArrowLeftCircle size={14} /> Volver al panel general
          </button>
        </div>
      )}
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-slate-800">{storeName}</p>
          <p className="text-xs text-slate-400">Gestión de venta y reparación de celulares</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-700">{user?.name}</p>
            <p className="text-xs text-slate-400">{user?.role === 'super_admin' ? 'Super Admin' : 'Dueño de local'}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut size={16} />
            Salir
          </Button>
        </div>
      </div>
    </header>
  )
}
