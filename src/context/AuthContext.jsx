import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Use a mocked user for now. 
  // Roles can be 'Admin', 'Editor', 'Support'
  const [user, setUser] = useState({
    username: 'Super Admin',
    role: 'Admin' 
  });

  const login = (role) => {
    setUser({ username: `${role} User`, role });
  };

  const logout = () => {
    setUser(null);
  };

  const hasAccess = (allowedRoles) => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasAccess }}>
      {children}
    </AuthContext.Provider>
  );
}
