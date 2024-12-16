import { supabase } from '../lib/supabase';

export const storageService = {
  async uploadLogo(file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `logo.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { data, error } = await supabase.storage
      .from('assets')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;

    const { data: publicUrl } = supabase.storage
      .from('assets')
      .getPublicUrl(filePath);

    return publicUrl.publicUrl;
  },

  async getPublicUrl(path: string) {
    const { data } = supabase.storage
      .from('assets')
      .getPublicUrl(path);
    
    return data.publicUrl;
  }
};