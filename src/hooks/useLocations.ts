import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { LocationOption } from '../types/forms';

export function useLocations() {
  const [countries, setCountries] = useState<LocationOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('countries')
          .select('country_id, name')
          .order('name');

        if (fetchError) throw fetchError;

        setCountries(data?.map(country => ({
          id: country.country_id,
          name: country.name
        })) || []);
      } catch (err) {
        console.error('Error fetching countries:', err);
        setError('Failed to load countries');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
}