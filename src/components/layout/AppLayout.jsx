import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTenant } from '../../context/TenantContext'
import { SettingsModal } from '../SettingsModal'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function AppLayout() {
  const navigate = useNavigate()
  const { currentUser, logout, changePassword } = useAuth()
  const { store, updateStore } = useTenant()
  const [settingsOpen, setSettingsOpen] = useState(false)

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
        onOpenSettings={() => setSettingsOpen(true)}
        onLogout={handleLogout}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={store.name} subtitle="Gestión de venta y reparación de celulares" bannerDataUrl={store.bannerDataUrl} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>

      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        logoDataUrl={store.logoDataUrl}
        bannerDataUrl={store.bannerDataUrl}
        onLogoChange={(logoDataUrl) => updateStore({ logoDataUrl })}
        onBannerChange={(bannerDataUrl) => updateStore({ bannerDataUrl })}
        repairTerms={store.repairTerms}
        onRepairTermsChange={(repairTerms) => updateStore({ repairTerms })}
        onChangePassword={changePassword}
      />
    </div>
  )
}
