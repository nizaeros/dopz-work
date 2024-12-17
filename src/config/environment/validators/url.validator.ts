import { z } from 'zod';

export const urlValidator = (fieldName: string) => 
  z.string()
    .url(`${fieldName} must be a valid URL`)
    .startsWith('https://', `${fieldName} must use HTTPS`);