import { supabase } from '../../lib/supabase';
import { handleSupabaseError } from '../../utils/error-handlers';

export async function fetchCountries() {
  try {
    const { data, error } = await supabase
      .from('countries')
      .select('country_id, name')
      .order('name');
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    throw handleSupabaseError(error, 'Failed to fetch countries');
  }
}

export async function fetchStates(countryId: string | null) {
  if (!countryId) return [];
  
  try {
    const { data, error } = await supabase
      .from('states')
      .select('state_id, name')
      .eq('country_id', countryId)
      .order('name');
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    throw handleSupabaseError(error, 'Failed to fetch states');
  }
}

export async function fetchCities(stateId: string | null) {
  if (!stateId) return [];
  
  try {
    const { data, error } = await supabase
      .from('cities')
      .select('city_id, name')
      .eq('state_id', stateId)
      .order('name');
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    throw handleSupabaseError(error, 'Failed to fetch cities');
  }
}