import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { clientService } from '../../../services/client';
import type { Client } from '../../../types/client';

export const useClientData = () => {
  const { clientId } = useParams();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientData = async () => {
      if (!clientId) return;

      try {
        setLoading(true);
        const { data, error } = await clientService.getClientById(clientId);
        
        if (error) throw error;
        if (!data) throw new Error('Client not found');
        
        setClient(data);
      } catch (err) {
        console.error('Error fetching client data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch client data');
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [clientId]);

  return { client, loading, error };
};