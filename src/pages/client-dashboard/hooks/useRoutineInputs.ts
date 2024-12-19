import { useState, useEffect, useCallback } from 'react';
import { routineInputService } from '../../../services/routine-input/routine-input.service';
import type { RoutineInput } from '../../../types/routine-input';

export function useRoutineInputs(clientId?: string) {
  const [inputs, setInputs] = useState<RoutineInput[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInputs = useCallback(async () => {
    if (!clientId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await routineInputService.getRoutineInputs(clientId);
      setInputs(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch routine inputs';
      console.error('Error fetching routine inputs:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  // Initial fetch
  useEffect(() => {
    fetchInputs();
  }, [fetchInputs]);

  return {
    inputs,
    loading,
    error,
    refetch: fetchInputs // Expose the fetchInputs function as refetch
  };
}