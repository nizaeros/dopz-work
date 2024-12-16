import { supabase } from './supabase';

export async function getUserRoleType(userId: string) {
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select(`
      role_id,
      user_roles (
        role_type_id,
        user_role_types (
          role_type_name
        )
      )
    `)
    .eq('auth_id', userId)
    .single();

  if (userError) throw userError;
  
  return userData?.user_roles?.user_role_types?.role_type_name as 'internal' | 'external';
}

export async function getUserDetails(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select(`
      first_name,
      last_name,
      client_id
    `)
    .eq('auth_id', userId)
    .single();

  if (error) throw error;
  return data;
}