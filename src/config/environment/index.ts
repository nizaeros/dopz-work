import { EnvironmentValidator } from './validation';
import { APP_ENVIRONMENTS } from './constants';
import type { AppConfig, Environment } from './types';

const env = EnvironmentValidator.validate();

export const config: AppConfig = {
  supabase: {
    url: env.VITE_SUPABASE_URL,
    anonKey: env.VITE_SUPABASE_ANON_KEY,
  },
  environment: env.VITE_APP_ENV as Environment,
  isProduction: env.VITE_APP_ENV === APP_ENVIRONMENTS.PRODUCTION,
  isDevelopment: env.VITE_APP_ENV === APP_ENVIRONMENTS.DEVELOPMENT,
  isTest: env.VITE_APP_ENV === APP_ENVIRONMENTS.TEST,
  logoUrl: env.VITE_LOGO_URL,
} as const;

export type Config = typeof config;
export * from './types';
export * from './constants';