import { supabase } from '../../lib/supabase';
import { handleSupabaseError } from '../../utils/error-handlers';
import { checkPermission } from '../../utils/permission-checker';
import { mapClientData } from './map-client-data';
import type { Client } from '../../types/client';
import type { UserProfile } from '../../types/user';

export const clientService = {
  async getClients(): Promise<Client[]> {
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
  },

  async getClientById(clientId: string) {
    try {
      const { data, error } = await supabase
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
        `)
        .eq('client_account_id', clientId)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Client not found');

      return { data: mapClientData(data), error: null };
    } catch (error) {
      return { 
        data: null, 
        error: handleSupabaseError(error, 'Failed to fetch client data')
      };
    }
  }
};