import { supabase } from '../lib/supabase';
import type { Client } from '../types/client';

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

      return data.map(this.mapClientData);
    } catch (error) {
      console.error('Error in getClients:', error);
      throw error;
    }
  },

  mapClientData(data: any): Client {
    return {
      id: data.client_account_id,
      name: data.friendly_name || 'Unnamed Client',
      registeredName: data.registered_name || '',
      type: data.entity_type || 'business',
      industry: data.industry_name || 'N/A',
      createdAt: data.created_at,
      isActive: data.is_active ?? true,
      logoUrl: data.logo_image_url || '',
      parentAccounts: data.parent_accounts ? data.parent_accounts.split('; ') : [],
      gstin: data.gstin || '',
      slug: data.slug || '',
      city: data.city_name || '',
      state: data.state_name || '',
      country: data.country_name || '',
      accountType: data.account_type || 'Standard',
    };
  }
};