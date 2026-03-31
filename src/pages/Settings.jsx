// Settings.jsx
import React from 'react';
import { Shield, Database, UploadCloud } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">App Settings & Data Privacy</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="bg-indigo-100 p-4 rounded-full text-indigo-600 mb-4">
            <UploadCloud className="h-8 w-8" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Passion.io Migration</h2>
          <p className="text-gray-500 text-sm mt-2 mb-4">Migrate users, accounts, listening history, and content from Passion.io.</p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 w-full mt-auto">
            Start Migration Tool
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="bg-emerald-100 p-4 rounded-full text-emerald-600 mb-4">
            <Shield className="h-8 w-8" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Privacy & Terms</h2>
          <p className="text-gray-500 text-sm mt-2 mb-4">Update terms of use, privacy policies, GDPR/CCPA settings, and consent tracking.</p>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 w-full mt-auto">
            Manage Legal Docs
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="bg-blue-100 p-4 rounded-full text-blue-600 mb-4">
            <Database className="h-8 w-8" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Data Management</h2>
          <p className="text-gray-500 text-sm mt-2 mb-4">Handle GDPR data deletion requests, AI chat logs, and user retention limits.</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full mt-auto">
            View Requests
          </button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mt-8">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-4 mb-4">General Preferences</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2">
            <div>
               <h4 className="font-medium text-gray-900">Auto-update New Content</h4>
               <p className="text-sm text-gray-500">New content uploads sync directly to users without App Store updates.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked={true} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex justify-between items-center py-2 border-t">
            <div>
               <h4 className="font-medium text-gray-900">Analytics Collection</h4>
               <p className="text-sm text-gray-500">Collect anonymous user analytics automatically.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked={true} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
