import { supabase } from '../../lib/supabase';
import { handleSupabaseError } from '../../utils/error-handlers';
import type { ClientFormData } from '../../types/forms';

export async function fetchClientForEdit(clientId: string) {
  try {
    // Fetch main client data
    const { data: client, error: clientError } = await supabase
      .from('client_accounts')
      .select(`
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
        city_id
      `)
      .eq('client_account_id', clientId)
      .single();

    if (clientError) throw clientError;

    // Fetch parent account associations
    const { data: parentAccounts, error: parentError } = await supabase
      .from('client_parent_association')
      .select('parent_account_id')
      .eq('client_account_id', clientId);

    if (parentError) throw parentError;

    return {
      ...client,
      parent_account_ids: parentAccounts.map(pa => pa.parent_account_id)
    };
  } catch (error) {
    throw handleSupabaseError(error, 'Failed to fetch client data');
  }
}

export async function createClientRecord(formData: ClientFormData, userId: string) {
  try {
    const { data, error } = await supabase
      .from('client_accounts')
      .insert([{
        friendly_name: formData.friendly_name,
        registered_name: formData.registered_name,
        account_type: formData.account_type,
        industry_id: formData.industry_id,
        entity_type: formData.entity_type,
        gstin: formData.gstin,
        tan: formData.tan,
        icn: formData.icn,
        linkedin_url: formData.linkedin_url,
        website_url: formData.website_url,
        country_id: formData.country_id,
        state_id: formData.state_id,
        city_id: formData.city_id,
        created_by: userId,
        updated_by: userId
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw handleSupabaseError(error, 'Failed to create client record');
  }
}

export async function updateClientRecord(clientId: string, formData: ClientFormData, userId: string) {
  try {
    const { data, error } = await supabase
      .from('client_accounts')
      .update({
        friendly_name: formData.friendly_name,
        registered_name: formData.registered_name,
        account_type: formData.account_type,
        industry_id: formData.industry_id,
        entity_type: formData.entity_type,
        gstin: formData.gstin,
        tan: formData.tan,
        icn: formData.icn,
        linkedin_url: formData.linkedin_url,
        website_url: formData.website_url,
        country_id: formData.country_id,
        state_id: formData.state_id,
        city_id: formData.city_id,
        updated_by: userId
      })
      .eq('client_account_id', clientId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw handleSupabaseError(error, 'Failed to update client record');
  }
}

export async function updateClientLogo(clientId: string, logoUrl: string) {
  try {
    const { error } = await supabase
      .from('client_accounts')
      .update({ logo_image_url: logoUrl })
      .eq('client_account_id', clientId);

    if (error) throw error;
  } catch (error) {
    throw handleSupabaseError(error, 'Failed to update client logo');
  }
}

export async function updateParentAssociations(clientId: string, parentIds: string[], userId: string) {
  try {
    // First remove existing associations
    const { error: deleteError } = await supabase
      .from('client_parent_association')
      .delete()
      .eq('client_account_id', clientId);

    if (deleteError) throw deleteError;

    // Then add new associations
    if (parentIds.length > 0) {
      const parentAssociations = parentIds.map(parentId => ({
        client_account_id: clientId,
        parent_account_id: parentId,
        created_by: userId,
        updated_by: userId
      }));

      const { error: insertError } = await supabase
        .from('client_parent_association')
        .insert(parentAssociations);

      if (insertError) throw insertError;
    }
  } catch (error) {
    throw handleSupabaseError(error, 'Failed to update parent associations');
  }
}

export async function fetchUpdatedClient(clientId: string) {
  try {
    const { data, error } = await supabase
      .from('client_list_view')
      .select('*')
      .eq('client_account_id', clientId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw handleSupabaseError(error, 'Failed to fetch updated client data');
  }
}