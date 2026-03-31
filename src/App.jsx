import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"

import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Content from './pages/Content'
import Analytics from './pages/Analytics'
import Privacy from './pages/Privacy'
import Subscriptions from './pages/Subscriptions'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'
import Login from './pages/Login'

function AdminLayout({ children }) {
  // collapsed only matters on desktop (md+); on mobile sidebar is hidden via transform
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Auto-respond to window resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false) // close drawer when going to desktop (lg+)
      }
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-gray-50">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      {/* On mobile: no left margin (sidebar overlays); on desktop: push content right by sidebar width */}
      <div
        className="flex flex-col flex-1 min-h-screen min-w-0 transition-all duration-300 lg:ml-[var(--sidebar-w)]"
        style={{ "--sidebar-w": collapsed ? "72px" : "260px" }}
      >
        <Header onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}

import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route element={<AdminLayout><Outlet /></AdminLayout>}>
            <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['Admin']} component={Dashboard} />} />
            <Route path="/users" element={<ProtectedRoute allowedRoles={['Admin', 'Support']} component={Users} />} />
            <Route path="/content" element={<ProtectedRoute allowedRoles={['Admin', 'Editor']} component={Content} />} />
            <Route path="/analytics" element={<ProtectedRoute allowedRoles={['Admin']} component={Analytics} />} />
            <Route path="/privacy" element={<ProtectedRoute allowedRoles={['Admin']} component={Privacy} />} />
            <Route path="/subscriptions" element={<ProtectedRoute allowedRoles={['Admin']} component={Subscriptions} />} />
            <Route path="/notifications" element={<ProtectedRoute allowedRoles={['Admin']} component={Notifications} />} />
            <Route path="/settings" element={<ProtectedRoute allowedRoles={['Admin']} component={Settings} />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

