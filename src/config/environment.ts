import { z } from 'zod';

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_ANON_KEY: z.string().min(1),
  VITE_APP_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const validateEnv = () => {
  const env = {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    VITE_APP_ENV: import.meta.env.VITE_APP_ENV,
  };

  try {
    return envSchema.parse(env);
  } catch (error) {
    console.error('❌ Invalid environment configuration:', error);
    throw new Error('Invalid environment configuration. Check your .env file.');
  }
};

export const config = {
  supabase: {
    url: validateEnv().VITE_SUPABASE_URL,
    anonKey: validateEnv().VITE_SUPABASE_ANON_KEY,
  },
  environment: validateEnv().VITE_APP_ENV,
  isProduction: validateEnv().VITE_APP_ENV === 'production',
  isDevelopment: validateEnv().VITE_APP_ENV === 'development',
  isTest: validateEnv().VITE_APP_ENV === 'test',
} as const;