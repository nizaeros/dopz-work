import { supabase } from '../lib/supabase';
import type { Client } from '../types/client';

export const clientService = {
  async getClients(): Promise<Client[]> {
    const { data, error } = await supabase
      .from('client_accounts')
      .select(`
        client_account_id,
        friendly_name,
        registered_name,
        account_type,
        industry:industries(industry_name),
        created_at,
        is_active
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapClientData);
  },

  mapClientData(data: any): Client {
    return {
      id: data.client_account_id,
      name: data.friendly_name,
      registeredName: data.registered_name,
      type: data.account_type,
      industry: data.industry?.industry_name || 'N/A',
      createdAt: data.created_at,
      isActive: data.is_active,
    };
  }
};