import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Bell, Search, ChevronDown, Menu } from "lucide-react"
import { useAuth } from "../context/AuthContext"

const PAGE_INFO = {
  "/dashboard":    { title: "Dashboard",           sub: "Welcome back" },
  "/users":        { title: "User Management",     sub: "Manage accounts and access" },
  "/companies":    { title: "Company Management",  sub: "Manage B2B companies, departments and employees" },
  "/content":      { title: "Content Management",  sub: "Manage audio, video and text lessons" },
  "/subscriptions":{ title: "Subscriptions",       sub: "Track revenue and active trials" },
  "/notifications":{ title: "Push Notifications",  sub: "Engage your user base" },
  "/settings":     { title: "Settings",            sub: "Platform and privacy configuration" },
}

const NOTIFS = [
  { id: 1, dot: "bg-amber-400", text: "New user signed up",       time: "2m ago" },
  { id: 2, dot: "bg-blue-400",  text: "System updated successfully",        time: "15m ago" },
]

export default function Header({ onMenuClick }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const page =
    PAGE_INFO[pathname] ||
    (pathname.startsWith("/companies/")
      ? { title: "Company Detail", sub: "Company-level management and analytics" }
      : { title: "Admin", sub: "" })
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  // Fallback to "User" if no authentication user is found somehow
  const currentUsername = user?.username || "Guest";
  const currentUserRole = user?.role || "Guest";
  const userInitials = currentUsername.charAt(0).toUpperCase();

  return (
    <div className="sticky top-0 z-10">
      <header
        className="h-16 flex items-center justify-between px-3 sm:px-6 gap-3 bg-white border-b border-gray-200"
      >
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-[#C4963D] transition-all shrink-0 border border-gray-200"
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>

        {/* Page title */}
        <div className="flex flex-col leading-tight flex-1 min-w-0">
          <h1 className="text-[17px] font-bold text-gray-900">{page.title}</h1>
          <span className="hidden sm:block text-xs text-gray-500">{page.sub} {user ? `- ${currentUsername}` : ''}</span>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Search icon – mobile only */}
          <button
            onClick={() => setSearchOpen(s => !s)}
            className={`sm:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-all shrink-0 border ${
              searchOpen
                ? "bg-[#C4963D] text-white border-[#C4963D]"
                : "text-gray-500 hover:bg-gray-100 hover:text-[#C4963D] bg-white border-gray-200"
            }`}
            aria-label="Search"
          >
            <Search size={16} />
          </button>

          {/* Search bar – sm and above */}
          <div
            className="hidden sm:flex items-center gap-2 rounded-lg px-3 py-2 w-[160px] md:w-[220px] focus-within:border-[#C4963D] focus-within:ring-2 focus-within:ring-[#C4963D]/20 transition-all bg-gray-50 border border-gray-200"
          >
            <Search size={14} className="text-gray-500 shrink-0" />
            <input
              type="text"
              placeholder="Search users, listings..."
              className="bg-transparent border-none outline-none text-gray-900 text-[13px] w-full placeholder:text-gray-400"
            />
          </div>

          {/* Bell */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="relative flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-[#C4963D] hover:border-[#C4963D] transition-all bg-gray-50 border border-gray-200"
            >
              <Bell size={17} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                4
              </span>
            </button>

            {open && (
              <div
                className="absolute top-[calc(100%+10px)] -right-12 w-72 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] overflow-hidden z-50 bg-white border border-gray-200"
              >
                <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
                  <span className="text-[13px] font-bold text-gray-900">Notifications</span>
                  <span className="text-[11px] font-semibold bg-[#C4963D]/10 text-[#C4963D] px-2 py-0.5 rounded-full">4 new</span>
                </div>
                {NOTIFS.map(n => (
                  <div
                    key={n.id}
                    className="flex items-start gap-2.5 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100"
                  >
                    <div className={`w-2 h-2 min-w-[8px] rounded-full mt-1 ${n.dot}`} />
                    <div>
                      <p className="text-[12.5px] text-gray-700 leading-snug">{n.text}</p>
                      <span className="text-[11px] text-gray-500">{n.time}</span>
                    </div>
                  </div>
                ))}
                <div
                  className="px-4 py-2.5 text-center text-[12px] font-semibold text-[#C4963D] hover:text-[#C4963D]/80 cursor-pointer bg-gray-50 border-t border-gray-100"
                >
                  View all notifications
                </div>
              </div>
            )}
          </div>

          {/* Admin profile */}
          <div className="relative">
            <div
              onClick={() => setProfileOpen(p => !p)}
              className={`flex items-center gap-2.5 rounded-xl pl-1.5 pr-2 sm:pr-3 py-1.5 cursor-pointer transition-all border ${
                profileOpen ? "border-[#C4963D] bg-gray-50" : "border-gray-200 bg-white hover:border-[#C4963D] hover:bg-gray-50"
              }`}
            >
              <div className="w-7 h-7 bg-[#C4963D] rounded-lg flex items-center justify-center text-[13px] font-bold text-white shrink-0 uppercase">
                {userInitials}
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-[13px] font-semibold text-gray-900">{currentUsername}</span>
                <span className="text-[10px] text-gray-500">{currentUserRole}</span>
              </div>
              <ChevronDown size={13} className={`hidden sm:block text-gray-500 ml-1 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
            </div>

            {profileOpen && (
              <div
                className="absolute top-[calc(100%+10px)] right-0 w-72 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] overflow-hidden z-50 bg-white border border-gray-200"
              >
                {/* Profile header */}
                <div className="px-4 py-4 flex items-center gap-3 border-b border-gray-100">
                  <div className="w-12 h-12 bg-[#C4963D] rounded-xl flex items-center justify-center text-lg font-bold text-white shrink-0 uppercase">
                    {userInitials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-gray-900 truncate w-40">{currentUsername}</span>
                    <span className="text-[12px] text-gray-500 truncate w-40">{currentUsername.toLowerCase().replace(' ', '.')}@properly.com</span>
                    <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold bg-[#C4963D]/15 text-[#C4963D] px-2 py-0.5 rounded-full w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C4963D] inline-block" />
                      {currentUserRole}
                    </span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
                  {[
                    { label: "Role", value: currentUserRole },
                    { label: "Status", value: "Active" },
                    { label: "Since", value: "2026" },
                  ].map(s => (
                    <div key={s.label} className="flex flex-col items-center py-3">
                      <span className="text-[13px] font-semibold text-gray-900">{s.value}</span>
                      <span className="text-[10px] text-gray-500">{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Menu items */}
                {[
                  { icon: "👤", label: "My Profile" },
                  { icon: "⚙️", label: "Account Settings" },
                  { icon: "🔒", label: "Change Password" },
                  { icon: "📋", label: "Activity Log" },
                ].map(item => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100"
                  >
                    <span className="text-[15px]">{item.icon}</span>
                    <span className="text-[13px] text-gray-700">{item.label}</span>
                  </div>
                ))}

                {/* Sign out */}
                <div
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 cursor-pointer transition-colors"
                  onClick={handleLogout}
                >
                  <span className="text-[15px]">🚪</span>
                  <span className="text-[13px] text-red-500 font-semibold">Sign Out</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile search bar — slides in below header */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          searchOpen ? "max-h-16 opacity-100 border-b border-gray-200" : "max-h-0 opacity-0"
        } bg-white`}
      >
        <div className="px-3 py-2.5">
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2 w-full focus-within:border-[#C4963D] focus-within:ring-2 focus-within:ring-[#C4963D]/20 transition-all bg-gray-50 border border-gray-200"
          >
            <Search size={14} className="text-gray-500 shrink-0" />
            <input
              type="text"
              placeholder="Search users, listings..."
              autoFocus={searchOpen}
              className="bg-transparent border-none outline-none text-gray-900 text-[13px] w-full placeholder:text-gray-400"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors shrink-0 text-xs font-semibold"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
