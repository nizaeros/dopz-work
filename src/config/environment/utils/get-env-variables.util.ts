import { ENV_KEYS } from '../constants';
import type { EnvironmentConfig } from '../types';

export const getEnvVariables = (): Partial<EnvironmentConfig> => ({
  [ENV_KEYS.SUPABASE_URL]: import.meta.env.VITE_SUPABASE_URL,
  [ENV_KEYS.SUPABASE_ANON_KEY]: import.meta.env.VITE_SUPABASE_ANON_KEY,
  [ENV_KEYS.APP_ENV]: import.meta.env.VITE_APP_ENV,
  [ENV_KEYS.LOGO_URL]: import.meta.env.VITE_LOGO_URL,
});