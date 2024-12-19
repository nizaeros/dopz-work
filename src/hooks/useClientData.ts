import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from './useUser';
import { clientService } from '../services/client';
import { checkPermission } from '../utils/permission-checker';
import { ROUTES } from '../constants/routes';
import type { Client } from '../types/client';

export const useClientData = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const { user, loading: userLoading } = useUser();
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientData = async () => {
      if (!clientId || userLoading) return;

      try {
        setLoading(true);
        setError(null);

        // Handle unauthenticated users
        if (!checkPermission.isAuthenticated(user)) {
          navigate(ROUTES.LOGIN);
          return;
        }

        // Check client access permission
        if (!checkPermission.canAccessClientDashboard(user, clientId)) {
          if (user?.role_type_name === 'external' && user?.client_id) {
            // Redirect external users to their assigned client dashboard
            navigate(ROUTES.CLIENT.DASHBOARD.replace(':clientId', user.client_id));
          } else {
            throw new Error('You do not have permission to access this client dashboard');
          }
          return;
        }

        const { data, error: clientError } = await clientService.getClientById(clientId);
        
        if (clientError) throw clientError;
        if (!data) throw new Error('Client not found');
        
        setClient(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch client data';
        console.error('Error fetching client data:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [clientId, user, userLoading, navigate]);

  return { client, loading: loading || userLoading, error };
};