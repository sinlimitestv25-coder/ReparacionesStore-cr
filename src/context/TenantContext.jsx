import { createContext, useContext, useMemo } from 'react'
import { useCollection } from '../hooks/useCollection'
import { resolveTenantSlug } from '../lib/tenant'

const TenantContext = createContext(null)

export function TenantProvider({ children }) {
  const { items: stores } = useCollection('stores')
  const slug = useMemo(() => resolveTenantSlug(), [])
  const isRootDomain = slug === null
  const store = isRootDomain ? null : stores.find((s) => s.slug === slug) || null
  const notFound = !isRootDomain && !store

  const value = { isRootDomain, slug, store, notFound }

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
}

export function useTenant() {
  const ctx = useContext(TenantContext)
  if (!ctx) throw new Error('useTenant debe usarse dentro de <TenantProvider>')
  return ctx
}
