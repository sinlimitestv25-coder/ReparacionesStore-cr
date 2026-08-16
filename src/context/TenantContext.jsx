import { createContext, useContext, useMemo } from 'react'
import { useCollection } from '../hooks/useCollection'
import { useAuth } from './AuthContext'
import { resolveTenantSlug } from '../lib/tenant'

const TenantContext = createContext(null)

export function TenantProvider({ children }) {
  const { currentUser } = useAuth()
  const { items: stores, update: updateStoreCollection } = useCollection('stores')
  const slug = useMemo(() => resolveTenantSlug(), [])
  const isRootDomain = slug === null
  const slugStore = isRootDomain ? null : stores.find((s) => s.slug === slug) || null
  const notFound = !isRootDomain && !slugStore

  // En el dominio raíz no hay subdominio que indique el local, así que si
  // hay una sesión de dueño activa usamos su propio local como tenant
  // efectivo. Esto permite que un dueño pueda entrar desde el dominio raíz
  // (por ejemplo, mientras todavía no hay subdominios reales configurados).
  // En un subdominio, el tenant siempre es el que indica ese subdominio.
  const store = isRootDomain
    ? currentUser?.role === 'owner'
      ? stores.find((s) => s.id === currentUser.storeId) || null
      : null
    : slugStore

  // Actualiza el local actual (ej: logo/banner). Centralizado acá para que
  // cualquier componente que lea "store" desde este contexto vea el cambio
  // al toque, en vez de quedar desincronizado con otra instancia de
  // useCollection('stores').
  const updateStore = (patch) => {
    if (!store) return
    return updateStoreCollection(store.id, patch)
  }

  const value = { isRootDomain, slug, store, notFound, updateStore }

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
}

export function useTenant() {
  const ctx = useContext(TenantContext)
  if (!ctx) throw new Error('useTenant debe usarse dentro de <TenantProvider>')
  return ctx
}
