export const isProduction = import.meta.env.VITE_APP_ENV === 'production';
export const isDevelopment = import.meta.env.VITE_APP_ENV === 'development';
export const isTest = import.meta.env.VITE_APP_ENV === 'test';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required environment variables');
}