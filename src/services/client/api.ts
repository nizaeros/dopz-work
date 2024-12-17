import { supabase } from '../../lib/supabase';
import { handleSupabaseError } from '../../utils/error-handlers';
import type { ClientFormData } from '../../types/forms';

export async function fetchClients() {
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
    return data || [];
  } catch (error) {
    throw handleSupabaseError(error, 'Failed to fetch clients');
  }
}

export async function insertClient(formData: ClientFormData, userId: string) {
  try {
    const { data, error } = await supabase
      .from('client_accounts')
      .insert([{
        friendly_name: formData.friendly_name,
        registered_name: formData.registered_name,
        account_type: formData.account_type,
        entity_type: formData.entity_type,
        industry_id: formData.industry_id,
        gstin: formData.gstin,
        tan: formData.tan,
        icn: formData.icn,
        linkedin_url: formData.linkedin_url,
        website_url: formData.website_url,
        country_id: formData.country_id || null,
        state_id: formData.state_id || null,
        city_id: formData.city_id || null,
        created_by: userId,
        updated_by: userId
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw handleSupabaseError(error, 'Failed to create client');
  }
}

export async function updateClientLogo(clientId: string, logoUrl: string) {
  try {
    return await supabase
      .from('client_accounts')
      .update({ logo_image_url: logoUrl })
      .eq('client_account_id', clientId);
  } catch (error) {
    throw handleSupabaseError(error, 'Failed to update client logo');
  }
}

export async function insertParentAssociations(
  clientId: string,
  parentIds: string[],
  userId: string
) {
  try {
    const associations = parentIds.map(parentId => ({
      client_account_id: clientId,
      parent_account_id: parentId,
      created_by: userId,
      updated_by: userId
    }));

    return await supabase
      .from('client_parent_association')
      .insert(associations);
  } catch (error) {
    throw handleSupabaseError(error, 'Failed to associate parent accounts');
  }
}

export async function fetchClientById(clientId: string) {
  try {
    return await supabase
      .from('client_list_view')
      .select('*')
      .eq('client_account_id', clientId)
      .single();
  } catch (error) {
    throw handleSupabaseError(error, 'Failed to fetch client details');
  }
}