import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState('Admin');

  const handleLogin = (e) => {
    e.preventDefault();
    login(role);
    if (role === 'Editor') navigate('/content');
    else if (role === 'Support') navigate('/users');
    else navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Brain Code Admin
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Log in to manage your app
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Role explicitly for testing:</label>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
              >
                <option value="Admin">Admin (Full Access)</option>
                <option value="Editor">Editor (Content Management Only)</option>
                <option value="Support">Support (User Management Only)</option>
              </select>
            </div>
            <div className="rounded-md shadow-sm -space-y-px mt-4">
              <div>
                <input
                  type="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address (optional for test)"
                />
              </div>
              <div>
                <input
                  type="password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password (optional for test)"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in as {role}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
