import { createContext, useContext, useState } from 'react'
import { useCollection } from '../hooks/useCollection'
import { saveSession, loadSession, clearSession } from '../lib/db'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(() => loadSession())
  const { items: users, update: updateUser } = useCollection('users')

  const currentUser = users.find((u) => u.id === userId) || null

  const login = (username, password) => {
    const match = users.find(
      (u) => u.username.trim().toLowerCase() === username.trim().toLowerCase() && u.password === password
    )
    if (!match) {
      return { success: false, error: 'Usuario o contraseña incorrectos.' }
    }
    saveSession(match.id)
    setUserId(match.id)
    return { success: true }
  }

  const logout = () => {
    clearSession()
    setUserId(null)
  }

  const changePassword = (newPassword) => {
    if (!currentUser) return
    updateUser(currentUser.id, { password: newPassword })
  }

  const value = { currentUser, login, logout, changePassword }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
