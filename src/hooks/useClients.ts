import { useState, useEffect, useMemo } from 'react';
import { useUser } from './useUser';
import { clientService } from '../services/client';
import { checkPermission } from '../utils/permission-checker';
import type { Client } from '../types/client';

export type ClientFilter = 'active' | 'inactive' | 'all';

export const useClients = (filter: ClientFilter = 'all') => {
  const { user, loading: userLoading } = useUser();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      if (userLoading) return;

      try {
        setLoading(true);
        setError(null);

        // Check if user has permission to access clients
        if (!checkPermission.canManageClients(user)) {
          throw new Error('Unauthorized: Only internal users can access client list');
        }

        const data = await clientService.getClients();
        setClients(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch clients';
        console.error('Error fetching clients:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [user, userLoading]);

  const filteredClients = useMemo(() => {
    if (!clients.length) return [];
    
    switch (filter) {
      case 'active':
        return clients.filter(client => client.isActive);
      case 'inactive':
        return clients.filter(client => !client.isActive);
      default:
        return clients;
    }
  }, [clients, filter]);

  const counts = useMemo(() => ({
    active: clients.filter(client => client.isActive).length,
    inactive: clients.filter(client => !client.isActive).length,
    all: clients.length
  }), [clients]);

  return { 
    clients: filteredClients, 
    counts,
    loading: loading || userLoading, 
    error 
  };
};