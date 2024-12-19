// Utility functions for client service
import type { ClientFormData } from '../../types/forms';

export function validateClientData(data: ClientFormData) {
  if (!data.friendly_name) {
    throw new Error('Client name is required');
  }
  
  if (!data.industry_id) {
    throw new Error('Industry is required');
  }
  
  // Add more validations as needed
}

export function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}