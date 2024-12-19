import { supabase } from '../../lib/supabase';
import { handleSupabaseError } from '../../utils/error-handlers';
import type { ClientFormData } from '../../types/forms';

export async function fetchClientForEdit(clientId: string) {
  try {
    const { data, error } = await supabase
      .from('client_accounts')
      .select(`
        client_account_id,
        friendly_name,
        registered_name,
        account_type,
        industry_id,
        entity_type,
        gstin,
        tan,
        icn,
        linkedin_url,
        website_url,
        country_id,
        state_id,
        city_id,
        client_parent_association (
          parent_account_id
        )
      `)
      .eq('client_account_id', clientId)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Client not found');

    // Map the data to match the form structure
    return {
      friendly_name: data.friendly_name,
      registered_name: data.registered_name || '',
      account_type: data.account_type,
      industry_id: data.industry_id,
      entity_type: data.entity_type,
      gstin: data.gstin || '',
      tan: data.tan || '',
      icn: data.icn || '',
      linkedin_url: data.linkedin_url || '',
      website_url: data.website_url || '',
      country_id: data.country_id,
      state_id: data.state_id,
      city_id: data.city_id,
      parent_account_ids: data.client_parent_association?.map(
        (assoc: any) => assoc.parent_account_id
      ) || []
    } as Partial<ClientFormData>;
  } catch (error) {
    throw handleSupabaseError(error, 'Failed to fetch client data for editing');
  }
}