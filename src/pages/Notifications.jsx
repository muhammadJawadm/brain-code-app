// Notifications.jsx
import React, { useState } from 'react';
import { Send, Clock, Users } from 'lucide-react';

export default function Notifications() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Push Notifications</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Send New Notification</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
              <select className="w-full border p-2 rounded-md bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500">
                <option>All Users</option>
                <option>Active Subscribers</option>
                <option>Free Trial Users</option>
                <option>Inactive Users (30+ days)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notification Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500" 
                placeholder="New Program Available!" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500" 
                rows="4" 
                placeholder="Unlock specific milestones today..."
              ></textarea>
            </div>

            <div className="flex space-x-3 pt-4">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium shadow-sm hover:bg-blue-700 flex items-center justify-center space-x-2">
                <Send className="w-4 h-4" />
                <span>Send Now</span>
              </button>
              <button className="flex-1 border text-gray-700 bg-gray-50 py-2 rounded-lg font-medium hover:bg-gray-100 flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Schedule</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent History</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-gray-50">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-gray-800">New Feature Released ✨</h4>
                <span className="text-xs text-gray-500">2 hrs ago</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Check out our new text-based lessons in the app!</p>
              <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>Sent to All Users</span>
                </div>
                <div className="text-green-600 font-medium">98% Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
