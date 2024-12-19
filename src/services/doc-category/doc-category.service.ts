import { supabase } from '../../lib/supabase';
import { handleSupabaseError } from '../../utils/error-handlers';
import type { DocCategory } from './types';

export const docCategoryService = {
  async getDocCategories(): Promise<DocCategory[]> {
    try {
      const { data, error } = await supabase
        .from('doc_categories')
        .select('doc_category_id, doc_category_name')
        .eq('is_active', true)
        .order('doc_category_name');

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw handleSupabaseError(error, 'Failed to fetch document categories');
    }
  }
};