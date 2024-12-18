import { supabase } from '../../lib/supabase';
import { handleSupabaseError } from '../../utils/error-handlers';
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
          logo_image_url,
          is_active
        `)
        .eq('client_account_id', clientId)
        .single();

      if (error) throw error;
      return { data: mapClientData(data), error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async createClient(formData: ClientFormData): Promise<Client> {
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

      // Fetch the complete client data
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
  },

  async updateClient(clientId: string, formData: ClientFormData): Promise<Client> {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) {
      throw new Error('User must be authenticated to update client');
    }

    try {
      // Update client record
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
          updated_by: session.session.user.id
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
  },

  async fetchClientForEdit(clientId: string) {
    try {
      const { data, error } = await supabase
        .from('client_accounts')
        .select(`
          *,
          client_parent_association (
            parent_account_id
          )
        `)
        .eq('client_account_id', clientId)
        .single();

      if (error) throw error;

      return {
        ...data,
        parent_account_ids: data.client_parent_association?.map(
          (assoc: any) => assoc.parent_account_id
        ) || []
      };
    } catch (error) {
      throw handleSupabaseError(error, 'Failed to fetch client data for editing');
    }
  }
};