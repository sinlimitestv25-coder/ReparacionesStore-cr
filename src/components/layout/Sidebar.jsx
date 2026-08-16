import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Boxes, ShoppingCart, Wrench, Users, Truck, Smartphone, Settings, LogOut, X } from 'lucide-react'
import { Button } from '../ui/Button'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/stock', label: 'Stock', icon: Boxes },
  { to: '/ventas', label: 'Ventas', icon: ShoppingCart },
  { to: '/reparaciones', label: 'Reparaciones', icon: Wrench },
  { to: '/clientes', label: 'Clientes', icon: Users },
  { to: '/proveedores', label: 'Proveedores', icon: Truck },
  { to: '/configuracion', label: 'Configuración', icon: Settings },
]

const navItemClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'
  }`

export function Sidebar({ logoDataUrl, storeName, user, userRoleLabel, onLogout, mobileOpen, onCloseMobile }) {
  const content = (
    <>
      <div className="p-3">
        <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          {logoDataUrl ? (
            <img src={logoDataUrl} alt={storeName} className="h-full w-full object-contain p-3" />
          ) : (
            <Smartphone size={40} className="text-slate-300" />
          )}
        </div>
      </div>
      <nav className="flex-1 space-y-0.5 px-2 pt-4">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={navItemClass} onClick={onCloseMobile}>
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-100 p-3">
        <p className="truncate text-sm font-medium text-slate-700">{user?.name}</p>
        {userRoleLabel && <p className="mb-2 truncate text-xs text-slate-400">{userRoleLabel}</p>}
        <Button variant="secondary" size="sm" onClick={onLogout} className="w-full">
          <LogOut size={15} />
          Salir
        </Button>
      </div>
    </>
  )

  return (
    <>
      <aside className="hidden w-56 shrink-0 flex-col border-r border-slate-200 bg-white sm:flex">{content}</aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 sm:hidden">
          <div className="absolute inset-0 bg-slate-900/40" onClick={onCloseMobile} />
          <aside className="relative flex h-full w-72 max-w-[85%] flex-col bg-white shadow-xl">
            <button
              type="button"
              onClick={onCloseMobile}
              aria-label="Cerrar menú"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={18} />
            </button>
            {content}
          </aside>
        </div>
      )}
    </>
  )
}
