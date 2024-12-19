import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { checkPermission } from '../../utils/permission-checker';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ROUTES } from '../../constants/routes';

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles: ('internal' | 'external')[];
}

export const RouteGuard: React.FC<RouteGuardProps> = ({ children, allowedRoles }) => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!checkPermission.isAuthenticated(user)) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!user || !allowedRoles.includes(user.role_type_name)) {
    if (user?.role_type_name === 'external' && user?.client_id) {
      return <Navigate to={ROUTES.CLIENT.DASHBOARD.replace(':clientId', user.client_id)} replace />;
    }
    return <Navigate to={ROUTES.NOT_FOUND} replace />;
  }

  return <>{children}</>;
};