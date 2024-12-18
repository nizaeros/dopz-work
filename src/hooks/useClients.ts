import { useState, useEffect, useMemo } from 'react';
import { clientService } from '../services/client';
import type { Client } from '../types/client';

export type ClientFilter = 'active' | 'inactive' | 'all';

export const useClients = (filter: ClientFilter = 'all') => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        setError(null);
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
  }, []);

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
    loading, 
    error 
  };
};