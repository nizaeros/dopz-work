import { supabase } from '../../lib/supabase';
import { handleSupabaseError } from '../../utils/error-handlers';
import { storageService } from '../storage.service';
import { mapClientData } from './map-client-data';
import type { Client } from '../../types/client';
import type { ClientFormData } from '../../types/forms';

export async function updateClient(clientId: string, formData: ClientFormData): Promise<Client> {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session?.user) {
    throw new Error('User must be authenticated to update client');
  }

  try {
    // Handle logo upload first if provided
    let logoUrl: string | undefined;
    if (formData.logo_file) {
      try {
        logoUrl = await storageService.uploadLogo(formData.logo_file);
      } catch (error) {
        console.error('Error uploading logo:', error);
        throw new Error('Failed to upload logo');
      }
    }

    // Update client record with all fields including new logo if uploaded
    const { data: client, error: clientError } = await supabase
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
        updated_by: session.session.user.id,
        ...(logoUrl && { logo_image_url: logoUrl }) // Only include if new logo was uploaded
      })
      .eq('client_account_id', clientId)
      .select()
      .single();

    if (clientError) throw clientError;

    // Update parent account associations
    if (formData.parent_account_ids) {
      // First, remove existing associations
      const { error: deleteError } = await supabase
        .from('client_parent_association')
        .delete()
        .eq('client_account_id', clientId);

      if (deleteError) throw deleteError;

      // Then, create new associations
      if (formData.parent_account_ids.length > 0) {
        const parentAssociations = formData.parent_account_ids.map(parentId => ({
          client_account_id: clientId,
          parent_account_id: parentId,
          created_by: session.session.user.id,
          updated_by: session.session.user.id
        }));

        const { error: associationError } = await supabase
          .from('client_parent_association')
          .insert(parentAssociations);

        if (associationError) throw associationError;
      }
    }

    // Fetch updated client data
    const { data: updatedClient, error: fetchError } = await supabase
      .from('client_list_view')
      .select('*')
      .eq('client_account_id', clientId)
      .single();

    if (fetchError) throw fetchError;

    return mapClientData(updatedClient);
  } catch (error) {
    throw handleSupabaseError(error, 'Failed to update client');
  }
}