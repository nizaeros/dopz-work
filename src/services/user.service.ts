import { supabase } from '../lib/supabase';
import type { UserProfile } from '../types/user';

export const userService = {
  async getCurrentUser(): Promise<UserProfile | null> {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    
    if (!authUser) return null;

    try {
      const { data: userData, error } = await supabase
        .from('users')
        .select(`
          first_name,
          last_name,
          profile_image_url,
          role_id,
          team_id,
          email,
          primary_phone_country_code,
          primary_phone_number,
          role_type_name,
          client_id
        `)
        .eq('auth_id', authUser.id)
        .single();

      if (error) throw error;
      if (!userData) return null;

      return userData as UserProfile;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
};