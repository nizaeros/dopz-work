export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role_type: 'internal' | 'external';
  user_details?: {
    first_name: string;
    last_name: string;
    client_id?: string;
  };
}