import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, PauseCircle, Ban } from 'lucide-react';

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">User & Account Management</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50/50">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search users by name or email..." 
              className="pl-9 pr-4 py-2 border rounded-md w-64 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center space-x-2 text-sm text-gray-600 border px-3 py-2 rounded-md hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-6 py-3 font-medium">User Details</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Subscription</th>
                <th className="px-6 py-3 font-medium">Date Joined</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50/50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">John Doe</div>
                  <div className="text-gray-500">john@example.com</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
                </td>
                <td className="px-6 py-4">Premium</td>
                <td className="px-6 py-4">Mar 25, 2026</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-4">
                    <button className="flex items-center space-x-1 text-yellow-500 hover:text-yellow-600 transition-colors" title="Warn User">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm font-medium">Warn</span>
                    </button>
                    <button className="flex items-center space-x-1 text-orange-500 hover:text-orange-600 transition-colors" title="Suspend User">
                      <PauseCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Suspend</span>
                    </button>
                    <button className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors" title="Ban User">
                      <Ban className="h-4 w-4" />
                      <span className="text-sm font-medium">Ban</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}