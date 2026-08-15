import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { ShieldCheck, Store, RotateCcw, LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTenant } from '../context/TenantContext'
import { resetDB } from '../lib/db'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { RepairIllustration } from '../components/auth/RepairIllustration'

export function Login() {
  const { currentUser, login, logout } = useAuth()
  const { isRootDomain, store } = useTenant()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [resetMessage, setResetMessage] = useState('')

  // La sesión guardada solo es válida en el dominio al que corresponde (un
  // Super Admin en el dominio raíz, un dueño en el subdominio de SU local).
  // Si no coincide hay que cerrarla acá en vez de redirigir a una ruta que
  // no existe en este dominio (eso causaba un loop infinito antes).
  const isValidSessionHere =
    !!currentUser &&
    (isRootDomain
      ? currentUser.role === 'super_admin'
      : currentUser.role === 'owner' && currentUser.storeId === store?.id)

  useEffect(() => {
    if (currentUser && !isValidSessionHere) {
      setError('Ese usuario no tiene acceso a este local.')
      logout()
    }
  }, [currentUser, isValidSessionHere, logout])

  if (isValidSessionHere) {
    return <Navigate to={currentUser.role === 'super_admin' ? '/superadmin' : '/dashboard'} replace />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = login(username, password)
    if (!result.success) {
      setError(result.error)
      return
    }
    setError('')
  }

  const handleReset = () => {
    resetDB()
    setResetMessage('Datos de demostración restablecidos.')
    setTimeout(() => setResetMessage(''), 2500)
  }

  const title = isRootDomain ? 'reparacioneStore' : store?.name
  const tagline = isRootDomain
    ? 'El panel para administrar todos tus locales de venta y reparación de celulares, en un solo lugar.'
    : 'Tu nueva forma de gestionar el negocio: stock, ventas y reparaciones, todo en un solo lugar.'

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="hidden w-1/2 md:block">
        <RepairIllustration className="h-full w-full" />
      </div>

      <div className="flex w-full flex-col items-center justify-center px-6 py-12 md:w-1/2 md:px-12">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <div className="mb-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-brand-600 text-white">
              {!isRootDomain && store?.logoDataUrl ? (
                <img src={store.logoDataUrl} alt={store.name} className="h-full w-full object-contain bg-white p-1" />
              ) : isRootDomain ? (
                <ShieldCheck size={28} />
              ) : (
                <Store size={28} />
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
            <p className="mt-2 text-sm text-slate-500">{tagline}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <Input label="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus required />
            <Input label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {error && <p className="text-xs text-red-600">{error}</p>}
            <Button type="submit" className="w-full">
              <LogIn size={16} />
              Ingresar
            </Button>
          </form>

          <div className="mt-4 flex flex-col items-center gap-1">
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <RotateCcw size={14} />
              Restablecer datos de demostración
            </Button>
            {resetMessage && <p className="text-xs text-emerald-600">{resetMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
