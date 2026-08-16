import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Plus, Settings, Smartphone, LogOut } from 'lucide-react'
import { Button } from '../ui/Button'

const itemClass = 'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-slate-600 transition-colors hover:bg-slate-50'

const navItemClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'
  }`

export function AdminSidebar({ logoDataUrl, user, onNewStore, onLogout }) {
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
        <NavLink to="/superadmin" end className={navItemClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
        <button type="button" onClick={onNewStore} className={itemClass}>
          <Plus size={20} />
          Nuevo local
        </button>
        <NavLink to="/superadmin/configuracion" className={navItemClass}>
          <Settings size={20} />
          Configuración
        </NavLink>
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
