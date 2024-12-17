import { APP_ENVIRONMENTS } from './constants';

export type Environment = typeof APP_ENVIRONMENTS[keyof typeof APP_ENVIRONMENTS];

export interface EnvironmentConfig {
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_ANON_KEY: string;
  VITE_APP_ENV: Environment;
  VITE_LOGO_URL: string;
}

export interface AppConfig {
  supabase: {
    url: string;
    anonKey: string;
  };
  environment: Environment;
  isProduction: boolean;
  isDevelopment: boolean;
  isTest: boolean;
  logoUrl: string;
}