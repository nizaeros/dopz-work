// Handle auth-related redirects
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../useUser';
import { ROUTES } from '../../constants/routes';

export function useAuthRedirect() {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      if (user.role_type_name === 'internal') {
        navigate(ROUTES.INTERNAL.DASHBOARD);
      } else if (user.role_type_name === 'external' && user.client_id) {
        navigate(ROUTES.CLIENT.DASHBOARD.replace(':clientId', user.client_id));
      }
    }
  }, [user, loading, navigate]);

  return { user, loading };
}