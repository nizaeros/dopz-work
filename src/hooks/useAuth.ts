import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { LoginCredentials } from '../types/auth';
import { ROUTES } from '../constants/routes';

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const { roleType, userDetails } = await authService.login(credentials);

      if (roleType === 'internal') {
        navigate(ROUTES.INTERNAL.DASHBOARD);
      } else {
        navigate(ROUTES.CLIENT.DASHBOARD.replace(':clientId', userDetails.client_id));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      await authService.forgotPassword(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    forgotPassword,
    loading,
    error,
  };
};