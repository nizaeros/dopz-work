export const ROUTES = {
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  INTERNAL: {
    DASHBOARD: '/internal/dashboard',
    CLIENTS: '/internal/clients',
    CLIENTS_ANALYTICS: '/internal/clients/analytics',
    CLIENTS_SETTINGS: '/internal/clients/settings',
    ROUTINE_INPUTS: '/internal/routine-inputs',
    ADMIN: '/internal/admin'
  },
  CLIENT: {
    DASHBOARD: '/client/:clientId/dashboard',
    DOCUMENTS: '/client/:clientId/documents',
    SUPPORT: '/client/:clientId/support',
    ACTIVITY: '/client/:clientId/activity'
  }
} as const;