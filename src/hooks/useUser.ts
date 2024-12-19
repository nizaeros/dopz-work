import { useState, useEffect } from 'react';
import { userService } from '../services/user.service';
import type { UserProfile } from '../types/user';

export const useUser = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const userData = await userService.getCurrentUser();
        setUser(userData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user details';
        console.error('Error fetching user details:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  return { user, loading, error };
};