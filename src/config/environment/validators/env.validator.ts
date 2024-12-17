import { z } from 'zod';
import { urlValidator } from './url.validator';
import { jwtValidator } from './jwt.validator';
import { ENV_KEYS } from '../constants';

export const envValidator = z.object({
  [ENV_KEYS.SUPABASE_URL]: urlValidator('Supabase URL'),
  [ENV_KEYS.SUPABASE_ANON_KEY]: jwtValidator('Supabase anonymous key'),
  [ENV_KEYS.APP_ENV]: z.enum(['development', 'production', 'test'])
    .default('development'),
  [ENV_KEYS.LOGO_URL]: urlValidator('Logo URL')
    .or(z.string().startsWith('/', 'Logo URL must be either an absolute URL or start with /')),
});