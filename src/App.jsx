import { Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { StoresDashboard } from './pages/superadmin/StoresDashboard'
import { AppLayout } from './components/layout/AppLayout'
import { Dashboard } from './pages/store/Dashboard'
import { Stock } from './pages/store/Stock'
import { Sales } from './pages/store/Sales'
import { Repairs } from './pages/store/Repairs'
import { Clients } from './pages/store/Clients'
import { Providers } from './pages/store/Providers'
import { ProtectedRoute } from './router/ProtectedRoute'

export default function App() {
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
        path="/tienda/:storeId"
        element={
          <ProtectedRoute requireStore>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="stock" element={<Stock />} />
        <Route path="ventas" element={<Sales />} />
        <Route path="reparaciones" element={<Repairs />} />
        <Route path="clientes" element={<Clients />} />
        <Route path="proveedores" element={<Providers />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
