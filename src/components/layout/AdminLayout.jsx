import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useSettings } from '../../hooks/useSettings'
import { SiteFooter } from '../SiteFooter'
import { AdminSidebar } from './AdminSidebar'
import { Topbar } from './Topbar'
import { StoreFormModal } from '../../pages/superadmin/StoreFormModal'

export function AdminLayout() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  const { items: stores, create: createStore } = useCollection('stores')
  const { items: users, create: createUser } = useCollection('users')
  const { settings } = useSettings()
  const [modalOpen, setModalOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleCreateStore = (form) => {
    const { username, password, ...storeForm } = form
    const newStore = createStore({ ...storeForm, active: true, createdAt: new Date().toISOString() })
    createUser({ username, password, name: form.ownerName, role: 'owner', storeId: newStore.id })
    setModalOpen(false)
    navigate('/superadmin')
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar logoDataUrl={settings.logoDataUrl} user={currentUser} onNewStore={() => setModalOpen(true)} onLogout={handleLogout} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title="ReparacioneStore · Panel General" bannerDataUrl={settings.bannerDataUrl} />
        <main className="flex flex-1 flex-col overflow-y-auto p-4 sm:p-8">
          <div className="flex-1">
            <Outlet />
          </div>
          <SiteFooter />
        </main>
      </div>

      <StoreFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateStore}
        existingSlugs={stores.map((s) => s.slug)}
        existingUsernames={users.map((u) => u.username.toLowerCase())}
      />
    </div>
  )
}
