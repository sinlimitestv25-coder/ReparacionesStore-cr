import { useState } from 'react'
import { Plus, LogIn, Power, Store as StoreIcon, KeyRound } from 'lucide-react'
import { useCollection } from '../../hooks/useCollection'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { EmptyState } from '../../components/ui/EmptyState'
import { StatCard } from '../../components/dashboard/StatCard'
import { formatDate } from '../../lib/format'
import { buildTenantUrl, describeTenantUrl } from '../../lib/tenant'
import { ResetPasswordModal } from './ResetPasswordModal'

export function AdminStores() {
  const { items: stores, update: updateStore } = useCollection('stores')
  const { items: stock } = useCollection('stock')
  const { items: users, update: updateUser } = useCollection('users')
  const [resetPasswordStore, setResetPasswordStore] = useState(null)

  const stockCountByStore = stock.reduce((acc, item) => {
    acc[item.storeId] = (acc[item.storeId] || 0) + 1
    return acc
  }, {})

  const ownerOf = (storeId) => users.find((u) => u.storeId === storeId && u.role === 'owner')

  const handleToggleActive = (store) => {
    updateStore(store.id, { active: !store.active })
  }

  const handleResetPassword = (newPassword) => {
    const owner = ownerOf(resetPasswordStore.id)
    if (owner) updateUser(owner.id, { password: newPassword })
    setResetPasswordStore(null)
  }

  const activeStores = stores.filter((s) => s.active).length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard icon={StoreIcon} label="Locales totales" value={stores.length} color="blue" />
        <StatCard icon={Power} label="Locales activos" value={activeStores} color="emerald" />
        <StatCard icon={StoreIcon} label="Locales inactivos" value={stores.length - activeStores} color="amber" />
      </div>

      <Card title="Locales">
        {stores.length === 0 ? (
          <EmptyState
            icon={StoreIcon}
            title="Todavía no hay locales cargados"
            description='Usá "Nuevo local" en el menú lateral para crear el primero.'
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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

      <ResetPasswordModal
        open={!!resetPasswordStore}
        onClose={() => setResetPasswordStore(null)}
        onSubmit={handleResetPassword}
        targetLabel={resetPasswordStore ? `${ownerOf(resetPasswordStore.id)?.username} (${resetPasswordStore.name})` : ''}
      />
    </div>
  )
}
