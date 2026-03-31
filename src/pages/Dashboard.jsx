// Dashboard.jsx
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';
import { Users, Activity, PlayCircle, TrendingUp } from 'lucide-react';

const activityData = [
  { name: 'Jan', users: 4000, sessions: 2400 },
  { name: 'Feb', users: 3000, sessions: 1398 },
  { name: 'Mar', users: 2000, sessions: 9800 },
  { name: 'Apr', users: 2780, sessions: 3908 },
  { name: 'May', users: 1890, sessions: 4800 },
  { name: 'Jun', users: 2390, sessions: 3800 },
  { name: 'Jul', users: 3490, sessions: 4300 },
];

const funnelData = [
  { name: 'Installs', count: 50000 },
  { name: 'Sign Ups', count: 35000 },
  { name: 'Subscribers', count: 8500 },
];

const PIE_COLORS = ['#C4963D', '#3B82F6', '#10B981', '#F59E0B'];
const topSessionsData = [
  { name: 'Deep Focus Beta', value: 12500 },
  { name: 'Morning Energy', value: 9200 },
  { name: 'Sleep Recovery', value: 8100 },
  { name: 'Alpha Waves', value: 5500 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard & Analytics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Active Users</h3>
            <p className="text-2xl font-bold mt-1">12,450</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-full">
            <Users className="h-6 w-6 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Day 1 Retention</h3>
            <p className="text-2xl font-bold mt-1">42%</p>
          </div>
          <div className="bg-green-50 p-3 rounded-full">
            <Activity className="h-6 w-6 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm font-medium">App Subscriptions</h3>
            <p className="text-2xl font-bold mt-1">8,500</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-full">
            <TrendingUp className="h-6 w-6 text-purple-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Content Plays</h3>
            <p className="text-2xl font-bold mt-1">145k</p>
          </div>
          <div className="bg-orange-50 p-3 rounded-full">
            <PlayCircle className="h-6 w-6 text-orange-500" />
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-6">User Engagement Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C4963D" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C4963D" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Area type="monotone" dataKey="users" name="Active Users" stroke="#C4963D" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
                <Area type="monotone" dataKey="sessions" name="Sessions Played" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorSessions)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-6">Most Listened Sessions</h3>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topSessionsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {topSessionsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} plays`, 'Plays']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-6">User Funnel Metrics</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#4B5563', fontSize: 13, fontWeight: 500}} width={90} />
                <Tooltip 
                  cursor={{fill: '#F3F4F6'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" name="Users" fill="#C4963D" radius={[0, 4, 4, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-4">Retention Breakdown</h3>
          <div className="space-y-6 mt-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700 font-medium">Day 1</span>
                <span className="font-bold text-gray-900">42%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-[#C4963D] h-2.5 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700 font-medium">Day 7</span>
                <span className="font-bold text-gray-900">28%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-[#3B82F6] h-2.5 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700 font-medium">Day 30</span>
                <span className="font-bold text-gray-900">15%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-[#10B981] h-2.5 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 leading-relaxed pt-2 border-t border-gray-100">
              Retention rate tracking reflects how often users return to the platform after their initial sign-up, showcasing content effectiveness and user loyalty.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
