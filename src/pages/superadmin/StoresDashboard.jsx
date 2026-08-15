import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, LogIn, Power, Store as StoreIcon, Smartphone, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useCollection } from '../../hooks/useCollection'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { EmptyState } from '../../components/ui/EmptyState'
import { StatCard } from '../../components/dashboard/StatCard'
import { formatDate } from '../../lib/format'
import { StoreFormModal } from './StoreFormModal'

export function StoresDashboard() {
  const { currentUser, enterStore, logout } = useAuth()
  const navigate = useNavigate()
  const { items: stores, create, update } = useCollection('stores')
  const { items: stock } = useCollection('stock')
  const [modalOpen, setModalOpen] = useState(false)

  const stockCountByStore = stock.reduce((acc, item) => {
    acc[item.storeId] = (acc[item.storeId] || 0) + 1
    return acc
  }, {})

  const handleCreateStore = (form) => {
    create({ ...form, active: true, createdAt: new Date().toISOString() })
    setModalOpen(false)
  }

  const handleToggleActive = (store) => {
    update(store.id, { active: !store.active })
  }

  const handleEnterStore = (store) => {
    enterStore(store.id)
    navigate(`/tienda/${store.id}/dashboard`)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const activeStores = stores.filter((s) => s.active).length

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Smartphone size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">reparacioneStore · Panel General</p>
            <p className="text-xs text-slate-400">{currentUser?.name}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut size={16} />
          Salir
        </Button>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
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
            <div className="grid gap-3 sm:grid-cols-2">
              {stores.map((store) => (
                <div key={store.id} className="rounded-lg border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">{store.name}</p>
                      <p className="truncate text-xs text-slate-500">{store.address || 'Sin dirección cargada'}</p>
                    </div>
                    <Badge color={store.active ? 'emerald' : 'slate'}>{store.active ? 'Activo' : 'Inactivo'}</Badge>
                  </div>

                  <dl className="mt-3 space-y-1 text-xs text-slate-500">
                    <div className="flex justify-between">
                      <dt>Dueño</dt>
                      <dd className="text-slate-700">{store.ownerName}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Contacto</dt>
                      <dd className="text-slate-700">{store.ownerEmail}</dd>
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

                  <div className="mt-3 flex gap-2">
                    <Button size="sm" onClick={() => handleEnterStore(store)} className="flex-1">
                      <LogIn size={14} />
                      Ingresar
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => handleToggleActive(store)}>
                      <Power size={14} />
                      {store.active ? 'Desactivar' : 'Activar'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </main>

      <StoreFormModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleCreateStore} />
    </div>
  )
}
