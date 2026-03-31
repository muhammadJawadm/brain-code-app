// Subscriptions.jsx
import React from 'react';
import { IndianRupee, RotateCcw, Activity } from 'lucide-react';

export default function Subscriptions() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Subscription Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 font-medium text-sm">Active Subscribers</h3>
            <p className="text-3xl font-bold mt-2">8,542</p>
          </div>
          <div className="p-3 bg-green-100 rounded-full text-green-600">
            <Activity className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 font-medium text-sm">Monthly Revenue</h3>
            <p className="text-3xl font-bold mt-2">$242,500</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            <IndianRupee className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 font-medium text-sm">Trials Converting</h3>
            <p className="text-3xl font-bold mt-2">68%</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-full text-purple-600">
            <RotateCcw className="h-6 w-6" />
          </div>
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
