import { storageService } from '../storage.service';
import { supabase } from '../../lib/supabase';
import { insertClient, updateClientLogo, insertParentAssociations, fetchClientById } from './api';
import { mapClientData } from './map-client-data';
import type { ClientFormData } from '../../types/forms';
import type { Client } from '../../types/client';

export async function createClient(formData: ClientFormData): Promise<Client> {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session?.user) {
    throw new Error('User must be authenticated to create a client');
  }

  try {
    // Create client record
    const client = await insertClient(formData, session.session.user.id);

    // Handle logo upload if provided
    if (formData.logo_file && client) {
      try {
        const logoUrl = await storageService.uploadLogo(formData.logo_file);
        await updateClientLogo(client.client_account_id, logoUrl);
      } catch (error) {
        console.error('Error uploading logo:', error);
        // Continue without logo if upload fails
      }
    }

    // Handle parent account associations
    if (formData.parent_account_ids?.length > 0 && client) {
      await insertParentAssociations(
        client.client_account_id,
        formData.parent_account_ids,
        session.session.user.id
      );
    }

    // Fetch complete client data
    const { data: createdClient, error: fetchError } = await fetchClientById(client.client_account_id);
    if (fetchError) throw fetchError;

    return mapClientData(createdClient);
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
}