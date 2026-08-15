import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { TenantProvider } from './context/TenantContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TenantProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </TenantProvider>
    </BrowserRouter>
  </StrictMode>
)
