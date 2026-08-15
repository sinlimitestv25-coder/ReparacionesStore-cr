import { createContext, useContext, useMemo, useState } from 'react'
import { SEED_USERS } from '../lib/seedData'
import { saveSession, loadSession, clearSession } from '../lib/db'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(() => loadSession())

  const currentUser = useMemo(() => SEED_USERS.find((u) => u.id === userId) || null, [userId])

  const login = (id) => {
    saveSession(id)
    setUserId(id)
  }

  const logout = () => {
    clearSession()
    setUserId(null)
  }

  const value = { currentUser, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
