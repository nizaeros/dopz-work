export const ROUTES = {
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  INTERNAL: {
    DASHBOARD: '/internal/dashboard',
    CLIENTS: '/internal/clients',
    DOCUMENTS: '/internal/documents',
    OPERATIONS: '/internal/operations',
    SETTINGS: '/internal/settings'
  },
  CLIENT: {
    DASHBOARD: '/client/:clientId',
    DOCUMENTS: '/client/documents',
    SUPPORT: '/client/support',
    ACTIVITY: '/client/activity'
  }
} as const;