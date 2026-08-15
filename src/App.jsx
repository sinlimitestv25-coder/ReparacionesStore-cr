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

// Dos "modos" completamente separados según el dominio con el que se entra:
// - Dominio raíz (reparacionestore.com): panel del Super Admin.
// - Subdominio de un local (centro.reparacionestore.com): gestión de ese local.
export default function App() {
  const { isRootDomain, notFound } = useTenant()

  if (notFound) {
    return <TenantNotFound />
  }

  if (isRootDomain) {
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
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
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
