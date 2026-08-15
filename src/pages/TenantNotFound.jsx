import { Smartphone, AlertTriangle } from 'lucide-react'
import { useTenant } from '../context/TenantContext'

export function TenantNotFound() {
  const { slug } = useTenant()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 px-4 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-200 text-slate-500">
        <Smartphone size={24} />
      </div>
      <div className="flex items-center gap-1.5 text-amber-600">
        <AlertTriangle size={16} />
        <p className="text-sm font-medium">Local no encontrado</p>
      </div>
      <p className="max-w-sm text-sm text-slate-500">
        No existe ningún local con el subdominio <strong>"{slug}"</strong>, o fue dado de baja. Consultá con el
        administrador del sistema.
      </p>
    </div>
  )
}
