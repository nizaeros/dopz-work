import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './useUser';
import { ROUTES } from '../constants/routes';

export const useRouteGuard = (allowedRoles: ('internal' | 'external')[]) => {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not authenticated, redirect to login
        navigate(ROUTES.LOGIN);
        return;
      }

      // Check if user's role is allowed
      if (!allowedRoles.includes(user.role_type_name)) {
        if (user.role_type_name === 'external' && user.client_id) {
          // Redirect external users to their client dashboard
          navigate(ROUTES.CLIENT.DASHBOARD.replace(':clientId', user.client_id));
        } else {
          // Redirect to 404 for unauthorized access
          navigate(ROUTES.NOT_FOUND);
        }
      }
    }
  }, [user, loading, navigate, allowedRoles]);

  return { user, loading };
};