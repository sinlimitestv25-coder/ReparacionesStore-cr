import { createContext, useContext, useMemo, useState } from 'react'
import { SEED_USERS } from '../lib/seedData'
import { saveSession, loadSession, clearSession } from '../lib/db'
import { ROLES } from '../constants'

const VIEWING_STORE_KEY = 'reparacionestore_viewing_store_v1'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(() => loadSession())
  const [viewingStoreId, setViewingStoreId] = useState(() => localStorage.getItem(VIEWING_STORE_KEY))

  const currentUser = useMemo(() => SEED_USERS.find((u) => u.id === userId) || null, [userId])

  const login = (id) => {
    saveSession(id)
    setUserId(id)
  }

  const logout = () => {
    clearSession()
    localStorage.removeItem(VIEWING_STORE_KEY)
    setUserId(null)
    setViewingStoreId(null)
  }

  const enterStore = (storeId) => {
    localStorage.setItem(VIEWING_STORE_KEY, storeId)
    setViewingStoreId(storeId)
  }

  const exitStore = () => {
    localStorage.removeItem(VIEWING_STORE_KEY)
    setViewingStoreId(null)
  }

  const isSuperAdmin = currentUser?.role === ROLES.SUPER_ADMIN
  const activeStoreId = isSuperAdmin ? viewingStoreId : currentUser?.storeId || null

  const value = {
    currentUser,
    isSuperAdmin,
    isImpersonating: isSuperAdmin && !!viewingStoreId,
    activeStoreId,
    login,
    logout,
    enterStore,
    exitStore,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
