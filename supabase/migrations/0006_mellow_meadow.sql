/*
  # Create Base Tables Migration

  1. New Tables
    - role_types (internal/external roles)
    - roles (specific roles within types)
    - client_accounts (client organization details)
    - users (user profiles with role associations)
  
  2. Indexes
    - Performance indexes for frequently queried columns
    - Foreign key indexes
  
  3. Initial Data
    - Default role types (internal/external)
*/

-- Create role_types table
CREATE TABLE IF NOT EXISTS role_types (
  role_type_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_type_name text NOT NULL UNIQUE CHECK (role_type_name IN ('internal', 'external')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Insert default role types
INSERT INTO role_types (role_type_name)
VALUES ('internal'), ('external')
ON CONFLICT (role_type_name) DO NOTHING;

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  role_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_name text NOT NULL UNIQUE,
  role_type_id uuid NOT NULL REFERENCES role_types(role_type_id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create client_accounts table
CREATE TABLE IF NOT EXISTS client_accounts (
  client_account_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  friendly_name text NOT NULL,
  registered_name text,
  slug text UNIQUE,
  account_type text NOT NULL,
  industry_id uuid,
  entity_type text NOT NULL,
  gstin text,
  tan text,
  icn text,
  linkedin_url text,
  website_url text,
  logo_image_url text,
  country_id uuid,
  state_id uuid,
  city_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid NOT NULL
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  user_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id uuid UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  role_id uuid NOT NULL REFERENCES roles(role_id),
  role_type_name text NOT NULL REFERENCES role_types(role_type_name),
  client_id uuid REFERENCES client_accounts(client_account_id),
  profile_image_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_auth_id ON users(auth_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role_type ON users(role_type_name);
CREATE INDEX IF NOT EXISTS idx_client_accounts_slug ON client_accounts(slug);
CREATE INDEX IF NOT EXISTS idx_client_accounts_industry ON client_accounts(industry_id);