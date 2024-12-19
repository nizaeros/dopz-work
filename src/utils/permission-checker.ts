import type { UserProfile } from '../types/user';

export const checkPermission = {
  canAccessInternalRoutes: (user: UserProfile | null): boolean => {
    if (!user) return false;
    return user.role_type_name === 'internal';
  },

  canAccessClientDashboard: (user: UserProfile | null, clientId: string | undefined): boolean => {
    if (!user || !clientId) return false;
    
    // Internal users can access all client dashboards
    if (user.role_type_name === 'internal') return true;
    
    // External users can only access their assigned client dashboard
    return user.role_type_name === 'external' && user.client_id === clientId;
  },

  canManageClients: (user: UserProfile | null): boolean => {
    if (!user) return false;
    return user.role_type_name === 'internal';
  },

  isAuthenticated: (user: UserProfile | null): boolean => {
    return user !== null && Boolean(user.role_type_name);
  }
};