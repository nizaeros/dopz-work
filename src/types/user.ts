export interface UserProfile {
  first_name: string;
  last_name: string;
  profile_image_url?: string;
  role_id: string;
  team_id?: string;
  email: string;
  primary_phone_country_code?: string;
  primary_phone_number?: string;
  role_type_name: 'internal' | 'external';
  client_id?: string;
}

export interface UserRole {
  role_id: string;
  role_name: string;
  role_type_id: string;
  user_role_types: {
    role_type_name: 'internal' | 'external';
  };
}