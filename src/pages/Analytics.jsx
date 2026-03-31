import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Activity, PlayCircle, Clock } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">App Analytics & Statistics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center text-sm font-medium text-gray-500 mb-2">
            <Users className="h-4 w-4 mr-2 text-blue-500" /> Total Active Users
          </div>
          <div className="text-2xl font-bold text-gray-900">12,450</div>
          <div className="text-xs text-green-600 mt-1">↑ 12% from last month</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center text-sm font-medium text-gray-500 mb-2">
            <Activity className="h-4 w-4 mr-2 text-green-500" /> Daily Active Users
          </div>
          <div className="text-2xl font-bold text-gray-900">3,200</div>
          <div className="text-xs text-green-600 mt-1">↑ 5% from last week</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center text-sm font-medium text-gray-500 mb-2">
            <TrendingUp className="h-4 w-4 mr-2 text-purple-500" /> Install to Subscription
          </div>
          <div className="text-2xl font-bold text-gray-900">18.5%</div>
          <div className="text-xs text-green-600 mt-1">↑ 2% conversion rate</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center text-sm font-medium text-gray-500 mb-2">
            <PlayCircle className="h-4 w-4 mr-2 text-orange-500" /> Total Content Plays
          </div>
          <div className="text-xl font-bold text-gray-900">145k</div>
          <div className="text-xs text-gray-500 mt-1">Audio & Video</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-4">User Retention</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Day 1</span>
                <span className="font-medium text-gray-900">45%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-[#C4963D] h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Day 7</span>
                <span className="font-medium text-gray-900">28%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-[#C4963D] h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Day 30</span>
                <span className="font-medium text-gray-900">15%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-[#C4963D] h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Most Listened Sessions</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-md"><PlayCircle className="h-5 w-5 text-orange-600" /></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Morning Meditation (Audio)</p>
                  <p className="text-xs text-gray-500">12,500 plays</p>
                </div>
              </div>
              <span className="text-sm font-medium text-[#C4963D]">#1</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-md"><PlayCircle className="h-5 w-5 text-blue-600" /></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Sleep Sounds (Audio)</p>
                  <p className="text-xs text-gray-500">9,800 plays</p>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-500">#2</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-md"><PlayCircle className="h-5 w-5 text-green-600" /></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Focus Session (Video)</p>
                  <p className="text-xs text-gray-500">7,200 plays</p>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-500">#3</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-medium text-gray-900 mb-4">User Funnel</h2>
        <div className="flex flex-col md:flex-row justify-between items-center text-center space-y-4 md:space-y-0 relative">
          <div className="w-full md:w-1/3 p-4">
            <div className="text-2xl font-bold text-gray-900">50,000</div>
            <div className="text-sm text-gray-500 uppercase tracking-wide">Installs</div>
          </div>
          <div className="hidden md:block w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 absolute left-1/3 -ml-4 z-10">&rarr;</div>
          <div className="w-full md:w-1/3 p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">22,000</div>
            <div className="text-sm text-gray-500 uppercase tracking-wide">Sign-ups (44%)</div>
          </div>
          <div className="hidden md:block w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 absolute left-2/3 -ml-4 z-10">&rarr;</div>
          <div className="w-full md:w-1/3 p-4 bg-[#C4963D]/10 rounded-lg border border-[#C4963D]/20">
            <div className="text-2xl font-bold text-[#C4963D]">4,070</div>
            <div className="text-sm text-[#C4963D] uppercase tracking-wide">Subscriptions (18.5%)</div>
          </div>
        </div>
      </div>

    </div>
  );
}
