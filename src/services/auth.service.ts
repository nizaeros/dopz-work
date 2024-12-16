import { supabase } from '../lib/supabase';
import { LoginCredentials } from '../types/auth';
import { getUserRoleType, getUserDetails } from '../lib/auth';

export const authService = {
  async login(credentials: LoginCredentials) {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword(credentials);
    if (authError) throw authError;

    const userId = authData.user.id;
    const roleType = await getUserRoleType(userId);
    const userDetails = await getUserDetails(userId);

    return { roleType, userDetails };
  },

  async forgotPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
};