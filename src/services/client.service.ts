import { supabase } from '../lib/supabase';
import { storageService } from './storage.service';
import type { Client } from '../types/client';
import type { ClientFormData } from '../types/forms';

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

  async createClient(formData: ClientFormData): Promise<Client> {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) {
      throw new Error('User must be authenticated to create a client');
    }

    try {
      // Start a Supabase transaction
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

      // Upload logo if provided
      let logoUrl = null;
      if (formData.logo_file && client) {
        try {
          logoUrl = await storageService.uploadLogo(formData.logo_file);
          // Update client with logo URL
          const { error: updateError } = await supabase
            .from('client_accounts')
            .update({ logo_image_url: logoUrl })
            .eq('client_account_id', client.client_account_id);

          if (updateError) throw updateError;
        } catch (uploadError) {
          console.error('Error uploading logo:', uploadError);
          // Continue without logo if upload fails
        }
      }

      // Associate parent accounts if any
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

      // Fetch the created client with all relations
      const { data: createdClient, error: fetchError } = await supabase
        .from('client_list_view')
        .select('*')
        .eq('client_account_id', client.client_account_id)
        .single();

      if (fetchError) throw fetchError;

      return this.mapClientData(createdClient);
    } catch (error) {
      console.error('Error creating client:', error);
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