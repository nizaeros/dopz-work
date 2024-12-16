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
    DASHBOARD: '/client/:clientId',
    DOCUMENTS: '/client/documents',
    SUPPORT: '/client/support',
    ACTIVITY: '/client/activity'
  }
} as const;