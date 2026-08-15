import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Boxes, ShoppingCart, Wrench, Users, Truck, Smartphone, Settings } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/stock', label: 'Stock', icon: Boxes },
  { to: '/ventas', label: 'Ventas', icon: ShoppingCart },
  { to: '/reparaciones', label: 'Reparaciones', icon: Wrench },
  { to: '/clientes', label: 'Clientes', icon: Users },
  { to: '/proveedores', label: 'Proveedores', icon: Truck },
]

const navItemClass = ({ isActive }) =>
  `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'
  }`

export function Sidebar({ logoDataUrl, storeName, onOpenSettings }) {
  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r border-slate-200 bg-white sm:flex">
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
          <NavLink key={to} to={to} className={navItemClass}>
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
        <button type="button" onClick={onOpenSettings} className={`w-full ${navItemClass({ isActive: false })}`}>
          <Settings size={17} />
          Configuración
        </button>
      </nav>
    </aside>
  )
}
