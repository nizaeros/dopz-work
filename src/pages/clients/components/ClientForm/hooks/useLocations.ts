import { useState, useEffect } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { supabase } from '../../../../../lib/supabase';
import type { ClientFormData } from '../../../../../types/forms';

interface LocationOption {
  id: string;
  name: string;
}

export function useLocations(watch: UseFormWatch<ClientFormData>) {
  const [countries, setCountries] = useState<LocationOption[]>([]);
  const [states, setStates] = useState<LocationOption[]>([]);
  const [cities, setCities] = useState<LocationOption[]>([]);
  const [loading, setLoading] = useState(false);

  const countryId = watch('country_id');
  const stateId = watch('state_id');

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('countries')
          .select('country_id, name')
          .order('name');

        if (error) throw error;
        setCountries(data?.map(c => ({ id: c.country_id, name: c.name })) || []);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    const fetchStates = async () => {
      if (!countryId) {
        setStates([]);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('states')
          .select('state_id, name')
          .eq('country_id', countryId)
          .order('name');

        if (error) throw error;
        setStates(data?.map(s => ({ id: s.state_id, name: s.name })) || []);
      } catch (error) {
        console.error('Error fetching states:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, [countryId]);

  // Fetch cities when state changes
  useEffect(() => {
    const fetchCities = async () => {
      if (!stateId) {
        setCities([]);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('cities')
          .select('city_id, name')
          .eq('state_id', stateId)
          .order('name');

        if (error) throw error;
        setCities(data?.map(c => ({ id: c.city_id, name: c.name })) || []);
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [stateId]);

  return { countries, states, cities, loading };
}