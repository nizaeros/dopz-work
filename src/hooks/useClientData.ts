import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from './useUser';
import { clientService } from '../services/client';
import { checkPermission } from '../utils/permission-checker';
import { ROUTES } from '../constants/routes';
import type { Client } from '../types/client';

export const useClientData = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user, loading: userLoading } = useUser();
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientData = async () => {
      if (!slug || userLoading) return;

      try {
        setLoading(true);
        setError(null);

        // Handle unauthenticated users
        if (!checkPermission.isAuthenticated(user)) {
          navigate(ROUTES.LOGIN);
          return;
        }

        const { data, error: clientError } = await clientService.getClientBySlug(slug);
        
        if (clientError) throw clientError;
        if (!data) throw new Error('Client not found');

        // Check client access permission using the fetched client ID
        if (!checkPermission.canAccessClientDashboard(user, data.id)) {
          if (user?.role_type_name === 'external' && user?.client_id) {
            // Get the slug for the user's assigned client
            const { data: userClient } = await clientService.getClientById(user.client_id);
            if (userClient?.slug) {
              navigate(ROUTES.CLIENT.DASHBOARD.replace(':slug', userClient.slug));
            } else {
              throw new Error('Invalid client configuration');
            }
          } else {
            throw new Error('You do not have permission to access this client dashboard');
          }
          return;
        }
        
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
  }, [slug, user, userLoading, navigate]);

  return { client, loading: loading || userLoading, error };
};