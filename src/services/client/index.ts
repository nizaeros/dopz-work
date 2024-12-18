import { supabase } from '../../lib/supabase';
import { storageService } from '../storage.service';
import { mapClientData } from './map-client-data';
import { handleSupabaseError } from '../../utils/error-handlers';
import {
  createClientRecord,
  updateClientRecord,
  updateClientLogo,
  updateParentAssociations,
  fetchUpdatedClient,
  fetchClientForEdit
} from './api';
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
      const client = await createClientRecord(formData, session.session.user.id);

      // Handle logo upload if provided
      if (formData.logo_file) {
        try {
          const logoUrl = await storageService.uploadLogo(formData.logo_file);
          await updateClientLogo(client.client_account_id, logoUrl);
        } catch (error) {
          console.error('Error uploading logo:', error);
          // Continue without logo if upload fails
        }
      }

      // Handle parent account associations
      if (formData.parent_account_ids?.length > 0) {
        await updateParentAssociations(
          client.client_account_id,
          formData.parent_account_ids,
          session.session.user.id
        );
      }

      // Fetch complete client data
      const updatedClient = await fetchUpdatedClient(client.client_account_id);
      return mapClientData(updatedClient);
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
      const client = await updateClientRecord(clientId, formData, session.session.user.id);

      // Handle logo update if provided
      if (formData.logo_file) {
        try {
          const logoUrl = await storageService.uploadLogo(formData.logo_file);
          await updateClientLogo(clientId, logoUrl);
        } catch (error) {
          console.error('Error uploading logo:', error);
          // Continue without logo if upload fails
        }
      }

      // Update parent account associations
      await updateParentAssociations(
        clientId,
        formData.parent_account_ids || [],
        session.session.user.id
      );

      // Fetch updated client data
      const updatedClient = await fetchUpdatedClient(clientId);
      return mapClientData(updatedClient);
    } catch (error) {
      throw handleSupabaseError(error, 'Failed to update client');
    }
  },

  async fetchClientForEdit(clientId: string) {
    return fetchClientForEdit(clientId);
  }
};

// Export the type for better type checking
export type ClientService = typeof clientService;