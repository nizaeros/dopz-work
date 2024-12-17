import { createClient } from '@supabase/supabase-js';
import { config } from '../config/environment';

if (!config.supabase.url || !config.supabase.anonKey) {
  throw new Error('Missing Supabase configuration. Check your environment variables.');
}

export const supabase = createClient(
  config.supabase.url,
  config.supabase.anonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);