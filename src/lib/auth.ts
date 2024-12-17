import { supabase } from './supabase';

export async function getUserRoleType(userId: string): Promise<'internal' | 'external'> {
  try {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select(`
        role_type_name
      `)
      .eq('auth_id', userId)
      .single();

    if (userError) {
      console.error('Error fetching user role:', userError);
      throw new Error('Failed to fetch user role');
    }

    if (!userData?.role_type_name) {
      throw new Error('User role type not found');
    }

    return userData.role_type_name as 'internal' | 'external';
  } catch (error) {
    console.error('Error in getUserRoleType:', error);
    throw error;
  }
}

export async function getUserDetails(userId: string) {
  try {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select(`
        first_name,
        last_name,
        client_id,
        email,
        profile_image_url,
        role_type_name
      `)
      .eq('auth_id', userId)
      .single();

    if (userError) {
      console.error('Error fetching user details:', userError);
      throw new Error('Failed to fetch user details');
    }

    if (!userData) {
      throw new Error('User not found');
    }

    return userData;
  } catch (error) {
    console.error('Error in getUserDetails:', error);
    throw error;
  }
}