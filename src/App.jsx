import { Routes, Route, Navigate } from 'react-router-dom'
import { useTenant } from './context/TenantContext'
import { Login } from './pages/Login'
import { TenantNotFound } from './pages/TenantNotFound'
import { StoresDashboard } from './pages/superadmin/StoresDashboard'
import { AppLayout } from './components/layout/AppLayout'
import { Dashboard } from './pages/store/Dashboard'
import { Stock } from './pages/store/Stock'
import { Sales } from './pages/store/Sales'
import { Repairs } from './pages/store/Repairs'
import { Clients } from './pages/store/Clients'
import { Providers } from './pages/store/Providers'
import { ProtectedRoute } from './router/ProtectedRoute'

// Un solo árbol de rutas: en un subdominio de local, solo esas rutas de
// local tienen sentido (el tenant queda fijado por el subdominio). En el
// dominio raíz conviven el panel del Super Admin y, si hay una sesión de
// dueño activa, también su panel de local (ver TenantContext).
export default function App() {
  const { notFound } = useTenant()

  if (notFound) {
    return <TenantNotFound />
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/superadmin"
        element={
          <ProtectedRoute requireSuperAdmin>
            <StoresDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        element={
          <ProtectedRoute requireStoreOwner>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/ventas" element={<Sales />} />
        <Route path="/reparaciones" element={<Repairs />} />
        <Route path="/clientes" element={<Clients />} />
        <Route path="/proveedores" element={<Providers />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
