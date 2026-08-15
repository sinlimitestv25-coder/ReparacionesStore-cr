import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Boxes, ShoppingCart, Wrench, Users, Truck, Smartphone } from 'lucide-react'

const NAV_ITEMS = [
  { to: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: 'stock', label: 'Stock', icon: Boxes },
  { to: 'ventas', label: 'Ventas', icon: ShoppingCart },
  { to: 'reparaciones', label: 'Reparaciones', icon: Wrench },
  { to: 'clientes', label: 'Clientes', icon: Users },
  { to: 'proveedores', label: 'Proveedores', icon: Truck },
]

export function Sidebar({ storeId }) {
  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r border-slate-200 bg-white sm:flex">
      <div className="flex items-center gap-2 px-4 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
          <Smartphone size={18} />
        </div>
        <span className="text-sm font-semibold text-slate-800">reparacioneStore</span>
      </div>
      <nav className="flex-1 space-y-0.5 px-2">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={`/tienda/${storeId}/${to}`}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
