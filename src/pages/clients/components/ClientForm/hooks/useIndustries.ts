import { useState, useEffect } from 'react';
import { industryService } from '../../../../../services/industry.service';
import type { IndustryOption } from '../../../../../types/forms';

export const useIndustries = () => {
  const [industries, setIndustries] = useState<IndustryOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const data = await industryService.getIndustries();
        setIndustries(data);
      } catch (err) {
        setError('Failed to fetch industries');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  return { industries, loading, error };
};