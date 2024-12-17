import { supabase } from '../../lib/supabase';
import { handleSupabaseError } from '../../utils/error-handlers';
import type { ClientFormData } from '../../types/forms';

export async function insertParentAssociations(
  clientId: string,
  parentIds: string[],
  userId: string
) {
  try {
    // Create associations for each parent account
    const associations = parentIds.map(parentId => ({
      client_account_id: clientId,
      parent_account_id: parentId,
      created_by: userId,
      updated_by: userId
    }));

    const { error } = await supabase
      .from('client_parent_association')
      .insert(associations);

    if (error) throw error;
  } catch (error) {
    throw handleSupabaseError(error, 'Failed to associate parent accounts');
  }
}

export async function fetchClientParentAccounts(clientId: string) {
  try {
    const { data, error } = await supabase
      .from('client_parent_association')
      .select(`
        parent_account_id,
        parent_accounts (
          parent_account_code,
          parent_account_name
        )
      `)
      .eq('client_account_id', clientId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    throw handleSupabaseError(error, 'Failed to fetch client parent accounts');
  }
}