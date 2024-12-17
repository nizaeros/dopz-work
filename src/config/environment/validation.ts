import { envSchema } from './schema';
import { ENV_KEYS } from './constants';
import type { EnvironmentConfig } from './types';

export class EnvironmentValidator {
  private static getEnvVariables(): Partial<EnvironmentConfig> {
    return {
      [ENV_KEYS.SUPABASE_URL]: import.meta.env.VITE_SUPABASE_URL,
      [ENV_KEYS.SUPABASE_ANON_KEY]: import.meta.env.VITE_SUPABASE_ANON_KEY,
      [ENV_KEYS.APP_ENV]: import.meta.env.VITE_APP_ENV,
      [ENV_KEYS.LOGO_URL]: import.meta.env.VITE_LOGO_URL,
    };
  }

  public static validate(): EnvironmentConfig {
    try {
      const env = this.getEnvVariables();
      return envSchema.parse(env);
    } catch (error) {
      console.error('❌ Environment validation failed:', error);
      throw new Error(
        'Invalid environment configuration. Please check your .env file and ensure all required variables are set correctly.'
      );
    }
  }
}