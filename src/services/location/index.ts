import { supabase } from '../../lib/supabase';
import type { LocationSearchResult } from './types';

export const locationService = {
  async searchCities(query: string): Promise<LocationSearchResult[]> {
    if (!query || query.length < 2) return [];

    console.log('Starting city search:', query);

    try {
      const { data, error } = await supabase
        .from('cities')
        .select(`
          city_id,
          name,
          states!inner (
            state_id,
            name,
            countries!inner (
              country_id,
              name
            )
          )
        `)
        .ilike('name', `%${query}%`)
        .limit(10);

      if (error) {
        console.error('Database search error:', error);
        throw error;
      }

      const results = data?.map(city => ({
        id: city.city_id,
        name: city.name,
        state: {
          id: city.states.state_id,
          name: city.states.name,
          country: {
            id: city.states.countries.country_id,
            name: city.states.countries.name
          }
        }
      })) || [];

      console.log('Search results:', results);
      return results;
    } catch (error) {
      console.error('Error searching cities:', error);
      throw error;
    }
  }
};