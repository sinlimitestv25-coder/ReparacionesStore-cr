import { LogOut } from 'lucide-react'
import { Button } from '../ui/Button'

export function Topbar({ storeName, user, onLogout }) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
      <div>
        <p className="text-sm font-semibold text-slate-800">{storeName}</p>
        <p className="text-xs text-slate-400">Gestión de venta y reparación de celulares</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-slate-700">{user?.name}</p>
          <p className="text-xs text-slate-400">Dueño de local</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onLogout}>
          <LogOut size={16} />
          Salir
        </Button>
      </div>
    </header>
  )
}
