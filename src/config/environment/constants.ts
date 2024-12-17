export const ENV_KEYS = {
  SUPABASE_URL: 'VITE_SUPABASE_URL',
  SUPABASE_ANON_KEY: 'VITE_SUPABASE_ANON_KEY',
  APP_ENV: 'VITE_APP_ENV',
  LOGO_URL: 'VITE_LOGO_URL',
} as const;

export const APP_ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;