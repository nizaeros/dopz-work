import { supabase } from '../lib/supabase';
import type { ParentAccountOption } from '../types/forms';

export const parentAccountService = {
  async getParentAccounts(): Promise<ParentAccountOption[]> {
    const { data, error } = await supabase
      .from('parent_accounts')
      .select('parent_account_id, parent_account_name, parent_account_code')
      .order('parent_account_name');
      
    if (error) throw error;
    return data?.map(item => ({
      id: item.parent_account_id,
      name: item.parent_account_name,
      code: item.parent_account_code
    })) || [];
  }
};