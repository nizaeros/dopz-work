import { useState, useEffect } from 'react';
import { routineInputService } from '../services/routine-input.service';
import type { Activity } from '../types';

export function useRoutineInputActivity(inputId: string) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const data = await routineInputService.getInputActivities(inputId);
        setActivities(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch activities';
        console.error('Error fetching activities:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [inputId]);

  return { activities, loading, error };
}