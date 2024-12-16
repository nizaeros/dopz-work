export const ROUTES = {
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  INTERNAL: {
    DASHBOARD: '/internal/dashboard',
    CLIENTS: '/internal/clients',
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