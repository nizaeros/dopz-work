import { useState, useEffect } from 'react';
import { routineInputService } from '../services/routine-input.service';
import type { RoutineInput, RoutineInputFilters } from '../types';

export function useRoutineInputs(filters: RoutineInputFilters) {
  const [inputs, setInputs] = useState<RoutineInput[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInputs = async () => {
      try {
        setLoading(true);
        const data = await routineInputService.getRoutineInputs(filters);
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
  }, [filters]);

  return { inputs, loading, error };
}