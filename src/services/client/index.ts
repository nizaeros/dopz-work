import { supabase } from '../../lib/supabase';
import { storageService } from '../storage.service';
import { mapClientData } from './map-client-data';
import { handleSupabaseError } from '../../utils/error-handlers';
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

      if (error) throw error;
      if (!data) return [];

      return data.map(mapClientData);
    } catch (error) {
      throw handleSupabaseError(error, 'Failed to fetch clients');
    }
  },

  async createClient(formData: ClientFormData): Promise<Client> {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) {
      throw new Error('User must be authenticated to create client');
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
      if (!client) throw new Error('Failed to create client record');

      // Handle logo upload if provided
      if (formData.logo_file) {
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
      if (formData.parent_account_ids?.length > 0) {
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
      if (!createdClient) throw new Error('Failed to fetch created client');

      return mapClientData(createdClient);
    } catch (error) {
      throw handleSupabaseError(error, 'Failed to create client');
    }
  },

  async updateClient(clientId: string, formData: ClientFormData): Promise<Client> {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) {
      throw new Error('User must be authenticated to update client');
    }

    try {
      // Update client record
      const { data: client, error: updateError } = await supabase
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
          updated_by: session.session.user.id
        })
        .eq('client_account_id', clientId)
        .select()
        .single();

      if (updateError) throw updateError;
      if (!client) throw new Error('Failed to update client record');

      // Handle logo update if provided
      if (formData.logo_file) {
        try {
          const logoUrl = await storageService.uploadLogo(formData.logo_file);
          await supabase
            .from('client_accounts')
            .update({ logo_image_url: logoUrl })
            .eq('client_account_id', clientId);
        } catch (error) {
          console.error('Error uploading logo:', error);
          // Continue without logo if upload fails
        }
      }

      // Update parent account associations
      await supabase
        .from('client_parent_association')
        .delete()
        .eq('client_account_id', clientId);

      if (formData.parent_account_ids?.length > 0) {
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

      // Fetch updated client data
      const { data: updatedClient, error: fetchError } = await supabase
        .from('client_list_view')
        .select('*')
        .eq('client_account_id', clientId)
        .single();

      if (fetchError) throw fetchError;
      if (!updatedClient) throw new Error('Failed to fetch updated client');

      return mapClientData(updatedClient);
    } catch (error) {
      throw handleSupabaseError(error, 'Failed to update client');
    }
  }
};