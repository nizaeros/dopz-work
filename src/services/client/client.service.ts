import { supabase } from '../../lib/supabase';
import { storageService } from '../storage.service';
import { createClient } from './create-client';
import { mapClientData } from './map-client-data';
import type { Client } from '../../types/client';
import type { ClientFormData } from '../../types/forms';

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

      if (error) throw new Error(`Failed to fetch clients: ${error.message}`);
      if (!data) return [];

      return data.map(mapClientData);
    } catch (error) {
      console.error('Error in getClients:', error);
      throw error;
    }
  },

  createClient,
  mapClientData
};