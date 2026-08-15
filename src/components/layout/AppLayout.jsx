import { Outlet, useNavigate, useParams, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCollection } from '../../hooks/useCollection'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function AppLayout() {
  const { storeId } = useParams()
  const navigate = useNavigate()
  const { currentUser, isSuperAdmin, isImpersonating, logout, exitStore } = useAuth()
  const { items: stores } = useCollection('stores')

  // Un dueño de local no puede entrar a la URL de otro local.
  if (!isSuperAdmin && currentUser?.storeId !== storeId) {
    return <Navigate to={`/tienda/${currentUser?.storeId}/dashboard`} replace />
  }

  const store = stores.find((s) => s.id === storeId)

  if (!store) {
    return <Navigate to={isSuperAdmin ? '/superadmin' : '/login'} replace />
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleExitImpersonation = () => {
    exitStore()
    navigate('/superadmin')
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar storeId={storeId} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          storeName={store.name}
          user={currentUser}
          isImpersonating={isImpersonating}
          onExitImpersonation={handleExitImpersonation}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet context={{ store }} />
        </main>
      </div>
    </div>
  )
}
