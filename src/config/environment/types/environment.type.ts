export type Environment = 'development' | 'production' | 'test';

export interface EnvironmentConfig {
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_ANON_KEY: string;
  VITE_APP_ENV: Environment;
  VITE_LOGO_URL: string;
}