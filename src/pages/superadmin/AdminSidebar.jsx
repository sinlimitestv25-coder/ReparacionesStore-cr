import { Plus, Settings, Smartphone, LogOut } from 'lucide-react'
import { Button } from '../../components/ui/Button'

const itemClass = 'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50'

export function AdminSidebar({ logoDataUrl, user, onNewStore, onOpenSettings, onLogout }) {
  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r border-slate-200 bg-white sm:flex">
      <div className="p-3">
        <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          {logoDataUrl ? (
            <img src={logoDataUrl} alt="Logo" className="h-full w-full object-contain p-3" />
          ) : (
            <Smartphone size={40} className="text-slate-300" />
          )}
        </div>
      </div>
      <nav className="flex-1 space-y-0.5 px-2 pt-4">
        <button type="button" onClick={onNewStore} className={itemClass}>
          <Plus size={17} />
          Nuevo local
        </button>
        <button type="button" onClick={onOpenSettings} className={itemClass}>
          <Settings size={17} />
          Configuración
        </button>
      </nav>

      <div className="border-t border-slate-100 p-3">
        <p className="truncate text-sm font-medium text-slate-700">{user?.name}</p>
        <p className="mb-2 truncate text-xs text-slate-400">Super Admin</p>
        <Button variant="secondary" size="sm" onClick={onLogout} className="w-full">
          <LogOut size={15} />
          Salir
        </Button>
      </div>
    </aside>
  )
}
