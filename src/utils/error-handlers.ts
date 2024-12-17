import { PostgrestError } from '@supabase/supabase-js';

export function handleSupabaseError(error: unknown, defaultMessage: string): Error {
  if (error instanceof Error) {
    return error;
  }
  
  if (typeof error === 'object' && error !== null) {
    const postgrestError = error as PostgrestError;
    if (postgrestError.message) {
      return new Error(postgrestError.message);
    }
  }
  
  return new Error(defaultMessage);
}