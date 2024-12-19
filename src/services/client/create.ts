import { supabase } from '../../lib/supabase';
import { handleSupabaseError } from '../../utils/error-handlers';
import { storageService } from '../storage.service';
import { mapClientData } from './map-client-data';
import type { Client } from '../../types/client';
import type { ClientFormData } from '../../types/forms';

export async function createClient(formData: ClientFormData): Promise<Client> {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session?.user) {
    throw new Error('User must be authenticated to create a client');
  }

  try {
    // Create client record
    const { data: client, error: clientError } = await supabase
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
        created_by: session.session.user.id,
        updated_by: session.session.user.id
      }])
      .select()
      .single();

    if (clientError) throw clientError;

    // Handle logo upload if provided
    if (formData.logo_file && client) {
      try {
        const logoUrl = await storageService.uploadLogo(formData.logo_file);
        await supabase
          .from('client_accounts')
          .update({ logo_image_url: logoUrl })
          .eq('client_account_id', client.client_account_id);
      } catch (error) {
        console.error('Error uploading logo:', error);
        // Continue without logo if upload fails
      }
    }

    // Handle parent account associations
    if (formData.parent_account_ids?.length > 0 && client) {
      const parentAssociations = formData.parent_account_ids.map(parentId => ({
        client_account_id: client.client_account_id,
        parent_account_id: parentId,
        created_by: session.session.user.id,
        updated_by: session.session.user.id
      }));

      const { error: associationError } = await supabase
        .from('client_parent_association')
        .insert(parentAssociations);

      if (associationError) throw associationError;
    }

    // Fetch complete client data
    const { data: createdClient, error: fetchError } = await supabase
      .from('client_list_view')
      .select('*')
      .eq('client_account_id', client.client_account_id)
      .single();

    if (fetchError) throw fetchError;

    return mapClientData(createdClient);
  } catch (error) {
    throw handleSupabaseError(error, 'Failed to create client');
  }
}