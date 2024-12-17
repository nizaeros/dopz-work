import { supabase } from '../lib/supabase';
import { getUserRoleType, getUserDetails } from '../lib/auth';
import type { LoginCredentials } from '../types/auth';

export const authService = {
  async login(credentials: LoginCredentials) {
    try {
      // Sign in with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword(credentials);
      
      if (authError) {
        throw new Error(authError.message);
      }

      if (!authData?.user) {
        throw new Error('Authentication failed');
      }

      // Get user role type and details
      try {
        const userDetails = await getUserDetails(authData.user.id);
        const roleType = userDetails.role_type_name as 'internal' | 'external';

        if (!roleType) {
          throw new Error('User role type not found');
        }

        return { roleType, userDetails };
      } catch (error) {
        console.error('Error fetching user details:', error);
        throw new Error('Failed to fetch user information. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async forgotPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }
};