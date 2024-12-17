import { validateEnv } from './utils';
import type { Environment } from './types';

const env = validateEnv();

export const config = {
  supabase: {
    url: env.VITE_SUPABASE_URL,
    anonKey: env.VITE_SUPABASE_ANON_KEY,
  },
  environment: env.VITE_APP_ENV as Environment,
  isProduction: env.VITE_APP_ENV === 'production',
  isDevelopment: env.VITE_APP_ENV === 'development',
  isTest: env.VITE_APP_ENV === 'test',
  logoUrl: env.VITE_LOGO_URL,
} as const;

export type Config = typeof config;
export * from './types';
export * from './constants';