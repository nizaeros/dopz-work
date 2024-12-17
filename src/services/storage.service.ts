import { supabase } from '../lib/supabase';

export const storageService = {
  async uploadLogo(file: File): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('assets')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading logo:', error);
      throw error;
    }
  },

  async getPublicUrl(path: string): Promise<string> {
    const { data } = supabase.storage
      .from('assets')
      .getPublicUrl(path);
    
    return data.publicUrl;
  }
};