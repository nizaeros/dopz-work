import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { clientService } from '../../../../../services/client';
import { routineInputService } from '../../../../../services/routine-input/routine-input.service';
import type { RoutineInput } from '../../../../../types/routine-input';

export function useRoutineInputs() {
  const { clientId: clientSlug } = useParams<{ clientId: string }>();
  const [inputs, setInputs] = useState<RoutineInput[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInputs = async () => {
      if (!clientSlug) return;

      try {
        setLoading(true);
        
        // First get the client UUID from the slug
        const { data: client, error: clientError } = await clientService.getClientById(clientSlug);
        
        if (clientError) throw clientError;
        if (!client) throw new Error('Client not found');

        // Now fetch inputs using the actual UUID
        const data = await routineInputService.getRoutineInputs(client.id);
        setInputs(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch routine inputs';
        console.error('Error fetching routine inputs:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchInputs();
  }, [clientSlug]);

  return { inputs, loading, error };
}