import { z } from 'zod';

export const jwtValidator = (fieldName: string) =>
  z.string()
    .min(1, `${fieldName} is required`)
    .regex(
      /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
      `${fieldName} must be a valid JWT format`
    );