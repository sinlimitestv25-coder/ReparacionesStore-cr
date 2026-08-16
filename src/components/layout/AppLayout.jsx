import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTenant } from '../../context/TenantContext'
import { SiteFooter } from '../SiteFooter'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function AppLayout() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  const { store } = useTenant()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar
        logoDataUrl={store.logoDataUrl}
        storeName={store.name}
        user={currentUser}
        userRoleLabel="Dueño de local"
        onLogout={handleLogout}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={store.name} subtitle="Gestión de venta y reparación de celulares" bannerDataUrl={store.bannerDataUrl} />
        <main className="flex flex-1 flex-col overflow-y-auto p-4 sm:p-6">
          <div className="flex-1">
            <Outlet />
          </div>
          <SiteFooter />
        </main>
      </div>
    </div>
  )
}
