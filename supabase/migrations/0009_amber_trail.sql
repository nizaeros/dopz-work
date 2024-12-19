/*
  # Roles Schema and Security
  
  1. Schema Changes
    - Creates roles table with:
      - UUID primary key
      - Unique role names
      - Foreign key to role_types
      - Audit timestamps
  
  2. Security
    - Enables RLS
    - Drops existing policies to avoid conflicts
    - Creates policies for:
      - Full access for internal users
      - Read access for authenticated users
*/

-- Create roles table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'roles') THEN
    CREATE TABLE roles (
      role_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      role_name text NOT NULL UNIQUE,
      role_type_id uuid NOT NULL REFERENCES role_types(role_type_id),
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    );
  END IF;
END $$;

-- Enable RLS
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "roles_internal_full_access" ON roles;
DROP POLICY IF EXISTS "roles_authenticated_select" ON roles;

-- Create policies
CREATE POLICY "roles_internal_full_access"
  ON roles
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()
      AND users.role_type_name = 'internal'
    )
  );

CREATE POLICY "roles_authenticated_select"
  ON roles
  FOR SELECT
  TO authenticated
  USING (true);