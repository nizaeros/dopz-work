import { supabase } from '../lib/supabase';
import type { IndustryOption } from '../types/forms';

export const industryService = {
  async getIndustries(): Promise<IndustryOption[]> {
    const { data, error } = await supabase
      .from('industries')
      .select('industry_id, industry_name')
      .order('industry_name');
      
    if (error) throw error;
    return data?.map(item => ({
      id: item.industry_id,
      name: item.industry_name
    })) || [];
  }
};