import { useState, useCallback, useEffect } from 'react';
import { locationService } from '../../../../../services/location';
import type { LocationOption } from '../../../../../types/forms';

export const useLocations = () => {
  const [countries, setCountries] = useState<LocationOption[]>([]);
  const [states, setStates] = useState<LocationOption[]>([]);
  const [cities, setCities] = useState<LocationOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await locationService.getCountries();
        setCountries(data);
      } catch (err) {
        setError('Failed to fetch countries');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = useCallback(async (countryId: string | null) => {
    if (!countryId) {
      setStates([]);
      setCities([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await locationService.getStates(countryId);
      setStates(data);
      setCities([]);
    } catch (err) {
      setError('Failed to fetch states');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleStateChange = useCallback(async (stateId: string | null) => {
    if (!stateId) {
      setCities([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await locationService.getCities(stateId);
      setCities(data);
    } catch (err) {
      setError('Failed to fetch cities');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    countries,
    states,
    cities,
    loading,
    error,
    handleCountryChange,
    handleStateChange,
  };
};