import { supabase } from '../lib/supabase';
import type { LocationOption } from '../types/forms';

export const locationService = {
  async getCountries(): Promise<LocationOption[]> {
    const { data, error } = await supabase
      .from('countries')
      .select('country_id, name')
      .order('name');
      
    if (error) throw error;
    return data?.map(item => ({
      id: item.country_id,
      name: item.name
    })) || [];
  },

  async getStates(countryId: string): Promise<LocationOption[]> {
    const { data, error } = await supabase
      .from('states')
      .select('state_id, name')
      .eq('country_id', countryId)
      .order('name');
      
    if (error) throw error;
    return data?.map(item => ({
      id: item.state_id,
      name: item.name
    })) || [];
  },

  async getCities(stateId: string): Promise<LocationOption[]> {
    const { data, error } = await supabase
      .from('cities')
      .select('city_id, name')
      .eq('state_id', stateId)
      .order('name');
      
    if (error) throw error;
    return data?.map(item => ({
      id: item.city_id,
      name: item.name
    })) || [];
  }
};