import { supabase } from '../../lib/supabase';
import { handleSupabaseError } from '../../utils/error-handlers';
import { checkPermission } from '../../utils/permission-checker';
import { mapClientData } from './map-client-data';
import { generateSlug } from '../../utils/slug';
import type { Client } from '../../types/client';
import type { ClientFormData } from '../../types/forms';

export const clientService = {
  // ... existing methods ...

  async getClientBySlug(slug: string) {
    try {
      const { data, error } = await supabase
        .from('client_list_view')
        .select(`
          client_account_id,
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
          country_name,
          parent_accounts
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Client not found');

      return { data: mapClientData(data), error: null };
    } catch (error) {
      return { 
        data: null, 
        error: handleSupabaseError(error, 'Failed to fetch client data')
      };
    }
  },

  async createClient(formData: ClientFormData): Promise<Client> {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) {
      throw new Error('User must be authenticated to create a client');
    }

    try {
      // Generate slug from friendly name
      const baseSlug = generateSlug(formData.friendly_name);
      
      // Check for existing slugs to avoid duplicates
      const { data: existingClients } = await supabase
        .from('client_accounts')
        .select('slug')
        .like('slug', `${baseSlug}%`);

      // Generate unique slug
      const slug = existingClients?.length 
        ? `${baseSlug}-${existingClients.length + 1}`
        : baseSlug;

      // Create client record with slug
      const { data: client, error: clientError } = await supabase
        .from('client_accounts')
        .insert([{
          ...formData,
          slug,
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
};