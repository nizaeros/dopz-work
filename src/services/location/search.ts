import { supabase } from '../../lib/supabase';

export async function searchCities(query: string) {
  if (!query || query.length < 2) return [];

  console.log('Starting search for:', query);

  try {
    // Search cities with their related state and country info
    const { data, error } = await supabase
      .from('cities')
      .select(`
        city_id,
        name,
        states (
          state_id,
          name,
          countries (
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

    console.log('Found results:', data?.length || 0);

    return data?.map(city => ({
      id: city.city_id,
      name: city.name,
      state: {
        id: city.states?.state_id,
        name: city.states?.name,
        country: {
          id: city.states?.countries?.country_id,
          name: city.states?.countries?.name
        }
      }
    })) || [];

  } catch (error) {
    console.error('Error searching cities:', error);
    throw error;
  }
}