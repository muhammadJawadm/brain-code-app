import { useEffect, useMemo, useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Activity, Bot, Clock, Code, PlayCircle, TrendingUp, UserX, Users } from "lucide-react"
import { getUsers } from "../data/userStore"

const topAudioCatalog = [
  { title: "Morning Meditation", plays: 12500 },
  { title: "Deep Focus Flow", plays: 11850 },
  { title: "Sleep Reset", plays: 10400 },
  { title: "Anxiety Relief Breath", plays: 9800 },
  { title: "Alpha Waves", plays: 9200 },
  { title: "Confidence Primer", plays: 8100 },
  { title: "Evening Wind Down", plays: 7600 },
  { title: "Workday Clarity", plays: 7200 },
  { title: "Body Scan Lite", plays: 6750 },
  { title: "Energy Boost", plays: 6210 },
]

const trendsByRange = {
  Daily: [
    { label: "Mon", listeningMinutes: 1880, aiConversations: 118 },
    { label: "Tue", listeningMinutes: 2012, aiConversations: 124 },
    { label: "Wed", listeningMinutes: 1974, aiConversations: 132 },
    { label: "Thu", listeningMinutes: 2140, aiConversations: 141 },
    { label: "Fri", listeningMinutes: 2290, aiConversations: 156 },
    { label: "Sat", listeningMinutes: 1650, aiConversations: 101 },
    { label: "Sun", listeningMinutes: 1725, aiConversations: 108 },
  ],
  Weekly: [
    { label: "W1", listeningMinutes: 12100, aiConversations: 760 },
    { label: "W2", listeningMinutes: 12980, aiConversations: 820 },
    { label: "W3", listeningMinutes: 13440, aiConversations: 874 },
    { label: "W4", listeningMinutes: 14190, aiConversations: 933 },
  ],
  Monthly: [
    { label: "Jan", listeningMinutes: 49200, aiConversations: 2860 },
    { label: "Feb", listeningMinutes: 51400, aiConversations: 3020 },
    { label: "Mar", listeningMinutes: 54150, aiConversations: 3280 },
    { label: "Apr", listeningMinutes: 55920, aiConversations: 3460 },
    { label: "May", listeningMinutes: 57210, aiConversations: 3590 },
    { label: "Jun", listeningMinutes: 59080, aiConversations: 3740 },
  ],
  Yearly: [
    { label: "2023", listeningMinutes: 512000, aiConversations: 29400 },
    { label: "2024", listeningMinutes: 601500, aiConversations: 35820 },
    { label: "2025", listeningMinutes: 689200, aiConversations: 42100 },
    { label: "2026", listeningMinutes: 741600, aiConversations: 45800 },
  ],
}

export default function Analytics() {
  const [users, setUsers] = useState([])
  const [range, setRange] = useState("Monthly")
  const [topCount, setTopCount] = useState(5)
  const [measurementId, setMeasurementId] = useState("G-XXXXXXXXXX")

  useEffect(() => {
    setUsers(getUsers())
  }, [])

  const totalActiveUsers = useMemo(() => users.filter((item) => item.status === "Active").length, [users])
  const totalDailyListening = useMemo(() => users.reduce((sum, item) => sum + (item.dailyListeningMinutes || 0), 0), [users])
  const totalDailyAiConversations = useMemo(() => users.reduce((sum, item) => sum + (item.aiConversationsToday || 0), 0), [users])
  const inactiveUsers = useMemo(() => users.filter((item) => (item.inactiveDays || 0) >= 7), [users])
  const topAudios = useMemo(() => topAudioCatalog.slice(0, topCount), [topCount])
  const trendData = trendsByRange[range]

  const gaSnippet = useMemo(
    () => `<!-- Google tag (gtag.js) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', '${measurementId}', { send_page_view: true });\n</script>`,
    [measurementId]
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-3 flex-wrap">
        <h1 className="text-2xl font-semibold text-gray-900">App Analytics & Statistics</h1>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-md p-1">
          {Object.keys(trendsByRange).map((label) => (
            <button
              key={label}
              onClick={() => setRange(label)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium ${
                range === label ? "bg-[#C4963D] text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center text-sm font-medium text-gray-500 mb-2">
            <Users className="h-4 w-4 mr-2 text-blue-500" /> Total Active Users
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalActiveUsers}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center text-sm font-medium text-gray-500 mb-2">
            <Clock className="h-4 w-4 mr-2 text-emerald-500" /> Total Listening / Day
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalDailyListening} min</div>
          <div className="text-xs text-gray-500 mt-1">Across all users combined</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center text-sm font-medium text-gray-500 mb-2">
            <Bot className="h-4 w-4 mr-2 text-violet-500" /> AI Conversations / Day
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalDailyAiConversations}</div>
          <div className="text-xs text-gray-500 mt-1">Your Pocket Mentor usage</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center text-sm font-medium text-gray-500 mb-2">
            <UserX className="h-4 w-4 mr-2 text-rose-500" /> Inactive Users
          </div>
          <div className="text-2xl font-bold text-gray-900">{inactiveUsers.length}</div>
          <div className="text-xs text-gray-500 mt-1">No activity in 7+ days</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Listening Time Trend ({range})</h2>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="listeningGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C4963D" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#C4963D" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="listeningMinutes" stroke="#C4963D" fill="url(#listeningGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-4">AI Conversations Trend ({range})</h2>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="aiConversations" fill="#7C3AED" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Most Played Audios</h2>
            <select
              value={topCount}
              onChange={(event) => setTopCount(Number(event.target.value))}
              className="border rounded-md px-2 py-1 text-sm bg-gray-50"
            >
              <option value={5}>Top 5</option>
              <option value={10}>Top 10</option>
            </select>
          </div>
          <div className="space-y-3">
            {topAudios.map((audio, index) => (
              <div key={audio.title} className="flex items-center justify-between border-b last:border-b-0 pb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-md">
                    <PlayCircle className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{audio.title}</p>
                    <p className="text-xs text-gray-500">{audio.plays.toLocaleString()} plays</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-gray-500">#{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Inactive Users</h2>
          <div className="space-y-2 max-h-72 overflow-auto pr-1">
            {inactiveUsers.map((user) => (
              <div key={user.id} className="p-3 rounded-lg border border-gray-100 bg-gray-50/60">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{user.companyName} • {user.department}</p>
                  </div>
                  <span className="text-xs font-semibold text-rose-600">{user.inactiveDays} days inactive</span>
                </div>
              </div>
            ))}
            {inactiveUsers.length === 0 && <p className="text-sm text-gray-500">No inactive users detected for the selected threshold.</p>}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <Code className="w-5 h-5 text-slate-700" />
          Google Analytics SDK Integration
        </h2>
        <p className="text-sm text-gray-600 mb-3">
          Add your GA4 Measurement ID below and use this snippet in the web app entry point to track page views and events.
        </p>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <label className="text-sm text-gray-700">Measurement ID</label>
          <input
            type="text"
            value={measurementId}
            onChange={(event) => setMeasurementId(event.target.value)}
            className="border rounded-md px-3 py-1.5 text-sm min-w-[220px]"
          />
        </div>
        <pre className="text-xs bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
{gaSnippet}
        </pre>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-medium text-gray-900 mb-4">User Funnel</h2>
        <div className="flex flex-col md:flex-row justify-between items-center text-center space-y-4 md:space-y-0 relative">
          <div className="w-full md:w-1/3 p-4">
            <div className="text-2xl font-bold text-gray-900">50,000</div>
            <div className="text-sm text-gray-500 uppercase tracking-wide">Installs</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 absolute left-1/3 -ml-4 z-10">&rarr;</div>
          <div className="w-full md:w-1/3 p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">22,000</div>
            <div className="text-sm text-gray-500 uppercase tracking-wide">Sign-ups (44%)</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 absolute left-2/3 -ml-4 z-10">&rarr;</div>
          <div className="w-full md:w-1/3 p-4 bg-[#C4963D]/10 rounded-lg border border-[#C4963D]/20">
            <div className="text-2xl font-bold text-[#C4963D]">4,070</div>
            <div className="text-sm text-[#C4963D] uppercase tracking-wide">Subscriptions (18.5%)</div>
          </div>
        </div>
      </div>
    </div>
  )
}
