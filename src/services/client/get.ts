import { supabase } from '../../lib/supabase';
import { handleSupabaseError } from '../../utils/error-handlers';
import { mapClientData } from './map-client-data';
import type { Client } from '../../types/client';

export async function getClientById(clientIdOrSlug: string) {
  try {
    // Try UUID format first
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(clientIdOrSlug);
    
    const query = supabase
      .from('client_list_view')
      .select(`
        client_account_id,
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
        country_name,
        parent_accounts
      `);

    // Query by ID or slug
    const { data, error } = await (isUUID 
      ? query.eq('client_account_id', clientIdOrSlug)
      : query.eq('slug', clientIdOrSlug)
    ).single();

    if (error) throw error;
    if (!data) throw new Error('Client not found');

    return { data: mapClientData(data), error: null };
  } catch (error) {
    return { 
      data: null, 
      error: handleSupabaseError(error, 'Failed to fetch client')
    };
  }
}