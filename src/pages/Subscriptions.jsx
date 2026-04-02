// Subscriptions.jsx
import React, { useMemo, useState } from 'react';
import { IndianRupee, RotateCcw, Activity, TrendingUp, Users, CalendarRange } from 'lucide-react';

export default function Subscriptions() {
  const [timeframe, setTimeframe] = useState('month');

  const insightsByTimeframe = {
    day: {
      label: 'Daily Insights',
      revenue: '$8,420',
      activeSubscribers: '8,542',
      conversionRate: '5.4%',
      churnRate: '0.4%',
      series: [
        { label: 'Mon', revenue: 6300, active: 8350 },
        { label: 'Tue', revenue: 7100, active: 8380 },
        { label: 'Wed', revenue: 7750, active: 8410 },
        { label: 'Thu', revenue: 6980, active: 8420 },
        { label: 'Fri', revenue: 8420, active: 8542 },
      ],
    },
    week: {
      label: 'Weekly Insights',
      revenue: '$54,860',
      activeSubscribers: '8,542',
      conversionRate: '18.2%',
      churnRate: '1.2%',
      series: [
        { label: 'W1', revenue: 49200, active: 8120 },
        { label: 'W2', revenue: 50600, active: 8210 },
        { label: 'W3', revenue: 53700, active: 8360 },
        { label: 'W4', revenue: 54860, active: 8542 },
      ],
    },
    month: {
      label: 'Monthly Insights',
      revenue: '$242,500',
      activeSubscribers: '8,542',
      conversionRate: '68%',
      churnRate: '3.6%',
      series: [
        { label: 'Jan', revenue: 201000, active: 7410 },
        { label: 'Feb', revenue: 214400, active: 7810 },
        { label: 'Mar', revenue: 228300, active: 8245 },
        { label: 'Apr', revenue: 242500, active: 8542 },
      ],
    },
    year: {
      label: 'Yearly Insights',
      revenue: '$2,740,000',
      activeSubscribers: '8,542',
      conversionRate: '71.1%',
      churnRate: '7.9%',
      series: [
        { label: '2023', revenue: 1710000, active: 5100 },
        { label: '2024', revenue: 2050000, active: 6380 },
        { label: '2025', revenue: 2410000, active: 7730 },
        { label: '2026', revenue: 2740000, active: 8542 },
      ],
    },
  };

  const selectedInsights = useMemo(() => insightsByTimeframe[timeframe], [timeframe]);
  const maxRevenue = useMemo(() => Math.max(...selectedInsights.series.map((item) => item.revenue)), [selectedInsights]);
  const maxActive = useMemo(() => Math.max(...selectedInsights.series.map((item) => item.active)), [selectedInsights]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Subscription Management</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Revenue and Subscriber Insights</h2>
            <p className="text-sm text-gray-500">Track performance per day, week, month, and year.</p>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-1">
            {['day', 'week', 'month', 'year'].map((item) => (
              <button
                key={item}
                onClick={() => setTimeframe(item)}
                className={`px-3 py-1.5 text-sm rounded-md font-medium transition-all ${
                  timeframe === item ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 font-medium text-sm">{selectedInsights.label}</h3>
            <p className="text-3xl font-bold mt-2">{selectedInsights.activeSubscribers}</p>
            <p className="text-xs text-gray-500 mt-1">Active subscribers</p>
          </div>
          <div className="p-3 bg-green-100 rounded-full text-green-600">
            <Activity className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 font-medium text-sm">Revenue</h3>
            <p className="text-3xl font-bold mt-2">{selectedInsights.revenue}</p>
            <p className="text-xs text-gray-500 mt-1">For selected timeframe</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            <IndianRupee className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 font-medium text-sm">Trials Converting</h3>
            <p className="text-3xl font-bold mt-2">{selectedInsights.conversionRate}</p>
            <p className="text-xs text-gray-500 mt-1">Churn: {selectedInsights.churnRate}</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-full text-purple-600">
            <RotateCcw className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Revenue Trend</h2>
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <div className="space-y-3">
            {selectedInsights.series.map((point) => (
              <div key={`rev-${point.label}`}>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{point.label}</span>
                  <span>${point.revenue.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${(point.revenue / maxRevenue) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Active Subscriber Trend</h2>
            <Users className="h-5 w-5 text-green-600" />
          </div>
          <div className="space-y-3">
            {selectedInsights.series.map((point) => (
              <div key={`active-${point.label}`}>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{point.label}</span>
                  <span>{point.active.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${(point.active / maxActive) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Timeframe Breakdown</h2>
          <div className="flex items-center text-xs text-gray-500 gap-1">
            <CalendarRange className="h-4 w-4" />
            Based on {timeframe} view
          </div>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 min-w-[640px]">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3 font-medium">Period</th>
                <th className="px-4 py-3 font-medium">Revenue</th>
                <th className="px-4 py-3 font-medium">Active Subs</th>
                <th className="px-4 py-3 font-medium">Avg Revenue/Sub</th>
                <th className="px-4 py-3 font-medium">Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {selectedInsights.series.map((point) => {
                const revPerSub = Math.round(point.revenue / point.active);
                const health = revPerSub > 25 ? 'Strong' : revPerSub > 18 ? 'Stable' : 'Watch';
                const healthClass = health === 'Strong' ? 'bg-green-100 text-green-700' : health === 'Stable' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';

                return (
                  <tr key={`table-${point.label}`} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{point.label}</td>
                    <td className="px-4 py-3">${point.revenue.toLocaleString()}</td>
                    <td className="px-4 py-3">{point.active.toLocaleString()}</td>
                    <td className="px-4 py-3">${revPerSub}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${healthClass}`}>{health}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mt-8">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
        </div>
        <div className="p-4">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-6 py-3 font-medium">User</th>
                <th className="px-6 py-3 font-medium">Plan</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Sarah Jenkins</td>
                <td className="px-6 py-4 text-blue-600">Yearly Premium</td>
                <td className="px-6 py-4"><span className="px-2 py-1 rounded bg-green-100 text-green-800 text-xs">Active</span></td>
                <td className="px-6 py-4">March 30, 2026</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="text-sm text-blue-600">Adjust</button>
                  <button className="text-sm text-red-600">Cancel</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
