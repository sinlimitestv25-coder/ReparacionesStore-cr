import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTenant } from '../context/TenantContext'

export function ProtectedRoute({ children, requireSuperAdmin = false, requireStoreOwner = false }) {
  const { currentUser } = useAuth()
  const { store: tenantStore } = useTenant()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  if (requireSuperAdmin && currentUser.role !== 'super_admin') {
    return <Navigate to="/login" replace />
  }

  if (requireStoreOwner && (currentUser.role !== 'owner' || currentUser.storeId !== tenantStore?.id)) {
    return <Navigate to="/login" replace />
  }

  return children
}
