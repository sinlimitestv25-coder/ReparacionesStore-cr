import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { ShieldCheck, Store, RotateCcw, LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTenant } from '../context/TenantContext'
import { resetDB } from '../lib/db'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { RepairIllustration } from '../components/auth/RepairIllustration'
import { LoadingScreen } from '../components/auth/LoadingScreen'
import { SiteFooter } from '../components/SiteFooter'

const LOADING_MS = 2200

export function Login() {
  const { currentUser, login, logout } = useAuth()
  const { isRootDomain, store } = useTenant()
  const [loginMode, setLoginMode] = useState('local') // solo se usa en el dominio raíz
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [resetMessage, setResetMessage] = useState('')
  const [photoFailed, setPhotoFailed] = useState(false)
  const [readyToEnter, setReadyToEnter] = useState(false)

  // La sesión guardada solo es válida si corresponde a este dominio: en un
  // subdominio, solo el dueño de ESE local; en el dominio raíz, tanto el
  // Super Admin como cualquier dueño (su local se resuelve por la sesión,
  // ver TenantContext). Si no coincide, se cierra acá en vez de redirigir a
  // una ruta que no existe (eso causaba un loop infinito antes).
  const isValidSessionHere =
    !!currentUser &&
    (isRootDomain
      ? currentUser.role === 'super_admin' || (currentUser.role === 'owner' && !!store)
      : currentUser.role === 'owner' && currentUser.storeId === store?.id)

  useEffect(() => {
    if (currentUser && !isValidSessionHere) {
      setError('Ese usuario no tiene acceso a este local.')
      logout()
    }
  }, [currentUser, isValidSessionHere, logout])

  // Apenas la sesión queda válida, se muestra la animación de carga un
  // ratito antes de entrar de verdad al panel.
  useEffect(() => {
    if (isValidSessionHere) {
      const t = setTimeout(() => setReadyToEnter(true), LOADING_MS)
      return () => clearTimeout(t)
    }
    setReadyToEnter(false)
  }, [isValidSessionHere])

  if (isValidSessionHere) {
    if (!readyToEnter) return <LoadingScreen />
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

  const showingAdmin = isRootDomain && loginMode === 'admin'

  const title = !isRootDomain ? store?.name : showingAdmin ? 'reparacioneStore · Administrador' : 'reparacioneStore'
  const tagline = !isRootDomain
    ? 'Tu nueva forma de gestionar el negocio: stock, ventas y reparaciones, todo en un solo lugar.'
    : showingAdmin
      ? 'El panel para administrar todos tus locales de venta y reparación de celulares, en un solo lugar.'
      : 'Tu nueva forma de gestionar el negocio: stock, ventas y reparaciones, todo en un solo lugar.'

  return (
    <div className="flex h-screen bg-slate-50">
      <div className="hidden w-1/2 md:block">
        {!photoFailed ? (
          <img
            src="/login-bench.jpg"
            alt=""
            className="h-full w-full object-cover"
            onError={() => setPhotoFailed(true)}
          />
        ) : (
          <RepairIllustration className="h-full w-full" />
        )}
      </div>

      <div className="flex h-full w-full flex-col items-center justify-center overflow-y-auto px-6 py-12 md:w-1/2 md:px-12">
        <div className="w-full max-w-sm">
          {isRootDomain && (
            <div className="mb-6 flex rounded-lg border border-slate-200 bg-white p-1 text-sm">
              <button
                type="button"
                onClick={() => setLoginMode('local')}
                className={`flex-1 rounded-md py-1.5 font-medium transition-colors ${
                  loginMode === 'local' ? 'bg-brand-600 text-white' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                Soy un local
              </button>
              <button
                type="button"
                onClick={() => setLoginMode('admin')}
                className={`flex-1 rounded-md py-1.5 font-medium transition-colors ${
                  loginMode === 'admin' ? 'bg-brand-600 text-white' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                Administrador
              </button>
            </div>
          )}

          <div className="mb-8">
            <div className="mb-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-brand-600 text-white">
              {!isRootDomain && store?.logoDataUrl ? (
                <img src={store.logoDataUrl} alt={store.name} className="h-full w-full object-contain bg-white p-1" />
              ) : showingAdmin ? (
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

          <SiteFooter className="mt-10" />
        </div>
      </div>
    </div>
  )
}
