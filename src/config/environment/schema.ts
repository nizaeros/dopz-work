import { z } from 'zod';

// Define environment schema with strict validation
export const envSchema = z.object({
  VITE_SUPABASE_URL: z.string()
    .url('Supabase URL must be a valid URL')
    .startsWith('https://', 'Supabase URL must use HTTPS'),
  VITE_SUPABASE_ANON_KEY: z.string()
    .min(1, 'Supabase anonymous key is required')
    .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, 'Invalid JWT format'),
  VITE_APP_ENV: z.enum(['development', 'production', 'test'])
    .default('development'),
  VITE_LOGO_URL: z.string()
    .min(1, 'Logo URL is required')
    .refine(
      (url) => url.startsWith('/') || url.startsWith('http'),
      'Logo URL must be either an absolute path or a full URL'
    ),
});