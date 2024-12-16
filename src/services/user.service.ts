import { supabase } from '../lib/supabase';
import type { UserProfile } from '../types/user';

export const userService = {
  async getCurrentUser() {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    
    if (!authUser) return null;

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
        primary_phone_number
      `)
      .eq('auth_id', authUser.id)
      .single();

    if (error) throw error;
    return userData as UserProfile;
  }
};