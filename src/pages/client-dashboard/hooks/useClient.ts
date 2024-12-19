import { useState, useEffect } from 'react';
import { clientService } from '../../../services/client';
import type { Client } from '../../../types/client';

export function useClient(clientSlug?: string) {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      if (!clientSlug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await clientService.getClientById(clientSlug);
        
        if (error) throw error;
        setClient(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch client';
        console.error('Error fetching client:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [clientSlug]);

  return { client, loading, error };
}