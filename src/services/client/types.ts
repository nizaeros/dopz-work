// Define shared types for client service
import type { Client } from '../../types/client';
import type { ClientFormData } from '../../types/forms';

export interface ClientResponse {
  data: Client | null;
  error: Error | null;
}

export interface ClientListResponse {
  data: Client[];
  error: Error | null;
}

export interface ClientEditData extends Partial<ClientFormData> {
  client_account_id: string;
}