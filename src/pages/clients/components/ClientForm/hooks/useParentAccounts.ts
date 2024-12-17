import { useState, useEffect } from 'react';
import { parentAccountService } from '../../../../../services/parent-account.service';
import type { ParentAccountOption } from '../../../../../types/forms';

export const useParentAccounts = () => {
  const [parentAccounts, setParentAccounts] = useState<ParentAccountOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParentAccounts = async () => {
      try {
        const data = await parentAccountService.getParentAccounts();
        setParentAccounts(data);
      } catch (err) {
        setError('Failed to fetch parent accounts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchParentAccounts();
  }, []);

  return { parentAccounts, loading, error };
};