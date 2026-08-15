import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute({ children, requireStore = false, requireSuperAdmin = false }) {
  const { currentUser, isSuperAdmin, activeStoreId } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  if (requireSuperAdmin && !isSuperAdmin) {
    return <Navigate to={activeStoreId ? `/tienda/${activeStoreId}/dashboard` : '/login'} replace />
  }

  if (requireStore && !activeStoreId) {
    return <Navigate to={isSuperAdmin ? '/superadmin' : '/login'} replace />
  }

  return children
}
