import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ allowedRoles, component: Component }) {
  const { user, hasAccess } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !hasAccess(allowedRoles)) {
    // If user doesn't have required role, redirect them to a safe default page based on their role
    if (user.role === 'Editor') return <Navigate to="/content" replace />;
    if (user.role === 'Support') return <Navigate to="/support" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return Component ? <Component /> : <Outlet />;
}
