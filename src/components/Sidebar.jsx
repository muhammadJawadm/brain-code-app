import { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  LayoutDashboard, ShieldCheck, Gavel, CreditCard,
  Building2, BarChart3, FileWarning, ChevronLeft,
  ChevronRight, LogOut, Settings, X, Bell, Users, FileVideo, Music
} from "lucide-react"
import logo from "../assets/Logo.png"
import { useAuth } from "../context/AuthContext"

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard", roles: ['Admin'] },
  { icon: Users, label: "User Management", path: "/users", roles: ['Admin', 'Support'] },
  { icon: FileVideo, label: "Content", path: "/content", roles: ['Admin', 'Editor'] },
  { icon: BarChart3, label: "Analytics", path: "/analytics", roles: ['Admin'] },
  { icon: ShieldCheck, label: "Privacy & Data", path: "/privacy", roles: ['Admin'] },
  { icon: CreditCard, label: "Subscriptions", path: "/subscriptions", roles: ['Admin'] },
  { icon: Bell, label: "Notifications", path: "/notifications", roles: ['Admin'] },
]

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  const itemCls = (active) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all no-underline w-full border ${active
      ? "bg-[#C4963D] text-white font-semibold border-[#C4963D]"
      : "text-gray-600 hover:bg-[#C4963D]/10 hover:text-[#C4963D] border-transparent"
    }`

  const visibleNav = NAV.filter(item => !user || item.roles.includes(user.role))

  return (
    <>
      {/* ── Mobile overlay backdrop ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen flex flex-col z-50 overflow-hidden bg-white border-r border-gray-200
          transition-[width,transform] duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
        style={{
          /* On mobile/tablet: full drawer width; on desktop (lg+): respect collapsed */
          width: collapsed ? 72 : 260,
        }}
      >
        {/* Logo row */}
        <div
          className="flex items-center gap-3 px-4 py-5 min-h-[72px] relative border-b border-gray-200"
        >
          <div className="w-12 h-12 min-w-[36px] rounded-xl flex items-center justify-center text-lg font-black shadow-sm bg-gray-50 border border-gray-100">
            <img src={logo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight overflow-hidden whitespace-nowrap">
              <span className="text-base font-bold text-gray-900">Brain Code</span>
              <span className="text-[10px] font-semibold text-[#C4963D] tracking-[1.5px] uppercase">Admin</span>
            </div>
          )}

          {/* Desktop collapse toggle (commented out as in original) */}
          {/* <button
            onClick={() => setCollapsed(!collapsed)}
            className={`hidden md:flex items-center justify-center w-6 h-6 rounded-md text-gray-400 hover:text-[#C4963D] transition-all ${collapsed ? "mx-auto" : "absolute right-3 top-1/2 -translate-y-1/2"
              }`}
            className="bg-gray-50 border border-gray-200"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button> */}

          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-md text-gray-400 hover:text-[#C4963D] transition-all bg-gray-50 border border-gray-200"
            title="Close sidebar"
          >
            <X size={14} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-2.5 py-4 flex flex-col gap-0.5 overflow-y-auto overflow-x-hidden">
          {!collapsed && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 pb-2.5">
              Main Menu
            </span>
          )}
          {visibleNav.map(({ icon: Icon, label, path }) => {
            const active = pathname === path || (path !== "/dashboard" && pathname.startsWith(path))
            return (
              <Link key={path} to={path} className={itemCls(active)} title={collapsed ? label : ""}>
                <Icon size={18} className={`shrink-0 ${active ? "text-white" : ""}`} />
                {!collapsed && <span className="truncate">{label}</span>}
                {active && !collapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="px-2.5 pb-4">
          {!collapsed && <div className="h-px mb-3 bg-gray-200" />}
          {user?.role === 'Admin' && (
            <Link
              to="/settings"
              className={itemCls(pathname === "/settings")}
              title={collapsed ? "Settings" : ""}
            >
              <Settings size={18} className="shrink-0" />
              {!collapsed && <span>Settings</span>}
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all cursor-pointer w-full mt-0.5"
            title={collapsed ? "Logout" : ""}
          >
            <LogOut size={18} className="shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
