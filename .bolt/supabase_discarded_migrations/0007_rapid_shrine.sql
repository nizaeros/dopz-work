/*
  # Client Accounts Schema Update

  1. New Tables
    - client_accounts
      - client_account_id (uuid, primary key)
      - friendly_name (text)
      - registered_name (text, optional)
      - slug (text, unique)
      - account_type (text)
      - industry_id (uuid)
      - entity_type (text)
      - gstin (text, optional)
      - created_at, updated_at (timestamptz)
      - created_by, updated_by (uuid)

  2. Indexes
    - slug
    - industry_id

  3. Foreign Keys
    - Updates users.client_id foreign key constraint

  4. Security
    - Enables RLS
    - Internal users get full access
    - External users can only view their own client
*/

-- Create client_accounts table if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'client_accounts') THEN
    CREATE TABLE client_accounts (
      client_account_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      friendly_name text NOT NULL,
      registered_name text,
      slug text UNIQUE,
      account_type text NOT NULL,
      industry_id uuid,
      entity_type text NOT NULL,
      gstin text,
      created_at timestamptz NOT NULL DEFAULT now(),
      created_by uuid NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now(),
      updated_by uuid NOT NULL
    );
  END IF;
END $$;

-- Create indexes for performance
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_client_accounts_slug') THEN
    CREATE INDEX idx_client_accounts_slug ON client_accounts(slug);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_client_accounts_industry') THEN
    CREATE INDEX idx_client_accounts_industry ON client_accounts(industry_id);
  END IF;
END $$;

-- Update foreign key constraint for users.client_id
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_client_id_fkey;
ALTER TABLE users
ADD CONSTRAINT users_client_id_fkey
FOREIGN KEY (client_id)
REFERENCES client_accounts(client_account_id);

-- Enable RLS
ALTER TABLE client_accounts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "client_accounts_internal_full_access" ON client_accounts;
DROP POLICY IF EXISTS "client_accounts_external_select" ON client_accounts;

-- Create policies
CREATE POLICY "client_accounts_internal_full_access"
  ON client_accounts
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()
      AND users.role_type_name = 'internal'
    )
  );

CREATE POLICY "client_accounts_external_select"
  ON client_accounts
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()
      AND users.role_type_name = 'external'
      AND users.client_id = client_accounts.client_account_id
    )
  );