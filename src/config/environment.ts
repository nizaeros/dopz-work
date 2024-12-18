import { z } from 'zod';

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string()
    .url('Supabase URL must be a valid URL')
    .startsWith('https://', 'Supabase URL must use HTTPS'),
  VITE_SUPABASE_ANON_KEY: z.string()
    .min(1, 'Supabase anonymous key is required'),
  VITE_APP_ENV: z.enum(['development', 'production', 'test'])
    .default('development'),
  VITE_LOGO_URL: z.string()
    .url('Logo URL must be a valid URL')
});

const validateEnv = () => {
  try {
    const env = {
      VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
      VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
      VITE_APP_ENV: import.meta.env.VITE_APP_ENV,
      VITE_LOGO_URL: import.meta.env.VITE_LOGO_URL,
    };

    return envSchema.parse(env);
  } catch (error) {
    console.error('❌ Invalid environment configuration:', error);
    throw new Error('Invalid environment configuration. Check your .env file.');
  }
};

const env = validateEnv();

export const config = {
  supabase: {
    url: env.VITE_SUPABASE_URL,
    anonKey: env.VITE_SUPABASE_ANON_KEY,
  },
  environment: env.VITE_APP_ENV,
  isProduction: env.VITE_APP_ENV === 'production',
  isDevelopment: env.VITE_APP_ENV === 'development',
  isTest: env.VITE_APP_ENV === 'test',
  logoUrl: env.VITE_LOGO_URL,
} as const;