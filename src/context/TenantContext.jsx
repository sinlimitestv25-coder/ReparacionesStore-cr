import { createContext, useContext, useMemo } from 'react'
import { useCollection } from '../hooks/useCollection'
import { resolveTenantSlug } from '../lib/tenant'

const TenantContext = createContext(null)

export function TenantProvider({ children }) {
  const { items: stores, update: updateStoreCollection } = useCollection('stores')
  const slug = useMemo(() => resolveTenantSlug(), [])
  const isRootDomain = slug === null
  const store = isRootDomain ? null : stores.find((s) => s.slug === slug) || null
  const notFound = !isRootDomain && !store

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
