import { envValidator } from '../validators/env.validator';
import { getEnvVariables } from './get-env-variables.util';
import type { EnvironmentConfig } from '../types';

export const validateEnv = (): EnvironmentConfig => {
  try {
    const env = getEnvVariables();
    const validatedEnv = envValidator.parse(env);

    // Additional validation for production environment
    if (validatedEnv.VITE_APP_ENV === 'production') {
      if (!validatedEnv.VITE_LOGO_URL.startsWith('https://')) {
        throw new Error('Logo URL must be an absolute HTTPS URL in production');
      }
    }

    return validatedEnv;
  } catch (error) {
    console.error('❌ Environment validation failed:', error);
    throw new Error(
      'Invalid environment configuration. Please check your .env file and ensure all required variables are set correctly.'
    );
  }
};