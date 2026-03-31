import React, { useState } from 'react';
import { Shield, FileText, Lock, Database, UserX } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Privacy & Data Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Consent Tracking */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-lg font-medium text-gray-900">User Consent</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">Track user agreements to terms of use and analytics collection.</p>
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Terms Accepted</span>
              <span className="font-medium text-gray-900">100%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Analytics Consent</span>
              <span className="font-medium text-gray-900">85%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Opted Out (Analytics)</span>
              <span className="font-medium text-gray-900">15%</span>
            </div>
          </div>
        </div>

        {/* Data Security */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-lg font-medium text-gray-900">Data Security</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">Overview of storage compliance and login security measures.</p>
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Secure AI Chats</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Compliant</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Encryption (At Rest)</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Active</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Login Security</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Enforced</span>
            </div>
          </div>
        </div>

        {/* User Right to Delete */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <UserX className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-lg font-medium text-gray-900">Data Deletion</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">Manage requests from users to export or permanently delete their data.</p>
          <div className="space-y-3 pt-4 border-t border-gray-100">
             <div className="flex justify-between text-sm">
              <span className="text-gray-500">Requests Pending</span>
              <span className="font-medium text-gray-900">3</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Processed (30 days)</span>
              <span className="font-medium text-gray-900">42</span>
            </div>
            <button className="w-full mt-2 text-sm text-[#C4963D] hover:text-[#C4963D]/80 font-medium bg-[#C4963D]/10 rounded-md py-2 transition-colors">
              Review Requests
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mt-6">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Recent Privacy & Consent Logs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-6 py-3 font-medium">User ID</th>
                <th className="px-6 py-3 font-medium">Event Type</th>
                <th className="px-6 py-3 font-medium">Details</th>
                <th className="px-6 py-3 font-medium">Timestamp</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50/50">
                <td className="px-6 py-4">usr_94b2x2e</td>
                <td className="px-6 py-4">Updated Consent</td>
                <td className="px-6 py-4">Revoked Analytics Opt-in</td>
                <td className="px-6 py-4">Mar 31, 2026, 14:32</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Processed</span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="px-6 py-4">usr_a8c9p1z</td>
                <td className="px-6 py-4">Account Deletion Request</td>
                <td className="px-6 py-4">Requested permanent deletion</td>
                <td className="px-6 py-4">Mar 30, 2026, 09:15</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="px-6 py-4">usr_12y8d9q</td>
                <td className="px-6 py-4">Terms Accepted</td>
                <td className="px-6 py-4">V2.1 Terms of Service & Privacy</td>
                <td className="px-6 py-4">Mar 30, 2026, 08:44</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Logged</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}