import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ShieldCheck, Store, Smartphone, RotateCcw } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { SEED_USERS } from '../lib/seedData'
import { resetDB } from '../lib/db'
import { Button } from '../components/ui/Button'

export function Login() {
  const { currentUser, isSuperAdmin, activeStoreId, login } = useAuth()
  const navigate = useNavigate()
  const [resetMessage, setResetMessage] = useState('')

  if (currentUser) {
    if (isSuperAdmin) return <Navigate to="/superadmin" replace />
    return <Navigate to={`/tienda/${activeStoreId}/dashboard`} replace />
  }

  const handleLogin = (user) => {
    login(user.id)
    if (user.role === 'super_admin') {
      navigate('/superadmin')
    } else {
      navigate(`/tienda/${user.storeId}/dashboard`)
    }
  }

  const handleReset = () => {
    resetDB()
    setResetMessage('Datos de demostración restablecidos.')
    setTimeout(() => setResetMessage(''), 2500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
            <Smartphone size={24} />
          </div>
          <h1 className="text-xl font-semibold text-slate-800">reparacioneStore</h1>
          <p className="text-sm text-slate-500">
            Sistema de gestión para venta y reparación de celulares. Versión de demostración: elegí con qué usuario
            querés ingresar.
          </p>
        </div>

        <div className="space-y-2.5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          {SEED_USERS.map((user) => (
            <button
              key={user.id}
              onClick={() => handleLogin(user)}
              className="flex w-full items-center gap-3 rounded-lg border border-slate-200 px-3 py-3 text-left transition-colors hover:border-brand-300 hover:bg-brand-50"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                {user.role === 'super_admin' ? <ShieldCheck size={18} /> : <Store size={18} />}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-800">{user.name}</p>
                <p className="truncate text-xs text-slate-500">
                  {user.role === 'super_admin' ? 'Super Admin · administra todos los locales' : `Dueño de local · ${user.email}`}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-col items-center gap-1">
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw size={14} />
            Restablecer datos de demostración
          </Button>
          {resetMessage && <p className="text-xs text-emerald-600">{resetMessage}</p>}
        </div>
      </div>
    </div>
  )
}
