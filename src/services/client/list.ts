import { supabase } from '../../lib/supabase';
import { handleSupabaseError } from '../../utils/error-handlers';
import { mapClientData } from './map-client-data';
import type { Client } from '../../types/client';

export async function getClients(): Promise<Client[]> {
  try {
    const { data, error } = await supabase
      .from('client_list_view')
      .select(`
        client_account_id,
        parent_accounts,
        friendly_name,
        registered_name,
        slug,
        account_type,
        industry_name,
        gstin,
        entity_type,
        logo_image_url,
        is_active,
        created_at,
        city_name,
        state_name,
        country_name
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!data) return [];

    return data.map(mapClientData);
  } catch (error) {
    throw handleSupabaseError(error, 'Failed to fetch clients');
  }
}