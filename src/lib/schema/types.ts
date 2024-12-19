// Database Types and Enums
export const dbTypes = {
  input_status: ['review', 'suspense', 'verified', 'cancelled'] as const,
  bookkeeping_status: ['yes', 'no'] as const,
  role_type: ['internal', 'external'] as const,
  entity_type: [
    'Private Limited',
    'Public Limited',
    'LLP',
    'OPC',
    'Branch Office',
    'Liaison Office',
    'Partnership Firm'
  ] as const
};

export type InputStatus = typeof dbTypes.input_status[number];
export type BookkeepingStatus = typeof dbTypes.bookkeeping_status[number];
export type RoleType = typeof dbTypes.role_type[number];
export type EntityType = typeof dbTypes.entity_type[number];

// Table Types
export interface ClientAccount {
  client_account_id: string;
  friendly_name: string;
  registered_name?: string;
  slug: string;
  account_type: string;
  industry_id: string;
  entity_type: EntityType;
  gstin?: string;
  tan?: string;
  icn?: string;
  linkedin_url?: string;
  website_url?: string;
  logo_image_url?: string;
  country_id?: string;
  state_id?: string;
  city_id?: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

export interface ClientInput {
  input_id: string;
  input_code: string;
  client_account_id: string;
  input_month: string;
  dated_on?: string;
  category: string;
  input_status: InputStatus;
  party_name?: string;
  amount?: number;
  bookkeeping_status: BookkeepingStatus;
  notes?: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

export interface User {
  user_id: string;
  auth_id: string;
  email: string;
  first_name: string;
  last_name: string;
  role_id: string;
  role_type_name: RoleType;
  client_id?: string;
  profile_image_url?: string;
  created_at: string;
  updated_at: string;
}