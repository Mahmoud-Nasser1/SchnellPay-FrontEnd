import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

export const ProtectedRoute = ({ adminOnly = false }) => {
  const { isAuthenticated, loading, user } = useAuthStore();
  const location = useLocation();

  // Unified user data access
  const userData = user?.data || user || {};
  const userRole = userData?.role || user?.role;

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent/20 border-t-accent" />
          <p className="font-display text-sm font-medium text-muted-foreground animate-pulse">
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  }

  if (adminOnly && userRole !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};