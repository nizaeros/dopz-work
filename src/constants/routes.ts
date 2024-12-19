export const ROUTES = {
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  NOT_FOUND: '/404',
  INTERNAL: {
    DASHBOARD: '/internal/dashboard',
    CLIENTS: '/internal/clients',
    CLIENTS_ANALYTICS: '/internal/clients/analytics',
    CLIENTS_SETTINGS: '/internal/clients/settings',
    ROUTINE_INPUTS: '/internal/routine-inputs',
    ADMIN: '/internal/admin'
  },
  CLIENT: {
    DASHBOARD: '/client/:slug/dashboard', // Changed from :clientId to :slug
    DOCUMENTS: '/client/:slug/documents',
    SUPPORT: '/client/:slug/support',
    ACTIVITY: '/client/:slug/activity'
  }
} as const;