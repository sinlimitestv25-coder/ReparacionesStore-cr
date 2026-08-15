import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, LogIn, Power, Store as StoreIcon, Smartphone, LogOut, KeyRound, Settings } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useSettings } from '../../hooks/useSettings'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { EmptyState } from '../../components/ui/EmptyState'
import { StatCard } from '../../components/dashboard/StatCard'
import { formatDate } from '../../lib/format'
import { buildTenantUrl, describeTenantUrl } from '../../lib/tenant'
import { StoreFormModal } from './StoreFormModal'
import { ResetPasswordModal } from './ResetPasswordModal'
import { SettingsModal } from './SettingsModal'

export function StoresDashboard() {
  const { currentUser, logout, changePassword } = useAuth()
  const navigate = useNavigate()
  const { items: stores, create: createStore, update: updateStore } = useCollection('stores')
  const { items: stock } = useCollection('stock')
  const { items: users, create: createUser, update: updateUser } = useCollection('users')
  const { settings, update: updateSettings } = useSettings()

  const [modalOpen, setModalOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [resetPasswordStore, setResetPasswordStore] = useState(null)

  const stockCountByStore = stock.reduce((acc, item) => {
    acc[item.storeId] = (acc[item.storeId] || 0) + 1
    return acc
  }, {})

  const ownerOf = (storeId) => users.find((u) => u.storeId === storeId && u.role === 'owner')

  const handleCreateStore = (form) => {
    const { username, password, ...storeForm } = form
    const newStore = createStore({ ...storeForm, active: true, createdAt: new Date().toISOString() })
    createUser({ username, password, name: form.ownerName, role: 'owner', storeId: newStore.id })
    setModalOpen(false)
  }

  const handleToggleActive = (store) => {
    updateStore(store.id, { active: !store.active })
  }

  const handleResetPassword = (newPassword) => {
    const owner = ownerOf(resetPasswordStore.id)
    if (owner) updateUser(owner.id, { password: newPassword })
    setResetPasswordStore(null)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const activeStores = stores.filter((s) => s.active).length

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6 sm:px-6">
          <div className="flex items-center gap-3">
            {settings.logoDataUrl ? (
              <img src={settings.logoDataUrl} alt="Logo" className="h-12 w-12 rounded-lg object-contain" />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-600 text-white">
                <Smartphone size={22} />
              </div>
            )}
            <div>
              <p className="text-base font-semibold text-slate-800">reparacioneStore · Panel General</p>
              <p className="text-xs text-slate-400">{currentUser?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => setSettingsOpen(true)}>
              <Settings size={16} />
              Configuración
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut size={16} />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatCard icon={StoreIcon} label="Locales totales" value={stores.length} color="blue" />
          <StatCard icon={Power} label="Locales activos" value={activeStores} color="emerald" />
          <StatCard icon={StoreIcon} label="Locales inactivos" value={stores.length - activeStores} color="amber" />
        </div>

        <Card
          title="Locales"
          action={
            <Button size="sm" onClick={() => setModalOpen(true)}>
              <Plus size={16} />
              Nuevo local
            </Button>
          }
        >
          {stores.length === 0 ? (
            <EmptyState
              icon={StoreIcon}
              title="Todavía no hay locales cargados"
              description="Creá el primer local para empezar a usar el sistema."
              action={
                <Button size="sm" onClick={() => setModalOpen(true)}>
                  <Plus size={16} />
                  Nuevo local
                </Button>
              }
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {stores.map((store) => (
                <div key={store.id} className="rounded-lg border border-slate-300 p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">{store.name}</p>
                      <p className="truncate text-xs text-slate-500">{store.address || 'Sin dirección cargada'}</p>
                    </div>
                    <Badge color={store.active ? 'emerald' : 'slate'}>{store.active ? 'Activo' : 'Inactivo'}</Badge>
                  </div>

                  <dl className="mt-3 space-y-1 text-xs text-slate-500">
                    <div className="flex justify-between">
                      <dt>Entra por</dt>
                      <dd className="truncate text-slate-700">{describeTenantUrl(store.slug)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Dueño</dt>
                      <dd className="text-slate-700">{store.ownerName}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Usuario</dt>
                      <dd className="text-slate-700">{ownerOf(store.id)?.username || '-'}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Productos en stock</dt>
                      <dd className="text-slate-700">{stockCountByStore[store.id] || 0}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Creado</dt>
                      <dd className="text-slate-700">{formatDate(store.createdAt)}</dd>
                    </div>
                  </dl>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button size="sm" href={buildTenantUrl(store.slug)} className="flex-1">
                      <LogIn size={14} />
                      Ingresar
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => handleToggleActive(store)}>
                      <Power size={14} />
                      {store.active ? 'Desactivar' : 'Activar'}
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => setResetPasswordStore(store)}>
                      <KeyRound size={14} />
                      Contraseña
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </main>

      <StoreFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateStore}
        existingSlugs={stores.map((s) => s.slug)}
        existingUsernames={users.map((u) => u.username.toLowerCase())}
      />

      <ResetPasswordModal
        open={!!resetPasswordStore}
        onClose={() => setResetPasswordStore(null)}
        onSubmit={handleResetPassword}
        targetLabel={resetPasswordStore ? `${ownerOf(resetPasswordStore.id)?.username} (${resetPasswordStore.name})` : ''}
      />

      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        logoDataUrl={settings.logoDataUrl}
        onLogoChange={(logoDataUrl) => updateSettings({ logoDataUrl })}
        onChangePassword={changePassword}
      />
    </div>
  )
}
